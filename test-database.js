import { supabase } from './assets/js/supabase.js';

async function testDatabase() {
    console.log('🔍 Testando estrutura da base de dados...');
    
    try {
        // Testar se a tabela documents existe e tem as colunas corretas
        const { data: documents, error: docsError } = await supabase
            .from('documents')
            .select('*')
            .limit(1);
            
        if (docsError) {
            console.error('❌ Erro ao acessar tabela documents:', docsError);
            return;
        }
        
        console.log('✅ Tabela documents acessível');
        
        // Testar se a tabela subchapters existe
        const { data: subchapters, error: subError } = await supabase
            .from('subchapters')
            .select('*')
            .limit(1);
            
        if (subError) {
            console.error('❌ Erro ao acessar tabela subchapters:', subError);
            return;
        }
        
        console.log('✅ Tabela subchapters acessível');
        
        // Verificar se há documentos com subchapter_id
        const { data: docsWithSubchapter, error: subDocsError } = await supabase
            .from('documents')
            .select('id, title, chapter_id, subchapter_id')
            .not('subchapter_id', 'is', null);
            
        if (subDocsError) {
            console.error('❌ Erro ao verificar documentos com subchapter_id:', subDocsError);
            return;
        }
        
        console.log(`✅ ${docsWithSubchapter.length} documentos com subchapter_id encontrados`);
        
        if (docsWithSubchapter.length > 0) {
            console.log('📄 Documentos com subcapítulo:');
            docsWithSubchapter.forEach(doc => {
                console.log(`  - ${doc.title} (Capítulo: ${doc.chapter_id}, Subcapítulo: ${doc.subchapter_id})`);
            });
        }
        
    } catch (error) {
        console.error('❌ Erro inesperado:', error);
    }
}

testDatabase();

