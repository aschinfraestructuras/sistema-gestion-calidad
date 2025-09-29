/**
 * ========================================
 * SISTEMA DE AUTENTICACIÓN
 * Sistema de Gestión de Calidad ASCH-OHLA
 * ========================================
 */

/**
 * Clase para manejar la autenticación
 */
export class AuthManager {
    constructor(supabase) {
        this.supabase = supabase
        this.currentUser = null
    }

    /**
     * Login con usuario, contraseña y código
     * @param {string} username - Nombre de usuario
     * @param {string} password - Contraseña
     * @param {string} code - Código de acceso
     * @returns {Promise<Object|null>} - Usuario autenticado o null
     */
    async login(username, password, code) {
        try {
            // Validar credenciales básicas
            if (!username || !password || !code) {
                throw new Error('Todos los campos son obligatorios')
            }

            // Simular autenticación (en un sistema real usaríamos Supabase Auth)
            // Por ahora usamos credenciales fijas para evitar conflictos
            const validCredentials = this.validateCredentials(username, password, code)
            
            if (validCredentials) {
                this.currentUser = {
                    id: 'user-001',
                    name: 'José Antunes',
                    email: 'jose.antunes@asch-ohla.com',
                    role: 'admin',
                    permissions: ['read', 'write', 'delete', 'admin']
                }
                
                // Guardar en localStorage
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
                
                return this.currentUser
            } else {
                throw new Error('Credenciales inválidas')
            }
        } catch (error) {
            console.error('Error en login:', error)
            throw error
        }
    }

    /**
     * Validar credenciales
     * @param {string} username - Usuario
     * @param {string} password - Contraseña
     * @param {string} code - Código
     * @returns {boolean} - True si son válidas
     */
    validateCredentials(username, password, code) {
        // Credenciales fijas para evitar conflictos
        const validUsers = [
            { username: 'jose', password: 'admin123', code: 'ASCH2024' },
            { username: 'admin', password: 'admin123', code: 'ASCH2024' },
            { username: 'calidad', password: 'calidad123', code: 'ASCH2024' }
        ]

        return validUsers.some(user => 
            user.username === username && 
            user.password === password && 
            user.code === code
        )
    }

    /**
     * Obtener usuario actual
     * @returns {Promise<Object|null>} - Usuario actual o null
     */
    async getCurrentUser() {
        try {
            // Primero verificar si hay usuario en memoria
            if (this.currentUser) {
                return this.currentUser
            }

            // Verificar localStorage
            const storedUser = localStorage.getItem('currentUser')
            if (storedUser) {
                this.currentUser = JSON.parse(storedUser)
                return this.currentUser
            }

            return null
        } catch (error) {
            console.error('Error al obtener usuario actual:', error)
            return null
        }
    }

    /**
     * Logout
     * @returns {Promise<boolean>} - True si fue exitoso
     */
    async logout() {
        try {
            this.currentUser = null
            localStorage.removeItem('currentUser')
            return true
        } catch (error) {
            console.error('Error en logout:', error)
            return false
        }
    }

    /**
     * Verificar si el usuario tiene un permiso específico
     * @param {string} permission - Permiso a verificar
     * @returns {boolean} - True si tiene el permiso
     */
    hasPermission(permission) {
        if (!this.currentUser) return false
        return this.currentUser.permissions.includes(permission) || 
               this.currentUser.permissions.includes('admin')
    }

    /**
     * Verificar si el usuario es administrador
     * @returns {boolean} - True si es admin
     */
    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin'
    }
}
