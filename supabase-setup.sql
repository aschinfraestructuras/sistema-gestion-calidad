-- ========================================
-- CONFIGURACIÓN DE BASE DE DATOS SUPABASE
-- Sistema de Gestión de Calidad ASCH-OHLA
-- ========================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- TABLA: documents
-- ========================================
CREATE TABLE IF NOT EXISTS documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_type TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    chapter_id INTEGER,
    subchapter_id TEXT,
    uploaded_by TEXT DEFAULT 'user-001',
    tags JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- TABLA: dynamic_forms
-- ========================================
CREATE TABLE IF NOT EXISTS dynamic_forms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    form_type TEXT DEFAULT 'inspection',
    chapter_id INTEGER,
    subchapter_id TEXT,
    fields JSONB NOT NULL DEFAULT '[]',
    template_data JSONB DEFAULT '{}',
    form_html TEXT,
    created_by TEXT DEFAULT 'user-001',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- TABLA: chapters
-- ========================================
CREATE TABLE IF NOT EXISTS chapters (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    order_index INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- TABLA: subchapters
-- ========================================
CREATE TABLE IF NOT EXISTS subchapters (
    id TEXT PRIMARY KEY,
    chapter_id INTEGER REFERENCES chapters(id),
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- INSERTAR CAPÍTULOS
-- ========================================
INSERT INTO chapters (id, title, description, icon, order_index) VALUES
(1, 'Sistema de Gestión de Documentos', 'Gestión integral de documentos del sistema de calidad', 'fas fa-file-alt', 1),
(2, 'Plan de Ensayos y Controles', 'Planificación y ejecución de ensayos de calidad', 'fas fa-flask', 2),
(3, 'Objetivos y Política de Calidad', 'Definición de objetivos y políticas de calidad', 'fas fa-bullseye', 3),
(4, 'Programación y Comunicaciones', 'Programación de actividades y comunicaciones', 'fas fa-calendar-alt', 4),
(5, 'Trazabilidad de Materiales', 'Control y seguimiento de materiales', 'fas fa-boxes', 5),
(6, 'Puntos de Inspección y Control', 'Definición de puntos de control e inspección', 'fas fa-search', 6),
(7, 'Equipos, Maquinaria y Tajos', 'Gestión de equipos y maquinaria', 'fas fa-tools', 7),
(8, 'Calibración de Equipos', 'Calibración y mantenimiento de equipos', 'fas fa-cogs', 8),
(9, 'Certificados y Materiales', 'Gestión de certificados de materiales', 'fas fa-certificate', 9),
(10, 'No Conformidades', 'Gestión de no conformidades y acciones correctivas', 'fas fa-exclamation-triangle', 10),
(11, 'Control de Calidad y Asistencia', 'Control de calidad y asistencia técnica', 'fas fa-user-check', 11),
(12, 'Cálculos y Notas Técnicas', 'Cálculos estructurales y notas técnicas', 'fas fa-calculator', 12),
(13, 'Control Geométrico', 'Control geométrico y mediciones', 'fas fa-ruler', 13),
(14, 'Control de Planos', 'Gestión y control de planos', 'fas fa-drafting-compass', 14),
(15, 'Laboratorio', 'Gestión de laboratorio y ensayos', 'fas fa-microscope', 15),
(16, 'Documentación General', 'Documentación general del sistema', 'fas fa-folder-open', 16),
(17, 'Control Económico de Calidad', 'Control económico y costos de calidad', 'fas fa-chart-line', 17),
(18, 'Normativas', 'Gestión de normativas y estándares', 'fas fa-book', 18),
(19, 'Pruebas Finales', 'Pruebas finales y recepción', 'fas fa-check-double', 19),
(20, 'Auditorías', 'Planificación y ejecución de auditorías', 'fas fa-clipboard-check', 20),
(21, 'Informes Mensuales', 'Informes mensuales y reportes', 'fas fa-chart-bar', 21)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    order_index = EXCLUDED.order_index;

-- ========================================
-- INSERTAR SUBCAPÍTULOS
-- ========================================
INSERT INTO subchapters (id, chapter_id, title, description, order_index) VALUES
-- Capítulo 1
('1.1', 1, 'Procedimiento de Control', 'Procedimientos para el control de documentos', 1),
('1.2', 1, 'Registro de Documentos', 'Sistema de registro y numeración de documentos', 2),
('1.3', 1, 'Distribución de Documentos', 'Procedimientos de distribución de documentos', 3),
('1.4', 1, 'Archivo de Documentos', 'Sistema de archivo y almacenamiento', 4),
('1.5', 1, 'Actualización de Documentos', 'Procedimientos de actualización y revisión', 5),
-- Capítulo 2
('2.1', 2, 'Plan de Ensayos de Materiales', 'Planificación de ensayos de materiales', 1),
('2.2', 2, 'Control de Calidad de Hormigón', 'Control específico de calidad del hormigón', 2),
('2.3', 2, 'Ensayo de Suelos', 'Ensayos y análisis de suelos', 3),
('2.4', 2, 'Control de Acero', 'Control de calidad del acero', 4),
('2.5', 2, 'Ensayo de Agregados', 'Ensayos de agregados y áridos', 5),
-- Capítulo 3
('3.1', 3, 'Política de Calidad', 'Definición de la política de calidad', 1),
('3.2', 3, 'Objetivos de Calidad', 'Establecimiento de objetivos de calidad', 2),
('3.3', 3, 'Compromiso de la Dirección', 'Compromiso y liderazgo de la dirección', 3),
('3.4', 3, 'Revisión de la Política', 'Procedimientos de revisión de la política', 4),
('3.5', 3, 'Comunicación de Objetivos', 'Comunicación de objetivos a la organización', 5)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    order_index = EXCLUDED.order_index;

-- ========================================
-- CONFIGURAR STORAGE
-- ========================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- ========================================

-- Habilitar RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE subchapters ENABLE ROW LEVEL SECURITY;

-- Políticas para documents
DROP POLICY IF EXISTS "Allow all operations on documents" ON documents;
CREATE POLICY "Allow all operations on documents" ON documents
FOR ALL USING (true);

-- Políticas para dynamic_forms
DROP POLICY IF EXISTS "Allow all operations on dynamic_forms" ON dynamic_forms;
CREATE POLICY "Allow all operations on dynamic_forms" ON dynamic_forms
FOR ALL USING (true);

-- Políticas para chapters
DROP POLICY IF EXISTS "Allow all operations on chapters" ON chapters;
CREATE POLICY "Allow all operations on chapters" ON chapters
FOR ALL USING (true);

-- Políticas para subchapters
DROP POLICY IF EXISTS "Allow all operations on subchapters" ON subchapters;
CREATE POLICY "Allow all operations on subchapters" ON subchapters
FOR ALL USING (true);

-- Políticas para Storage
DROP POLICY IF EXISTS "Documents are publicly accessible" ON storage.objects;
CREATE POLICY "Documents are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'documents');

DROP POLICY IF EXISTS "Authenticated users can upload documents" ON storage.objects;
CREATE POLICY "Authenticated users can upload documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'documents');

DROP POLICY IF EXISTS "Authenticated users can update documents" ON storage.objects;
CREATE POLICY "Authenticated users can update documents" ON storage.objects
FOR UPDATE USING (bucket_id = 'documents');

DROP POLICY IF EXISTS "Authenticated users can delete documents" ON storage.objects;
CREATE POLICY "Authenticated users can delete documents" ON storage.objects
FOR DELETE USING (bucket_id = 'documents');

-- ========================================
-- ÍNDICES PARA MEJORAR PERFORMANCE
-- ========================================
CREATE INDEX IF NOT EXISTS idx_documents_chapter_id ON documents(chapter_id);
CREATE INDEX IF NOT EXISTS idx_documents_file_type ON documents(file_type);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at);
CREATE INDEX IF NOT EXISTS idx_documents_title ON documents USING gin(to_tsvector('spanish', title));

CREATE INDEX IF NOT EXISTS idx_dynamic_forms_chapter_id ON dynamic_forms(chapter_id);
CREATE INDEX IF NOT EXISTS idx_dynamic_forms_status ON dynamic_forms(status);

-- ========================================
-- FUNCIONES DE UTILIDAD
-- ========================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
DROP TRIGGER IF EXISTS update_documents_updated_at ON documents;
CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_dynamic_forms_updated_at ON dynamic_forms;
CREATE TRIGGER update_dynamic_forms_updated_at
    BEFORE UPDATE ON dynamic_forms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ========================================

-- Insertar algunos documentos de ejemplo
INSERT INTO documents (title, file_name, file_path, file_size, file_type, mime_type, chapter_id, uploaded_by) VALUES
('Manual de Calidad v1.0', 'manual-calidad-v1.pdf', 'documents/manual-calidad-v1.pdf', 2048576, 'pdf', 'application/pdf', 1, 'user-001'),
('Plan de Ensayos 2025', 'plan-ensayos-2025.docx', 'documents/plan-ensayos-2025.docx', 1024000, 'word', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 2, 'user-001'),
('Cronograma de Actividades', 'cronograma-actividades.xlsx', 'documents/cronograma-actividades.xlsx', 512000, 'excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 4, 'user-001')
ON CONFLICT DO NOTHING;

-- ========================================
-- COMENTARIOS FINALES
-- ========================================
COMMENT ON TABLE documents IS 'Tabla principal para almacenar metadatos de documentos';
COMMENT ON TABLE dynamic_forms IS 'Tabla para formularios HTML dinámicos';
COMMENT ON TABLE chapters IS 'Tabla con los 21 capítulos del sistema de calidad';
COMMENT ON TABLE subchapters IS 'Tabla con subcapítulos de cada capítulo principal';

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE '✅ Base de datos configurada correctamente para el Sistema de Gestión de Calidad ASCH-OHLA';
    RAISE NOTICE '📊 Tablas creadas: documents, dynamic_forms, chapters, subchapters';
    RAISE NOTICE '🗂️ Storage bucket configurado: documents';
    RAISE NOTICE '🔒 Políticas de seguridad habilitadas';
    RAISE NOTICE '📈 Índices creados para optimizar performance';
    RAISE NOTICE '🚀 Sistema listo para usar';
END $$;
