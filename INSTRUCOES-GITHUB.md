# 📋 Instruções para Subir o Projeto para GitHub

## 🚀 Passos para Upload

### 1. Abrir Terminal/PowerShell
- Pressione `Win + R`
- Digite `cmd` ou `powershell`
- Navegue para a pasta do projeto:
```bash
cd "C:\Users\José Antunes\sistema-gestion-calidad"
```

### 2. Configurar Git (se necessário)
```bash
git config --global user.name "José Antunes"
git config --global user.email "seu@email.com"
```

### 3. Inicializar Repositório
```bash
git init
```

### 4. Adicionar Arquivos
```bash
git add .
```

### 5. Fazer Commit
```bash
git commit -m "Sistema de Gestión de Calidad ASCH-OHLA - Versión Profesional Completa"
```

### 6. Configurar Branch Principal
```bash
git branch -M main
```

### 7. Adicionar Remote
```bash
git remote add origin https://github.com/aschinfraestructuras/sistema-gestion-calidad.git
```

### 8. Fazer Push
```bash
git push -u origin main
```

## 🔧 Alternativa: Usar Scripts

### Opção 1: Script Batch
```bash
upload-to-github.bat
```

### Opção 2: Script PowerShell
```powershell
.\upload-to-github.ps1
```

## 📁 Arquivos Criados

✅ **README.md** - Documentação do projeto
✅ **.gitignore** - Arquivos a ignorar
✅ **upload-to-github.bat** - Script batch para upload
✅ **upload-to-github.ps1** - Script PowerShell para upload

## 🌐 Repositório

**URL**: https://github.com/aschinfraestructuras/sistema-gestion-calidad

## 🎯 Próximos Passos

1. **Verificar** o repositório no GitHub
2. **Configurar** deploy no Vercel
3. **Testar** o sistema online
4. **Compartilhar** com a equipe

## ❓ Problemas Comuns

### Erro de Autenticação
- Usar **Personal Access Token** do GitHub
- Configurar credenciais no Git

### Erro de Permissão
- Verificar se tem acesso ao repositório
- Contactar administrador do GitHub

### Erro de Conexão
- Verificar conexão à internet
- Tentar usar SSH em vez de HTTPS

## 🆘 Suporte

Se tiver problemas, execute os comandos um por um e me diga qual erro aparece!
