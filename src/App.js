import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: Date.now(),
      title: 'Repo '+Date.now(),
      url: 'www.github.com/'+Date.now(),
      techs: ['ReactJS','NodeJS','React Native', Date.now()]
    })
    setRepositories([...repositories,response.data])

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const newRepositories = repositories.filter(repo => repo.id !== id)
    setRepositories(newRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
