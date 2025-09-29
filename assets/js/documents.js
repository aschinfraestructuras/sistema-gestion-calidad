/**
 * ========================================
 * GESTIÓN DE DOCUMENTOS
 * Sistema de Gestión de Calidad ASCH-OHLA
 * ========================================
 */

import { 
    supabase, 
    STORAGE_CONFIG, 
    validateFileType, 
    validateFileSize, 
    getFileType, 
    getFileIcon, 
    formatFileSize, 
    generateUniqueFileName,
    getPublicUrl,
    getSignedUrl
} from './supabase.js'

/**
 * Clase para manejar documentos
 */
export class DocumentManager {
    constructor(supabase) {
        this.supabase = supabase
        this.currentDocument = null
    }

    /**
     * Obtener documento por ID
     * @param {string} documentId - ID del documento
     * @returns {Promise<Object|null>} - Documento o null
     */
    async getDocument(documentId) {
        try {
            const { data, error } = await this.supabase
                .from('documents')
                .select('*')
                .eq('id', documentId)
                .single()

            if (error) {
                console.error('Error al obtener documento:', error)
                return null
            }

            return data
        } catch (error) {
            console.error('Error al obtener documento:', error)
            return null
        }
    }

    /**
     * Obtener documentos por capítulo
     * @param {number} chapterId - ID del capítulo
     * @returns {Promise<Array>} - Lista de documentos
     */
    async getDocumentsByChapter(chapterId) {
        try {
            const { data, error } = await this.supabase
                .from('documents')
                .select('*')
                .eq('chapter_id', chapterId)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error al obtener documentos:', error)
                return []
            }

            return data || []
        } catch (error) {
            console.error('Error al obtener documentos:', error)
            return []
        }
    }

    /**
     * Subir archivos
     * @param {Array} files - Array de archivos
     * @param {number} chapterId - ID del capítulo
     * @returns {Promise<Array>} - Resultados del upload
     */
    async uploadFiles(files, chapterId) {
        const results = []
        
        for (const file of files) {
            try {
                // Validar archivo
                if (!validateFileType(file)) {
                    results.push({
                        file: file.name,
                        success: false,
                        error: 'Tipo de archivo no permitido'
                    })
                    continue
                }

                if (!validateFileSize(file)) {
                    results.push({
                        file: file.name,
                        success: false,
                        error: 'Archivo demasiado grande (máximo 50MB)'
                    })
                    continue
                }

                // Generar nombre único
                const fileName = generateUniqueFileName(file.name)
                const filePath = `documents/${fileName}`

                // Subir a Storage
                const { data: uploadData, error: uploadError } = await this.supabase.storage
                    .from(STORAGE_CONFIG.bucket)
                    .upload(filePath, file)

                if (uploadError) {
                    results.push({
                        file: file.name,
                        success: false,
                        error: uploadError.message
                    })
                    continue
                }

                // Guardar metadatos en BD
                const { data: docData, error: docError } = await this.supabase
                    .from('documents')
                    .insert({
                        title: file.name,
                        file_name: fileName,
                        file_path: filePath,
                        file_size: file.size,
                        file_type: getFileType(file.type),
                        mime_type: file.type,
                        chapter_id: chapterId,
                        uploaded_by: 'user-001' // Temporal
                    })

                if (docError) {
                    // Eliminar archivo subido si falla la BD
                    await this.supabase.storage
                        .from(STORAGE_CONFIG.bucket)
                        .remove([filePath])
                    
                    results.push({
                        file: file.name,
                        success: false,
                        error: docError.message
                    })
                    continue
                }

                results.push({
                    file: file.name,
                    success: true,
                    document: docData[0]
                })

            } catch (error) {
                console.error('Error al subir archivo:', error)
                results.push({
                    file: file.name,
                    success: false,
                    error: error.message
                })
            }
        }

        return results
    }

    /**
     * Descargar documento
     * @param {string} documentId - ID del documento
     * @returns {Promise<boolean>} - True si fue exitoso
     */
    async downloadDocument(documentId) {
        try {
            const document = await this.getDocument(documentId)
            if (!document) {
                throw new Error('Documento no encontrado')
            }

            // Obtener URL firmada para descarga
            const signedUrl = await getSignedUrl(document.file_path)
            if (!signedUrl) {
                throw new Error('Error al generar URL de descarga')
            }

            // Crear enlace de descarga
            const link = document.createElement('a')
            link.href = signedUrl
            link.download = document.title
            link.target = '_blank'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            return true
        } catch (error) {
            console.error('Error al descargar documento:', error)
            return false
        }
    }

    /**
     * Eliminar documento
     * @param {string} documentId - ID del documento
     * @returns {Promise<boolean>} - True si fue exitoso
     */
    async deleteDocument(documentId) {
        try {
            const document = await this.getDocument(documentId)
            if (!document) {
                throw new Error('Documento no encontrado')
            }

            // Eliminar de Storage
            const { error: storageError } = await this.supabase.storage
                .from(STORAGE_CONFIG.bucket)
                .remove([document.file_path])

            if (storageError) {
                console.error('Error al eliminar archivo de Storage:', storageError)
            }

            // Eliminar de BD
            const { error: dbError } = await this.supabase
                .from('documents')
                .delete()
                .eq('id', documentId)

            if (dbError) {
                throw new Error(dbError.message)
            }

            return true
        } catch (error) {
            console.error('Error al eliminar documento:', error)
            return false
        }
    }

    /**
     * Buscar documentos
     * @param {string} query - Término de búsqueda
     * @returns {Promise<Array>} - Resultados de búsqueda
     */
    async searchDocuments(query) {
        try {
            const { data, error } = await this.supabase
                .from('documents')
                .select('*')
                .or(`title.ilike.%${query}%,file_name.ilike.%${query}%`)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error en búsqueda:', error)
                return []
            }

            return data || []
        } catch (error) {
            console.error('Error en búsqueda:', error)
            return []
        }
    }

    /**
     * Filtrar documentos
     * @param {string} filterType - Tipo de filtro
     * @param {string} filterValue - Valor del filtro
     * @returns {Promise<Array>} - Documentos filtrados
     */
    async filterDocuments(filterType, filterValue) {
        try {
            let query = this.supabase
                .from('documents')
                .select('*')

            switch (filterType) {
                case 'type':
                    query = query.eq('file_type', filterValue)
                    break
                case 'subchapter':
                    query = query.eq('subchapter_id', filterValue)
                    break
                case 'date':
                    const dateFilter = this.getDateFilter(filterValue)
                    if (dateFilter) {
                        query = query.gte('created_at', dateFilter)
                    }
                    break
            }

            const { data, error } = await query.order('created_at', { ascending: false })

            if (error) {
                console.error('Error en filtro:', error)
                return []
            }

            return data || []
        } catch (error) {
            console.error('Error en filtro:', error)
            return []
        }
    }

    /**
     * Obtener filtro de fecha
     * @param {string} dateValue - Valor de fecha
     * @returns {string|null} - Fecha ISO o null
     */
    getDateFilter(dateValue) {
        const now = new Date()
        
        switch (dateValue) {
            case 'today':
                return new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
            case 'week':
                return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
            case 'month':
                return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
            case 'year':
                return new Date(now.getFullYear(), 0, 1).toISOString()
            default:
                return null
        }
    }

    /**
     * Renderizar visualizador de documento
     * @param {Object} document - Documento a visualizar
     * @returns {string} - HTML del visualizador
     */
    renderViewer(document) {
        this.currentDocument = document
        const fileType = document.file_type
        const publicUrl = getPublicUrl(document.file_path)

        switch (fileType) {
            case 'pdf':
                return this.renderPDFViewer(publicUrl, document)
            case 'html':
                return this.renderHTMLViewer(publicUrl, document)
            case 'image':
                return this.renderImageViewer(publicUrl, document)
            default:
                return this.renderGenericViewer(publicUrl, document)
        }
    }

    /**
     * Renderizar visualizador de PDF
     * @param {string} url - URL del archivo
     * @param {Object} document - Documento
     * @returns {string} - HTML del visualizador
     */
    renderPDFViewer(url, document) {
        return `
            <div class="pdf-viewer">
                <iframe 
                    src="${url}" 
                    width="100%" 
                    height="100%" 
                    style="border: none; min-height: 600px;"
                    title="${document.title}">
                </iframe>
            </div>
        `
    }

    /**
     * Renderizar visualizador de HTML
     * @param {string} url - URL del archivo
     * @param {Object} document - Documento
     * @returns {string} - HTML del visualizador
     */
    renderHTMLViewer(url, document) {
        return `
            <div class="html-viewer">
                <iframe 
                    src="${url}" 
                    width="100%" 
                    height="100%" 
                    style="border: none; min-height: 600px;"
                    title="${document.title}">
                </iframe>
            </div>
        `
    }

    /**
     * Renderizar visualizador de imagen
     * @param {string} url - URL del archivo
     * @param {Object} document - Documento
     * @returns {string} - HTML del visualizador
     */
    renderImageViewer(url, document) {
        return `
            <div class="image-viewer">
                <img 
                    src="${url}" 
                    alt="${document.title}" 
                    style="max-width: 100%; height: auto; display: block; margin: 0 auto;"
                    onclick="zoomImage(this)">
                <div class="image-controls">
                    <button class="btn btn-sm btn-secondary" onclick="zoomIn()">
                        <i class="fas fa-search-plus"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="zoomOut()">
                        <i class="fas fa-search-minus"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="resetZoom()">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </button>
                </div>
            </div>
        `
    }

    /**
     * Renderizar visualizador genérico
     * @param {string} url - URL del archivo
     * @param {Object} document - Documento
     * @returns {string} - HTML del visualizador
     */
    renderGenericViewer(url, document) {
        return `
            <div class="generic-viewer">
                <div class="viewer-info">
                    <div class="file-icon">
                        <i class="${getFileIcon(document.file_type)}"></i>
                    </div>
                    <div class="file-details">
                        <h3>${document.title}</h3>
                        <p>Tipo: ${document.file_type.toUpperCase()}</p>
                        <p>Tamaño: ${formatFileSize(document.file_size)}</p>
                        <p>Subido: ${new Date(document.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
                <div class="viewer-actions">
                    <a href="${url}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i>
                        Abrir en nueva pestaña
                    </a>
                </div>
            </div>
        `
    }

    /**
     * Renderizar resultados de upload
     * @param {Array} results - Resultados del upload
     * @returns {string} - HTML de los resultados
     */
    renderUploadResults(results) {
        let html = '<div class="upload-results">'
        
        results.forEach(result => {
            if (result.success) {
                html += `
                    <div class="upload-result success">
                        <i class="fas fa-check-circle"></i>
                        <span>${result.file} - Subido correctamente</span>
                    </div>
                `
            } else {
                html += `
                    <div class="upload-result error">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>${result.file} - ${result.error}</span>
                    </div>
                `
            }
        })
        
        html += '</div>'
        return html
    }

    /**
     * Renderizar resultados de búsqueda
     * @param {Array} documents - Documentos encontrados
     * @returns {string} - HTML de los resultados
     */
    renderSearchResults(documents) {
        if (documents.length === 0) {
            return `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No se encontraron documentos</h3>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>
            `
        }

        let html = '<div class="search-results">'
        
        documents.forEach(doc => {
            html += this.renderDocumentCard(doc)
        })
        
        html += '</div>'
        return html
    }

    /**
     * Renderizar tarjeta de documento
     * @param {Object} document - Documento
     * @returns {string} - HTML de la tarjeta
     */
    renderDocumentCard(document) {
        const iconClass = getFileIcon(document.file_type)
        const fileSize = formatFileSize(document.file_size)
        const uploadDate = new Date(document.created_at).toLocaleDateString()

        return `
            <div class="document-card" data-document-id="${document.id}">
                <div class="document-icon ${document.file_type}">
                    <i class="${iconClass}"></i>
                </div>
                <div class="document-title">${document.title}</div>
                <div class="document-meta">
                    <span><i class="fas fa-file"></i> ${document.file_type.toUpperCase()}</span>
                    <span><i class="fas fa-weight"></i> ${fileSize}</span>
                    <span><i class="fas fa-calendar"></i> ${uploadDate}</span>
                </div>
                <div class="document-actions">
                    <button class="btn btn-sm btn-primary" data-action="view" data-document="${document.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary" data-action="download" data-document="${document.id}">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" data-action="delete" data-document="${document.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `
    }

    /**
     * Imprimir documento actual
     * @returns {boolean} - True si fue exitoso
     */
    printCurrentDocument() {
        try {
            if (!this.currentDocument) {
                throw new Error('No hay documento seleccionado')
            }

            const publicUrl = getPublicUrl(this.currentDocument.file_path)
            const printWindow = window.open(publicUrl, '_blank')
            
            if (printWindow) {
                printWindow.onload = () => {
                    printWindow.print()
                }
                return true
            } else {
                throw new Error('No se pudo abrir la ventana de impresión')
            }
        } catch (error) {
            console.error('Error al imprimir:', error)
            return false
        }
    }

    /**
     * Descargar documento actual
     * @returns {Promise<boolean>} - True si fue exitoso
     */
    async downloadCurrentDocument() {
        if (!this.currentDocument) {
            return false
        }
        
        return await this.downloadDocument(this.currentDocument.id)
    }
}
