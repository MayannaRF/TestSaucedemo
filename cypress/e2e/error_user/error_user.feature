Feature: Fluxo completo de compra com usuário problemático "error_user"

  Background:
    Given que estou na página de login
    When eu faço login com o usuário "error_user" e a senha "secret_sauce"
    Then devo ser redirecionado para a página do inventário

  Scenario: Garantir que todos os botões "Add to cart" funcionem corretamente
    When eu clico em todos os botões "Add to cart" disponíveis
    Then o número de itens no carrinho deve ser igual ao número de produtos adicionados

  Scenario: Garantir que os botões "Remove" funcionem corretamente
    When eu adiciono todos os produtos ao carrinho
    And eu removo cada produto um a um utilizando os botões "Remove"
    Then todos os produtos devem ser removidos do carrinho

  Scenario: Validar os botões na tela "Your Cart"
    When eu adiciono o primeiro produto ao carrinho
    And eu acesso a página do carrinho
    Then devo ver o botão "Continue Shopping" funcional
    When eu clico em "Continue Shopping"
    Then devo voltar para a página do inventário
    When eu acesso novamente a página do carrinho
    Then devo ver o botão "Checkout" funcional
    When eu clico em "Checkout"
    Then devo ser levado para a página de checkout (step one)
    When eu volto para a página do carrinho
    Then devo ver o botão "Remove" funcional para remover o produto
    When eu removo o produto do carrinho
    Then o carrinho deve estar vazio e o ícone do carrinho deve desaparecer

  Scenario: Garantir que todos os campos do checkout podem ser preenchidos
    When eu adiciono o primeiro produto ao carrinho
    And eu acesso a página do carrinho
    And eu avanço para o checkout (step one)
    And eu preencho o formulário com nome "Name", sobrenome "Last" e CEP "12345"
    Then devo ser levado para o checkout (step two)

  Scenario: Finalizar compra no Checkout: Overview
    When eu adiciono o primeiro produto ao carrinho
    And eu acesso a página do carrinho
    And eu avanço para o checkout (step one)
    And eu preencho o formulário com nome "Name" e CEP "12345" (sobrenome não preenchido por erro)
    Then devo ser levado para o checkout (step two)
    When eu verifico que o produto está no resumo
    And eu finalizo a compra
    Then devo ver a mensagem de sucesso "Thank you for your order!"