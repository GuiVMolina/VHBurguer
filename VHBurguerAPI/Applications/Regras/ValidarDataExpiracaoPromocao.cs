using VHBurguer.Exceptions;

namespace VHBurguer.Applications.Regras
{
    public class ValidarDataExpiracaoPromocao
    {
        public static void ValidarDataExpericao(DateTime dataExpiracao)
        {
            if (dataExpiracao <= DateTime.Now)
            {
                throw new DomainException("Data de expiração deve ser futura.");
            }
        }
    }
}
