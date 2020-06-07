import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      id: "",
      url: "",
      title: "",
      techs: [],
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.get("repositories", {});
    const repositories = response.data;
    const projectIndex = repositories.findIndex(
      (repository) => repository.id === id
    );
    repositories.splice(projectIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <form>
      <ul data-testid="repository-list">
        <>
          {repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(123)}>
                Remover
              </button>
            </li>
          ))}
        </>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </form>
  );
}

export default App;
