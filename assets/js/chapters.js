/**
 * ========================================
 * GESTIÓN DE CAPÍTULOS
 * Sistema de Gestión de Calidad ASCH-OHLA
 * ========================================
 */

/**
 * Clase para manejar los 21 capítulos del sistema
 */
export class ChapterManager {
    constructor() {
        this.chapters = this.initializeChapters()
    }

    /**
     * Obtener datos de todos los capítulos
     * @returns {Object} - Objeto con todos los capítulos
     */
    getChaptersData() {
        return this.chapters
    }

    /**
     * Inicializar los 21 capítulos del sistema
     * @returns {Object} - Objeto con todos los capítulos
     */
    initializeChapters() {
        return {
            1: { 
                title: 'Sistema de Gestión de Documentos', 
                icon: 'fas fa-file-alt',
                description: 'Gestión integral de documentos del sistema de calidad',
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
                description: 'Planificación y ejecución de ensayos de calidad',
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
                description: 'Definición de objetivos y políticas de calidad',
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
                description: 'Programación de actividades y comunicaciones',
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
                description: 'Control y seguimiento de materiales',
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
                description: 'Definición de puntos de control e inspección',
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
                description: 'Gestión de equipos y maquinaria',
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
                description: 'Calibración y mantenimiento de equipos',
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
                description: 'Gestión de certificados de materiales',
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
                description: 'Gestión de no conformidades y acciones correctivas',
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
                description: 'Control de calidad y asistencia técnica',
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
                description: 'Cálculos estructurales y notas técnicas',
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
                description: 'Control geométrico y mediciones',
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
                description: 'Gestión y control de planos',
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
                description: 'Gestión de laboratorio y ensayos',
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
                description: 'Documentación general del sistema',
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
                description: 'Control económico y costos de calidad',
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
                description: 'Gestión de normativas y estándares',
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
                description: 'Pruebas finales y recepción',
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
                description: 'Planificación y ejecución de auditorías',
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
                description: 'Informes mensuales y reportes',
                subchapters: {
                    '21.1': 'Resumen de Actividades',
                    '21.2': 'Indicadores de Calidad',
                    '21.3': 'Análisis de Tendencias',
                    '21.4': 'Recomendaciones',
                    '21.5': 'Plan de Mejoras'
                }
            }
        }
    }

    /**
     * Obtener un capítulo específico
     * @param {number} chapterId - ID del capítulo
     * @returns {Object|null} - Capítulo o null si no existe
     */
    getChapter(chapterId) {
        return this.chapters[chapterId] || null
    }

    /**
     * Obtener todos los capítulos
     * @returns {Object} - Todos los capítulos
     */
    getAllChapters() {
        return this.chapters
    }

    /**
     * Renderizar sidebar con todos los capítulos
     * @returns {Promise<string>} - HTML del sidebar
     */
    async renderSidebar() {
        let html = ''
        
        for (const [id, chapter] of Object.entries(this.chapters)) {
            html += `
                <div class="chapter-item" data-chapter="${id}">
                    <div class="chapter-icon">
                        <i class="${chapter.icon}"></i>
                    </div>
                    <div class="chapter-title">${chapter.title}</div>
                    <div class="chapter-number">${id}</div>
                </div>
            `
        }
        
        return html
    }

    /**
     * Renderizar contenido de un capítulo específico
     * @param {number} chapterId - ID del capítulo
     * @returns {Promise<string>} - HTML del capítulo
     */
    async renderChapter(chapterId) {
        const chapter = this.getChapter(chapterId)
        if (!chapter) {
            return '<div class="error">Capítulo no encontrado</div>'
        }

        return `
            <div class="chapter-content">
                <div class="chapter-header">
                    <div class="chapter-title-section">
                        <div class="chapter-icon-large">
                            <i class="${chapter.icon}"></i>
                        </div>
                        <div class="chapter-info">
                            <h1 class="chapter-title">${chapter.title}</h1>
                            <p class="chapter-description">${chapter.description}</p>
                            <div class="chapter-number">Capítulo ${chapterId}</div>
                        </div>
                    </div>
                    <div class="chapter-actions">
                        <button class="btn btn-primary" data-action="upload">
                            <i class="fas fa-upload"></i>
                            Subir Documentos
                        </button>
                        <button class="btn btn-secondary" data-action="search">
                            <i class="fas fa-search"></i>
                            Buscar
                        </button>
                    </div>
                </div>

                <div class="chapter-subchapters">
                    <h2>Subcapítulos</h2>
                    <div class="subchapters-grid">
                        ${this.renderSubchapters(chapter.subchapters)}
                    </div>
                </div>

                <div class="chapter-documents">
                    <div class="documents-header">
                        <h2>Documentos del Capítulo</h2>
                        <div class="documents-actions">
                            <button class="btn btn-primary" data-action="upload-direct" data-chapter="${chapterId}">
                                <i class="fas fa-upload"></i>
                                Subir Documentos
                            </button>
                        </div>
                    </div>
                    
                    <!-- Área de Upload Integrada -->
                    <div class="integrated-upload-area" data-chapter="${chapterId}">
                        <div class="upload-zone">
                            <div class="upload-content">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <h3>Arrastra archivos aquí o haz clic para seleccionar</h3>
                                <p>Sube documentos directamente a este capítulo</p>
                                <div class="upload-types">
                                    <span class="file-type">PDF</span>
                                    <span class="file-type">Word</span>
                                    <span class="file-type">Excel</span>
                                    <span class="file-type">HTML</span>
                                    <span class="file-type">Imágenes</span>
                                </div>
                            </div>
                            <input type="file" class="upload-input" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.html,.htm,.jpg,.jpeg,.png,.gif">
                        </div>
                    </div>

                    <div class="documents-section">
                        <div class="search-container">
                            <div class="search-header">
                                <input type="text" class="search-input" placeholder="Buscar documentos...">
                                <button class="btn btn-primary">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                            <div class="search-filters">
                                <div class="filter-group">
                                    <label>Tipo</label>
                                    <select class="filter-select" data-filter="type">
                                        <option value="">Todos</option>
                                        <option value="pdf">PDF</option>
                                        <option value="word">Word</option>
                                        <option value="excel">Excel</option>
                                        <option value="html">HTML</option>
                                        <option value="image">Imagen</option>
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label>Subcapítulo</label>
                                    <select class="filter-select" data-filter="subchapter">
                                        <option value="">Todos</option>
                                        ${this.renderSubchapterOptions(chapter.subchapters)}
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label>Fecha</label>
                                    <select class="filter-select" data-filter="date">
                                        <option value="">Todas</option>
                                        <option value="today">Hoy</option>
                                        <option value="week">Esta semana</option>
                                        <option value="month">Este mes</option>
                                        <option value="year">Este año</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="documents-grid" id="documents-grid-${chapterId}">
                            <div class="loading">
                                <div class="loading-spinner"></div>
                                Cargando documentos...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    /**
     * Renderizar subcapítulos
     * @param {Object} subchapters - Objeto con subcapítulos
     * @param {number} chapterId - ID del capítulo padre
     * @returns {string} - HTML de los subcapítulos
     */
    renderSubchapters(subchapters, chapterId) {
        let html = ''
        
        for (const [id, title] of Object.entries(subchapters)) {
            html += `
                <div class="subchapter-card" data-subchapter="${id}" data-chapter="${chapterId}">
                    <div class="subchapter-header">
                        <div class="subchapter-number">${id}</div>
                        <div class="subchapter-title">${title}</div>
                    </div>
                    
                    <!-- Upload integrado en subcapítulo -->
                    <div class="subchapter-upload" data-subchapter="${id}" data-chapter="${chapterId}">
                        <div class="upload-zone-small">
                            <div class="upload-content-small">
                                <i class="fas fa-plus-circle"></i>
                                <span>Subir archivos</span>
                            </div>
                            <input type="file" class="upload-input-small" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.html,.htm,.jpg,.jpeg,.png,.gif">
                        </div>
                    </div>
                    
                    <!-- Documentos do subcapítulo -->
                    <div class="subchapter-documents" id="subchapter-documents-${id}">
                        <div class="loading">
                            <div class="loading-spinner"></div>
                            Carregando documentos...
                        </div>
                    </div>
                    
                    <div class="subchapter-actions">
                        <button class="btn btn-sm btn-primary" data-action="view-subchapter" data-subchapter="${id}">
                            <i class="fas fa-eye"></i>
                            Ver Documentos
                        </button>
                        <button class="btn btn-sm btn-secondary" data-action="upload-subchapter" data-subchapter="${id}">
                            <i class="fas fa-upload"></i>
                            Subir
                        </button>
                    </div>
                </div>
            `
        }
        
        return html
    }

    /**
     * Renderizar opciones de subcapítulos para filtro
     * @param {Object} subchapters - Objeto con subcapítulos
     * @returns {string} - HTML de las opciones
     */
    renderSubchapterOptions(subchapters) {
        let html = ''
        
        for (const [id, title] of Object.entries(subchapters)) {
            html += `<option value="${id}">${id} - ${title}</option>`
        }
        
        return html
    }

    /**
     * Renderizar contenido de un capítulo específico
     * @param {number} chapterId - ID del capítulo
     * @returns {string} - HTML del contenido
     */
    renderChapterContent(chapterId) {
        const chapter = this.chapters[chapterId]
        if (!chapter) {
            return '<p>Capítulo no encontrado.</p>'
        }

        return `
            <div class="chapter-detail fade-in-up">
                <div class="chapter-header-main">
                    <i class="${chapter.icon} chapter-icon-main"></i>
                    <h2>${chapter.title}</h2>
                </div>
                <p class="chapter-description">${chapter.description}</p>

                <div class="chapter-subchapters">
                    <h3>Subcapítulos</h3>
                    <div class="subchapters-grid">
                        ${this.renderSubchapters(chapter.subchapters, chapterId)}
                    </div>
                </div>

                <div class="chapter-documents">
                    <div class="documents-header">
                        <h2>Documentos del Capítulo</h2>
                        <div class="documents-actions">
                            <button class="btn btn-primary" data-action="upload-direct" data-chapter="${chapterId}">
                                <i class="fas fa-upload"></i>
                                Subir Documentos
                            </button>
                        </div>
                    </div>
                    
                    <!-- Área de Upload Integrada -->
                    <div class="integrated-upload-area" data-chapter="${chapterId}">
                        <div class="upload-zone">
                            <div class="upload-content">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <h3>Arrastra archivos aquí o haz clic para seleccionar</h3>
                                <p>Sube documentos directamente a este capítulo</p>
                                <div class="upload-types">
                                    <span class="file-type">PDF</span>
                                    <span class="file-type">Word</span>
                                    <span class="file-type">Excel</span>
                                    <span class="file-type">HTML</span>
                                    <span class="file-type">Imágenes</span>
                                </div>
                            </div>
                            <input type="file" class="upload-input" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.html,.htm,.jpg,.jpeg,.png,.gif">
                        </div>
                    </div>

                    <div class="documents-section">
                        <div class="search-container">
                            <div class="search-header">
                                <input type="text" class="search-input" placeholder="Buscar documentos...">
                                <button class="btn btn-primary">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                            <div class="search-filters">
                                <div class="filter-group">
                                    <label>Tipo</label>
                                    <select class="filter-select" data-filter="type">
                                        <option value="">Todos</option>
                                        <option value="pdf">PDF</option>
                                        <option value="word">Word</option>
                                        <option value="excel">Excel</option>
                                        <option value="html">HTML</option>
                                        <option value="image">Imagen</option>
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label>Subcapítulo</label>
                                    <select class="filter-select" data-filter="subchapter">
                                        <option value="">Todos</option>
                                        ${this.renderSubchapterOptions(chapter.subchapters)}
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label>Fecha</label>
                                    <select class="filter-select" data-filter="date">
                                        <option value="">Todas</option>
                                        <option value="today">Hoy</option>
                                        <option value="week">Esta semana</option>
                                        <option value="month">Este mes</option>
                                        <option value="year">Este año</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="documents-grid" id="documents-grid-${chapterId}">
                            <div class="loading">
                                <div class="loading-spinner"></div>
                                Cargando documentos...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    /**
     * Cargar documentos de un capítulo específico
     * @param {number} chapterId - ID del capítulo
     * @param {Object} supabase - Cliente Supabase
     */
    async loadChapterDocuments(chapterId, supabase) {
        try {
            console.log(`📁 Carregando documentos do capítulo ${chapterId}`)
            
            const { data: documents, error } = await supabase
                .from('documents')
                .select('*')
                .eq('chapter_id', chapterId)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('❌ Erro ao carregar documentos:', error)
                return []
            }

            console.log(`✅ ${documents.length} documentos encontrados para o capítulo ${chapterId}`)
            return documents || []
        } catch (error) {
            console.error('❌ Erro inesperado ao carregar documentos:', error)
            return []
        }
    }

    /**
     * Cargar documentos de un subcapítulo específico
     * @param {string} subchapterId - ID del subcapítulo
     * @param {Object} supabase - Cliente Supabase
     */
    async loadSubchapterDocuments(subchapterId, supabase) {
        try {
            console.log(`📁 Carregando documentos do subcapítulo ${subchapterId}`)
            
            // Buscar documentos que tenham o subcapítulo no título
            const { data: documents, error } = await supabase
                .from('documents')
                .select('*')
                .like('title', `[${subchapterId}]%`)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('❌ Erro ao carregar documentos do subcapítulo:', error)
                return []
            }

            console.log(`✅ ${documents.length} documentos encontrados para o subcapítulo ${subchapterId}`)
            return documents || []
        } catch (error) {
            console.error('❌ Erro inesperado ao carregar documentos do subcapítulo:', error)
            return []
        }
    }

    /**
     * Renderizar documentos de un capítulo
     * @param {Array} documents - Array de documentos
     * @returns {string} - HTML dos documentos
     */
    renderChapterDocuments(documents) {
        if (!documents || documents.length === 0) {
            return `
                <div class="no-documents">
                    <div class="no-documents-icon">
                        <i class="fas fa-folder-open"></i>
                    </div>
                    <h3>Nenhum documento encontrado</h3>
                    <p>Faça upload de documentos para este capítulo</p>
                </div>
            `
        }

        let html = ''
        documents.forEach(doc => {
            const fileIcon = this.getFileIcon(doc.file_type)
            const fileSize = this.formatFileSize(doc.file_size)
            const uploadDate = new Date(doc.created_at).toLocaleDateString('pt-PT')
            
            // Remover prefixo do subcapítulo do título para exibição
            let displayTitle = doc.title
            if (displayTitle.startsWith('[') && displayTitle.includes('] ')) {
                displayTitle = displayTitle.substring(displayTitle.indexOf('] ') + 2)
            }

            html += `
                <div class="document-card" data-document-id="${doc.id}">
                    <div class="document-header">
                        <div class="document-icon">
                            <i class="${fileIcon}"></i>
                        </div>
                        <div class="document-info">
                            <h4 class="document-title">${displayTitle}</h4>
                            <p class="document-meta">
                                <span class="file-type">${doc.file_type.toUpperCase()}</span>
                                <span class="file-size">${fileSize}</span>
                                <span class="upload-date">${uploadDate}</span>
                            </p>
                        </div>
                    </div>
                    <div class="document-actions">
                        <button class="btn btn-sm btn-primary" data-action="view" data-document-id="${doc.id}">
                            <i class="fas fa-eye"></i>
                            Ver
                        </button>
                        <button class="btn btn-sm btn-secondary" data-action="download" data-document-id="${doc.id}">
                            <i class="fas fa-download"></i>
                            Baixar
                        </button>
                        <button class="btn btn-sm btn-danger" data-action="delete" data-document-id="${doc.id}">
                            <i class="fas fa-trash"></i>
                            Apagar
                        </button>
                    </div>
                </div>
            `
        })

        return html
    }

    /**
     * Obter ícone do tipo de arquivo
     * @param {string} fileType - Tipo do arquivo
     * @returns {string} - Classe do ícone
     */
    getFileIcon(fileType) {
        const icons = {
            'pdf': 'fas fa-file-pdf',
            'word': 'fas fa-file-word',
            'excel': 'fas fa-file-excel',
            'html': 'fas fa-file-code',
            'image': 'fas fa-file-image',
            'text': 'fas fa-file-alt'
        }
        return icons[fileType] || 'fas fa-file'
    }

    /**
     * Formatar tamanho do arquivo
     * @param {number} bytes - Tamanho em bytes
     * @returns {string} - Tamanho formatado
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    /**
     * Obtener estadísticas de capítulos
     * @returns {Object} - Estadísticas
     */
    getChapterStats() {
        const totalChapters = Object.keys(this.chapters).length
        let totalSubchapters = 0
        
        for (const chapter of Object.values(this.chapters)) {
            totalSubchapters += Object.keys(chapter.subchapters).length
        }
        
        return {
            totalChapters,
            totalSubchapters,
            completedChapters: 0, // Se calculará dinámicamente
            completionRate: 0 // Se calculará dinámicamente
        }
    }
}
