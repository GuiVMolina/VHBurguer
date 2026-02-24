using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VHBurguer.Applications.Services;
using VHBurguer.DTOs.ProdutoDto;
using VHBurguer.Exceptions;

namespace VHBurguer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoService _service;

        public ProdutoController(ProdutoService service)
        {
            _service = service;
        }

        // Autenticação do usuário
        private int ObterUsuarioIdLogado()
        {
            // Busca no token/claims o valor armazenado como ID do usuário
            // ClaimTypes.NameIdentifier geralmente guarda o ID do usuário no JWT
            string? idTexto = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(idTexto))
            {
                throw new DomainException("Usuário não autenticado.");
            }

            // Converte o ID que veio como texto para inteiro
            // Nosso FK_UsuarioID no sistema está como int
            // As Claims (informações do usuário dentro do token) sempre são armazenadas como texto
            return int.Parse(idTexto);
        }

        [HttpGet]
        public ActionResult<List<LerProdutoDto>> Listar()
        {
            List<LerProdutoDto> produtos = _service.Listar();

            // return StatusCode(200, produtos);
            return Ok(produtos);
        }

        [HttpGet("{id}")]
        public ActionResult<LerProdutoDto> ObterPorId(int id)
        {
            LerProdutoDto produto = _service.ObterPorId(id);

            if (produto == null)
            {
                // return StatusCode(404);
                return NotFound();
            }

            return Ok(produto);
        }

        [HttpGet("{id}/Imagem")]
        public ActionResult ObterImagem(int id)
        {
            try
            {
                var imagem = _service.ObterImagem(id);

                // Retorna o arquivo para o navegador
                // "image/jpeg" informa o tipa da imagem (MIME type)
                // O navegador entende que deve renderizar como imagem
                return File(imagem, "image/jpeg");
            }
            catch (DomainException ex)
            {
                // NotFound - Não encontrado
                return NotFound(ex.Message);
            }
        }

        [HttpPost]

        // Indica que recebe no formato multipart/form-data
        // É necessário quando enviamos arquivos
        [Consumes("multipart/form-data")]

        // Exige login para adicionar produtos
        [Authorize]
        
        // [FromForm] - Diz que os dados vem da requisição (multipart/form-data)
        public ActionResult Adicionar([FromForm] CriarProdutoDto produtoDto) {
            try
            {
                int usuarioId = ObterUsuarioIdLogado();

                // Cadastro fica associado ao usuário logado
                _service.Adicionar(produtoDto, usuarioId);

                return StatusCode(201); // Created
            }
            catch (DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        [Authorize]
        public ActionResult Atualizar(int id, [FromForm] AtualizarProdutoDto produtoDto)
        {
            try
            {
               _service.Atualizar(id, produtoDto);

                return NoContent();
            }
            catch (DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult Remover(int id) {
            try
            {
                _service.Remover(id);

                return NoContent();
            }
            catch (DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
