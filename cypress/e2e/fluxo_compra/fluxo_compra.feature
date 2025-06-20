Feature: Fluxo completo de compra no site

  Scenario: Usuário realiza uma compra com sucesso
    Given que estou na página de login
    When eu faço login com o usuário "standard_user" e a senha "secret_sauce"
    And eu adiciono o primeiro produto ao carrinho
    And eu acesso a página do carrinho
    And eu avanço para o checkout
    And eu preencho meus dados com nome "Name", sobrenome "Last" e CEP "12345"
    And eu finalizo a compra
    Then devo ver a mensagem de sucesso "Thank you for your order!"