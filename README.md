 🧪 Projeto de Testes Automatizados - Raro Labs (SauceDemo)

Este projeto contém a automação de testes de interface desenvolvida como parte da prova técnica de QA para a Raro Labs. Os testes cobrem cenários funcionais da aplicação [SauceDemo](https://www.saucedemo.com/), utilizando o framework Cypress.

---

## ✔️ Descrição do Projeto

O objetivo é validar o comportamento da aplicação nas funcionalidades principais:
- Login com diferentes perfis de usuário
- Ordenação de produtos
- Adição e remoção de itens do carrinho
- Fluxo completo de compra
- Verificação de mensagens de erro e comportamento anômalo com usuários como `error_user` e `locked_out_user`

---

## 🧪 Tecnologias usadas

- [Cypress](https://www.cypress.io/) para automação de testes E2E
- JavaScript
- Node.js

---

## 📋 Casos de Teste Cobertos

- ✅ Login
  - ✅ Login com sucesso
  - ❌ Login com usuário inválido, senha inválida e bloqueado
  - ✅ Validação de mensagens de erro
- ✅ Ordenação de produtos:
  - Nome (A-Z / Z-A)
  - Preço (menor → maior / maior → menor)
- ✅ Fluxo de compra completo:
  - Login → carrinho → checkout → finalização
- ✅ Cenários específicos para `error_user`

---

## 🔧 Como rodar os testes

### Pré-requisitos
- Node.js instalado
- Git instalado

### Passos:

```bash
# 1. Clonar o projeto
git clone https://github.com/MayannaRF/TestSaucedemo.git

# 2. Entrar na pasta do projeto
cd TestSaucedemo

# 3. Instalar dependências
npm install

# 4. Rodar o Cypress em modo interativo
npx cypress open

# ou em modo headless
npx cypress run
