// Teste simples de upload
import { supabase } from './assets/js/supabase.js'

async function testUpload() {
    try {
        console.log('🧪 Testando upload simples...')
        
        // Criar um arquivo de teste
        const testContent = '<html><body><h1>Teste HTML</h1><p>Este é um documento de teste.</p></body></html>'
        const blob = new Blob([testContent], { type: 'text/html' })
        const fileName = `teste-${Date.now()}.html`
        const filePath = `documents/${fileName}`
        
        console.log('📁 Nome do arquivo:', fileName)
        console.log('📂 Caminho:', filePath)
        
        // Upload para Storage
        console.log('☁️ Fazendo upload para Storage...')
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, blob)
            
        if (uploadError) {
            console.error('❌ Erro no upload:', uploadError)
            return
        }
        
        console.log('✅ Upload para Storage OK:', uploadData)
        
        // Salvar metadados na BD
        console.log('💾 Salvando metadados...')
        const documentData = {
            title: fileName,
            file_name: fileName,
            file_path: filePath,
            file_size: blob.size,
            file_type: 'html',
            chapter_id: 1,
            uploaded_by: null
        }
        
        const { data: docData, error: docError } = await supabase
            .from('documents')
            .insert(documentData)
            .select()
            
        if (docError) {
            console.error('❌ Erro ao salvar metadados:', docError)
            return
        }
        
        console.log('✅ Metadados salvos:', docData)
        console.log('🎉 Teste de upload concluído com sucesso!')
        
    } catch (error) {
        console.error('❌ Erro inesperado:', error)
    }
}

testUpload()
