/**
 * ========================================
 * DASHBOARD Y MÉTRICAS
 * Sistema de Gestión de Calidad ASCH-OHLA
 * ========================================
 */

/**
 * Clase para manejar el dashboard
 */
export class DashboardManager {
    constructor(supabase) {
        this.supabase = supabase
    }

    /**
     * Renderizar dashboard principal
     * @returns {Promise<string>} - HTML del dashboard
     */
    async render() {
        try {
            const stats = await this.getDashboardStats()
            const recentDocuments = await this.getRecentDocuments()
            const timeline = this.getProjectTimeline()

        return `
            <div class="dashboard-container">
                <div class="dashboard-header">
                    <h1>Dashboard - Sistema de Gestión de Calidad</h1>
                    <p>Bienvenido al portal de documentos ASCH-OHLA</p>
                </div>

                <div class="dashboard-content" style="height: calc(100vh - 200px); overflow-y: auto;">
                        <!-- Información de la Obra -->
                        <div class="info-section">
                            <h2>Información de la Obra</h2>
                            <div class="info-grid">
                                <div class="info-card">
                                    <div class="info-icon">
                                        <i class="fas fa-road"></i>
                                    </div>
                                    <div class="info-content">
                                        <h3>Autovía A-11</h3>
                                        <p>Tramo: Variante de Langa de Duero - Variante de Aranda de Duero</p>
                                    </div>
                                </div>
                                <div class="info-card">
                                    <div class="info-icon">
                                        <i class="fas fa-handshake"></i>
                                    </div>
                                    <div class="info-content">
                                        <h3>UTE A11 LANGA-ARANDA</h3>
                                        <p>Contratista: OHLA - ASCH</p>
                                    </div>
                                </div>
                                <div class="info-card">
                                    <div class="info-icon">
                                        <i class="fas fa-calendar-check"></i>
                                    </div>
                                    <div class="info-content">
                                        <h3>Estado del Proyecto</h3>
                                        <p>En ejecución • Fase: Construcción</p>
                                    </div>
                                </div>
                                <div class="info-card">
                                    <div class="info-icon">
                                        <i class="fas fa-user-tie"></i>
                                    </div>
                                    <div class="info-content">
                                        <h3>Responsable de Calidad</h3>
                                        <p>José Antunes • Técnico de Calidad</p>
                                    </div>
                                </div>
                                <div class="info-card">
                                    <div class="info-icon">
                                        <i class="fas fa-hard-hat"></i>
                                    </div>
                                    <div class="info-content">
                                        <h3>Jefe de Obra</h3>
                                        <p>Pedro Maillo • Director de Obra</p>
                                    </div>
                                </div>
                                <div class="info-card">
                                    <div class="info-icon">
                                        <i class="fas fa-user-cog"></i>
                                    </div>
                                    <div class="info-content">
                                        <h3>Gerente</h3>
                                        <p>Isaac López Brea • Gerente de Proyecto</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Cronograma del Proyecto -->
                        <div class="timeline-section">
                            <h2>Cronograma del Proyecto</h2>
                            <div class="timeline-container">
                                <div class="timeline-dates">
                                    <span class="timeline-start">Inicio: Feb 2023</span>
                                    <span class="timeline-middle">marzo de 2025</span>
                                    <span class="timeline-end">Fin: lunes, 28 de septiembre de 2026</span>
                                </div>
                                <div class="timeline-bar">
                                    <div class="timeline-progress" style="width: 20%"></div>
                                </div>
                                <div class="timeline-stats">
                                    <span>20% completado</span>
                                    <span>7.5 meses (26.5 meses restantes)</span>
                                    <span>de 37 legajos (máx. 50)</span>
                                </div>
                            </div>
                        </div>

                        <!-- Métricas -->
                        <div class="metrics-section">
                            <div class="metrics-grid">
                                <div class="metric-card">
                                    <div class="metric-icon">
                                        <i class="fas fa-file-alt"></i>
                                    </div>
                                    <div class="metric-value">21</div>
                                    <div class="metric-label">Capítulos de Calidad</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-icon">
                                        <i class="fas fa-folder"></i>
                                    </div>
                                    <div class="metric-value">141</div>
                                    <div class="metric-label">Subcapítulos</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-icon">
                                        <i class="fas fa-document"></i>
                                    </div>
                                    <div class="metric-value">0</div>
                                    <div class="metric-label">Documentos Totales</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-icon">
                                        <i class="fas fa-upload"></i>
                                    </div>
                                    <div class="metric-value">0</div>
                                    <div class="metric-label">Documentos Subidos</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-icon">
                                        <i class="fas fa-calendar-week"></i>
                                    </div>
                                    <div class="metric-value">0</div>
                                    <div class="metric-label">Esta Semana</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-icon">
                                        <i class="fas fa-check-circle"></i>
                                    </div>
                                    <div class="metric-value">0</div>
                                    <div class="metric-label">Capítulos Completados</div>
                                </div>
                                <div class="metric-card">
                                    <div class="metric-icon">
                                        <i class="fas fa-percentage"></i>
                                    </div>
                                    <div class="metric-value">0%</div>
                                    <div class="metric-label">Tasa de Completitud</div>
                                </div>
                            </div>
                        </div>

                        <!-- Documentos Favoritos -->
                        <div class="documents-section">
                            <h2>Documentos Favoritos</h2>
                            <div class="empty-state">
                                <i class="fas fa-star"></i>
                                <p>No hay documentos favoritos</p>
                                <small>Haz clic en la estrella de un documento para añadirlo a favoritos</small>
                            </div>
                        </div>

                        <!-- Documentos Recientes -->
                        <div class="documents-section">
                            <h2>Documentos Vistos Recientemente</h2>
                            <div class="empty-state">
                                <p>No hay documentos subidos recientemente</p>
                                <button class="btn btn-primary" data-action="upload">
                                    <i class="fas fa-upload"></i>
                                    Subir Documento
                                </button>
                            </div>
                        </div>

                        <!-- Acciones Rápidas -->
                        <div class="actions-section">
                            <h2>Acciones Rápidas</h2>
                            <div class="actions-grid">
                                <button class="action-btn" data-action="view-chapter" data-chapter="1">
                                    <i class="fas fa-folder"></i>
                                    Ver Capítulo 01
                                </button>
                                <button class="action-btn" data-action="view-chapter" data-chapter="6">
                                    <i class="fas fa-search"></i>
                                    Ver PPI (Cap. 06)
                                </button>
                                <button class="action-btn" data-action="view-chapter" data-chapter="15">
                                    <i class="fas fa-flask"></i>
                                    Ver Laboratorio (Cap. 15)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        } catch (error) {
            console.error('Error al renderizar dashboard:', error)
            return '<div class="error">Error al cargar el dashboard</div>'
        }
    }

    /**
     * Obtener estadísticas del dashboard
     * @returns {Promise<Object>} - Estadísticas
     */
    async getDashboardStats() {
        try {
            // Obtener estadísticas de documentos
            const { data: documents, error: docsError } = await this.supabase
                .from('documents')
                .select('id, created_at, file_type')

            if (docsError) {
                console.error('Error al obtener documentos:', docsError)
            }

            const totalDocuments = documents ? documents.length : 0
            const today = new Date()
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
            
            const weeklyDocuments = documents ? documents.filter(doc => 
                new Date(doc.created_at) >= weekAgo
            ).length : 0

            // Calcular estadísticas por tipo
            const typeStats = {}
            if (documents) {
                documents.forEach(doc => {
                    typeStats[doc.file_type] = (typeStats[doc.file_type] || 0) + 1
                })
            }

            return {
                totalDocuments,
                weeklyDocuments,
                completedChapters: 0, // Se calculará dinámicamente
                completionRate: 0, // Se calculará dinámicamente
                typeStats
            }
        } catch (error) {
            console.error('Error al obtener estadísticas:', error)
            return {
                totalDocuments: 0,
                weeklyDocuments: 0,
                completedChapters: 0,
                completionRate: 0,
                typeStats: {}
            }
        }
    }

    /**
     * Obtener documentos recientes
     * @returns {Promise<Array>} - Documentos recientes
     */
    async getRecentDocuments() {
        try {
            const { data, error } = await this.supabase
                .from('documents')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5)

            if (error) {
                console.error('Error al obtener documentos recientes:', error)
                return []
            }

            return data || []
        } catch (error) {
            console.error('Error al obtener documentos recientes:', error)
            return []
        }
    }

    /**
     * Obtener cronograma del proyecto
     * @returns {Array} - Timeline del proyecto
     */
    getProjectTimeline() {
        return [
            {
                id: 1,
                title: 'Inicio del Proyecto',
                date: 'Febrero 2025',
                status: 'completed',
                description: 'Inicio de la construcción de la Autovía A-11'
            },
            {
                id: 2,
                title: 'Fase Actual',
                date: 'Septiembre 2025',
                status: 'current',
                description: 'Construcción en curso - 20% completado',
                progress: 20
            },
            {
                id: 3,
                title: 'Finalización',
                date: 'Marzo 2028',
                status: 'pending',
                description: 'Entrega final del proyecto'
            }
        ]
    }

    /**
     * Renderizar tarjetas de métricas
     * @param {Object} stats - Estadísticas
     * @returns {string} - HTML de las tarjetas
     */
    renderMetricCards(stats) {
        return `
            <div class="metric-card">
                <div class="metric-header">
                    <div class="metric-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                </div>
                <div class="metric-value">${stats.totalDocuments}</div>
                <div class="metric-label">Documentos Totales</div>
                <div class="metric-change positive">
                    <i class="fas fa-arrow-up"></i>
                    +${stats.weeklyDocuments} esta semana
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-header">
                    <div class="metric-icon">
                        <i class="fas fa-calendar-week"></i>
                    </div>
                </div>
                <div class="metric-value">${stats.weeklyDocuments}</div>
                <div class="metric-label">Esta Semana</div>
                <div class="metric-change ${stats.weeklyDocuments > 0 ? 'positive' : 'neutral'}">
                    <i class="fas fa-${stats.weeklyDocuments > 0 ? 'arrow-up' : 'minus'}"></i>
                    ${stats.weeklyDocuments > 0 ? 'Actividad reciente' : 'Sin actividad'}
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-header">
                    <div class="metric-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <div class="metric-value">${stats.completedChapters}</div>
                <div class="metric-label">Capítulos Completados</div>
                <div class="metric-change neutral">
                    <i class="fas fa-chart-line"></i>
                    ${stats.completionRate}% completado
                </div>
            </div>

            <div class="metric-card">
                <div class="metric-header">
                    <div class="metric-icon">
                        <i class="fas fa-chart-pie"></i>
                    </div>
                </div>
                <div class="metric-value">${Object.keys(stats.typeStats).length}</div>
                <div class="metric-label">Tipos de Archivo</div>
                <div class="metric-change neutral">
                    <i class="fas fa-folder"></i>
                    Variedad de documentos
                </div>
            </div>
        `
    }

    /**
     * Renderizar documentos recientes
     * @param {Array} documents - Documentos recientes
     * @returns {string} - HTML de los documentos
     */
    renderRecentDocuments(documents) {
        if (documents.length === 0) {
            return `
                <div class="no-documents">
                    <i class="fas fa-inbox"></i>
                    <h3>No hay documentos recientes</h3>
                    <p>Sube tu primer documento para comenzar</p>
                    <button class="btn btn-primary" data-action="upload">
                        <i class="fas fa-upload"></i>
                        Subir Documento
                    </button>
                </div>
            `
        }

        let html = '<div class="documents-list">'
        
        documents.forEach(doc => {
            const uploadDate = new Date(doc.created_at).toLocaleDateString()
            const fileSize = this.formatFileSize(doc.file_size)
            const timeAgo = this.getTimeAgo(doc.created_at)
            
            html += `
                <div class="document-item" data-document-id="${doc.id}">
                    <div class="document-item-icon ${doc.file_type}">
                        <i class="${this.getFileIcon(doc.file_type)}"></i>
                    </div>
                    <div class="document-item-content">
                        <div class="document-item-title">${doc.title}</div>
                        <div class="document-item-meta">
                            <span><i class="fas fa-calendar"></i> ${uploadDate}</span>
                            <span><i class="fas fa-weight"></i> ${fileSize}</span>
                            <span><i class="fas fa-tag"></i> ${doc.file_type.toUpperCase()}</span>
                        </div>
                        <div class="document-item-time">
                            <i class="fas fa-clock"></i> ${timeAgo}
                        </div>
                    </div>
                    <div class="document-item-actions">
                        <button class="btn btn-sm btn-primary" data-action="view" data-document-id="${doc.id}" title="Ver documento">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary" data-action="download" data-document-id="${doc.id}" title="Descargar documento">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn btn-sm btn-info" data-action="print" data-document-id="${doc.id}" title="Imprimir documento">
                            <i class="fas fa-print"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" data-action="remove-from-list" data-document-id="${doc.id}" title="Remover da lista">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `
        })
        
        html += '</div>'
        return html
    }

    /**
     * Renderizar timeline
     * @param {Array} timeline - Timeline del proyecto
     * @returns {string} - HTML del timeline
     */
    renderTimeline(timeline) {
        let html = '<div class="timeline">'
        
        timeline.forEach((item, index) => {
            const isLast = index === timeline.length - 1
            const markerClass = item.status === 'completed' ? 'completed' : 
                               item.status === 'current' ? 'current' : ''
            
            html += `
                <div class="timeline-item">
                    <div class="timeline-marker ${markerClass}">
                        ${item.status === 'completed' ? '<i class="fas fa-check"></i>' : 
                          item.status === 'current' ? '<i class="fas fa-play"></i>' : 
                          (index + 1)}
                    </div>
                    <div class="timeline-content">
                        <div class="timeline-title">${item.title}</div>
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-description">${item.description}</div>
                        ${item.progress ? `
                            <div class="timeline-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${item.progress}%"></div>
                                </div>
                                <div class="progress-text">${item.progress}% completado</div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `
        })
        
        html += '</div>'
        return html
    }

    /**
     * Renderizar acceso rápido a capítulos
     * @returns {string} - HTML de los capítulos
     */
    renderQuickChapters() {
        const quickChapters = [
            { id: 1, title: 'Gestión de Documentos', icon: 'fas fa-file-alt', color: '#667eea', description: 'Documentos del sistema' },
            { id: 2, title: 'Ensayos y Controles', icon: 'fas fa-flask', color: '#f093fb', description: 'Laboratorio y pruebas' },
            { id: 3, title: 'Política de Calidad', icon: 'fas fa-bullseye', color: '#4facfe', description: 'Normas y políticas' },
            { id: 4, title: 'Programación', icon: 'fas fa-calendar-alt', color: '#43e97b', description: 'Cronogramas' },
            { id: 5, title: 'Trazabilidad', icon: 'fas fa-boxes', color: '#fa709a', description: 'Seguimiento' },
            { id: 6, title: 'Auditorías', icon: 'fas fa-search', color: '#ffecd2', description: 'Inspecciones' },
            { id: 7, title: 'Formación', icon: 'fas fa-graduation-cap', color: '#a8edea', description: 'Capacitación' },
            { id: 8, title: 'Mejora Continua', icon: 'fas fa-chart-line', color: '#d299c2', description: 'Optimización' }
        ]

        let html = '<div class="quick-chapters-grid">'
        
        quickChapters.forEach(chapter => {
            html += `
                <div class="quick-chapter-card" data-chapter="${chapter.id}">
                    <div class="chapter-icon">
                        <i class="${chapter.icon}"></i>
                    </div>
                    <div class="chapter-content">
                        <h4 class="chapter-title">${chapter.title}</h4>
                        <p class="chapter-description">${chapter.description}</p>
                        <div class="chapter-number">Capítulo ${chapter.id}</div>
                    </div>
                    <div class="chapter-action">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            `
        })
        
        html += '</div>'
        return html
    }

    /**
     * Formatear tamaño de archivo
     * @param {number} bytes - Tamaño en bytes
     * @returns {string} - Tamaño formateado
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes'
        
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    /**
     * Obtener tiempo transcurrido
     * @param {string} dateString - Fecha en string
     * @returns {string} - Tiempo transcurrido
     */
    getTimeAgo(dateString) {
        const now = new Date()
        const date = new Date(dateString)
        const diffInSeconds = Math.floor((now - date) / 1000)
        
        if (diffInSeconds < 60) return 'Hace un momento'
        if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`
        if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`
        if (diffInSeconds < 2592000) return `Hace ${Math.floor(diffInSeconds / 86400)} días`
        
        return date.toLocaleDateString()
    }

    /**
     * Obtener icono para tipo de archivo
     * @param {string} fileType - Tipo de archivo
     * @returns {string} - Clase de icono
     */
    getFileIcon(fileType) {
        const iconMap = {
            'pdf': 'fas fa-file-pdf',
            'word': 'fas fa-file-word',
            'excel': 'fas fa-file-excel',
            'html': 'fas fa-file-code',
            'image': 'fas fa-file-image',
            'unknown': 'fas fa-file'
        }
        
        return iconMap[fileType] || iconMap.unknown
    }
}
