/* CTRL + K > CTRL + C = Comenta */
/* CTRL + K > CTRL + U = Tira o comentário */

-- USE master;
-- GO

-- IF DB_ID('VH_Burguer') IS NOT NULL
--	DROP DATABASE VH_Burguer
-- GO

-- CREATE DATABASE VH_Burguer
-- GO

USE VH_Burguer
GO

CREATE TABLE Usuario (
	UsuarioID		INT PRIMARY KEY IDENTITY,
	Nome			VARCHAR(60) NOT NULL,
	Email			VARCHAR(150) UNIQUE NOT NULL,
	Senha			VARBINARY(32) NOT NULL,
	StatusUsuario	BIT DEFAULT 1 NOT NULL
)
GO

CREATE TABLE Produto (
	ProdutoID		INT PRIMARY KEY IDENTITY,
	Nome			VARCHAR(100) UNIQUE NOT NULL,
	Descricao		NVARCHAR(MAX) NOT NULL,
	Preco			DECIMAL(10,2) NOT NULL,
	Imagem			VARBINARY(MAX) NOT NULL,
	StatusProduto	BIT DEFAULT 1 NOT NULL,
	FK_UsuarioID	INT FOREIGN KEY REFERENCES Usuario(UsuarioID)
)
GO

CREATE TABLE Categoria (
	CategoriaID		INT PRIMARY KEY IDENTITY,
	Nome			VARCHAR(50) NOT NULL
)
GO

CREATE TABLE ProdutoCategoria (
	-- • Chave Composta • --

		-- 1. Criar os Atributos
		ProdutoID		INT NOT NULL,
		CategoriaID		INT NOT NULL,

		-- 2. Aplicar as constraints
		CONSTRAINT PK_ProdutoCategoria
			PRIMARY KEY (ProdutoID, CategoriaID),

		CONSTRAINT FK_ProdutoCategoria_Produto
			FOREIGN KEY (ProdutoID)
				REFERENCES Produto(ProdutoID) ON DELETE CASCADE,

		CONSTRAINT FK_ProdutoCategoria_Categoria
			FOREIGN KEY (CategoriaID)
				REFERENCES Categoria(CategoriaID) ON DELETE CASCADE,
)
GO

CREATE TABLE Promocao (
	PromocaoID		INT PRIMARY KEY IDENTITY,
	Nome			VARCHAR(100) NOT NULL,
	DataExpiracao	DATETIME2(0) NOT NULL,
	StatusPromocao	BIT DEFAULT 1 NOT NULL
)
GO

CREATE TABLE ProdutoPromocao (
	ProdutoID		INT NOT NULL,
	PromocaoID		INT NOT NULL,
	PrecoAtual		DECIMAL(10,2),

	CONSTRAINT PK_ProdutoPromocao
			PRIMARY KEY (ProdutoID, PromocaoID),

		CONSTRAINT FK_ProdutoPromocao_Produto
			FOREIGN KEY (ProdutoID)
				REFERENCES Produto(ProdutoID) ON DELETE CASCADE,

		CONSTRAINT FK_ProdutoPromocao_Promocao
			FOREIGN KEY (PromocaoID)
				REFERENCES Promocao(PromocaoID) ON DELETE CASCADE,
)
GO

CREATE TABLE Log_AlteracaoProduto (
	Log_AlteracaoProdutoID INT PRIMARY KEY IDENTITY,
	DataAlteracao DATETIME NOT NULL,
	NomeAnterior VARCHAR(100),
	PrecoAnterior DECIMAL(10,2),
	FK_ProdutoID INT FOREIGN KEY REFERENCES Produto(ProdutoID)
)
GO

-- • Criação das TRIGGERS • --

-- DELETE -> Excluir o Usuario = Inativar o Usuario -> StatusUsuario = 0
CREATE TRIGGER trg_ExclusaoUsuario
ON Usuario
INSTEAD OF DELETE
AS
BEGIN
	UPDATE us SET StatusUsuario = 0
	FROM Usuario us
	INNER JOIN deleted d
		ON d.UsuarioID = us.UsuarioID
END
GO
-- TODA VEZ QUE FOR ALTERADO A TABELA PRODUTO,
-- É CRIADO UM REGISTRO NA TABELA LOG

CREATE TRIGGER trg_AlteracaoProduto
ON Produto
AFTER UPDATE
AS
BEGIN
	INSERT INTO Log_AlteracaoProduto
	(DataAlteracao, FK_ProdutoID, NomeAnterior, PrecoAnterior)
	SELECT GETDATE(), ProdutoID, Nome, Preco FROM deleted
END
GO

-- DELETE -> Excluir o Produto = Inativar o Produto -> StatusUsuario = 0
CREATE TRIGGER trg_ExclusaoProduto
ON Produto
INSTEAD OF DELETE
AS
BEGIN
	UPDATE p SET StatusProduto = 0
	FROM Produto p
	INNER JOIN deleted d
		ON d.ProdutoID = p.ProdutoID
END
GO

INSERT INTO Usuario (Nome, Email, Senha)
	VALUES 
	('Carlos Lima', 'carlos@vhburguer.com', HASHBYTES('SHA2_256', 'admin@123'));
GO

INSERT INTO Categoria (Nome)
	VALUES
	('Vegetariano'),
	('Vegano'),
	('Especial');
GO

INSERT INTO Produto (Nome, Preco, Descricao, Imagem, FK_UsuarioID)
VALUES
('VH Classic Burger', 29.90, 'Hamburguer artesanal com pão brioche, carne e queijo cheddar.', CONVERT(VARBINARY(MAX), 'imagem aleatoria'), 1),
('VH Bacon Supreme', 34.90, 'Hambúrguer bovino, bacon crocante, queijo e molho especial da casa.', CONVERT(VARBINARY(MAX), 'imagem aleatoria'), 1),
('Batata Rústica', 14.90, 'Batatas rústicas temperadas com ervas finas.', CONVERT(VARBINARY(MAX), 'imagem aleatoria'), 1);
GO

SELECT * FROM Produto

INSERT INTO ProdutoCategoria (ProdutoID, CategoriaID)
VALUES
(1, 3), 
(2, 3), 
(3, 1),
(3, 3),
(3, 2);
GO

INSERT INTO Promocao (Nome, DataExpiracao)
VALUES
('Promoção Semana do Hambúrguer', '2026-03-01 23:59:59'),
('Combo Happy Hour', '2026-02-20 23:59:59');
GO

INSERT INTO ProdutoPromocao (ProdutoID, PromocaoID, PrecoAtual)
VALUES
(1, 1, 24.90), -- VH Classic Burger
(2, 1, 29.90), -- VH Bacon Supreme
(3, 2, 9.90); -- Batata Rústica
GO