# 🚀 Sistema de Gestión de Calidad ASCH-OHLA - Especificaciones Completas

## 📋 **RESUMEN DEL PROYECTO**

Sistema web completo de gestión de calidad para ASCH-OHLA con 21 capítulos organizados, sistema de documentos, formularios dinámicos, búsqueda avanzada y todas las funcionalidades modernas.

## 🎯 **OBJETIVOS DEL SISTEMA**

- **Gestión completa de documentos** por capítulos y subcapítulos
- **Sistema de formularios dinámicos** con campos personalizables
- **Búsqueda y filtros avanzados** en tiempo real
- **Upload/Download funcional** con Supabase Storage
- **Visualización integrada** de PDF, HTML, Excel, imágenes
- **Sistema de impresión** y exportación
- **Interfaz moderna** y responsive
- **Autenticación y permisos** por roles

## 🏗️ **ARQUITECTURA TÉCNICA**

### **Frontend**
- **HTML5** semántico y accesible
- **CSS3** con variables CSS y diseño responsive
- **JavaScript ES6+** modular y bien estructurado
- **Font Awesome** para iconografía
- **LocalStorage** para persistencia local

### **Backend**
- **Supabase** como backend completo
- **PostgreSQL** para base de datos
- **Supabase Storage** para archivos
- **Row Level Security** para permisos
- **Real-time subscriptions** para actualizaciones

### **Estructura de Archivos**
```
sistema-gestion-calidad/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   └── main.css          # Estilos principales
│   ├── js/
│   │   ├── app.js            # Lógica principal
│   │   ├── supabase.js       # Configuración Supabase
│   │   ├── upload.js         # Sistema de upload
│   │   ├── search.js         # Búsqueda y filtros
│   │   ├── forms.js          # Formularios dinámicos
│   │   └── viewer.js         # Visualizador de documentos
│   └── images/               # Imágenes y recursos
├── data/                     # Datos de ejemplo
├── supabase/                 # Configuración Supabase
│   ├── migrations/           # Migraciones de BD
│   └── seed.sql             # Datos iniciales
└── docs/                    # Documentación
```

## 📚 **DATOS DE LOS CAPÍTULOS**

### **21 Capítulos Completos del Sistema de Calidad**
```javascript
const chapters = {
    1: { 
        title: 'Sistema de Gestión de Documentos', 
        icon: 'fas fa-file-alt',
        subchapters: {
            '1.1': 'Procedimiento de Control',
            '1.2': 'Registro de Documentos',
            '1.3': 'Distribución de Documentos',
            '1.4': 'Archivo de Documentos',
            '1.5': 'Actualización de Documentos'
        }
    },
    2: { 
        title: 'Plan de Ensayos y Controles', 
        icon: 'fas fa-flask',
        subchapters: {
            '2.1': 'Plan de Ensayos de Materiales',
            '2.2': 'Control de Calidad de Hormigón',
            '2.3': 'Ensayo de Suelos',
            '2.4': 'Control de Acero',
            '2.5': 'Ensayo de Agregados'
        }
    },
    3: { 
        title: 'Objetivos y Política de Calidad', 
        icon: 'fas fa-bullseye',
        subchapters: {
            '3.1': 'Política de Calidad',
            '3.2': 'Objetivos de Calidad',
            '3.3': 'Compromiso de la Dirección',
            '3.4': 'Revisión de la Política',
            '3.5': 'Comunicación de Objetivos'
        }
    },
    4: { 
        title: 'Programación y Comunicaciones', 
        icon: 'fas fa-calendar-alt',
        subchapters: {
            '4.1': 'Cronograma de Actividades',
            '4.2': 'Comunicaciones Internas',
            '4.3': 'Comunicaciones Externas',
            '4.4': 'Reuniones de Calidad',
            '4.5': 'Informes de Progreso'
        }
    },
    5: { 
        title: 'Trazabilidad de Materiales', 
        icon: 'fas fa-boxes',
        subchapters: {
            '5.1': 'Registro de Materiales',
            '5.2': 'Certificados de Calidad',
            '5.3': 'Control de Entrada',
            '5.4': 'Almacenamiento',
            '5.5': 'Seguimiento de Lotes'
        }
    },
    6: { 
        title: 'Puntos de Inspección y Control', 
        icon: 'fas fa-search',
        subchapters: {
            '6.1': 'Plan de Inspección',
            '6.2': 'Puntos de Control',
            '6.3': 'Frecuencia de Inspección',
            '6.4': 'Criterios de Aceptación',
            '6.5': 'Registro de Inspecciones'
        }
    },
    7: { 
        title: 'Equipos, Maquinaria y Tajos', 
        icon: 'fas fa-tools',
        subchapters: {
            '7.1': 'Registro de Equipos',
            '7.2': 'Mantenimiento Preventivo',
            '7.3': 'Control de Operadores',
            '7.4': 'Seguridad en Equipos',
            '7.5': 'Rendimiento de Equipos'
        }
    },
    8: { 
        title: 'Calibración de Equipos', 
        icon: 'fas fa-cogs',
        subchapters: {
            '8.1': 'Plan de Calibración',
            '8.2': 'Certificados de Calibración',
            '8.3': 'Frecuencia de Calibración',
            '8.4': 'Registro de Calibraciones',
            '8.5': 'Equipos Patrón'
        }
    },
    9: { 
        title: 'Certificados y Materiales', 
        icon: 'fas fa-certificate',
        subchapters: {
            '9.1': 'Certificados de Materiales',
            '9.2': 'Control de Proveedores',
            '9.3': 'Especificaciones Técnicas',
            '9.4': 'Conformidad de Materiales',
            '9.5': 'Archivo de Certificados'
        }
    },
    10: { 
        title: 'No Conformidades', 
        icon: 'fas fa-exclamation-triangle',
        subchapters: {
            '10.1': 'Registro de No Conformidades',
            '10.2': 'Análisis de Causas',
            '10.3': 'Acciones Correctivas',
            '10.4': 'Seguimiento de Acciones',
            '10.5': 'Prevención de Recurrencia'
        }
    },
    11: { 
        title: 'Control de Calidad y Asistencia', 
        icon: 'fas fa-user-check',
        subchapters: {
            '11.1': 'Control de Calidad',
            '11.2': 'Asistencia Técnica',
            '11.3': 'Formación del Personal',
            '11.4': 'Competencias Técnicas',
            '11.5': 'Evaluación de Desempeño'
        }
    },
    12: { 
        title: 'Cálculos y Notas Técnicas', 
        icon: 'fas fa-calculator',
        subchapters: {
            '12.1': 'Cálculos Estructurales',
            '12.2': 'Notas Técnicas',
            '12.3': 'Verificaciones',
            '12.4': 'Documentación Técnica',
            '12.5': 'Revisión de Cálculos'
        }
    },
    13: { 
        title: 'Control Geométrico', 
        icon: 'fas fa-ruler',
        subchapters: {
            '13.1': 'Mediciones Geométricas',
            '13.2': 'Control de Dimensiones',
            '13.3': 'Tolerancias',
            '13.4': 'Instrumentos de Medición',
            '13.5': 'Registro de Mediciones'
        }
    },
    14: { 
        title: 'Control de Planos', 
        icon: 'fas fa-drafting-compass',
        subchapters: {
            '14.1': 'Revisión de Planos',
            '14.2': 'Control de Versiones',
            '14.3': 'Aprobación de Planos',
            '14.4': 'Distribución de Planos',
            '14.5': 'Archivo de Planos'
        }
    },
    15: { 
        title: 'Laboratorio', 
        icon: 'fas fa-microscope',
        subchapters: {
            '15.1': 'Ensayos de Laboratorio',
            '15.2': 'Equipos de Laboratorio',
            '15.3': 'Procedimientos de Ensayo',
            '15.4': 'Registro de Resultados',
            '15.5': 'Certificación de Laboratorio'
        }
    },
    16: { 
        title: 'Documentación General', 
        icon: 'fas fa-folder-open',
        subchapters: {
            '16.1': 'Manual de Calidad',
            '16.2': 'Procedimientos Generales',
            '16.3': 'Instrucciones de Trabajo',
            '16.4': 'Registros de Calidad',
            '16.5': 'Archivo de Documentos'
        }
    },
    17: { 
        title: 'Control Económico de Calidad', 
        icon: 'fas fa-chart-line',
        subchapters: {
            '17.1': 'Costos de Calidad',
            '17.2': 'Análisis de Rentabilidad',
            '17.3': 'Presupuestos de Calidad',
            '17.4': 'Control de Gastos',
            '17.5': 'Informes Económicos'
        }
    },
    18: { 
        title: 'Normativas', 
        icon: 'fas fa-book',
        subchapters: {
            '18.1': 'Normas ISO 9001',
            '18.2': 'Reglamentos Técnicos',
            '18.3': 'Estándares de Calidad',
            '18.4': 'Legislación Aplicable',
            '18.5': 'Actualización de Normas'
        }
    },
    19: { 
        title: 'Pruebas Finales', 
        icon: 'fas fa-check-double',
        subchapters: {
            '19.1': 'Ensayos de Recepción',
            '19.2': 'Pruebas de Funcionamiento',
            '19.3': 'Verificación Final',
            '19.4': 'Certificado de Obra',
            '19.5': 'Entrega de Proyecto'
        }
    },
    20: { 
        title: 'Auditorías', 
        icon: 'fas fa-clipboard-check',
        subchapters: {
            '20.1': 'Plan de Auditorías',
            '20.2': 'Auditorías Internas',
            '20.3': 'Auditorías Externas',
            '20.4': 'Informes de Auditoría',
            '20.5': 'Seguimiento de No Conformidades'
        }
    },
    21: { 
        title: 'Informes Mensuales', 
        icon: 'fas fa-chart-bar',
        subchapters: {
            '21.1': 'Resumen de Actividades',
            '21.2': 'Indicadores de Calidad',
            '21.3': 'Análisis de Tendencias',
            '21.4': 'Recomendaciones',
            '21.5': 'Plan de Mejoras'
        }
    }
};
```

## 🔧 **CONFIGURACIÓN SUPABASE COMPLETA**

### **Variables de Entorno**
```bash
# .env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

### **Configuración de Cliente Supabase**
```javascript
// supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export function createSupabaseClient() {
    return createClient(supabaseUrl, supabaseKey)
}
```

### **Scripts de Inicialización de Base de Datos**
```sql
-- setup-database.sql
-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insertar capítulos
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
(21, 'Informes Mensuales', 'Informes mensuales y reportes', 'fas fa-chart-bar', 21);

-- Insertar subcapítulos
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
('2.5', 2, 'Ensayo de Agregados', 'Ensayos de agregados y áridos', 5);
-- ... (continuar con todos los subcapítulos)
```

## 🗄️ **BASE DE DATOS SUPABASE**

### **Tabla: users**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    permissions JSONB DEFAULT '["read"]',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: chapters**
```sql
CREATE TABLE chapters (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    order_index INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: subchapters**
```sql
CREATE TABLE subchapters (
    id VARCHAR(10) PRIMARY KEY, -- ej: "1.1", "2.3"
    chapter_id INTEGER REFERENCES chapters(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: documents**
```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    mime_type VARCHAR(255) NOT NULL,
    chapter_id INTEGER REFERENCES chapters(id),
    subchapter_id VARCHAR(10) REFERENCES subchapters(id),
    uploaded_by UUID REFERENCES users(id),
    tags JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: forms**
```sql
CREATE TABLE forms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    form_type VARCHAR(50) NOT NULL, -- 'inspection', 'control', 'report', 'checklist'
    chapter_id INTEGER REFERENCES chapters(id),
    subchapter_id VARCHAR(10) REFERENCES subchapters(id),
    fields JSONB NOT NULL, -- Array de campos del formulario
    created_by UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'draft'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Tabla: form_submissions**
```sql
CREATE TABLE form_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_id UUID REFERENCES forms(id),
    submitted_by UUID REFERENCES users(id),
    responses JSONB NOT NULL, -- Respuestas del formulario
    status VARCHAR(20) DEFAULT 'submitted', -- 'submitted', 'approved', 'rejected'
    submitted_at TIMESTAMP DEFAULT NOW(),
    reviewed_at TIMESTAMP,
    reviewed_by UUID REFERENCES users(id)
);
```

## 🔧 **CONFIGURACIÓN SUPABASE**

### **1. Crear Proyecto Supabase**
```bash
# Instalar Supabase CLI
npm install -g supabase

# Inicializar proyecto
supabase init

# Login y link al proyecto
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

### **2. Configuración de Storage**
```sql
-- Crear bucket para documentos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true);

-- Políticas de acceso
CREATE POLICY "Documents are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'documents');

CREATE POLICY "Authenticated users can upload documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');
```

### **3. Row Level Security**
```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Políticas de ejemplo
CREATE POLICY "Users can view their own data" ON users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Public documents are viewable by all" ON documents
FOR SELECT USING (is_public = true);
```

## 📱 **FUNCIONALIDADES DETALLADAS**

### **1. Sistema de Upload**
```javascript
// upload.js
class DocumentUploader {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
        this.maxFileSize = 50 * 1024 * 1024; // 50MB
        this.allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/html',
            'image/jpeg',
            'image/png',
            'image/gif'
        ];
    }

    async uploadFile(file, chapterId, subchapterId) {
        // Validar archivo
        if (!this.validateFile(file)) {
            throw new Error('Tipo de archivo no permitido');
        }

        // Generar nombre único
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `documents/${fileName}`;

        // Upload a Supabase Storage
        const { data: uploadData, error: uploadError } = await this.supabase.storage
            .from('documents')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Guardar metadatos en BD
        const { data: docData, error: docError } = await this.supabase
            .from('documents')
            .insert({
                title: file.name,
                file_name: fileName,
                file_path: filePath,
                file_size: file.size,
                file_type: this.getFileType(file.type),
                mime_type: file.type,
                chapter_id: chapterId,
                subchapter_id: subchapterId,
                uploaded_by: (await this.supabase.auth.getUser()).data.user.id
            });

        if (docError) throw docError;

        return docData[0];
    }
}
```

### **2. Sistema de Búsqueda Avanzada**
```javascript
// search.js
class AdvancedSearch {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
    }

    async searchDocuments(filters) {
        let query = this.supabase
            .from('documents')
            .select(`
                *,
                chapters(title),
                subchapters(title),
                users(name)
            `);

        // Filtros dinámicos
        if (filters.searchTerm) {
            query = query.or(`title.ilike.%${filters.searchTerm}%,file_name.ilike.%${filters.searchTerm}%`);
        }

        if (filters.chapterId) {
            query = query.eq('chapter_id', filters.chapterId);
        }

        if (filters.fileType) {
            query = query.eq('file_type', filters.fileType);
        }

        if (filters.dateFrom) {
            query = query.gte('created_at', filters.dateFrom);
        }

        if (filters.dateTo) {
            query = query.lte('created_at', filters.dateTo);
        }

        // Ordenación
        query = query.order('created_at', { ascending: false });

        const { data, error } = await query;
        if (error) throw error;

        return data;
    }
}
```

### **3. Visualizador de Documentos**
```javascript
// viewer.js
class DocumentViewer {
    constructor() {
        this.supportedTypes = {
            'pdf': this.viewPDF,
            'html': this.viewHTML,
            'image': this.viewImage,
            'excel': this.viewExcel,
            'word': this.viewWord
        };
    }

    async viewDocument(documentId, supabaseClient) {
        // Obtener documento de BD
        const { data: doc, error } = await supabaseClient
            .from('documents')
            .select('*')
            .eq('id', documentId)
            .single();

        if (error) throw error;

        // Obtener URL de descarga
        const { data: urlData } = supabaseClient.storage
            .from('documents')
            .getPublicUrl(doc.file_path);

        // Renderizar según tipo
        const viewer = this.supportedTypes[doc.file_type];
        if (viewer) {
            return viewer(urlData.publicUrl, doc);
        } else {
            return this.viewGeneric(doc);
        }
    }

    viewPDF(url, doc) {
        return `
            <div class="document-viewer pdf-viewer">
                <iframe src="${url}" width="100%" height="600px" style="border: none;"></iframe>
                <div class="viewer-controls">
                    <button onclick="printDocument('${doc.id}')" class="btn btn-primary">
                        <i class="fas fa-print"></i> Imprimir
                    </button>
                    <button onclick="downloadDocument('${doc.id}')" class="btn btn-secondary">
                        <i class="fas fa-download"></i> Descargar
                    </button>
                </div>
            </div>
        `;
    }

    viewHTML(url, doc) {
        return `
            <div class="document-viewer html-viewer">
                <iframe src="${url}" width="100%" height="600px" style="border: none;"></iframe>
            </div>
        `;
    }

    viewImage(url, doc) {
        return `
            <div class="document-viewer image-viewer">
                <img src="${url}" alt="${doc.title}" style="max-width: 100%; height: auto;">
                <div class="image-controls">
                    <button onclick="zoomIn()" class="btn btn-sm">+</button>
                    <button onclick="zoomOut()" class="btn btn-sm">-</button>
                    <button onclick="resetZoom()" class="btn btn-sm">Reset</button>
                </div>
            </div>
        `;
    }
}
```

### **4. Formularios Dinámicos**
```javascript
// forms.js
class DynamicForms {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
        this.fieldTypes = {
            'text': this.renderTextField,
            'number': this.renderNumberField,
            'date': this.renderDateField,
            'select': this.renderSelectField,
            'checkbox': this.renderCheckboxField,
            'textarea': this.renderTextareaField,
            'file': this.renderFileField
        };
    }

    async createForm(formData) {
        const { data, error } = await this.supabase
            .from('forms')
            .insert({
                title: formData.title,
                description: formData.description,
                form_type: formData.type,
                chapter_id: formData.chapterId,
                subchapter_id: formData.subchapterId,
                fields: formData.fields,
                created_by: (await this.supabase.auth.getUser()).data.user.id
            });

        if (error) throw error;
        return data[0];
    }

    renderForm(form) {
        const fieldsHTML = form.fields.map(field => 
            this.fieldTypes[field.type](field)
        ).join('');

        return `
            <form class="dynamic-form" data-form-id="${form.id}">
                <div class="form-header">
                    <h2>${form.title}</h2>
                    <p>${form.description}</p>
                </div>
                <div class="form-fields">
                    ${fieldsHTML}
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Guardar
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="closeForm()">
                        Cancelar
                    </button>
                </div>
            </form>
        `;
    }

    renderTextField(field) {
        return `
            <div class="form-group">
                <label for="${field.id}">${field.label}</label>
                <input type="text" id="${field.id}" name="${field.name}" 
                       ${field.required ? 'required' : ''} 
                       placeholder="${field.placeholder || ''}">
            </div>
        `;
    }
}
```

## 🎨 **DISEÑO Y UX**

### **CSS Variables**
```css
:root {
    /* Colores principales */
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
    
    /* Espaciado */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    
    /* Tipografía */
    --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    
    /* Sombras */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

### **Componentes Reutilizables**
```css
/* Botones */
.btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-primary {
    background: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
}

/* Cards */
.card {
    background: white;
    border-radius: 0.5rem;
    box-shadow: var(--shadow-sm);
    padding: var(--spacing-lg);
    border: 1px solid #e2e8f0;
}

/* Modales */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
}

.modal.active {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: white;
    border-radius: 0.5rem;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    transform: scale(0.9);
    transition: transform 0.3s;
}

.modal.active .modal-content {
    transform: scale(1);
}
```

## 🔐 **AUTENTICACIÓN Y PERMISOS**

### **Sistema de Roles**
```javascript
const ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    TECHNICIAN: 'technician',
    VIEWER: 'viewer'
};

const PERMISSIONS = {
    READ_DOCUMENTS: 'read:documents',
    WRITE_DOCUMENTS: 'write:documents',
    DELETE_DOCUMENTS: 'delete:documents',
    CREATE_FORMS: 'create:forms',
    MANAGE_USERS: 'manage:users',
    VIEW_ANALYTICS: 'view:analytics'
};

class AuthManager {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
    }

    async login(email, password) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        // Obtener datos del usuario
        const { data: userData } = await this.supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single();

        return { user: data.user, profile: userData };
    }

    hasPermission(user, permission) {
        return user.permissions.includes(permission) || 
               user.permissions.includes('admin');
    }
}
```

## 📊 **ANALYTICS Y REPORTES**

### **Dashboard con Métricas**
```javascript
class Analytics {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
    }

    async getDashboardStats() {
        const [
            totalDocs,
            weeklyDocs,
            completedChapters,
            activeForms
        ] = await Promise.all([
            this.getTotalDocuments(),
            this.getWeeklyDocuments(),
            this.getCompletedChapters(),
            this.getActiveForms()
        ]);

        return {
            totalDocuments: totalDocs,
            weeklyDocuments: weeklyDocs,
            completedChapters: completedChapters,
            activeForms: activeForms
        };
    }

    async generateReport(type, filters) {
        switch (type) {
            case 'documents':
                return this.generateDocumentReport(filters);
            case 'forms':
                return this.generateFormReport(filters);
            case 'users':
                return this.generateUserReport(filters);
            default:
                throw new Error('Tipo de reporte no válido');
        }
    }
}
```

## 🚀 **INSTRUCCIONES DE IMPLEMENTACIÓN**

### **1. Configuración Inicial**
```bash
# Clonar y configurar
git clone [repo-url]
cd sistema-gestion-calidad
npm install

# Configurar Supabase
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Ejecutar migraciones
supabase db push

# Poblar datos iniciales
supabase db seed
```

### **2. Estructura de Desarrollo**
```javascript
// app.js - Archivo principal
import { createSupabaseClient } from './supabase.js';
import { DocumentUploader } from './upload.js';
import { AdvancedSearch } from './search.js';
import { DynamicForms } from './forms.js';
import { DocumentViewer } from './viewer.js';
import { AuthManager } from './auth.js';

class QualityManagementSystem {
    constructor() {
        this.supabase = createSupabaseClient();
        this.uploader = new DocumentUploader(this.supabase);
        this.search = new AdvancedSearch(this.supabase);
        this.forms = new DynamicForms(this.supabase);
        this.viewer = new DocumentViewer();
        this.auth = new AuthManager(this.supabase);
    }

    async init() {
        // Inicializar sistema
        await this.setupEventListeners();
        await this.loadInitialData();
        this.renderDashboard();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const app = new QualityManagementSystem();
    app.init();
});
```

### **3. Testing y Validación**
```javascript
// tests/integration.test.js
describe('Sistema de Gestión de Calidad', () => {
    test('Upload de documentos funciona correctamente', async () => {
        const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
        const result = await uploader.uploadFile(file, 1, '1.1');
        expect(result).toBeDefined();
        expect(result.title).toBe('test.pdf');
    });

    test('Búsqueda retorna resultados correctos', async () => {
        const results = await search.searchDocuments({ searchTerm: 'test' });
        expect(Array.isArray(results)).toBe(true);
    });
});
```

## 📝 **CHECKLIST DE IMPLEMENTACIÓN**

### **Backend (Supabase)**
- [ ] Crear proyecto Supabase
- [ ] Configurar base de datos con todas las tablas
- [ ] Implementar Row Level Security
- [ ] Configurar Storage buckets
- [ ] Crear políticas de acceso
- [ ] Poblar datos iniciales (capítulos, subcapítulos)

### **Frontend**
- [ ] Estructura HTML semántica
- [ ] CSS con variables y componentes reutilizables
- [ ] JavaScript modular y bien documentado
- [ ] Sistema de autenticación
- [ ] Upload de archivos funcional
- [ ] Visualizador de documentos
- [ ] Formularios dinámicos
- [ ] Búsqueda y filtros avanzados
- [ ] Dashboard con métricas
- [ ] Sistema de notificaciones
- [ ] Responsive design

### **Funcionalidades Avanzadas**
- [ ] Impresión de documentos
- [ ] Exportación a PDF/Excel
- [ ] Sistema de permisos granular
- [ ] Analytics y reportes
- [ ] Notificaciones en tiempo real
- [ ] Modo offline básico
- [ ] PWA (Progressive Web App)

## 🎯 **RESULTADO ESPERADO**

Un sistema web completo, moderno y funcional que permita:

1. **Gestión completa de documentos** con upload, visualización, descarga e impresión
2. **Formularios dinámicos** completamente funcionales
3. **Búsqueda avanzada** con múltiples filtros
4. **Dashboard interactivo** con métricas en tiempo real
5. **Sistema de permisos** granular por roles
6. **Interfaz moderna** y responsive
7. **Integración completa** con Supabase
8. **Código limpio** y bien documentado

## 📞 **SOPORTE**

Para cualquier duda durante la implementación:
- Revisar la documentación de Supabase
- Consultar ejemplos en el repositorio
- Verificar logs del navegador para errores
- Probar funcionalidades paso a paso

---

**¡Con estas especificaciones, cualquier desarrollador puede crear un sistema de gestión de calidad profesional y completamente funcional!** 🚀
