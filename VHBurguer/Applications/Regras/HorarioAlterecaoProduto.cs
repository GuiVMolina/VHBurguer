using VHBurguer.Exceptions;

namespace VHBurguer.Applications.Regras
{
    public class HorarioAlterecaoProduto
    {
        public static void ValidarHorario()
        {
            var agora = DateTime.Now.TimeOfDay;
            var abertura = new TimeSpan(10, 0, 0);
            var fechamento = new TimeSpan(23, 0, 0);

            // Retorna true ou false
            var estaAberto = agora >= abertura
                          && agora <= fechamento;

            // Caso retorne true...
            if(estaAberto)
            {
                throw new DomainException("Produto só pode ser alterado fora do horário de funcionamento.");
            }
        }
    }
}
