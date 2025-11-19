import { useState, useEffect } from "react";
import api from "./api";
import Swal from "sweetalert2";

function Cuidados() {
  const [cuidados, setCuidados] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  const [novoCuidado, setNovoCuidado] = useState({
    nomeCuidado: "",
    descricao: "",
    frequencia: "Diária",
  });

  useEffect(() => {
    carregarCuidados();
  }, []);

  async function carregarCuidados() {
    try {
      const resposta = await api.get("/cuidados");
      setCuidados(resposta.data);
    } catch (erro) {
      Swal.fire("Erro", "Erro ao carregar lista de cuidados.", "error");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (idEditando) {
        await api.put(`/cuidados/${idEditando}`, {
          ...novoCuidado,
          id: idEditando,
        });
        Swal.fire("Sucesso!", "Cuidado atualizado com sucesso.", "success");
      } else {
        await api.post("/cuidados", novoCuidado);
        Swal.fire("Sucesso!", "Cuidado cadastrado com sucesso.", "success");
      }

      limparFormulario();
      carregarCuidados();
    } catch (erro) {
      console.error(erro);
      Swal.fire("Erro", "Ocorreu um erro ao salvar.", "error");
    }
  }

  async function deletarCuidado(id) {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/cuidados/${id}`);
        Swal.fire("Deletado!", "O registro foi removido.", "success");
        carregarCuidados();
      } catch (erro) {
        Swal.fire("Erro", "Erro ao deletar.", "error");
      }
    }
  }

  function prepararEdicao(cuidado) {
    setIdEditando(cuidado.id);
    setNovoCuidado({
      nomeCuidado: cuidado.nomeCuidado,
      descricao: cuidado.descricao || "",
      frequencia: cuidado.frequencia,
    });
  }

  function limparFormulario() {
    setIdEditando(null);
    setNovoCuidado({ nomeCuidado: "", descricao: "", frequencia: "Diária" });
  }

  function handleInputChange(e) {
    setNovoCuidado({ ...novoCuidado, [e.target.name]: e.target.value });
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Gestão de Cuidados Veterinários</h2>

      <div className="card p-4 mb-5 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>{idEditando ? "Editar Procedimento" : "Novo Procedimento"}</h4>
          {idEditando && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={limparFormulario}
            >
              Cancelar Edição
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nome do Cuidado</label>
            <input
              type="text"
              name="nomeCuidado"
              className="form-control"
              placeholder="Ex: Vacinação, Banho"
              required
              onChange={handleInputChange}
              value={novoCuidado.nomeCuidado}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Frequência</label>
            <select
              name="frequencia"
              className="form-select"
              onChange={handleInputChange}
              value={novoCuidado.frequencia}
            >
              <option value="Diária">Diária</option>
              <option value="Semanal">Semanal</option>
              <option value="Mensal">Mensal</option>
              <option value="Anual">Anual</option>
              <option value="Sob Demanda">Sob Demanda</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Descrição</label>
            <textarea
              name="descricao"
              className="form-control"
              rows="2"
              onChange={handleInputChange}
              value={novoCuidado.descricao}
            ></textarea>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className={`btn ${idEditando ? "btn-warning" : "btn-success"}`}
            >
              {idEditando ? "Atualizar Cuidado" : "Salvar Cuidado"}
            </button>
          </div>
        </form>
      </div>

      <h4 className="mb-3">Procedimentos Cadastrados</h4>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Nome</th>
            <th>Frequência</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cuidados.map((cuidado) => (
            <tr key={cuidado.id}>
              <td>{cuidado.nomeCuidado}</td>
              <td>
                <span className="badge bg-info text-dark">
                  {cuidado.frequencia}
                </span>
              </td>
              <td>{cuidado.descricao}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => prepararEdicao(cuidado)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deletarCuidado(cuidado.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cuidados;
