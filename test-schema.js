// Teste do schema da base de dados
import { supabase } from './assets/js/supabase.js'

async function testSchema() {
    try {
        console.log('🔍 Testando schema da base de dados...')
        
        // Verificar se a tabela documents existe
        const { data: tables, error: tablesError } = await supabase
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_name', 'documents')

        if (tablesError) {
            console.error('❌ Erro ao verificar tabelas:', tablesError)
            return
        }

        console.log('✅ Tabela documents existe:', tables.length > 0)

        // Verificar colunas da tabela documents
        const { data: columns, error: columnsError } = await supabase
            .from('information_schema.columns')
            .select('column_name, data_type, is_nullable')
            .eq('table_name', 'documents')
            .order('ordinal_position')

        if (columnsError) {
            console.error('❌ Erro ao verificar colunas:', columnsError)
            return
        }

        console.log('📋 Colunas da tabela documents:')
        columns.forEach(col => {
            console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`)
        })

        // Verificar se subchapter_id é UUID
        const subchapterColumn = columns.find(col => col.column_name === 'subchapter_id')
        if (subchapterColumn) {
            console.log(`⚠️ subchapter_id é do tipo: ${subchapterColumn.data_type}`)
            if (subchapterColumn.data_type === 'uuid') {
                console.log('❌ PROBLEMA: subchapter_id é UUID mas estamos enviando strings como "1.1"')
                console.log('💡 SOLUÇÃO: Executar o script fix-subchapter-id.sql no Supabase')
            }
        }

    } catch (error) {
        console.error('❌ Erro inesperado:', error)
    }
}

testSchema()
