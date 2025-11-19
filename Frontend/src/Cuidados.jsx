import { useState, useEffect } from "react";
import api from "./api";

function Cuidados() {
  const [cuidados, setCuidados] = useState([]);
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
      console.error("Erro ao buscar cuidados:", erro);
      alert("Erro ao carregar lista de cuidados.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/cuidados", novoCuidado);
      alert("Cuidado cadastrado com sucesso!");
      setNovoCuidado({ nomeCuidado: "", descricao: "", frequencia: "Diária" });
      carregarCuidados();
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
      alert("Erro ao cadastrar cuidado.");
    }
  }

  async function deletarCuidado(id) {
    if (confirm("Tem certeza que deseja excluir este cuidado?")) {
      try {
        await api.delete(`/cuidados/${id}`);
        carregarCuidados();
      } catch (erro) {
        alert("Erro ao deletar.");
      }
    }
  }

  function handleInputChange(e) {
    setNovoCuidado({ ...novoCuidado, [e.target.name]: e.target.value });
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Gestão de Cuidados Veterinários</h2>

      <div className="card p-4 mb-5 shadow-sm">
        <h4>Novo Procedimento</h4>
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
            <button type="submit" className="btn btn-primary">
              Salvar Cuidado
            </button>
          </div>
        </form>
      </div>

      <h4 className="mb-3">Procedimentos Cadastrados</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
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
