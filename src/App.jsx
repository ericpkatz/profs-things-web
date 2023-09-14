import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Thing from './Thing';
import ThingsByLetter from './ThingsByLetter';



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

  const updateThing = async(thing)=> {
    const response = await axios.put(`https://profs-things-api.onrender.com/api/things/${thing.id}`, thing);
    const updatedThing = response.data;
    setThings(things.map(thing => thing.id !== updatedThing.id ? thing : updatedThing));
  };

  return (
    <>
      <h1><Link to='/'>Profs Things Web </Link>({ things.length })</h1>
      <Link to='/things/startingWith/b'>Things Starting With B</Link>
      <Link to='/things/startingWith/g'>Things Starting With G</Link>
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
        <Route path='/things/:id' element={ <Thing updateThing={ updateThing } destroyThing={ destroyThing } things={ things } />} />
        <Route path='/things/startingWith/:alpha' element={ <ThingsByLetter things={ things }/> } />
      </Routes>
    </>
  )
}

export default App
