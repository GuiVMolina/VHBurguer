using System.Security.Cryptography;
using System.Text;
using VHBurguer.Domains;
using VHBurguer.DTOs;
using VHBurguer.Exceptions;
using VHBurguer.Interfaces;

namespace VHBurguer.Applications.Services
{
    // Service concentra o "como fazer"
    public class UsuarioService
    {
        // _repository é o canal para acessar os dados
        private readonly IUsuarioRepository _repository;

        // Injeção de dependências
        // Implementamos o repositório e o service só depende da interface
        public UsuarioService(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        // O private serve para o método que não é regra de negócio e não faz sentido existir fora do UsuarioService
        private static LerUsuarioDto LerDto(Usuario usuario)
        {
            LerUsuarioDto lerUsuario = new LerUsuarioDto
            {
                UsuarioID = usuario.UsuarioID,
                Nome = usuario.Nome,
                Email = usuario.Email,
                StatusUsuario = usuario.StatusUsuario
            };

            return lerUsuario;
        }

        public List<LerUsuarioDto> Listar()
        {
            List<Usuario> usuarios = _repository.Listar();

            //SELECT que percorre cada Usuario e LerDto(usuario)
            //ToList(); - Devolve uma lista de DTOs
            List<LerUsuarioDto> usuarioDto = usuarios
                .Select(usuarioBanco => LerDto(usuarioBanco))
                .ToList();
            return usuarioDto;
        }

        private static void ValidarEmail(string email)
        {
            if(string.IsNullOrEmpty(email) || !email.Contains("@"))
            {
                throw new DomainException("Email inválido.");
            }
        }

        private static byte[] HashSenha(string senha)
        {
            if (string.IsNullOrWhiteSpace(senha))
            {
                throw new DomainException("Senha é obrigatória.");
            }

            // Gera um hash SHA256 e devolve em byte[]
            using var sha256 = SHA256.Create();
            return sha256.ComputeHash(Encoding.UTF8.GetBytes(senha));
        }

        public LerUsuarioDto ObterPorId(int id)
        {
            Usuario usuario = _repository.ObterPorID(id);

            if(usuario == null)
            {
                throw new Exception("Usuário não existe.");
            }

            // Se existe usuário, converte para Dto e devolve usuário
            return LerDto(usuario);
        }
    }
}
