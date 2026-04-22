using VHBurguer.Domains;
using VHBurguer.DTOs.ProdutoDto;

namespace VHBurguer.Applications.Conversoes
{
    public class ProdutoParaDto
    {
        public static LerProdutoDto ConverterParaDto(Produto produto)
        {
            return new LerProdutoDto
            {
                ProdutoID = produto.ProdutoID,
                Nome = produto.Nome,
                Preco = produto.Preco,
                Descricao = produto.Descricao,
                StatusProduto = produto.StatusProduto,

                CategoriaIds = produto.Categoria.Select(categoria => categoria.CategoriaID).ToList(),

                Categorias = produto.Categoria.Select(categoria => categoria.Nome).ToList(),

                UsuarioID = produto.FK_UsuarioID,
                UsuarioNome = produto.FK_Usuario.Nome,
                UsuarioEmail = produto.FK_Usuario.Email
            };
        }
    }
}
