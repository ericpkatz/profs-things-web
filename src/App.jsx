import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Thing from './Thing';


function App() {
  const [things, setThings] = useState([]);
  const navigate = useNavigate();

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
    navigate(`/things/${response.data.id}`);
  };

  const destroyThing = async(thing)=> {
    await axios.delete(`https://profs-things-api.onrender.com/api/things/${thing.id}`);
    setThings(things.filter(_thing=> _thing.id !== thing.id));
    navigate('/');
  };

  return (
    <>
      <h1><Link to='/'>Profs Things Web </Link>({ things.length })</h1>
      <button onClick={ create }>Create Random Thing</button>
      <ul>
        {
          things.map( (thing)=> {
            return (
              <li key={thing.id}>
                <Link to={`/things/${thing.id}`}>
                  {
                    thing.name
                  }
                </Link>
              </li>
            );
          })
        }
      </ul>
      <Routes>
        <Route path='/things/:id' element={ <Thing destroyThing={ destroyThing } things={ things } />} />
      </Routes>
    </>
  )
}

export default App
