# Atualizações do Painel Administrativo

Implementamos novas funcionalidades no Painel Administrativo para torná-lo mais profissional e completo. Agora você pode:

- Gerenciar Depoimentos (Adicionar, editar, remover e fazer upload de imagens).
- Gerenciar Perguntas Frequentes (FAQ).
- Alterar a foto principal dos sócios via upload direto.

## Passos Necessários para Ativar (IMPORTANTE)

Para que o upload de imagens e os novos campos funcionem, você precisa realizar algumas configurações no seu projeto Supabase:

### 1. Criar o Bucket de Armazenamento (Storage)

1. Acesse o painel do Supabase do seu projeto.
2. No menu lateral, clique em **Storage**.
3. Clique em **New Bucket**.
4. Nomeie o bucket como `images`.
5. **IMPORTANTE**: Marque a opção "Public bucket" (para que as imagens possam ser visualizadas no site).
6. Clique em **Save**.

### 2. Atualizar o Banco de Dados

1. No menu lateral do Supabase, clique em **SQL Editor**.
2. Clique em **New query**.
3. Copie e cole o conteúdo do arquivo `supabase_migration.sql` (localizado na raiz do projeto).
4. Clique em **Run**.

Isso irá adicionar as colunas necessárias para salvar os depoimentos e FAQs no banco de dados.

### 3. Testar

Após realizar os passos acima:

1. Faça login no painel administrativo (`/admin`).
2. Tente fazer o upload de uma imagem na aba "Conteúdo" ou "Depoimentos".
3. Tente adicionar uma nova pergunta no FAQ.
4. Clique em "Salvar Alterações".
5. Verifique no site se as alterações foram refletidas.
