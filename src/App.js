import React,{useEffect,useState} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const responce = await api.post('repositories',{
      title: `Repositório ${Date.now()}`,
      url: `http://github.com/${Date.now()}...`,
      techs: ["Node.js", "..."]
    });

    const repositorie = responce.data;
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(repositorie => repositorie.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
    

    
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repositorie => <li key={repositorie.id}>
          {repositorie.title} <button onClick={() => handleRemoveRepository(repositorie.id)}> Remover </button>
          </li>)}        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
