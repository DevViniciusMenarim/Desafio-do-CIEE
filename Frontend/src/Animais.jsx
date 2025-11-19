import { useState, useEffect } from "react";
import api from "./api";

function Animais() {
  const [animais, setAnimais] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  const [novoAnimal, setNovoAnimal] = useState({
    nome: "",
    descricao: "",
    dataNascimento: "",
    especie: "",
    habitat: "",
    paisOrigem: "",
  });

  useEffect(() => {
    carregarAnimais();
  }, []);

  async function carregarAnimais() {
    try {
      const resposta = await api.get("/animais");
      setAnimais(resposta.data);
    } catch (erro) {
      alert("Erro ao buscar animais. Verifique o backend.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (idEditando) {
        await api.put(`/animais/${idEditando}`, {
          ...novoAnimal,
          id: idEditando,
        });
        alert("Animal atualizado com sucesso!");
      } else {
        await api.post("/animais", novoAnimal);
        alert("Animal cadastrado com sucesso!");
      }

      limparFormulario();
      carregarAnimais();
    } catch (erro) {
      console.error("Erro ao salvar:", erro);
      alert("Erro ao salvar animal.");
    }
  }

  async function deletarAnimal(id) {
    if (confirm("Tem certeza que deseja excluir este animal?")) {
      try {
        await api.delete(`/animais/${id}`);
        carregarAnimais();
      } catch (erro) {
        alert("Erro ao deletar.");
      }
    }
  }

  function prepararEdicao(animal) {
    setIdEditando(animal.id);
    setNovoAnimal({
      nome: animal.nome,
      descricao: animal.descricao || "",
      dataNascimento: animal.dataNascimento
        ? animal.dataNascimento.split("T")[0]
        : "",
      especie: animal.especie,
      habitat: animal.habitat,
      paisOrigem: animal.paisOrigem,
    });
  }

  function limparFormulario() {
    setIdEditando(null);
    setNovoAnimal({
      nome: "",
      descricao: "",
      dataNascimento: "",
      especie: "",
      habitat: "",
      paisOrigem: "",
    });
  }

  function handleInputChange(e) {
    setNovoAnimal({ ...novoAnimal, [e.target.name]: e.target.value });
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Gerenciamento de Zoológico</h2>

      <div className="card p-4 mb-5 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>{idEditando ? "Editar Animal" : "Cadastrar Novo Animal"}</h4>
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
            <label className="form-label">Nome</label>
            <input
              type="text"
              name="nome"
              className="form-control"
              required
              onChange={handleInputChange}
              value={novoAnimal.nome}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Espécie</label>
            <input
              type="text"
              name="especie"
              className="form-control"
              required
              onChange={handleInputChange}
              value={novoAnimal.especie}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Habitat</label>
            <input
              type="text"
              name="habitat"
              className="form-control"
              required
              onChange={handleInputChange}
              value={novoAnimal.habitat}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">País de Origem</label>
            <input
              type="text"
              name="paisOrigem"
              className="form-control"
              required
              onChange={handleInputChange}
              value={novoAnimal.paisOrigem}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Data Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              className="form-control"
              required
              onChange={handleInputChange}
              value={novoAnimal.dataNascimento}
            />
          </div>
          <div className="col-md-8">
            <label className="form-label">Descrição</label>
            <input
              type="text"
              name="descricao"
              className="form-control"
              onChange={handleInputChange}
              value={novoAnimal.descricao}
            />
          </div>
          <div className="col-12">
            <button
              type="submit"
              className={`btn ${idEditando ? "btn-warning" : "btn-success"}`}
            >
              {idEditando ? "Atualizar Animal" : "Salvar Animal"}
            </button>
          </div>
        </form>
      </div>

      <h4 className="mb-3">Animais Cadastrados</h4>
      <table className="table table-striped table-hover bordered">
        <thead className="table-dark">
          <tr>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Habitat</th>
            <th>Origem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {animais.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.nome}</td>
              <td>{animal.especie}</td>
              <td>{animal.habitat}</td>
              <td>{animal.paisOrigem}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => prepararEdicao(animal)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deletarAnimal(animal.id)}
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

export default Animais;
