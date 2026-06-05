// Validar se existe um cardápio na tela
describe("Tela Home", () => {
  // Definir cenário de testes
  it("Deve carregar a tela home e mostrar produtos", () => {
    // Abrir a tela do navegador
    cy.visit("http://localhost:3000/home");
    // Verifica se o texto cardápio aparece na tela
    cy.contains("Cardápio").should("be.visible");
  });
});

// Verificar se aparece mensagem de erro ao clicar no botão cadastrar
// Sem preencher campo nenhum
describe("Cadastro de produto", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[type='email']").type("admin@admin.com");
    cy.get("input[type='password']").type("123456");
    cy.contains("Entrar").click();
  });

  // Testando o cadastro
  it("deve mostrar erro ao tentar cadastrar sem preencher os campos", () => {
    cy.visit("http://localhost:3000/produto");
    cy.get("button").contains("Salvar").click();
    cy.contains("Nome é obrigatório.").should("be.visible");
  });
});

// Testando cadastro de produto
describe("Cadastro de produto", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[type='email']").type("admin@admin.com");
    cy.get("input[type='password']").type("123456");
    cy.contains("Entrar").click();
  });

  it("deve cadastrar um produto com dados válidos", () => {
    cy.visit("http://localhost:3000/produto");

    cy.get("input[name='nome']").type("X-Bacon3");
    cy.get("textarea[name='descricao']").type("Lanche com bacon e queijo");
    cy.get("input[name='preco']").type("25");

    cy.contains("label", "Vegetariano").click();

    cy.get("input[type='file']").selectFile("cypress/fixtures/produto.jpg");

    cy.contains("button", "Salvar").click();

    cy.contains("Produto cadastrado!").should("be.visible");

    cy.visit("http://localhost:3000/home");
    cy.contains("X-Bacon3").should("be.visible");
  });
});
