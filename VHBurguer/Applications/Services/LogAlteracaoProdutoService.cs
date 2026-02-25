using VHBurguer.Domains;
using VHBurguer.DTOs.LogProdutoDto;
using VHBurguer.Interfaces;

namespace VHBurguer.Applications.Services
{
    public class LogAlteracaoProdutoService
    {
        private readonly ILogAlteracaoProdutoRepository _repository;

        public LogAlteracaoProdutoService(ILogAlteracaoProdutoRepository repository)
        {
            _repository = repository;
        }

        public List<LerLogProdutoDto> Listar()
        {
            List<Log_AlteracaoProduto> logs = _repository.Listar();

            List<LerLogProdutoDto> listaLogProduto = logs.Select(l => new LerLogProdutoDto
            {
                LogID = l.Log_AlteracaoProdutoID,
                ProdutoID = l.FK_ProdutoID,
                NomeAnterior = l.NomeAnterior,
                PrecoAnterior = l.PrecoAnterior,
                DataAlteracao = l.DataAlteracao
            }).ToList();

            return listaLogProduto;
        }

        public List<LerLogProdutoDto> ListarPorProduto(int produtoId)
        {
            List<Log_AlteracaoProduto> logs = _repository.ListarPorProduto(produtoId);

            List<LerLogProdutoDto> listaLogProduto = logs.Select(l => new LerLogProdutoDto
            {
                LogID = l.Log_AlteracaoProdutoID,
                ProdutoID = l.FK_ProdutoID,
                NomeAnterior = l.NomeAnterior,
                PrecoAnterior = l.PrecoAnterior,
                DataAlteracao = l.DataAlteracao
            }).ToList();

            return listaLogProduto;
        }
    }
}
