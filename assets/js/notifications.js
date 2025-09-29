/**
 * ========================================
 * SISTEMA DE NOTIFICACIONES
 * Sistema de Gestión de Calidad ASCH-OHLA
 * ========================================
 */

/**
 * Clase para manejar notificaciones
 */
export class NotificationManager {
    constructor() {
        this.notifications = []
        this.container = null
        this.init()
    }

    /**
     * Inicializar el sistema de notificaciones
     */
    init() {
        // Crear contenedor de notificaciones si no existe
        if (!document.getElementById('notifications-container')) {
            const container = document.createElement('div')
            container.id = 'notifications-container'
            container.className = 'notifications-container'
            document.body.appendChild(container)
            this.container = container
        } else {
            this.container = document.getElementById('notifications-container')
        }
    }

    /**
     * Mostrar notificación
     * @param {string} message - Mensaje de la notificación
     * @param {string} type - Tipo de notificación (success, error, warning, info)
     * @param {number} duration - Duración en milisegundos (0 = no auto-close)
     */
    show(message, type = 'info', duration = 5000) {
        const notification = this.createNotification(message, type)
        this.container.appendChild(notification)
        this.notifications.push(notification)

        // Animar entrada
        setTimeout(() => {
            notification.classList.add('show')
        }, 100)

        // Auto-close si se especifica duración
        if (duration > 0) {
            setTimeout(() => {
                this.hide(notification)
            }, duration)
        }

        return notification
    }

    /**
     * Crear elemento de notificación
     * @param {string} message - Mensaje
     * @param {string} type - Tipo
     * @returns {HTMLElement} - Elemento de notificación
     */
    createNotification(message, type) {
        const notification = document.createElement('div')
        notification.className = `notification ${type}`
        
        const icon = this.getIcon(type)
        const title = this.getTitle(type)
        
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-icon">
                    <i class="${icon}"></i>
                </div>
                <div class="notification-title">${title}</div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-message">${message}</div>
        `

        return notification
    }

    /**
     * Ocultar notificación
     * @param {HTMLElement} notification - Elemento de notificación
     */
    hide(notification) {
        notification.classList.remove('show')
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification)
            }
            const index = this.notifications.indexOf(notification)
            if (index > -1) {
                this.notifications.splice(index, 1)
            }
        }, 300)
    }

    /**
     * Obtener icono según tipo
     * @param {string} type - Tipo de notificación
     * @returns {string} - Clase de icono
     */
    getIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        }
        return icons[type] || icons.info
    }

    /**
     * Obtener título según tipo
     * @param {string} type - Tipo de notificación
     * @returns {string} - Título
     */
    getTitle(type) {
        const titles = {
            success: 'Éxito',
            error: 'Error',
            warning: 'Advertencia',
            info: 'Información'
        }
        return titles[type] || titles.info
    }

    /**
     * Limpiar todas las notificaciones
     */
    clear() {
        this.notifications.forEach(notification => {
            this.hide(notification)
        })
    }

    /**
     * Mostrar notificación de éxito
     * @param {string} message - Mensaje
     * @param {number} duration - Duración
     */
    success(message, duration = 5000) {
        return this.show(message, 'success', duration)
    }

    /**
     * Mostrar notificación de error
     * @param {string} message - Mensaje
     * @param {number} duration - Duración
     */
    error(message, duration = 7000) {
        return this.show(message, 'error', duration)
    }

    /**
     * Mostrar notificación de advertencia
     * @param {string} message - Mensaje
     * @param {number} duration - Duración
     */
    warning(message, duration = 6000) {
        return this.show(message, 'warning', duration)
    }

    /**
     * Mostrar notificación de información
     * @param {string} message - Mensaje
     * @param {number} duration - Duración
     */
    info(message, duration = 5000) {
        return this.show(message, 'info', duration)
    }
}
