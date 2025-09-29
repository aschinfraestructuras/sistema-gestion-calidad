/**
 * ========================================
 * SISTEMA DE UPLOAD DE ARCHIVOS
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
    generateUniqueFileName
} from './supabase.js'

/**
 * Clase para manejar upload de archivos
 */
export class UploadManager {
    constructor(supabase) {
        this.supabase = supabase
        this.currentChapter = null
        this.currentSubchapter = null
        this.uploadQueue = []
        this.isUploading = false
    }

    /**
     * Configurar capítulo actual
     * @param {number} chapterId - ID del capítulo
     */
    setCurrentChapter(chapterId) {
        this.currentChapter = chapterId
    }

    /**
     * Configurar subcapítulo actual
     * @param {string} subchapterId - ID del subcapítulo
     */
    setCurrentSubchapter(subchapterId) {
        this.currentSubchapter = subchapterId
        console.log('📂 Subcapítulo actual establecido:', subchapterId)
    }

    /**
     * Mostrar modal de upload
     * @param {number} chapterId - ID del capítulo (opcional)
     */
    showUploadModal(chapterId = null) {
        if (chapterId) {
            this.setCurrentChapter(chapterId)
        }

        const modal = document.getElementById('upload-modal')
        if (modal) {
            modal.classList.add('active')
            this.resetUploadArea()
        }
    }

    /**
     * Cerrar modal de upload
     */
    closeUploadModal() {
        const modal = document.getElementById('upload-modal')
        if (modal) {
            modal.classList.remove('active')
        }
        this.resetUploadArea()
    }

    /**
     * Resetear área de upload
     */
    resetUploadArea() {
        const uploadArea = document.getElementById('upload-area')
        const progress = document.getElementById('upload-progress')
        const results = document.getElementById('upload-results')
        const fileInput = document.getElementById('file-input')

        if (uploadArea) {
            uploadArea.classList.remove('dragover')
        }
        if (progress) {
            progress.classList.add('hidden')
        }
        if (results) {
            results.classList.add('hidden')
        }
        if (fileInput) {
            fileInput.value = ''
        }
    }

    /**
     * Manejar selección de archivos
     * @param {Event} event - Evento de selección
     */
    handleFileSelect(event) {
        const files = Array.from(event.target.files)
        this.processFiles(files)
    }

    /**
     * Manejar drag over
     * @param {Event} event - Evento de drag over
     */
    handleDragOver(event) {
        event.preventDefault()
        event.stopPropagation()
        event.currentTarget.classList.add('dragover')
    }

    /**
     * Manejar drag leave
     * @param {Event} event - Evento de drag leave
     */
    handleDragLeave(event) {
        event.preventDefault()
        event.stopPropagation()
        event.currentTarget.classList.remove('dragover')
    }

    /**
     * Manejar drop
     * @param {Event} event - Evento de drop
     */
    handleDrop(event) {
        event.preventDefault()
        event.stopPropagation()
        event.currentTarget.classList.remove('dragover')
        
        const files = Array.from(event.dataTransfer.files)
        this.processFiles(files)
    }

    /**
     * Procesar archivos seleccionados
     * @param {Array} files - Array de archivos
     */
    async processFiles(files) {
        if (files.length === 0) return

        // Validar archivos
        const validationResults = this.validateFiles(files)
        const validFiles = validationResults.valid
        const invalidFiles = validationResults.invalid

        if (invalidFiles.length > 0) {
            this.showValidationErrors(invalidFiles)
        }

        if (validFiles.length === 0) {
            return
        }

        // Mostrar progreso
        this.showUploadProgress()

        // Subir archivos
        const results = await this.uploadFiles(validFiles)
        
        // Mostrar resultados
        this.showUploadResults(results)

        // Notificar éxito/error
        const successCount = results.filter(r => r.success).length
        const errorCount = results.filter(r => !r.success).length

        if (successCount > 0) {
            this.showNotification(`✅ ${successCount} archivo(s) subido(s) correctamente`, 'success')
        }
        if (errorCount > 0) {
            this.showNotification(`❌ ${errorCount} archivo(s) fallaron`, 'error')
        }
    }

    /**
     * Validar archivos
     * @param {Array} files - Array de archivos
     * @returns {Object} - Resultados de validación
     */
    validateFiles(files) {
        const valid = []
        const invalid = []

        files.forEach(file => {
            const errors = []

            // Validar tipo
            if (!validateFileType(file)) {
                errors.push(`Tipo de archivo no permitido: ${file.type}`)
            }

            // Validar tamaño
            if (!validateFileSize(file)) {
                errors.push(`Archivo demasiado grande: ${formatFileSize(file.size)} (máximo: ${formatFileSize(STORAGE_CONFIG.maxFileSize)})`)
            }

            // Validar nombre
            if (file.name.length > 255) {
                errors.push('Nombre de archivo demasiado largo')
            }

            if (errors.length > 0) {
                invalid.push({
                    file: file,
                    errors: errors
                })
            } else {
                valid.push(file)
            }
        })

        return { valid, invalid }
    }

    /**
     * Mostrar errores de validación
     * @param {Array} invalidFiles - Archivos inválidos
     */
    showValidationErrors(invalidFiles) {
        let message = 'Archivos con errores:\n'
        invalidFiles.forEach(item => {
            message += `• ${item.file.name}: ${item.errors.join(', ')}\n`
        })
        
        this.showNotification(message, 'error', 8000)
    }

    /**
     * Subir archivos
     * @param {Array} files - Array de archivos válidos
     * @returns {Promise<Array>} - Resultados del upload
     */
    async uploadFiles(files) {
        console.log('📤 UploadManager.uploadFiles iniciado com', files.length, 'arquivos')
        const results = []
        this.isUploading = true

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            console.log(`📁 Processando arquivo ${i + 1}/${files.length}:`, file.name)
            
            try {
                // Actualizar progreso
                const percentage = (i / files.length) * 100
                this.updateProgress(percentage, `Subiendo ${file.name}...`)
                this.updateIntegratedProgress(percentage, `Subiendo ${file.name}...`)

                // Generar nombre único
                const fileName = generateUniqueFileName(file.name)
                const filePath = `documents/${fileName}`
                console.log('📝 Nome do arquivo:', fileName)
                console.log('📂 Caminho do arquivo:', filePath)

                // Subir a Storage
                console.log('☁️ Subindo para Supabase Storage...')
                const { data: uploadData, error: uploadError } = await this.supabase.storage
                    .from(STORAGE_CONFIG.bucket)
                    .upload(filePath, file)

                if (uploadError) {
                    console.error('❌ Erro no upload para Storage:', uploadError)
                    throw new Error(uploadError.message)
                }
                console.log('✅ Upload para Storage OK:', uploadData)

                // Guardar metadatos en BD
                console.log('💾 Salvando metadados na base de dados...')
                const documentData = {
                    title: file.name,
                    file_name: fileName,
                    file_path: filePath,
                    file_size: file.size,
                    file_type: getFileType(file.type),
                    chapter_id: this.currentChapter,
                    uploaded_by: null // Remover campo obrigatório temporariamente
                }
                
                // Adicionar informação do subcapítulo no título para identificação
                if (this.currentSubchapter) {
                    documentData.title = `[${this.currentSubchapter}] ${file.name}`
                    console.log('📂 Subcapítulo selecionado:', this.currentSubchapter, '- adicionado ao título')
                }
                console.log('📊 Dados do documento:', documentData)

                const { data: docData, error: docError } = await this.supabase
                    .from('documents')
                    .insert(documentData)
                    .select()

                if (docError) {
                    console.error('❌ Erro ao salvar na base de dados:', docError)
                    // Eliminar archivo subido si falla la BD
                    await this.supabase.storage
                        .from(STORAGE_CONFIG.bucket)
                        .remove([filePath])
                    
                    throw new Error(docError.message)
                }
                console.log('✅ Metadados salvos na BD:', docData)

                results.push({
                    file: file.name,
                    success: true,
                    document: docData[0],
                    url: uploadData.path
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

        // Completar progreso
        this.updateProgress(100, 'Upload completado')
        this.updateIntegratedProgress(100, 'Upload completado')
        this.isUploading = false

        return results
    }

    /**
     * Mostrar progreso de upload
     */
    showUploadProgress() {
        const progress = document.getElementById('upload-progress')
        if (progress) {
            progress.classList.remove('hidden')
        }
    }

    /**
     * Actualizar progreso
     * @param {number} percentage - Porcentaje de progreso
     * @param {string} text - Texto de progreso
     */
    updateProgress(percentage, text) {
        const progressFill = document.getElementById('progress-fill')
        const progressText = document.getElementById('progress-text')

        if (progressFill) {
            progressFill.style.width = `${percentage}%`
        }
        if (progressText) {
            progressText.textContent = text
        }
    }

    /**
     * Mostrar resultados de upload
     * @param {Array} results - Resultados del upload
     */
    showUploadResults(results) {
        const resultsDiv = document.getElementById('upload-results')
        if (resultsDiv) {
            resultsDiv.classList.remove('hidden')
            resultsDiv.innerHTML = this.renderUploadResults(results)
        }
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
                        <div class="result-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="result-content">
                            <div class="result-title">${result.file}</div>
                            <div class="result-message">Subido correctamente</div>
                        </div>
                    </div>
                `
            } else {
                html += `
                    <div class="upload-result error">
                        <div class="result-icon">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <div class="result-content">
                            <div class="result-title">${result.file}</div>
                            <div class="result-message">${result.error}</div>
                        </div>
                    </div>
                `
            }
        })
        
        html += '</div>'
        return html
    }

    /**
     * Mostrar notificación
     * @param {string} message - Mensaje
     * @param {string} type - Tipo de notificación
     * @param {number} duration - Duración
     */
    showNotification(message, type = 'info', duration = 5000) {
        // Usar el sistema de notificaciones global si está disponible
        if (window.app && window.app.notifications) {
            window.app.notifications.show(message, type, duration)
        } else {
            // Fallback simple
            alert(message)
        }
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Remover listeners existentes para evitar duplicação
        this.removeEventListeners()
        
        // Event listeners para upload integrado
        this.setupIntegratedUploadListeners()
        
        // Event listeners para modal (mantener compatibilidad)
        this.setupModalUploadListeners()
    }

    /**
     * Remover event listeners existentes
     */
    removeEventListeners() {
        // Remover listeners de upload integrado
        document.removeEventListener('change', this.handleIntegratedFileSelect)
        document.removeEventListener('dragover', this.handleIntegratedDragOver)
        document.removeEventListener('dragleave', this.handleIntegratedDragLeave)
        document.removeEventListener('drop', this.handleIntegratedDrop)
        document.removeEventListener('click', this.handleIntegratedClick)
    }

    /**
     * Configurar event listeners para upload integrado
     */
    setupIntegratedUploadListeners() {
        // Usar arrow functions para manter o contexto
        this.handleIntegratedFileSelect = (e) => {
            if (e.target.classList.contains('upload-input') || e.target.classList.contains('upload-input-small')) {
                this.processIntegratedFileSelect(e)
            }
        }

        this.handleIntegratedDragOver = (e) => {
            if (e.target.closest('.integrated-upload-area') || e.target.closest('.upload-zone-small')) {
                e.preventDefault()
                e.stopPropagation()
                this.processIntegratedDragOver(e)
            }
        }

        this.handleIntegratedDragLeave = (e) => {
            if (e.target.closest('.integrated-upload-area') || e.target.closest('.upload-zone-small')) {
                e.preventDefault()
                e.stopPropagation()
                this.processIntegratedDragLeave(e)
            }
        }

        this.handleIntegratedDrop = (e) => {
            if (e.target.closest('.integrated-upload-area') || e.target.closest('.upload-zone-small')) {
                e.preventDefault()
                e.stopPropagation()
                this.processIntegratedDrop(e)
            }
        }

        this.handleIntegratedClick = (e) => {
            if (e.target.closest('.upload-zone') || e.target.closest('.upload-zone-small')) {
                const input = e.target.closest('.integrated-upload-area, .subchapter-upload').querySelector('input[type="file"]')
                if (input) input.click()
            }
        }

        // Adicionar listeners
        document.addEventListener('change', this.handleIntegratedFileSelect)
        document.addEventListener('dragover', this.handleIntegratedDragOver)
        document.addEventListener('dragleave', this.handleIntegratedDragLeave)
        document.addEventListener('drop', this.handleIntegratedDrop)
        document.addEventListener('click', this.handleIntegratedClick)
    }

    /**
     * Configurar event listeners para modal (compatibilidad)
     */
    setupModalUploadListeners() {
        // File input del modal
        const fileInput = document.getElementById('file-input')
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e))
        }

        // Upload area del modal
        const uploadArea = document.getElementById('upload-area')
        if (uploadArea) {
            uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e))
            uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e))
            uploadArea.addEventListener('drop', (e) => this.handleDrop(e))
            uploadArea.addEventListener('click', () => fileInput.click())
        }

        // Close modal
        const closeBtn = document.querySelector('[onclick="closeUploadModal()"]')
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeUploadModal())
        }
    }

    /**
     * Procesar selección de archivos integrada
     * @param {Event} event - Evento de selección
     */
    processIntegratedFileSelect(event) {
        const files = Array.from(event.target.files)
        const container = event.target.closest('.integrated-upload-area, .subchapter-upload')
        const { chapterId, subchapterId } = this.getChapterIdFromContainer(container)
        
        if (chapterId) {
            this.setCurrentChapter(chapterId)
            this.setCurrentSubchapter(subchapterId)
            this.processIntegratedFiles(files, container)
        }
    }

    /**
     * Procesar drag over integrado
     * @param {Event} event - Evento de drag over
     */
    processIntegratedDragOver(event) {
        const container = event.target.closest('.integrated-upload-area, .upload-zone-small')
        if (container) {
            container.classList.add('dragover')
        }
    }

    /**
     * Procesar drag leave integrado
     * @param {Event} event - Evento de drag leave
     */
    processIntegratedDragLeave(event) {
        const container = event.target.closest('.integrated-upload-area, .upload-zone-small')
        if (container) {
            container.classList.remove('dragover')
        }
    }

    /**
     * Procesar drop integrado
     * @param {Event} event - Evento de drop
     */
    processIntegratedDrop(event) {
        const container = event.target.closest('.integrated-upload-area, .upload-zone-small')
        if (container) {
            container.classList.remove('dragover')
            const files = Array.from(event.dataTransfer.files)
            const { chapterId, subchapterId } = this.getChapterIdFromContainer(container)
            
            if (chapterId) {
                this.setCurrentChapter(chapterId)
                this.setCurrentSubchapter(subchapterId)
                this.processIntegratedFiles(files, container)
            }
        }
    }

    /**
     * Obtener ID del capítulo desde el contenedor
     * @param {HTMLElement} container - Contenedor
     * @returns {Object} - {chapterId, subchapterId}
     */
    getChapterIdFromContainer(container) {
        if (!container) return { chapterId: null, subchapterId: null }
        
        let chapterId = null
        let subchapterId = null
        
        // Buscar data-chapter y data-subchapter en el contenedor o sus padres
        let element = container
        while (element && element !== document.body) {
            if (element.dataset.chapter && !chapterId) {
                chapterId = parseInt(element.dataset.chapter)
            }
            if (element.dataset.subchapter && !subchapterId) {
                subchapterId = element.dataset.subchapter
            }
            element = element.parentElement
        }
        
        return { chapterId, subchapterId }
    }

    /**
     * Procesar archivos integrados
     * @param {Array} files - Array de archivos
     * @param {HTMLElement} container - Contenedor donde se suben
     */
    async processIntegratedFiles(files, container) {
        console.log('🚀 Iniciando processamento de arquivos:', files.length)
        
        if (files.length === 0) {
            console.log('⚠️ Nenhum arquivo para processar')
            return
        }

        // Validar archivos
        console.log('🔍 Validando arquivos...')
        const validationResults = this.validateFiles(files)
        const validFiles = validationResults.valid
        const invalidFiles = validationResults.invalid

        console.log('✅ Arquivos válidos:', validFiles.length)
        console.log('❌ Arquivos inválidos:', invalidFiles.length)

        if (invalidFiles.length > 0) {
            console.log('❌ Erros de validação:', invalidFiles)
            this.showValidationErrors(invalidFiles)
        }

        if (validFiles.length === 0) {
            console.log('⚠️ Nenhum arquivo válido para upload')
            return
        }

        // Mostrar progreso integrado
        this.showIntegratedProgress(container)

        // Subir archivos
        console.log('📤 Iniciando upload de arquivos...')
        const results = await this.uploadFiles(validFiles)
        
        console.log('📊 Resultados do upload:', results)
        
        // Mostrar resultados integrados
        this.showIntegratedResults(results, container)

        // Notificar éxito/error
        const successCount = results.filter(r => r.success).length
        const errorCount = results.filter(r => !r.success).length

        console.log(`✅ Sucessos: ${successCount}, ❌ Erros: ${errorCount}`)

        if (successCount > 0) {
            this.showNotification(`✅ ${successCount} archivo(s) subido(s) correctamente`, 'success')
            
            // Recarregar documentos do capítulo atual
            if (this.currentChapter && window.app) {
                await window.app.loadChapterDocuments(this.currentChapter)
            }
        }
        if (errorCount > 0) {
            this.showNotification(`❌ ${errorCount} archivo(s) fallaron`, 'error')
        }
    }

    /**
     * Mostrar progreso integrado
     * @param {HTMLElement} container - Contenedor
     */
    showIntegratedProgress(container) {
        const progressHTML = `
            <div class="upload-progress-integrated">
                <div class="progress-bar-integrated">
                    <div class="progress-fill-integrated"></div>
                </div>
                <div class="progress-text-integrated">Preparando upload...</div>
            </div>
        `
        
        container.insertAdjacentHTML('afterend', progressHTML)
    }

    /**
     * Actualizar progreso integrado
     * @param {number} percentage - Porcentaje
     * @param {string} text - Texto
     */
    updateIntegratedProgress(percentage, text) {
        const progressFill = document.querySelector('.progress-fill-integrated')
        const progressText = document.querySelector('.progress-text-integrated')

        if (progressFill) {
            progressFill.style.width = `${percentage}%`
        }
        if (progressText) {
            progressText.textContent = text
        }
    }

    /**
     * Mostrar resultados integrados
     * @param {Array} results - Resultados
     * @param {HTMLElement} container - Contenedor
     */
    showIntegratedResults(results, container) {
        const resultsHTML = this.renderIntegratedResults(results)
        
        // Remover progreso anterior
        const progress = container.parentElement.querySelector('.upload-progress-integrated')
        if (progress) {
            progress.remove()
        }
        
        // Agregar resultados
        container.insertAdjacentHTML('afterend', resultsHTML)
    }

    /**
     * Renderizar resultados integrados
     * @param {Array} results - Resultados
     * @returns {string} - HTML
     */
    renderIntegratedResults(results) {
        let html = '<div class="upload-results-integrated">'
        
        results.forEach(result => {
            if (result.success) {
                html += `
                    <div class="upload-result-integrated success">
                        <i class="fas fa-check-circle"></i>
                        <span>${result.file} - Subido correctamente</span>
                    </div>
                `
            } else {
                html += `
                    <div class="upload-result-integrated error">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>${result.file} - ${result.error}</span>
                    </div>
                `
            }
        })
        
        html += '</div>'
        return html
    }
}

// Funciones globales para compatibilidad
window.showUploadModal = (chapterId) => {
    if (window.app && window.app.uploadManager) {
        window.app.uploadManager.showUploadModal(chapterId)
    }
}

window.closeUploadModal = () => {
    if (window.app && window.app.uploadManager) {
        window.app.uploadManager.closeUploadModal()
    }
}
