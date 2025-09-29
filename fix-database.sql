-- Script para corrigir a tabela documents no Supabase
-- Execute este script no SQL Editor do Supabase

-- Adicionar coluna mime_type se não existir
ALTER TABLE documents 
ADD COLUMN IF NOT EXISTS mime_type VARCHAR(255);

-- Verificar se a tabela documents existe e tem as colunas necessárias
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'documents' 
ORDER BY ordinal_position;

-- Inserir dados de exemplo para testar
INSERT INTO documents (title, file_name, file_path, file_size, file_type, mime_type, chapter_id, uploaded_by)
VALUES (
    'Teste de Upload',
    'teste.pdf',
    'documents/teste.pdf',
    1024,
    'pdf',
    'application/pdf',
    1,
    'user-001'
) ON CONFLICT DO NOTHING;
