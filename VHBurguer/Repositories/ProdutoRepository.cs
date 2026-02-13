using Microsoft.EntityFrameworkCore;
using VHBurguer.Contexts;
using VHBurguer.Domains;
using VHBurguer.Interfaces;

namespace VHBurguer.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly VH_BurguerContext _context;

        public ProdutoRepository(VH_BurguerContext context)
        {
            _context = context;
        }

        public List<Produto> Listar()
        {
            List<Produto> produtos = _context.Produto

            // Busca produtos, para cada produto traz as suas categorias
                .Include(produto => produto.Categoria)

                // Busca produtos, para cada produto traz as seus usuários
                .Include(produto => produto.FK_UsuarioID)
                .ToList();

            return produtos;
        }

        public Produto ObterPorID(int id)
        {
            Produto? produto = _context.Produto
                .Include(produtoDb => produtoDb.Categoria)
                .Include(produtoDb => produtoDb.FK_UsuarioID)

            // Procura no banco (aux produtoDb) e verifica se o ID do produto no
            // banco é igual ao ID passado como parâmentro no méetodo ObterPorID
            .FirstOrDefault(produtoDb => produtoDb.ProdutoID == id);

            return produto;
        }

        public bool NomeExiste(string nome, int? produtoIdAtual = null)
        {
            // AsQueryable() - Monta a consulta para executar passo a passo
            // Monta a consulta na tabela produto e não executa nada no banco ainda
            var produtoConsultado = _context.Produto.AsQueryable();

            // Se o produto atual tiver valor, então atualizamos o produto
            if (produtoIdAtual.HasValue)
            {
                produtoConsultado = produtoConsultado.Where(produto => produto.ProdutoID != produtoIdAtual.Value);
            }

            return produtoConsultado.Any(produto => produto.Nome == nome);
        }

        public byte[] ObterImagem(int id)
        {
            var produto = _context.Produto
                .Where(produto => produto.ProdutoID == id)
                .Select(produto => produto.Imagem)
                .FirstOrDefault();

            return produto;
        }

        public void Adicionar(Produto produto, List<int> categoriaIds)
        {
            List<Categoria> categorias = _context.Categoria

                // .Contains - Retorna true se houver registro
                .Where(categoria => categoriaIds.Contains(categoria.CategoriaID))
                .ToList();

            // Adiciona as categorias incluidas ao produto
            produto.Categoria = categorias;

            _context.Produto.Add(produto);
            _context.SaveChanges();
        }

        public void Atualizar(Produto produto, List<int> categoriaIds)
        {
            Produto? produtoBanco = _context.Produto
                .Include(produto => produto.Categoria)
                .FirstOrDefault(produtoAux => produtoAux.ProdutoID == produto.ProdutoID);
            if (produtoBanco == null)
            {
                return;
            }
            produtoBanco.Nome = produto.Nome;
            produtoBanco.Preco = produto.Preco;
            produtoBanco.Descricao = produto.Descricao;

            if (produto.Imagem != null && produto.Imagem.Length > 0)
            {
                produtoBanco.Imagem = produto.Imagem;
            }

            if (produto.StatusProduto.HasValue)
            {
                produtoBanco.StatusProduto = produto.StatusProduto;
            }

            // Busca toas as categorias no banco com id igual
            // das categorias que vieram da requisição/front
            var categorias = _context.Categoria
                .Where(categoria => categoriaIds.Contains(categoria.CategoriaID))
                .ToList();

            // Clear() - Remove as ligações atuais entre o produto e as categorias
            // Ele não apaga a categoria do banco, só remove o vínculo com a tabela ProdutoCategoria
            produtoBanco.Categoria.Clear();

            foreach (var categoria in categorias)
            {
                produtoBanco.Categoria.Add(categoria);
            }

            _context.SaveChanges();
        }

        public void Remover(int id)
        {
            Produto produto = _context.Produto.FirstOrDefault(produto => produto.ProdutoID == id);

            if (produto == null)
            {
                return;
            }

            _context.Produto.Remove(produto);
            _context.SaveChanges();
        }
    }
}