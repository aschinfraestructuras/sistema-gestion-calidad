/**
 * ========================================
 * APLICACIÓN PRINCIPAL
 * Sistema de Gestión de Calidad ASCH-OHLA
 * ========================================
 */

import { supabase, testSupabaseConnection } from './supabase.js'
import { AuthManager } from './auth.js'
import { DocumentManager } from './documents.js'
import { ChapterManager } from './chapters.js'
import { DashboardManager } from './dashboard.js'
import { NotificationManager } from './notifications.js'
import { UploadManager } from './upload.js'

/**
 * Clase principal de la aplicación
 */
class QualityManagementApp {
    constructor() {
        this.supabase = supabase // Referência ao Supabase
        this.auth = new AuthManager(supabase)
        this.documents = new DocumentManager(supabase)
        this.chapters = new ChapterManager()
        this.dashboard = new DashboardManager(supabase)
        this.notifications = new NotificationManager()
        this.uploadManager = new UploadManager(supabase)
        
        this.currentUser = null
        this.currentChapter = null
        this.isInitialized = false
    }

    /**
     * Inicializar la aplicación
     */
    async init() {
        try {
            console.log('🚀 Iniciando Sistema de Gestión de Calidad ASCH-OHLA...')
            
            // Mostrar pantalla de carga
            this.showLoadingScreen()
            
            // Verificar conexión con Supabase
            const isConnected = await testSupabaseConnection()
            if (!isConnected) {
                throw new Error('No se pudo conectar con Supabase')
            }
            
        // Configurar event listeners
        this.setupEventListeners()
        
        // Configurar upload manager
        this.uploadManager.setupEventListeners()
        
        // Configurar modal
        this.setupModalEventListeners()
        
        // Cargar capítulos en el sidebar
        this.loadChaptersInSidebar()
            
            // Verificar si hay usuario autenticado
            const user = await this.auth.getCurrentUser()
            if (user) {
                this.currentUser = user
                this.showMainApp()
                await this.loadDashboard()
            } else {
                this.showLoginScreen()
            }
            
            this.isInitialized = true
            console.log('✅ Aplicación inicializada correctamente')
            
        } catch (error) {
            console.error('❌ Error al inicializar la aplicación:', error)
            this.notifications.show('Error al inicializar la aplicación', 'error')
            this.showLoginScreen()
        }
    }

    /**
     * Configurar event listeners do modal
     */
    setupModalEventListeners() {
        // Fechar modal clicando fora
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('document-modal')
            if (modal && e.target === modal) {
                this.closeDocumentModal()
            }
        })

        // Fechar modal com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('document-modal')
                if (modal && modal.classList.contains('active')) {
                    this.closeDocumentModal()
                }
            }
        })
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('login-form')
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e))
        }

        // Logout button
        const logoutBtn = document.querySelector('[onclick="logout()"]')
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout())
        }

        // Logo click (volver al dashboard)
        const logo = document.querySelector('.logo[onclick="goToDashboard()"]')
        if (logo) {
            logo.addEventListener('click', () => this.goToDashboard())
        }

        // Sidebar toggle
        const sidebarToggle = document.querySelector('[onclick="toggleSidebar()"]')
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar())
        }

        // Document modal close
        const closeModalBtn = document.querySelector('[onclick="closeDocumentModal()"]')
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.closeDocumentModal())
        }

        // Upload modal close
        const closeUploadBtn = document.querySelector('[onclick="closeUploadModal()"]')
        if (closeUploadBtn) {
            closeUploadBtn.addEventListener('click', () => this.closeUploadModal())
        }

        // File input change
        const fileInput = document.getElementById('file-input')
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e))
        }

        // Drag and drop
        const uploadArea = document.getElementById('upload-area')
        if (uploadArea) {
            uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e))
            uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e))
            uploadArea.addEventListener('drop', (e) => this.handleDrop(e))
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e))

        // Window events
        window.addEventListener('beforeunload', () => this.handleBeforeUnload())
        window.addEventListener('resize', () => this.handleResize())
    }

    /**
     * Manejar login
     */
    async handleLogin(event) {
        event.preventDefault()
        
        const formData = new FormData(event.target)
        const username = formData.get('username')
        const password = formData.get('password')
        const code = formData.get('code')
        
        try {
            this.showLoadingScreen()
            
            const user = await this.auth.login(username, password, code)
            if (user) {
                this.currentUser = user
                this.notifications.show(`Bienvenido, ${user.name}`, 'success')
                this.showMainApp()
                await this.loadDashboard()
            } else {
                throw new Error('Credenciales inválidas')
            }
        } catch (error) {
            console.error('Error en login:', error)
            this.notifications.show('Error al iniciar sesión. Verifique sus credenciales.', 'error')
            this.showLoginScreen()
        }
    }

    /**
     * Manejar logout
     */
    async handleLogout() {
        try {
            await this.auth.logout()
            this.currentUser = null
            this.currentChapter = null
            this.notifications.show('Sesión cerrada correctamente', 'info')
            this.showLoginScreen()
        } catch (error) {
            console.error('Error en logout:', error)
            this.notifications.show('Error al cerrar sesión', 'error')
        }
    }

    /**
     * Mostrar pantalla de carga
     */
    showLoadingScreen() {
        document.getElementById('loading-screen').classList.remove('hidden')
        document.getElementById('login-screen').classList.add('hidden')
        document.getElementById('main-app').classList.add('hidden')
    }

    /**
     * Mostrar pantalla de login
     */
    showLoginScreen() {
        document.getElementById('loading-screen').classList.add('hidden')
        document.getElementById('login-screen').classList.remove('hidden')
        document.getElementById('main-app').classList.add('hidden')
    }

    /**
     * Mostrar aplicación principal
     */
    showMainApp() {
        document.getElementById('loading-screen').classList.add('hidden')
        document.getElementById('login-screen').classList.add('hidden')
        document.getElementById('main-app').classList.remove('hidden')
        
        // Actualizar información del usuario
        const userNameElement = document.getElementById('user-name')
        if (userNameElement && this.currentUser) {
            userNameElement.textContent = this.currentUser.name
        }
    }

    /**
     * Cargar dashboard
     */
    async loadDashboard() {
        try {
            const contentArea = document.getElementById('content-area')
            if (!contentArea) return

            // Mostrar loading
            contentArea.innerHTML = '<div class="loading"><div class="loading-spinner"></div>Cargando dashboard...</div>'

            // Cargar dashboard
            const dashboardHTML = await this.dashboard.render()
            contentArea.innerHTML = dashboardHTML

            // Cargar capítulos en sidebar
            await this.loadChapters()

            // Actualizar breadcrumb
            this.updateBreadcrumb('Dashboard')

            // Configurar event listeners del dashboard
            this.setupDashboardEventListeners()

        } catch (error) {
            console.error('Error al cargar dashboard:', error)
            this.notifications.show('Error al cargar el dashboard', 'error')
        }
    }

    /**
     * Cargar capítulos en sidebar
     */
    async loadChapters() {
        try {
            const sidebarNav = document.getElementById('sidebar-nav')
            if (!sidebarNav) return

            const chaptersHTML = await this.chapters.renderSidebar()
            sidebarNav.innerHTML = chaptersHTML

            // Configurar event listeners de capítulos
            this.setupChapterEventListeners()

        } catch (error) {
            console.error('Error al cargar capítulos:', error)
        }
    }

    /**
     * Cargar capítulo específico
     */
    async loadChapter(chapterId) {
        try {
            const contentArea = document.getElementById('content-area')
            if (!contentArea) return

            // Mostrar loading
            contentArea.innerHTML = '<div class="loading"><div class="loading-spinner"></div>Cargando capítulo...</div>'

            // Cargar capítulo
            const chapterHTML = await this.chapters.renderChapter(chapterId)
            contentArea.innerHTML = chapterHTML

            // Actualizar estado activo en sidebar
            this.updateActiveChapter(chapterId)

            // Actualizar breadcrumb
            const chapter = this.chapters.getChapter(chapterId)
            this.updateBreadcrumb(chapter ? chapter.title : 'Capítulo')

            // Configurar event listeners del capítulo
            this.setupChapterContentEventListeners()

        } catch (error) {
            console.error('Error al cargar capítulo:', error)
            this.notifications.show('Error al cargar el capítulo', 'error')
        }
    }

    /**
     * Configurar event listeners del dashboard
     */
    setupDashboardEventListeners() {
        // Botones de acción rápida
        const quickActions = document.querySelectorAll('[data-action]')
        quickActions.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action
                this.handleQuickAction(action)
            })
        })

        // Enlaces a capítulos
        const chapterLinks = document.querySelectorAll('[data-chapter]')
        chapterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                const chapterId = parseInt(e.currentTarget.dataset.chapter)
                this.loadChapter(chapterId)
            })
        })

        // Event listeners para documentos recentes
        const documentsList = document.querySelector('.documents-list')
        if (documentsList) {
            this.setupDocumentActionListeners(documentsList)
            console.log('✅ Event listeners aplicados aos documentos do dashboard')
        }
    }

    /**
     * Configurar event listeners de capítulos
     */
    setupChapterEventListeners() {
        const chapterItems = document.querySelectorAll('.chapter-item')
        chapterItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                const chapterId = parseInt(e.currentTarget.dataset.chapter)
                this.loadChapter(chapterId)
            })
        })
    }

    /**
     * Configurar event listeners del contenido del capítulo
     */
    setupChapterContentEventListeners() {
        // Botón de upload
        const uploadBtn = document.querySelector('[data-action="upload"]')
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => this.showUploadModal())
        }

        // Botones de documento
        const documentBtns = document.querySelectorAll('[data-action="view"], [data-action="download"], [data-action="delete"]')
        documentBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action
                const documentId = e.currentTarget.dataset.document
                this.handleDocumentAction(action, documentId)
            })
        })

        // Búsqueda
        const searchInput = document.querySelector('.search-input')
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value))
        }

        // Filtros
        const filterSelects = document.querySelectorAll('.filter-select')
        filterSelects.forEach(select => {
            select.addEventListener('change', (e) => this.handleFilterChange(e.target))
        })
    }

    /**
     * Manejar acciones rápidas
     */
    handleQuickAction(action) {
        switch (action) {
            case 'upload':
                this.showUploadModal()
                break
            case 'search':
                // Enfocar campo de búsqueda
                const searchInput = document.querySelector('.search-input')
                if (searchInput) searchInput.focus()
                break
            case 'reports':
                this.showReports()
                break
            case 'view':
                this.showDocumentViewer()
                break
            case 'download':
                this.showDownloadOptions()
                break
            default:
                console.log('Acción no implementada:', action)
        }
    }

    /**
     * Manejar acciones de documentos
     */
    async handleDocumentAction(action, documentId) {
        try {
            switch (action) {
                case 'view':
                    await this.viewDocument(documentId)
                    break
                case 'download':
                    await this.downloadDocument(documentId)
                    break
                case 'delete':
                    await this.deleteDocument(documentId)
                    break
                default:
                    console.log('Acción de documento no implementada:', action)
            }
        } catch (error) {
            console.error('Error en acción de documento:', error)
            this.notifications.show('Error al procesar documento', 'error')
        }
    }

    /**
     * Ver documento
     */
    async viewDocument(documentId) {
        try {
            console.log('👁️ Visualizando documento:', documentId)
            
            const doc = await this.documents.getDocument(documentId)
            if (!doc) {
                throw new Error('Documento no encontrado')
            }

            console.log('📄 Dados do documento:', doc)
            
            // Mostrar visualizador integrado no site
            this.showIntegratedDocumentViewer(doc)
            
        } catch (error) {
            console.error('❌ Error al ver documento:', error)
            this.notifications.show('Error al cargar el documento', 'error')
        }
    }

    /**
     * Descargar documento
     */
    async downloadDocument(documentId) {
        try {
            console.log('📥 Baixando documento:', documentId)
            
            // Obter dados do documento
            const doc = await this.documents.getDocument(documentId)
            if (!doc) {
                throw new Error('Documento não encontrado')
            }

            console.log('📄 Dados do documento para download:', doc)

            // Gerar URL de download do Supabase Storage
            const { data: signedUrl, error: urlError } = await this.supabase.storage
                .from('documents')
                .createSignedUrl(doc.file_path, 60) // URL válida por 60 segundos

            if (urlError) {
                console.error('❌ Erro ao gerar URL:', urlError)
                throw new Error('Erro ao gerar URL de download')
            }

            console.log('🔗 URL de download gerada:', signedUrl.signedUrl)

            // Criar link de download e clicar automaticamente
            const link = document.createElement('a')
            link.href = signedUrl.signedUrl
            link.download = doc.file_name
            link.target = '_blank'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            this.notifications.show('Download iniciado!', 'success')
        } catch (error) {
            console.error('❌ Error al descargar documento:', error)
            this.notifications.show('Error al descargar el documento', 'error')
        }
    }

    /**
     * Eliminar documento
     */
    async deleteDocument(documentId) {
        try {
            console.log('🗑️ Apagando documento:', documentId)
            
            // Confirmar exclusão
            if (!confirm('Tem certeza que deseja apagar este documento?')) {
                return
            }

            // Obter dados do documento primeiro
            const doc = await this.documents.getDocument(documentId)
            if (!doc) {
                throw new Error('Documento não encontrado')
            }

            console.log('📄 Dados do documento a apagar:', doc)

            // Apagar do Supabase Storage
            const { error: storageError } = await this.supabase.storage
                .from('documents')
                .remove([doc.file_path])

            if (storageError) {
                console.error('❌ Erro ao apagar do Storage:', storageError)
                // Continuar mesmo se falhar no Storage
            }

            // Apagar da base de dados
            const { error: dbError } = await this.supabase
                .from('documents')
                .delete()
                .eq('id', documentId)

            if (dbError) {
                console.error('❌ Erro ao apagar da BD:', dbError)
                throw new Error('Erro ao apagar documento da base de dados')
            }

            console.log('✅ Documento apagado com sucesso')
            this.notifications.show('Documento apagado com sucesso!', 'success')
            
            // Recarregar documentos do capítulo atual
            if (this.currentChapter) {
                await this.loadChapterDocuments(this.currentChapter)
            }
        } catch (error) {
            console.error('❌ Error al eliminar documento:', error)
            this.notifications.show('Error al eliminar el documento', 'error')
        }
    }

    /**
     * Mostrar visualizador integrado de documento
     */
        showIntegratedDocumentViewer(doc) {
            console.log('🎯 Abrindo visualizador integrado para:', doc.title)
            
            // Esconder conteúdo principal
            const mainApp = document.getElementById('main-app')
            if (mainApp) {
                mainApp.style.display = 'none'
            }
            
            // Criar visualizador integrado profissional - LARGURA COMPLETA
            const viewer = document.createElement('div')
            viewer.id = 'document-viewer-container'
            viewer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #f8f9fa;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                margin: 0;
                padding: 0;
                overflow: hidden;
            `
            
            // Header profissional como o da Vercel - LARGURA COMPLETA
            const header = document.createElement('div')
            header.style.cssText = `
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 16px 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border-bottom: 1px solid rgba(255,255,255,0.1);
                width: 100%;
                position: relative;
                left: 0;
                right: 0;
                margin: 0;
            `
            
            header.innerHTML = `
                <div style="display: flex; align-items: center; gap: 20px;">
                    <button id="back-to-app" style="
                        background: rgba(255,255,255,0.15);
                        color: white;
                        border: 1px solid rgba(255,255,255,0.2);
                        padding: 10px 16px;
                        border-radius: 8px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">
                        <i class="fas fa-home"></i>
                        Dashboard
                    </button>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="
                            width: 4px;
                            height: 24px;
                            background: rgba(255,255,255,0.3);
                            border-radius: 2px;
                        "></div>
                        <h2 style="margin: 0; font-size: 20px; font-weight: 600;">${doc.title}</h2>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button id="print-doc" style="
                        background: rgba(255,255,255,0.9);
                        color: #667eea;
                        border: none;
                        padding: 10px 16px;
                        border-radius: 8px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='white'" onmouseout="this.style.background='rgba(255,255,255,0.9)'">
                        <i class="fas fa-print"></i>
                        Imprimir
                    </button>
                    <button id="download-doc" style="
                        background: rgba(255,255,255,0.9);
                        color: #667eea;
                        border: none;
                        padding: 10px 16px;
                        border-radius: 8px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='white'" onmouseout="this.style.background='rgba(255,255,255,0.9)'">
                        <i class="fas fa-download"></i>
                        Descargar
                    </button>
                    <button id="edit-doc" style="
                        background: rgba(255,255,255,0.9);
                        color: #667eea;
                        border: none;
                        padding: 10px 16px;
                        border-radius: 8px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='white'" onmouseout="this.style.background='rgba(255,255,255,0.9)'">
                        <i class="fas fa-edit"></i>
                        Editar
                    </button>
                    <button id="close-viewer" style="
                        background: rgba(220,53,69,0.9);
                        color: white;
                        border: none;
                        padding: 10px 12px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='#dc3545'" onmouseout="this.style.background='rgba(220,53,69,0.9)'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `
            
            // Área principal do visualizador - SEM SIDEBAR
            const mainArea = document.createElement('div')
            mainArea.style.cssText = `
                flex: 1;
                display: flex;
                background: white;
                overflow: hidden;
                width: 100%;
            `
            
            // Área de visualização principal - OCUPA TODA A LARGURA
            const viewerArea = document.createElement('div')
            viewerArea.style.cssText = `
                flex: 1;
                display: flex;
                flex-direction: column;
                background: white;
                overflow: hidden;
                width: 100%;
            `
            
            // Toolbar profissional - LARGURA COMPLETA
            const toolbar = document.createElement('div')
            toolbar.style.cssText = `
                background: linear-gradient(90deg, #34495e 0%, #2c3e50 100%);
                color: white;
                padding: 12px 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                width: 100%;
                margin: 0;
            `
            
            toolbar.innerHTML = `
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button id="zoom-out" style="
                            background: rgba(255,255,255,0.15);
                            color: white;
                            border: 1px solid rgba(255,255,255,0.2);
                            padding: 8px 12px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: 600;
                            transition: all 0.2s ease;
                        " onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">-</button>
                        <span id="zoom-level" style="
                            min-width: 50px;
                            text-align: center;
                            font-weight: 600;
                            font-size: 14px;
                        ">100%</span>
                        <button id="zoom-in" style="
                            background: rgba(255,255,255,0.15);
                            color: white;
                            border: 1px solid rgba(255,255,255,0.2);
                            padding: 8px 12px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: 600;
                            transition: all 0.2s ease;
                        " onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">+</button>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button id="fit-width" style="
                            background: rgba(255,255,255,0.15);
                            color: white;
                            border: 1px solid rgba(255,255,255,0.2);
                            padding: 8px 12px;
                            border-radius: 6px;
                            cursor: pointer;
                            transition: all 0.2s ease;
                        " onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">
                            <i class="fas fa-expand-arrows-alt"></i>
                        </button>
                        <button id="rotate" style="
                            background: rgba(255,255,255,0.15);
                            color: white;
                            border: 1px solid rgba(255,255,255,0.2);
                            padding: 8px 12px;
                            border-radius: 6px;
                            cursor: pointer;
                            transition: all 0.2s ease;
                        " onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">
                            <i class="fas fa-redo"></i>
                        </button>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 12px; opacity: 0.8;">Documento</span>
                    <div style="
                        width: 8px;
                        height: 8px;
                        background: #28a745;
                        border-radius: 50%;
                        animation: pulse 2s infinite;
                    "></div>
                </div>
            `
            
            // Área de conteúdo do documento - LARGURA MÁXIMA
            const contentArea = document.createElement('div')
            contentArea.style.cssText = `
                flex: 1;
                background: #f8f9fa;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px;
                overflow: auto;
                width: 100%;
            `
        
            // Renderizar conteúdo baseado no tipo de arquivo
            if (doc.file_type === 'pdf') {
                // Para PDFs, usar URL direta do Supabase Storage
                this.supabase.storage
                    .from('documents')
                    .createSignedUrl(doc.file_path, 3600) // 1 hora
                    .then(({ data: signedUrl, error }) => {
                        if (error) {
                            console.error('Erro ao gerar URL do PDF:', error)
                            contentArea.innerHTML = `
                                <div style="
                                    background: white;
                                    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                                    border-radius: 12px;
                                    padding: 60px;
                                    text-align: center;
                                    max-width: 600px;
                                    margin: 0 auto;
                                ">
                                    <div style="font-size: 64px; color: #dc3545; margin-bottom: 24px;">
                                        <i class="fas fa-file-pdf"></i>
                                    </div>
                                    <h3 style="color: #2c3e50; margin-bottom: 16px; font-size: 24px; font-weight: 600;">${doc.title}</h3>
                                    <p style="color: #6c757d; margin-bottom: 24px; font-size: 16px;">
                                        Erro ao carregar PDF. Use o botão "Descargar" para visualizar.
                                    </p>
                                </div>
                            `
                        } else {
                             contentArea.innerHTML = `
                                 <div style="
                                     background: white;
                                     box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                                     border-radius: 12px;
                                     overflow: hidden;
                                     width: 99%;
                                     height: 99%;
                                     margin: 0 auto;
                                     position: relative;
                                 ">
                                     <iframe 
                                         id="pdf-viewer"
                                         src="${signedUrl.signedUrl}" 
                                         style="
                                             width: 100%; 
                                             height: 100%; 
                                             border: none;
                                             border-radius: 12px;
                                             overflow: hidden;
                                         "
                                         scrolling="no"
                                         title="${doc.title}">
                                     </iframe>
                                 </div>
                             `
                        }
                    })
            } else if (doc.file_type === 'html') {
                // Para HTML dinâmicos editáveis com scroll correto
                this.supabase.storage
                    .from('documents')
                    .createSignedUrl(doc.file_path, 3600) // 1 hora
                    .then(({ data: signedUrl, error }) => {
                        if (error) {
                            console.error('Erro ao gerar URL do HTML:', error)
                            contentArea.innerHTML = `
                                <div style="
                                    background: white;
                                    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                                    border-radius: 12px;
                                    padding: 60px;
                                    text-align: center;
                                    max-width: 600px;
                                    margin: 0 auto;
                                ">
                                    <div style="font-size: 64px; color: #dc3545; margin-bottom: 24px;">
                                        <i class="fas fa-file-code"></i>
                                    </div>
                                    <h3 style="color: #2c3e50; margin-bottom: 16px; font-size: 24px; font-weight: 600;">${doc.title}</h3>
                                    <p style="color: #6c757d; margin-bottom: 24px; font-size: 16px;">
                                        Erro ao carregar HTML. Use o botão "Descargar" para visualizar.
                                    </p>
                                </div>
                            `
                        } else {
                            // Carregar conteúdo HTML dinamicamente
                            fetch(signedUrl.signedUrl)
                                .then(response => response.text())
                                .then(htmlContent => {
                                     contentArea.innerHTML = `
                                         <div style="
                                             background: white;
                                             box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                                             border-radius: 12px;
                                             width: 99%;
                                             height: 99%;
                                             margin: 0 auto;
                                             position: relative;
                                             overflow: hidden;
                                         ">
                                             <div id="html-content" style="
                                                 width: 100%;
                                                 height: 100%;
                                                 overflow-y: auto;
                                                 overflow-x: hidden;
                                                 padding: 20px;
                                                 background: #ffffff;
                                                 border-radius: 12px;
                                                 font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                                                 line-height: 1.6;
                                             ">
                                                 ${htmlContent}
                                             </div>
                                            <div style="
                                                position: absolute;
                                                bottom: 16px;
                                                right: 16px;
                                                padding: 12px 16px;
                                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                                color: white;
                                                border-radius: 8px;
                                                font-size: 12px;
                                                font-weight: 500;
                                                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                                                display: flex;
                                                align-items: center;
                                                gap: 8px;
                                            ">
                                                <i class="fas fa-edit"></i>
                                                HTML Dinâmico - Clique em "Editar" para modificar
                                            </div>
                                        </div>
                                    `
                                    
                                    // Adicionar funcionalidade dinâmica aos botões HTML
                                    setTimeout(() => {
                                        this.addDynamicHTMLFunctionality()
                                    }, 100)
                                })
                                .catch(error => {
                                    console.error('Erro ao carregar conteúdo HTML:', error)
                                    contentArea.innerHTML = `
                                        <div style="
                                            background: white;
                                            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                                            border-radius: 12px;
                                            padding: 60px;
                                            text-align: center;
                                            max-width: 600px;
                                            margin: 0 auto;
                                        ">
                                            <div style="font-size: 64px; color: #dc3545; margin-bottom: 24px;">
                                                <i class="fas fa-file-code"></i>
                                            </div>
                                            <h3 style="color: #2c3e50; margin-bottom: 16px; font-size: 24px; font-weight: 600;">${doc.title}</h3>
                                            <p style="color: #6c757d; margin-bottom: 24px; font-size: 16px;">
                                                Erro ao carregar conteúdo HTML. Use o botão "Descargar" para visualizar.
                                            </p>
                                        </div>
                                    `
                                })
                        }
                    })
        } else {
            contentArea.innerHTML = `
                <div style="
                    background: white;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    border-radius: 8px;
                    padding: 40px;
                    text-align: center;
                    max-width: 600px;
                    margin: 0 auto;
                ">
                    <div style="font-size: 48px; color: #007bff; margin-bottom: 20px;">
                        <i class="fas fa-file-${doc.file_type === 'word' ? 'word' : doc.file_type === 'excel' ? 'excel' : 'alt'}"></i>
                    </div>
                    <h3 style="color: #333; margin-bottom: 15px;">${doc.title}</h3>
                    <p style="color: #666; margin-bottom: 20px;">
                        Tipo: ${doc.file_type.toUpperCase()} | 
                        Tamanho: ${(doc.file_size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p style="color: #999; font-size: 14px;">
                        Este tipo de arquivo não pode ser visualizado diretamente no navegador.
                        Use o botão "Descargar" para abrir com o aplicativo apropriado.
                    </p>
                </div>
            `
        }
        
            // Montar estrutura - SEM SIDEBAR
            viewerArea.appendChild(toolbar)
            viewerArea.appendChild(contentArea)
            mainArea.appendChild(viewerArea)
            viewer.appendChild(header)
            viewer.appendChild(mainArea)
        
        // Adicionar ao DOM
        document.body.appendChild(viewer)
        
        // Event listeners
        document.getElementById('back-to-app').onclick = () => this.closeDocumentViewer()
        document.getElementById('close-viewer').onclick = () => this.closeDocumentViewer()
        document.getElementById('download-doc').onclick = () => this.downloadDocument(doc.id)
        document.getElementById('print-doc').onclick = () => this.printDocument(doc)
        document.getElementById('edit-doc').onclick = () => this.editDocument(doc)
        
        // Zoom controls
        let zoomLevel = 100
        document.getElementById('zoom-in').onclick = () => {
            zoomLevel += 25
            document.getElementById('zoom-level').textContent = zoomLevel + '%'
            contentArea.style.transform = `scale(${zoomLevel / 100})`
        }
        document.getElementById('zoom-out').onclick = () => {
            zoomLevel = Math.max(25, zoomLevel - 25)
            document.getElementById('zoom-level').textContent = zoomLevel + '%'
            contentArea.style.transform = `scale(${zoomLevel / 100})`
        }
        
        console.log('✅ Visualizador integrado criado e exibido')
    }

    /**
     * Fechar visualizador de documento
     */
    closeDocumentViewer() {
        console.log('🔒 Fechando visualizador')
        
        // Remover visualizador
        const viewer = document.getElementById('document-viewer-container')
        if (viewer) {
            viewer.remove()
            console.log('✅ Visualizador removido')
        }
        
        // Mostrar aplicação principal novamente
        const mainApp = document.getElementById('main-app')
        if (mainApp) {
            mainApp.style.display = 'block'
            console.log('✅ Aplicação principal restaurada')
        }
    }

    /**
     * Imprimir documento
     */
        printDocument(doc) {
            try {
                console.log('🖨️ Imprimindo documento:', doc.title)
                
                if (doc.file_type === 'pdf') {
                    // Para PDFs, usar o iframe existente com configurações otimizadas
                    const iframe = document.getElementById('pdf-viewer')
                    if (iframe) {
                        // Configurar impressão otimizada
                        iframe.contentWindow.focus()
                        iframe.contentWindow.print()
                    } else {
                        // Fallback: abrir em nova janela
                        this.supabase.storage
                            .from('documents')
                            .createSignedUrl(doc.file_path, 3600)
                            .then(({ data: signedUrl, error }) => {
                                if (!error) {
                                    const printWindow = window.open('', '_blank')
                                    printWindow.document.write(`
                                        <html>
                                            <head>
                                                <title>Imprimir - ${doc.title}</title>
                                                <style>
                                                    body { 
                                                        margin: 0; 
                                                        padding: 0; 
                                                        font-family: 'Inter', sans-serif;
                                                    }
                                                    iframe { 
                                                        width: 100%; 
                                                        height: 100vh; 
                                                        border: none; 
                                                    }
                                                    @media print {
                                                        body { margin: 0; }
                                                        iframe { 
                                                            width: 100% !important; 
                                                            height: 100vh !important; 
                                                        }
                                                    }
                                                </style>
                                            </head>
                                            <body>
                                                <iframe src="${signedUrl.signedUrl}"></iframe>
                                            </body>
                                        </html>
                                    `)
                                    printWindow.document.close()
                                    printWindow.focus()
                                    setTimeout(() => printWindow.print(), 1000)
                                }
                            })
                    }
                } else if (doc.file_type === 'html') {
                    // Para HTML, imprimir o conteúdo editável
                    const htmlContent = document.getElementById('html-content')
                    if (htmlContent) {
                        const printWindow = window.open('', '_blank')
                        printWindow.document.write(`
                            <html>
                                <head>
                                    <title>Imprimir - ${doc.title}</title>
                                    <style>
                                        body { 
                                            margin: 0; 
                                            padding: 20px; 
                                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                                            line-height: 1.6;
                                            color: #333;
                                        }
                                        @media print {
                                            body { 
                                                margin: 0; 
                                                padding: 15px; 
                                            }
                                            * { 
                                                -webkit-print-color-adjust: exact !important; 
                                                color-adjust: exact !important; 
                                            }
                                        }
                                    </style>
                                </head>
                                <body>
                                    ${htmlContent.innerHTML}
                                </body>
                            </html>
                        `)
                        printWindow.document.close()
                        printWindow.focus()
                        setTimeout(() => printWindow.print(), 500)
                    }
                } else {
                    // Para outros tipos, mostrar mensagem
                    this.notifications.show('Use o botão "Descargar" para imprimir este tipo de arquivo', 'info')
                }
            } catch (error) {
                console.error('❌ Erro ao imprimir:', error)
                this.notifications.show('Erro ao imprimir documento', 'error')
            }
        }

    /**
     * Editar documento
     */
    editDocument(doc) {
        try {
            console.log('✏️ Editando documento:', doc.title)
            
            if (doc.file_type === 'html') {
                // Para HTML, ativar modo de edição
                this.activateHTMLEditor(doc)
            } else {
                // Para outros tipos, sugerir download
                this.notifications.show('Use o botão "Descargar" para editar este arquivo', 'info')
            }
        } catch (error) {
            console.error('❌ Erro ao editar:', error)
            this.notifications.show('Erro ao editar documento', 'error')
        }
    }

    /**
     * Ativar editor HTML
     */
        activateHTMLEditor(doc) {
            const htmlContent = document.getElementById('html-content')
            if (!htmlContent) {
                this.notifications.show('Conteúdo HTML não encontrado', 'error')
                return
            }

            // Tornar o conteúdo editável
            htmlContent.contentEditable = true
            htmlContent.style.border = '2px solid #667eea'
            htmlContent.style.background = 'white'
            htmlContent.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)'
            htmlContent.focus()

            // Adicionar toolbar de edição profissional
            const toolbar = document.createElement('div')
            toolbar.id = 'html-editor-toolbar'
            toolbar.style.cssText = `
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 16px 20px;
                margin-bottom: 16px;
                border-radius: 12px;
                display: flex;
                gap: 12px;
                align-items: center;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border: 1px solid rgba(255,255,255,0.1);
            `

            toolbar.innerHTML = `
                <div style="display: flex; gap: 8px;">
                    <button id="save-html" style="
                        background: rgba(40, 167, 69, 0.9);
                        color: white;
                        border: 1px solid rgba(255,255,255,0.2);
                        padding: 10px 16px;
                        border-radius: 8px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='#28a745'" onmouseout="this.style.background='rgba(40, 167, 69, 0.9)'">
                        <i class="fas fa-save"></i>
                        Guardar
                    </button>
                    <button id="cancel-edit" style="
                        background: rgba(220, 53, 69, 0.9);
                        color: white;
                        border: 1px solid rgba(255,255,255,0.2);
                        padding: 10px 16px;
                        border-radius: 8px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-weight: 500;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='#dc3545'" onmouseout="this.style.background='rgba(220, 53, 69, 0.9)'">
                        <i class="fas fa-times"></i>
                        Cancelar
                    </button>
                </div>
                <div style="display: flex; gap: 8px; margin-left: auto;">
                    <button id="format-bold" style="
                        background: rgba(255,255,255,0.15);
                        color: white;
                        border: 1px solid rgba(255,255,255,0.2);
                        padding: 8px 12px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">B</button>
                    <button id="format-italic" style="
                        background: rgba(255,255,255,0.15);
                        color: white;
                        border: 1px solid rgba(255,255,255,0.2);
                        padding: 8px 12px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-style: italic;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">I</button>
                    <button id="format-underline" style="
                        background: rgba(255,255,255,0.15);
                        color: white;
                        border: 1px solid rgba(255,255,255,0.2);
                        padding: 8px 12px;
                        border-radius: 6px;
                        cursor: pointer;
                        text-decoration: underline;
                        transition: all 0.2s ease;
                    " onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">U</button>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; margin-left: 16px;">
                    <div style="
                        width: 8px;
                        height: 8px;
                        background: #28a745;
                        border-radius: 50%;
                        animation: pulse 2s infinite;
                    "></div>
                    <span style="font-size: 12px; font-weight: 500;">
                        Modo de edição ativo
                    </span>
                </div>
            `

            // Inserir toolbar antes do conteúdo
            htmlContent.parentNode.insertBefore(toolbar, htmlContent)

            // Event listeners
            document.getElementById('save-html').onclick = () => this.saveHTMLDocument(doc, htmlContent)
            document.getElementById('cancel-edit').onclick = () => this.cancelHTMLEdit(htmlContent, toolbar)
            
            // Formatação básica
            document.getElementById('format-bold').onclick = () => {
                document.execCommand('bold')
                htmlContent.focus()
            }
            document.getElementById('format-italic').onclick = () => {
                document.execCommand('italic')
                htmlContent.focus()
            }
            document.getElementById('format-underline').onclick = () => {
                document.execCommand('underline')
                htmlContent.focus()
            }

            this.notifications.show('Modo de edição ativado. Use a toolbar para formatar o texto.', 'success')
        }

    /**
     * Guardar documento HTML
     */
    async saveHTMLDocument(doc, htmlContent) {
        try {
            console.log('💾 Guardando documento HTML:', doc.title)
            
            const newContent = htmlContent.innerHTML
            
            // Criar blob com o novo conteúdo
            const blob = new Blob([newContent], { type: 'text/html' })
            
            // Fazer upload do novo conteúdo
            const { error: uploadError } = await this.supabase.storage
                .from('documents')
                .update(doc.file_path, blob)

            if (uploadError) {
                throw new Error(uploadError.message)
            }

            // Desativar modo de edição
            this.cancelHTMLEdit(htmlContent, document.getElementById('html-editor-toolbar'))
            
            this.notifications.show('Documento HTML guardado com sucesso!', 'success')
            
        } catch (error) {
            console.error('❌ Erro ao guardar HTML:', error)
            this.notifications.show('Erro ao guardar documento: ' + error.message, 'error')
        }
    }

    /**
     * Cancelar edição HTML
     */
        cancelHTMLEdit(htmlContent, toolbar) {
            // Remover toolbar
            if (toolbar) {
                toolbar.remove()
            }
            
            // Desativar edição
            htmlContent.contentEditable = false
            htmlContent.style.border = '1px solid #e0e0e0'
            htmlContent.style.background = '#fafafa'
            
            this.notifications.show('Edição cancelada', 'info')
        }

        /**
         * Adicionar funcionalidade dinâmica aos botões HTML - VERSÃO AVANÇADA
         */
        addDynamicHTMLFunctionality() {
            const htmlContent = document.getElementById('html-content')
            if (!htmlContent) return

            console.log('🔧 Adicionando funcionalidade dinâmica AVANÇADA aos botões HTML...')

            // 1. DETECTAR TODOS OS BOTÕES DE REMOVER (X vermelhos)
            const removeSelectors = [
                'button[style*="background: red"]',
                'button[style*="color: red"]', 
                'button[style*="background-color: red"]',
                'button[style*="background: #dc3545"]',
                'button[style*="background: #ff0000"]',
                '.btn-danger',
                'button:contains("×")',
                'button:contains("X")',
                'button:contains("x")',
                '[onclick*="remove"]',
                '[onclick*="delete"]',
                '[onclick*="eliminar"]',
                'button[title*="eliminar"]',
                'button[title*="remover"]',
                'button[title*="delete"]'
            ]
            
            removeSelectors.forEach(selector => {
                try {
                    const buttons = htmlContent.querySelectorAll(selector)
                    buttons.forEach(button => {
                        if (button.textContent.includes('×') || button.textContent.includes('X') || 
                            button.textContent.includes('x') || button.style.background.includes('red') ||
                            button.style.background.includes('#dc3545') || button.style.color.includes('red')) {
                            
                            button.onclick = (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                
                                // Encontrar a linha/container pai
                                let row = button.closest('tr') || button.closest('.row') || 
                                         button.closest('div') || button.closest('section') ||
                                         button.closest('li') || button.closest('p')
                                
                                if (row) {
                                    // Animação de remoção
                                    row.style.transition = 'all 0.3s ease'
                                    row.style.opacity = '0'
                                    row.style.transform = 'translateX(-100%)'
                                    
                                    setTimeout(() => {
                                        row.remove()
                                        this.notifications.show('Elemento removido com sucesso!', 'success')
                                    }, 300)
                                }
                            }
                        }
                    })
                } catch (e) {
                    // Ignorar seletores inválidos
                }
            })

            // 2. DETECTAR TODOS OS BOTÕES DE ADICIONAR (verdes com +)
            const addSelectors = [
                'button[style*="background: green"]',
                'button[style*="color: green"]',
                'button[style*="background: #28a745"]',
                'button[style*="background: #198754"]',
                '.btn-success',
                'button:contains("+")',
                'button:contains("Añadir")',
                'button:contains("Adicionar")',
                'button:contains("Add")',
                '[onclick*="add"]',
                '[onclick*="añadir"]',
                '[onclick*="adicionar"]',
                'button[title*="añadir"]',
                'button[title*="adicionar"]',
                'button[title*="add"]'
            ]
            
            addSelectors.forEach(selector => {
                try {
                    const buttons = htmlContent.querySelectorAll(selector)
                    buttons.forEach(button => {
                        if (button.textContent.includes('+') || button.textContent.includes('Añadir') ||
                            button.textContent.includes('Adicionar') || button.textContent.includes('Add') ||
                            button.style.background.includes('green') || button.style.background.includes('#28a745')) {
                            
                            button.onclick = (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                
                                // Encontrar a tabela ou container
                                const table = button.closest('table') || button.closest('.table-container') ||
                                            button.closest('div') || button.closest('section')
                                
                                if (table) {
                                    this.addNewParameterRow(table, button)
                                } else {
                                    this.addNewElement(button)
                                }
                            }
                        }
                    })
                } catch (e) {
                    // Ignorar seletores inválidos
                }
            })

            // 3. DETECTAR BOTÕES DE CONFORMIDADE
            const conformidadSelectors = [
                'button:contains("CONFORME")',
                'button:contains("NO CONFORME")',
                'button:contains("Conforme")',
                'button:contains("No Conforme")',
                '.btn-conforme',
                '[onclick*="conformidad"]',
                '[onclick*="conformidade"]',
                'button[title*="conformidad"]',
                'button[title*="conformidade"]'
            ]
            
            conformidadSelectors.forEach(selector => {
                try {
                    const buttons = htmlContent.querySelectorAll(selector)
                    buttons.forEach(button => {
                        if (button.textContent.includes('CONFORME') || button.textContent.includes('Conforme')) {
                            
                            button.onclick = (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                
                                // Alternar entre CONFORME e NO CONFORME
                                if (button.textContent.includes('CONFORME') && !button.textContent.includes('NO')) {
                                    button.textContent = 'NO CONFORME'
                                    button.style.background = '#dc3545'
                                    button.style.color = 'white'
                                    button.classList.add('no-conforme')
                                } else {
                                    button.textContent = 'CONFORME'
                                    button.style.background = '#28a745'
                                    button.style.color = 'white'
                                    button.classList.remove('no-conforme')
                                }
                                
                                this.notifications.show('Estado de conformidade alterado!', 'info')
                            }
                        }
                    })
                } catch (e) {
                    // Ignorar seletores inválidos
                }
            })

            // 4. DETECTAR INPUTS E CAMPOS EDITÁVEIS
            const inputs = htmlContent.querySelectorAll('input, textarea, select')
            inputs.forEach(input => {
                // Adicionar estilos para indicar que é editável
                input.style.border = '1px solid #007bff'
                input.style.borderRadius = '4px'
                input.style.padding = '4px 8px'
                
                // Adicionar funcionalidade de validação em tempo real
                input.addEventListener('input', (e) => {
                    const value = e.target.value
                    const row = e.target.closest('tr') || e.target.closest('div')
                    
                    if (row) {
                        // Verificar se é um campo de valor numérico
                        if (e.target.type === 'number' || e.target.name?.includes('valor') || e.target.placeholder?.includes('valor')) {
                            this.validateParameterValue(row, value)
                        }
                    }
                })
            })

            // 5. DETECTAR E APLICAR FUNCIONALIDADE A TODOS OS BOTÕES
            const allButtons = htmlContent.querySelectorAll('button')
            allButtons.forEach(button => {
                // Se o botão não tem onclick definido, adicionar funcionalidade baseada no conteúdo
                if (!button.onclick && !button.getAttribute('onclick')) {
                    const text = button.textContent.toLowerCase()
                    
                    if (text.includes('eliminar') || text.includes('remover') || text.includes('delete')) {
                        button.onclick = (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            this.handleGenericRemove(button)
                        }
                    } else if (text.includes('añadir') || text.includes('adicionar') || text.includes('add')) {
                        button.onclick = (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            this.handleGenericAdd(button)
                        }
                    } else if (text.includes('conforme') || text.includes('conformidad')) {
                        button.onclick = (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            this.handleConformidad(button)
                        }
                    }
                }
            })

            console.log('✅ Funcionalidade dinâmica AVANÇADA adicionada aos botões HTML')
        }

        /**
         * Adicionar nova linha de parâmetro
         */
        addNewParameterRow(table, button) {
            // Encontrar o tbody ou container de linhas
            const tbody = table.querySelector('tbody') || table.querySelector('.table-body')
            const lastRow = tbody ? tbody.lastElementChild : table.lastElementChild
            
            if (lastRow) {
                // Clonar a última linha
                const newRow = lastRow.cloneNode(true)
                
                // Limpar valores da nova linha
                const inputs = newRow.querySelectorAll('input, select, textarea')
                inputs.forEach(input => {
                    if (input.type === 'text' || input.type === 'number') {
                        input.value = ''
                    } else if (input.type === 'checkbox') {
                        input.checked = false
                    }
                })
                
                // Atualizar botão de conformidade
                const conformidadBtn = newRow.querySelector('button[style*="CONFORME"]')
                if (conformidadBtn) {
                    conformidadBtn.textContent = 'CONFORME'
                    conformidadBtn.style.background = '#28a745'
                    conformidadBtn.style.color = 'white'
                }
                
                // Adicionar animação
                newRow.style.opacity = '0'
                newRow.style.transform = 'translateY(-20px)'
                
                if (tbody) {
                    tbody.appendChild(newRow)
                } else {
                    table.appendChild(newRow)
                }
                
                // Animação de entrada
                setTimeout(() => {
                    newRow.style.transition = 'all 0.3s ease'
                    newRow.style.opacity = '1'
                    newRow.style.transform = 'translateY(0)'
                }, 10)
                
                // Re-aplicar funcionalidade dinâmica
                setTimeout(() => {
                    this.addDynamicHTMLFunctionality()
                }, 100)
                
                this.notifications.show('Novo parâmetro adicionado!', 'success')
            }
        }

        /**
         * Adicionar novo elemento genérico
         */
        addNewElement(button) {
            const container = button.parentElement
            const newElement = document.createElement('div')
            
            newElement.innerHTML = `
                <div style="
                    background: #f8f9fa;
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    padding: 15px;
                    margin: 10px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    animation: slideIn 0.3s ease;
                ">
                    <div>
                        <strong>Novo Parâmetro</strong>
                        <p style="margin: 5px 0; color: #6c757d;">Valor: <input type="text" placeholder="Digite o valor" style="border: 1px solid #ced4da; border-radius: 4px; padding: 4px 8px;"></p>
                    </div>
                    <button onclick="this.parentElement.remove()" style="
                        background: #dc3545;
                        color: white;
                        border: none;
                        padding: 8px 12px;
                        border-radius: 4px;
                        cursor: pointer;
                    ">×</button>
                </div>
            `
            
            container.insertBefore(newElement, button)
            this.notifications.show('Novo elemento adicionado!', 'success')
        }

        /**
         * Remover elemento genérico
         */
        handleGenericRemove(button) {
            const row = button.closest('tr') || button.closest('div') || button.closest('section') || button.closest('li')
            if (row) {
                row.style.transition = 'all 0.3s ease'
                row.style.opacity = '0'
                row.style.transform = 'translateX(-100%)'
                
                setTimeout(() => {
                    row.remove()
                    this.notifications.show('Elemento removido!', 'success')
                }, 300)
            }
        }

        /**
         * Adicionar elemento genérico
         */
        handleGenericAdd(button) {
            const container = button.closest('div') || button.closest('section') || button.closest('table')
            if (container) {
                this.addNewElement(button)
            }
        }

        /**
         * Lidar com conformidade genérica
         */
        handleConformidad(button) {
            if (button.textContent.includes('CONFORME') && !button.textContent.includes('NO')) {
                button.textContent = 'NO CONFORME'
                button.style.background = '#dc3545'
                button.style.color = 'white'
            } else {
                button.textContent = 'CONFORME'
                button.style.background = '#28a745'
                button.style.color = 'white'
            }
            this.notifications.show('Conformidade alterada!', 'info')
        }

        /**
         * Validar valor de parâmetro em tempo real
         */
        validateParameterValue(row, value) {
            const conformidadBtn = row.querySelector('button[style*="CONFORME"], button:contains("CONFORME")')
            if (conformidadBtn && value) {
                // Lógica simples de validação
                const numValue = parseFloat(value)
                if (!isNaN(numValue)) {
                    // Aqui pode adicionar lógica específica de validação
                    // Por exemplo, verificar se está dentro de um range
                    conformidadBtn.textContent = 'CONFORME'
                    conformidadBtn.style.background = '#28a745'
                    conformidadBtn.style.color = 'white'
                }
            }
        }

    /**
     * Imprimir documento da lista - DIRETO NO SITE
     */
    async printDocumentFromList(documentId) {
        try {
            console.log('🖨️ Imprimindo documento da lista:', documentId)
            
            const doc = await this.documents.getDocument(documentId)
            if (!doc) {
                throw new Error('Documento não encontrado')
            }

            // Abrir o documento no visualizador primeiro
            await this.viewDocument(documentId)
            
            // Aguardar um pouco para o visualizador carregar
            setTimeout(() => {
                // Tentar imprimir o iframe ou conteúdo atual
                const iframe = document.getElementById('pdf-viewer')
                const htmlContent = document.getElementById('html-content')
                
                if (iframe) {
                    // Para PDFs, imprimir o iframe
                    iframe.contentWindow.focus()
                    iframe.contentWindow.print()
                } else if (htmlContent) {
                    // Para HTML, imprimir o conteúdo
                    const printContent = htmlContent.innerHTML
                    const originalContent = document.body.innerHTML
                    
                    // Substituir temporariamente o conteúdo da página
                    document.body.innerHTML = `
                        <div style="
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            padding: 20px;
                        ">
                            ${printContent}
                        </div>
                    `
                    
                    // Imprimir
                    window.print()
                    
                    // Restaurar conteúdo original
                    document.body.innerHTML = originalContent
                    
                    // Recarregar a aplicação
                    window.location.reload()
                } else {
                    this.notifications.show('Conteúdo não encontrado para impressão', 'error')
                }
            }, 1000)
            
        } catch (error) {
            console.error('❌ Erro ao imprimir documento:', error)
            this.notifications.show('Erro ao imprimir documento: ' + error.message, 'error')
        }
    }

    /**
     * Cerrar modal de documento (compatibilidade)
     */
    closeDocumentModal() {
        this.closeDocumentViewer()
    }

    /**
     * Mostrar visualizador de documentos
     */
    showDocumentViewer() {
        this.notifications.show('Visualizador de documentos em desenvolvimento', 'info')
    }

    /**
     * Mostrar opções de download
     */
    showDownloadOptions() {
        this.notifications.show('Opções de download em desenvolvimento', 'info')
    }

    /**
     * Mostrar modal de upload
     */
    showUploadModal() {
        this.uploadManager.showUploadModal(this.currentChapter)
    }

    /**
     * Cerrar modal de upload
     */
    closeUploadModal() {
        this.uploadManager.closeUploadModal()
    }

    /**
     * Cargar capítulos en el sidebar
     */
    loadChaptersInSidebar() {
        const sidebarNav = document.getElementById('sidebar-nav')
        if (!sidebarNav) return

        const chapters = this.chapters.getChaptersData()
        let html = ''

        for (const [id, chapter] of Object.entries(chapters)) {
            html += `
                <div class="chapter-item" data-chapter="${id}">
                    <div class="chapter-icon">
                        <i class="${chapter.icon}"></i>
                    </div>
                    <div class="chapter-info">
                        <div class="chapter-title">${chapter.title}</div>
                        <div class="chapter-count">${chapter.documentCount || 0}</div>
                    </div>
                </div>
            `
        }

        sidebarNav.innerHTML = html

        // Agregar event listeners para los capítulos
        sidebarNav.addEventListener('click', (e) => {
            const chapterItem = e.target.closest('.chapter-item')
            if (chapterItem) {
                const chapterId = parseInt(chapterItem.dataset.chapter)
                this.showChapter(chapterId)
            }
        })
    }

    /**
     * Mostrar contenido de un capítulo específico
     * @param {number} chapterId - ID del capítulo
     */
    async showChapter(chapterId) {
        this.currentChapter = chapterId
        
        // Actualizar título del dashboard
        const dashboardTitle = document.getElementById('dashboard-title')
        if (dashboardTitle) {
            const chapters = this.chapters.getChaptersData()
            const chapter = chapters[chapterId]
            if (chapter) {
                dashboardTitle.textContent = chapter.title
            }
        }

        // Renderizar contenido del capítulo
        const contentArea = document.getElementById('content-area')
        if (contentArea) {
            contentArea.innerHTML = this.chapters.renderChapterContent(chapterId)
            
            // Carregar documentos do capítulo
            await this.loadChapterDocuments(chapterId)
        }

        // Actualizar breadcrumb
        const breadcrumb = document.getElementById('current-breadcrumb')
        if (breadcrumb) {
            const chapters = this.chapters.getChaptersData()
            const chapter = chapters[chapterId]
            if (chapter) {
                breadcrumb.textContent = `Capítulo ${chapterId}: ${chapter.title}`
            }
        }

        // Marcar capítulo como activo en sidebar
        document.querySelectorAll('.chapter-item').forEach(item => {
            item.classList.remove('active')
        })
        const activeItem = document.querySelector(`[data-chapter="${chapterId}"]`)
        if (activeItem) {
            activeItem.classList.add('active')
        }
    }

    /**
     * Carregar documentos de um capítulo
     * @param {number} chapterId - ID do capítulo
     */
    async loadChapterDocuments(chapterId) {
        try {
            console.log(`📁 Carregando documentos do capítulo ${chapterId}`)
            
            // Carregar documentos do Supabase
            const documents = await this.chapters.loadChapterDocuments(chapterId, this.supabase)
            
            // Renderizar documentos
            const documentsGrid = document.getElementById(`documents-grid-${chapterId}`)
            if (documentsGrid) {
                documentsGrid.innerHTML = this.chapters.renderChapterDocuments(documents)
                
                // Adicionar event listeners para ações dos documentos
                this.setupDocumentActionListeners(documentsGrid)
                
                // Forçar re-renderização visual
                documentsGrid.style.opacity = '0'
                setTimeout(() => {
                    documentsGrid.style.opacity = '1'
                    documentsGrid.style.transition = 'opacity 0.3s ease'
                }, 50)
            }
            
            // Carregar documentos dos subcapítulos
            await this.loadSubchapterDocuments(chapterId)
            
            // Atualizar dashboard também
            if (this.dashboard) {
                await this.dashboard.loadRecentDocuments()
                this.dashboard.render()
            }
            
            console.log(`✅ ${documents.length} documentos carregados para o capítulo ${chapterId}`)
        } catch (error) {
            console.error('❌ Erro ao carregar documentos do capítulo:', error)
        }
    }

    /**
     * Carregar documentos dos subcapítulos
     * @param {number} chapterId - ID do capítulo
     */
    async loadSubchapterDocuments(chapterId) {
        try {
            const chapter = this.chapters.getChaptersData()[chapterId]
            if (!chapter || !chapter.subchapters) return

            for (const [subchapterId, title] of Object.entries(chapter.subchapters)) {
                console.log(`📁 Carregando documentos do subcapítulo ${subchapterId}`)
                
                // Carregar documentos do subcapítulo
                const documents = await this.chapters.loadSubchapterDocuments(subchapterId, this.supabase)
                
                // Renderizar documentos do subcapítulo
                const subchapterContainer = document.getElementById(`subchapter-documents-${subchapterId}`)
                if (subchapterContainer) {
                    if (documents.length > 0) {
                        subchapterContainer.innerHTML = this.chapters.renderChapterDocuments(documents)
                        
                        // Adicionar event listeners para ações dos documentos
                        this.setupDocumentActionListeners(subchapterContainer)
                        
                        // Forçar re-renderização visual
                        subchapterContainer.style.opacity = '0'
                        setTimeout(() => {
                            subchapterContainer.style.opacity = '1'
                            subchapterContainer.style.transition = 'opacity 0.3s ease'
                        }, 50)
                    } else {
                        subchapterContainer.innerHTML = `
                            <div class="no-documents-small">
                                <i class="fas fa-folder-open"></i>
                                <p>Nenhum documento</p>
                            </div>
                        `
                    }
                }
            }
        } catch (error) {
            console.error('❌ Erro ao carregar documentos dos subcapítulos:', error)
            // Em caso de erro, remover loading de todos os subcapítulos
            const chapter = this.chapters.getChaptersData()[chapterId]
            if (chapter && chapter.subchapters) {
                for (const [subchapterId, title] of Object.entries(chapter.subchapters)) {
                    const subchapterContainer = document.getElementById(`subchapter-documents-${subchapterId}`)
                    if (subchapterContainer) {
                        subchapterContainer.innerHTML = `
                            <div class="no-documents-small">
                                <i class="fas fa-exclamation-triangle"></i>
                                <p>Erro ao carregar</p>
                            </div>
                        `
                    }
                }
            }
        }
    }

    /**
     * Configurar event listeners para ações dos documentos
     * @param {HTMLElement} container - Container dos documentos
     */
    setupDocumentActionListeners(container) {
        container.addEventListener('click', async (e) => {
            const button = e.target.closest('button[data-action]')
            if (!button) return

            const action = button.dataset.action
            const documentId = button.dataset.documentId || button.dataset.document

            console.log('🔍 Botão clicado:', action, 'ID:', documentId)

            if (!documentId) {
                console.error('❌ ID do documento não encontrado')
                return
            }

            try {
                switch (action) {
                    case 'view':
                        console.log('👁️ Visualizando documento:', documentId)
                        await this.viewDocument(documentId)
                        break
                    case 'download':
                        console.log('📥 Baixando documento:', documentId)
                        await this.downloadDocument(documentId)
                        break
                    case 'print':
                        console.log('🖨️ Imprimindo documento:', documentId)
                        await this.printDocumentFromList(documentId)
                        break
                    case 'delete':
                        console.log('🗑️ Apagando documento:', documentId)
                        await this.deleteDocument(documentId)
                        break
                    case 'remove-from-list':
                        console.log('❌ Removendo da lista:', documentId)
                        await this.removeFromRecentList(documentId)
                        break
                }
            } catch (error) {
                console.error('❌ Erro ao executar ação do documento:', error)
                this.notifications.show(`Erro: ${error.message}`, 'error')
            }
        })
    }

    /**
     * Manejar selección de archivos
     */
    handleFileSelect(event) {
        const files = Array.from(event.target.files)
        this.processFiles(files)
    }

    /**
     * Manejar drag over
     */
    handleDragOver(event) {
        event.preventDefault()
        event.currentTarget.classList.add('dragover')
    }

    /**
     * Manejar drag leave
     */
    handleDragLeave(event) {
        event.currentTarget.classList.remove('dragover')
    }

    /**
     * Manejar drop
     */
    handleDrop(event) {
        event.preventDefault()
        event.currentTarget.classList.remove('dragover')
        
        const files = Array.from(event.dataTransfer.files)
        this.processFiles(files)
    }

    /**
     * Procesar archivos
     */
    async processFiles(files) {
        try {
            if (files.length === 0) return

            // Mostrar progreso
            this.showUploadProgress()

            // Subir archivos
            const results = await this.documents.uploadFiles(files, this.currentChapter)
            
            // Mostrar resultados
            this.showUploadResults(results)

            // Recargar capítulo si estamos en uno
            if (this.currentChapter) {
                await this.loadChapter(this.currentChapter)
            }

        } catch (error) {
            console.error('Error al procesar archivos:', error)
            this.notifications.show('Error al subir archivos', 'error')
        }
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
     * Mostrar resultados de upload
     */
    showUploadResults(results) {
        const resultsDiv = document.getElementById('upload-results')
        if (resultsDiv) {
            resultsDiv.classList.remove('hidden')
            resultsDiv.innerHTML = this.documents.renderUploadResults(results)
        }
    }

    /**
     * Manejar búsqueda
     */
    async handleSearch(query) {
        try {
            if (!query.trim()) return

            const results = await this.documents.searchDocuments(query)
            this.displaySearchResults(results)
        } catch (error) {
            console.error('Error en búsqueda:', error)
        }
    }

    /**
     * Manejar cambio de filtro
     */
    async handleFilterChange(select) {
        try {
            const filterType = select.dataset.filter
            const filterValue = select.value

            const results = await this.documents.filterDocuments(filterType, filterValue)
            this.displaySearchResults(results)
        } catch (error) {
            console.error('Error en filtro:', error)
        }
    }

    /**
     * Mostrar resultados de búsqueda
     */
    displaySearchResults(results) {
        const contentArea = document.getElementById('content-area')
        if (contentArea) {
            const resultsHTML = this.documents.renderSearchResults(results)
            contentArea.innerHTML = resultsHTML
        }
    }

    /**
     * Actualizar capítulo activo en sidebar
     */
    updateActiveChapter(chapterId) {
        const chapterItems = document.querySelectorAll('.chapter-item')
        chapterItems.forEach(item => {
            item.classList.remove('active')
            if (parseInt(item.dataset.chapter) === chapterId) {
                item.classList.add('active')
            }
        })
        this.currentChapter = chapterId
    }

    /**
     * Actualizar breadcrumb
     */
    updateBreadcrumb(text) {
        const breadcrumb = document.getElementById('breadcrumb-text')
        if (breadcrumb) {
            breadcrumb.textContent = text
        }
    }

    /**
     * Ir al dashboard
     */
    goToDashboard() {
        this.loadDashboard()
    }

    /**
     * Alternar sidebar
     */
    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar')
        if (sidebar) {
            sidebar.classList.toggle('open')
        }
    }

    /**
     * Manejar atajos de teclado
     */
    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + K para búsqueda
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault()
            const searchInput = document.querySelector('.search-input')
            if (searchInput) searchInput.focus()
        }

        // Escape para cerrar modales
        if (event.key === 'Escape') {
            this.closeDocumentModal()
            this.closeUploadModal()
        }
    }

    /**
     * Manejar antes de cerrar ventana
     */
    handleBeforeUnload(event) {
        // Guardar estado si es necesario
        if (this.currentUser) {
            localStorage.setItem('lastUser', JSON.stringify(this.currentUser))
        }
    }

    /**
     * Manejar redimensionamiento
     */
    handleResize() {
        // Ajustar layout si es necesario
        const sidebar = document.querySelector('.sidebar')
        if (window.innerWidth < 768 && sidebar) {
            sidebar.classList.remove('open')
        }
    }

    /**
     * Mostrar reportes
     */
    showReports() {
        this.notifications.show('Funcionalidad de reportes en desarrollo', 'info')
    }
}

// Funciones globales para compatibilidad con HTML
window.logout = () => app.handleLogout()
window.goToDashboard = () => app.goToDashboard()
window.toggleSidebar = () => app.toggleSidebar()
window.closeDocumentModal = () => app.closeDocumentModal()
window.closeUploadModal = () => app.closeUploadModal()
window.printDocument = () => app.documents.printCurrentDocument()
window.downloadDocument = () => app.documents.downloadCurrentDocument()

// Inicializar aplicación cuando el DOM esté listo
let app
document.addEventListener('DOMContentLoaded', async () => {
    app = new QualityManagementApp()
    await app.init()
})

// Exportar para uso en otros módulos
// Funções globais para os botões do modal
window.printCurrentDocument = () => {
    const modalBody = document.getElementById('document-modal-body')
    if (modalBody) {
        const printContent = modalBody.innerHTML
        const printWindow = window.open('', '_blank')
        printWindow.document.write(`
            <html>
                <head>
                    <title>Imprimir Documento</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .html-content { max-width: none; }
                    </style>
                </head>
                <body>${printContent}</body>
            </html>
        `)
        printWindow.document.close()
        printWindow.print()
    }
}

window.downloadCurrentDocument = () => {
    if (window.currentDocumentId) {
        app.downloadDocument(window.currentDocumentId)
    }
}

window.closeDocumentModal = () => {
    app.closeDocumentModal()
}

// Adicionar método para remover da lista recente
QualityManagementApp.prototype.removeFromRecentList = async function(documentId) {
    try {
        console.log('❌ Removendo documento da lista recente:', documentId)
        
        // Remover visualmente da lista
        const documentItem = document.querySelector(`[data-document-id="${documentId}"]`)
        if (documentItem) {
            documentItem.style.transition = 'all 0.3s ease'
            documentItem.style.opacity = '0'
            documentItem.style.transform = 'translateX(-100%)'
            
            setTimeout(() => {
                documentItem.remove()
                this.notifications.show('Documento removido da lista recente', 'success')
            }, 300)
        }
        
        // Recarregar lista recente
        if (this.dashboard) {
            await this.dashboard.loadRecentDocuments()
            this.dashboard.render()
        }
        
    } catch (error) {
        console.error('❌ Erro ao remover da lista:', error)
        this.notifications.show('Erro ao remover da lista: ' + error.message, 'error')
    }
}

export default QualityManagementApp
