-- Corrigir tipo de dados do subchapter_id
-- O campo subchapter_id deve ser VARCHAR em vez de UUID

-- Primeiro, verificar o tipo atual
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'documents' AND column_name = 'subchapter_id';

-- Alterar o tipo de dados para VARCHAR
ALTER TABLE documents 
ALTER COLUMN subchapter_id TYPE VARCHAR(50);

-- Verificar se a alteração foi aplicada
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'documents' AND column_name = 'subchapter_id';
