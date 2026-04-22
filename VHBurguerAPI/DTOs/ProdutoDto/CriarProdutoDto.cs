namespace VHBurguer.DTOs.ProdutoDto
{
    public class CriarProdutoDto
    {
        public string Nome { get; set; } = null!;

        public decimal Preco { get; set; }

        public string Descricao { get; set; } = null!;

        // A Imagem vem via multipart/form-data, ideal para upload de arquivo
        public IFormFile Imagem { get; set; }

        public List<int> CategoriaIds { get; set; } = new();
    }
}
