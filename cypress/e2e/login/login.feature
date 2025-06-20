Feature: Tela de Login

  Scenario: Login com usuário válido
    Given que estou na página de login
    When eu preencho o usuário "standard_user" e a senha "secret_sauce"
    And clico no botão de login
    Then devo ser redirecionado para a página de produtos
    And o título da página deve ser "Products"

  Scenario: Login com usuário inválido
    Given que estou na página de login
    When eu preencho o usuário "user_invalid" e a senha "secret_sauce"
    And clico no botão de login
    Then deve ser exibida a mensagem "Username and password do not match"

  Scenario: Login com usuário bloqueado
    Given que estou na página de login
    When eu preencho o usuário "locked_out_user" e a senha "secret_sauce"
    And clico no botão de login
    Then deve ser exibida a mensagem "Sorry, this user has been locked out."

  Scenario: Login com senha inválida
    Given que estou na página de login
    When eu preencho o usuário "standard_user" e a senha "password_invalid"
    And clico no botão de login
    Then deve ser exibida a mensagem "Username and password do not match"

  Scenario: Tentativa de login com campos vazios
    Given que estou na página de login
    When eu clico no botão de login sem preencher os campos
    Then deve ser exibida uma mensagem de erro na tela