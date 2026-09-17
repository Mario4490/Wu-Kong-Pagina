-- ================================================================
-- Team Wukong — Migración de base de datos Supabase
-- Tablas: alumnos, pagos, hermes_avisos
-- Seguridad: RLS activado, UUIDs, CHECK constraints, FKs con RESTRICT
-- ================================================================

-- ================================================================
-- 1. ALUMNOS
-- ================================================================
CREATE TABLE IF NOT EXISTS alumnos (
    id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre         TEXT         NOT NULL CHECK (length(trim(nombre)) > 0),
    disciplina     TEXT         NOT NULL CHECK (length(trim(disciplina)) > 0),
    cinturon       TEXT         NOT NULL DEFAULT 'Principiante' CHECK (length(trim(cinturon)) > 0),
    estado         TEXT         NOT NULL DEFAULT 'Pendiente'
                            CHECK (estado IN ('Al día', 'Pendiente', 'Vencido')),
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Índice para búsquedas frecuentes por disciplina y estado
CREATE INDEX IF NOT EXISTS idx_alumnos_disciplina
    ON alumnos (disciplina);
CREATE INDEX IF NOT EXISTS idx_alumnos_estado
    ON alumnos (estado);

-- Trigger automático para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_alumnos_updated_at
    BEFORE UPDATE ON alumnos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE alumnos IS 'Alumnos registrados en Team Wukong';
COMMENT ON COLUMN alumnos.id         IS 'Identificador único UUID (impredecible)';
COMMENT ON COLUMN alumnos.nombre    IS 'Nombre completo del alumno';
COMMENT ON COLUMN alumnos.disciplina IS 'Disciplina principal: Karate Do, Boxeo, MMA';
COMMENT ON COLUMN alumnos.cinturon  IS 'Nivel/cinturon: ej. "5 Dan", "Ex-amateur", "Principiante"';
COMMENT ON COLUMN alumnos.estado    IS 'Estado de pago: "Al día", "Pendiente", "Vencido"';
COMMENT ON COLUMN alumnos.created_at IS 'Fecha de registro (UTC, servidor)';
COMMENT ON COLUMN alumnos.updated_at IS 'Fecha de última actualización (UTC, servidor)';


-- ================================================================
-- 2. PAGOS
-- ================================================================
CREATE TABLE IF NOT EXISTS pagos (
    id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    alumno_id        UUID         NOT NULL REFERENCES alumnos(id) ON DELETE RESTRICT,
    monto            NUMERIC(12,2) NOT NULL CHECK (monto > 0),
    fecha_pago       DATE         NOT NULL CHECK (fecha_pago <= CURRENT_DATE),
    metodo_pago      TEXT         NOT NULL
                            CHECK (metodo_pago IN ('efectivo', 'transferencia', 'transferencia_bancaria', 'qr', 'otro')),
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pagos_alumno_id
    ON pagos (alumno_id);
CREATE INDEX IF NOT EXISTS idx_pagos_fecha_pago
    ON pagos (fecha_pago);

COMMENT ON TABLE pagos IS 'Registro de pagos de cuotas de los alumnos';
COMMENT ON COLUMN pagos.id            IS 'Identificador único UUID';
COMMENT ON COLUMN pagos.alumno_id     IS 'FK → alumnos.id (on delete restrict: no se puede borrar un alumno con pagos asociados)';
COMMENT ON COLUMN pagos.monto         IS 'Monto pagado en ARS (números, sin símbolo)';
COMMENT ON COLUMN pagos.fecha_pago    IS 'Fecha del pago (no puede ser futura)';
COMMENT ON COLUMN pagos.metodo_pago   IS 'Método: efectivo, transferencia, transferencia_bancaria, qr, otro';
COMMENT ON COLUMN pagos.created_at    IS 'Fecha de registro del pago (UTC, servidor)';


-- ================================================================
-- 3. HERMES_AVISOS
-- ================================================================
CREATE TABLE IF NOT EXISTS hermes_avisos (
    id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    alumno_id      UUID         NOT NULL REFERENCES alumnos(id) ON DELETE RESTRICT,
    tipo_aviso     TEXT         NOT NULL
                            CHECK (tipo_aviso IN (
                                'recordatorio_cobro',
                                'cuota_vencida',
                                'recibo_pago',
                                'aviso_institucional',
                                'suspension_clase',
                                'aviso_general'
                            )),
    estado         TEXT         NOT NULL DEFAULT 'pendiente'
                            CHECK (estado IN ('pendiente', 'enviado', 'leido', 'vencido')),
    contenido      TEXT         NOT NULL CHECK (length(contenido) > 0),
    fecha_envio    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    fecha_visto    TIMESTAMPTZ  DEFAULT NULL
);

CREATE INDEX IF NOT EXISTS idx_hermes_avisos_alumno_id
    ON hermes_avisos (alumno_id);
CREATE INDEX IF NOT EXISTS idx_hermes_avisos_estado
    ON hermes_avisos (estado);
CREATE INDEX IF NOT EXISTS idx_hermes_avisos_tipo_aviso
    ON hermes_avisos (tipo_aviso);
CREATE INDEX IF NOT EXISTS idx_hermes_avisos_fecha_envio
    ON hermes_avisos (fecha_envio);

COMMENT ON TABLE hermes_avisos IS 'Avisos del sistema Hermes: vencimientos, cobros, recibos, avisos generales';
COMMENT ON COLUMN hermes_avisos.id          IS 'Identificador único UUID';
COMMENT ON COLUMN hermes_avisos.alumno_id   IS 'FK → alumnos.id (a quién va dirigido el aviso)';
COMMENT ON COLUMN hermes_avisos.tipo_aviso  IS 'Tipo según reglas de negocio';
COMMENT ON COLUMN hermes_avisos.estado      IS 'Ciclo de vida: pendiente → enviado → leido/vencido';
COMMENT ON COLUMN hermes_avisos.contenido   IS 'Texto del mensaje formateado (listo para enviar)';
COMMENT ON COLUMN hermes_avisos.fecha_envio IS 'Cuándo se generó/el envió el aviso (UTC, servidor)';
COMMENT ON COLUMN hermes_avisos.fecha_visto IS 'Cuándo fue confirmado como leído (null = no visto)';


-- ================================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ================================================================

-- Activar RLS en todas las tablas
ALTER TABLE alumnos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE hermes_avisos ENABLE ROW LEVEL SECURITY;

-- Función auxiliar para verificar si el JWT tiene rol admin
-- (Supabase Auth setea claims en el JWT; ajustar según configuración real)
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
    -- Si la sesión viene de un provider con role admin
    IF CURRENT_SETTING('request.jwt.claims.raw', true)::jsonb->>'role' = 'admin' THEN
        RETURN TRUE;
    END IF;
    -- Alternativamente, si se usa un user id específico
    -- IF auth.uid() = 'uuid-del-admin' THEN RETURN TRUE; END IF;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;

-- ================================================================
-- Políticas ALUMNOS
-- ================================================================

-- Los usuarios autenticados pueden VER todos los alumnos
-- (necesario para el dashboard del profesor/admin)
CREATE POLICY alumnos_select_authenticated
    ON alumnos FOR SELECT
    TO authenticated
    USING (true);

-- Solo admin puede INSERTAR alumnos
CREATE POLICY alumnos_insert_admin
    ON alumnos FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_user());

-- Solo admin puede ACTUALIZAR alumnos
CREATE POLICY alumnos_update_admin
    ON alumnos FOR UPDATE
    TO authenticated
    USING (is_admin_user())
    WITH CHECK (is_admin_user());

-- Solo admin puede BORRAR alumnos
CREATE POLICY alumnos_delete_admin
    ON alumnos FOR DELETE
    TO authenticated
    USING (is_admin_user());

-- ================================================================
-- Políticas PAGOS
-- ================================================================

CREATE POLICY pagos_select_authenticated
    ON pagos FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY pagos_insert_admin
    ON pagos FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_user());

CREATE POLICY pagos_update_admin
    ON pagos FOR UPDATE
    TO authenticated
    USING (is_admin_user())
    WITH CHECK (is_admin_user());

CREATE POLICY pagos_delete_admin
    ON pagos FOR DELETE
    TO authenticated
    USING (is_admin_user());

-- ================================================================
-- Políticas HERMES_AVISOS
-- ================================================================

CREATE POLICY hermes_avisos_select_authenticated
    ON hermes_avisos FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY hermes_avisos_insert_admin
    ON hermes_avisos FOR INSERT
    TO authenticated
    WITH CHECK (is_admin_user());

CREATE POLICY hermes_avisos_update_admin
    ON hermes_avisos FOR UPDATE
    TO authenticated
    USING (is_admin_user())
    WITH CHECK (is_admin_user());

CREATE POLICY hermes_avisos_delete_admin
    ON hermes_avisos FOR DELETE
    TO authenticated
    USING (is_admin_user());


-- ================================================================
-- 5. Notas de seguridad post-creación
-- ================================================================
-- a) La service_role_key se usa SOLO server-side (Next.js API routes).
--    NUNCA se exponen al navegador (no usar NEXT_PUBLIC_ con esta key).
--
-- b) La anon_key (NEXT_PUBLIC_SUPABASE_ANON_KEY) es segura de exponer
--    porque RLS restringe lo que puede hacer. Pero si se filtra, un atacante
--    podría leer datos públicos. Mantenerla secreta en producción si es posible
--    (o usar RLS estricto que solo deje ver lo que el usuario autenticado puede ver).
--
-- c) Todas las consultas desde el cliente Supabase JS son parametrizadas.
--    El riesgo de inyección SQL está en:
--      - Keys filtradas a terceros
--      - Políticas RLS mal escritas (evitado: no hay concatenación de user input en policies)
--
-- d) Si se quiere permitir que ciertos usuarios (profesores) vean solo sus alumnos,
--    habría que añadir una columna `profesor_id` a alumnos y filtrar por ella
--    en las políticas. Por ahora, todo está bajo admin único.

-- ================================================================
-- Fin de la migración
-- ================================================================
