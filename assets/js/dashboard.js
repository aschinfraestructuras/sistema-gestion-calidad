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
                <div class="dashboard-layout">
                    <div class="dashboard-header">
                        <h1>Dashboard - Sistema de Gestión de Calidad</h1>
                        <p>Bienvenido al portal de documentos ASCH-OHLA</p>
                    </div>

                    <div class="dashboard-content">
                        <div class="dashboard-main">
                            <div class="dashboard-grid">
                                ${this.renderMetricCards(stats)}
                            </div>

                            <div class="dashboard-section">
                                <div class="section-header">
                                    <h2>Documentos Recientes</h2>
                                    <button class="btn btn-primary" data-action="upload">
                                        <i class="fas fa-upload"></i>
                                        Subir Documentos
                                    </button>
                                </div>
                                <div class="recent-documents">
                                    ${this.renderRecentDocuments(recentDocuments)}
                                </div>
                            </div>
                        </div>

                        <div class="dashboard-sidebar">
                            <div class="dashboard-section">
                                <div class="section-header">
                                    <h2>Cronograma del Proyecto</h2>
                                    <span class="project-status">En Ejecución</span>
                                </div>
                                <div class="project-timeline">
                                    ${this.renderTimeline(timeline)}
                                </div>
                            </div>

                            <div class="dashboard-section">
                                <div class="section-header">
                                    <h2>Acceso Rápido a Capítulos</h2>
                                </div>
                                <div class="quick-chapters">
                                    ${this.renderQuickChapters()}
                                </div>
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
                    </div>
                    <div class="document-item-actions">
                        <button class="btn btn-sm btn-primary" data-action="view" data-document-id="${doc.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary" data-action="download" data-document-id="${doc.id}">
                            <i class="fas fa-download"></i>
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
            { id: 1, title: 'Gestión de Documentos', icon: 'fas fa-file-alt' },
            { id: 2, title: 'Ensayos y Controles', icon: 'fas fa-flask' },
            { id: 3, title: 'Política de Calidad', icon: 'fas fa-bullseye' },
            { id: 4, title: 'Programación', icon: 'fas fa-calendar-alt' },
            { id: 5, title: 'Trazabilidad', icon: 'fas fa-boxes' }
        ]

        let html = '<div class="quick-chapters-grid">'
        
        quickChapters.forEach(chapter => {
            html += `
                <div class="quick-chapter-card" data-chapter="${chapter.id}">
                    <div class="chapter-icon">
                        <i class="${chapter.icon}"></i>
                    </div>
                    <div class="chapter-title">${chapter.title}</div>
                    <div class="chapter-number">Capítulo ${chapter.id}</div>
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
