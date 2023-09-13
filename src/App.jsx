import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
  const [things, setThings] = useState([]);

  useEffect(()=> {
    const fetchThings = async()=> {
      const response = await axios.get('https://profs-things-api.onrender.com/api/things');
      setThings(response.data);
    };
    fetchThings();
  },[]);

  const create = async()=> {
    const thing = {
      name: `Thing Number ${Math.round(Math.random()*1000)}`
    };
    const response = await axios.post('https://profs-things-api.onrender.com/api/things', thing);
    //need to create a new array with the response.data
    setThings([...things, response.data]);
  };

  return (
    <>
      <h1>Profs Things Web ({ things.length })</h1>
      <button onClick={ create }>Create Random Thing</button>
      <ul>
        {
          things.map( (thing)=> {
            return (
              <li key={thing.id}>
                {
                  thing.name
                }
              </li>
            );
          })
        }
      </ul>
    </>
  )
}

export default App
