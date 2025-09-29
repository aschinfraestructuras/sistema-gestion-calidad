/**
 * ========================================
 * CONFIGURACIÓN SUPABASE
 * Sistema de Gestión de Calidad ASCH-OHLA
 * ========================================
 */

import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const SUPABASE_CONFIG = {
    url: 'https://gfmfgqttahsmmrbbhqsh.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmbWZncXR0YWhzbW1yYmJocXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MjM3NzQsImV4cCI6MjA3NDM5OTc3NH0.3Of25qo4SbJt4ioKio8UTL-XKjKn8svs8Ba3yH8N6IM'
}

// Crear cliente Supabase
export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey)

// Configuración de Storage
export const STORAGE_CONFIG = {
    bucket: 'documents',
    maxFileSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/html',
        'text/plain',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
    ]
}

// Configuración de la base de datos
export const DB_CONFIG = {
    tables: {
        documents: 'documents',
        dynamic_forms: 'dynamic_forms',
        users: 'users',
        chapters: 'chapters',
        subchapters: 'subchapters'
    }
}

/**
 * Verificar conexión con Supabase
 * @returns {Promise<boolean>} - True si la conexión es exitosa
 */
export async function testSupabaseConnection() {
    try {
        const { data, error } = await supabase
            .from('documents')
            .select('count')
            .limit(1)
        
        if (error) {
            console.error('Error de conexión Supabase:', error)
            return false
        }
        
        console.log('✅ Conexión Supabase exitosa')
        return true
    } catch (error) {
        console.error('Error de conexión Supabase:', error)
        return false
    }
}

/**
 * Obtener URL pública de un archivo
 * @param {string} filePath - Ruta del archivo en Storage
 * @returns {string} - URL pública del archivo
 */
export function getPublicUrl(filePath) {
    const { data } = supabase.storage
        .from(STORAGE_CONFIG.bucket)
        .getPublicUrl(filePath)
    
    return data.publicUrl
}

/**
 * Obtener URL firmada para descarga
 * @param {string} filePath - Ruta del archivo en Storage
 * @param {number} expiresIn - Tiempo de expiración en segundos (default: 3600)
 * @returns {Promise<string>} - URL firmada para descarga
 */
export async function getSignedUrl(filePath, expiresIn = 3600) {
    try {
        const { data, error } = await supabase.storage
            .from(STORAGE_CONFIG.bucket)
            .createSignedUrl(filePath, expiresIn)
        
        if (error) {
            console.error('Error al crear URL firmada:', error)
            return null
        }
        
        return data.signedUrl
    } catch (error) {
        console.error('Error al crear URL firmada:', error)
        return null
    }
}

/**
 * Validar tipo de archivo
 * @param {File} file - Archivo a validar
 * @returns {boolean} - True si el tipo es válido
 */
export function validateFileType(file) {
    return STORAGE_CONFIG.allowedTypes.includes(file.type)
}

/**
 * Validar tamaño de archivo
 * @param {File} file - Archivo a validar
 * @returns {boolean} - True si el tamaño es válido
 */
export function validateFileSize(file) {
    return file.size <= STORAGE_CONFIG.maxFileSize
}

/**
 * Obtener tipo de archivo basado en MIME type
 * @param {string} mimeType - MIME type del archivo
 * @returns {string} - Tipo de archivo (pdf, word, excel, html, image)
 */
export function getFileType(mimeType) {
    const typeMap = {
        'application/pdf': 'pdf',
        'application/msword': 'word',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
        'application/vnd.ms-excel': 'excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'excel',
        'text/html': 'html',
        'text/plain': 'html'
    }
    
    // Verificar si es una imagen
    if (mimeType.startsWith('image/')) {
        return 'image'
    }
    
    return typeMap[mimeType] || 'unknown'
}

/**
 * Obtener icono para tipo de archivo
 * @param {string} fileType - Tipo de archivo
 * @returns {string} - Clase de icono Font Awesome
 */
export function getFileIcon(fileType) {
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

/**
 * Formatear tamaño de archivo
 * @param {number} bytes - Tamaño en bytes
 * @returns {string} - Tamaño formateado (KB, MB, GB)
 */
export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Generar nombre único para archivo
 * @param {string} originalName - Nombre original del archivo
 * @returns {string} - Nombre único con timestamp
 */
export function generateUniqueFileName(originalName) {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    const extension = originalName.split('.').pop()
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '')
    
    return `${timestamp}-${random}-${nameWithoutExt}.${extension}`
}

/**
 * Configurar políticas de Storage (para administradores)
 * @returns {Promise<boolean>} - True si se configuraron correctamente
 */
export async function setupStoragePolicies() {
    try {
        // Esta función sería llamada por un administrador
        // para configurar las políticas de Storage
        console.log('Configurando políticas de Storage...')
        
        // Las políticas se configuran en el dashboard de Supabase
        // o mediante SQL directo
        
        return true
    } catch (error) {
        console.error('Error al configurar políticas de Storage:', error)
        return false
    }
}

/**
 * Limpiar archivos huérfanos (para mantenimiento)
 * @returns {Promise<number>} - Número de archivos eliminados
 */
export async function cleanupOrphanedFiles() {
    try {
        // Obtener todos los archivos en Storage
        const { data: files, error: listError } = await supabase.storage
            .from(STORAGE_CONFIG.bucket)
            .list('', { limit: 1000 })
        
        if (listError) {
            console.error('Error al listar archivos:', listError)
            return 0
        }
        
        // Obtener referencias en la base de datos
        const { data: dbFiles, error: dbError } = await supabase
            .from(DB_CONFIG.tables.documents)
            .select('file_path')
        
        if (dbError) {
            console.error('Error al obtener archivos de BD:', dbError)
            return 0
        }
        
        const dbFilePaths = new Set(dbFiles.map(file => file.file_path))
        const orphanedFiles = files.filter(file => !dbFilePaths.has(file.name))
        
        // Eliminar archivos huérfanos
        let deletedCount = 0
        for (const file of orphanedFiles) {
            const { error: deleteError } = await supabase.storage
                .from(STORAGE_CONFIG.bucket)
                .remove([file.name])
            
            if (!deleteError) {
                deletedCount++
            }
        }
        
        console.log(`✅ Eliminados ${deletedCount} archivos huérfanos`)
        return deletedCount
    } catch (error) {
        console.error('Error al limpiar archivos huérfanos:', error)
        return 0
    }
}

// Exportar configuración para uso en otros módulos
export default {
    supabase,
    STORAGE_CONFIG,
    DB_CONFIG,
    testSupabaseConnection,
    getPublicUrl,
    getSignedUrl,
    validateFileType,
    validateFileSize,
    getFileType,
    getFileIcon,
    formatFileSize,
    generateUniqueFileName,
    setupStoragePolicies,
    cleanupOrphanedFiles
}
