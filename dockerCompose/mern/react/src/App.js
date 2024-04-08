import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tutorials, setTutorials] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:7070/api/tutorials')
        .then(response => {
          setTutorials(response.data);
        })
        .catch(error => console.error(`Error: ${error}`));
  }, []);

  return (
      <div className="App">
        <h1>Tutorials</h1>
        {tutorials && tutorials.map(tutorial => (
            <div key={tutorial._id}>
              <h2>{tutorial.title}</h2>
              <p>{tutorial.description}</p>
            </div>
        ))}
      </div>
  );
}

export default App;