/**
 * Script para verificar e configurar Supabase
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gfmfgqttahsmmrbbhqsh.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmbWZncXR0YWhzbW1yYmJocXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MjM3NzQsImV4cCI6MjA3NDM5OTc3NH0.3Of25qo4SbJt4ioKio8UTL-XKjKn8svs8Ba3yH8N6IM'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function checkSupabase() {
    console.log('🔍 Verificando configuração do Supabase...')
    
    try {
        // 1. Verificar conexão
        console.log('1. Testando conexão...')
        const { data, error } = await supabase.from('chapters').select('id').limit(1)
        if (error) {
            console.error('❌ Erro de conexão:', error.message)
            return
        }
        console.log('✅ Conexão OK')
        
        // 2. Verificar bucket
        console.log('2. Verificando bucket "documents"...')
        const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
        if (bucketError) {
            console.error('❌ Erro ao listar buckets:', bucketError.message)
            return
        }
        
        const documentsBucket = buckets.find(b => b.name === 'documents')
        if (!documentsBucket) {
            console.log('⚠️ Bucket "documents" não existe. Criando...')
            const { data: newBucket, error: createError } = await supabase.storage.createBucket('documents', {
                public: true
            })
            if (createError) {
                console.error('❌ Erro ao criar bucket:', createError.message)
                return
            }
            console.log('✅ Bucket "documents" criado com sucesso')
        } else {
            console.log('✅ Bucket "documents" existe')
        }
        
        // 3. Verificar tabelas
        console.log('3. Verificando tabelas...')
        const tables = ['chapters', 'documents', 'users']
        for (const table of tables) {
            const { data, error } = await supabase.from(table).select('*').limit(1)
            if (error) {
                console.log(`⚠️ Tabela "${table}" não existe ou tem problemas:`, error.message)
            } else {
                console.log(`✅ Tabela "${table}" OK`)
            }
        }
        
        console.log('🎉 Verificação concluída!')
        
    } catch (error) {
        console.error('❌ Erro geral:', error.message)
    }
}

checkSupabase()
