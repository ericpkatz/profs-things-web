import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

const Thing = ({ things, destroyThing, updateThing })=> {
  const params = useParams();
  const id = params.id*1;
  const thing = things.find(thing => thing.id === id);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(()=> {
    const thing = things.find(thing => thing.id === id);
    if(thing){
      setName(thing.name);
      setError('');
    }
  }, [things, id]);

  if(!thing){
    return null;
  }

  const save = async(ev)=> {
    ev.preventDefault();
    const thing = { id, name };
    try {
      await updateThing(thing);
    }
    catch(ex){
      setError(ex.response.data.error);
    }
  };

  return (
    <div>
      <h1>Detail for { thing.name }</h1>
      <form onSubmit={ save }>
        {
          error ? <pre className='error'>{ JSON.stringify(error, null, 2) }</pre>: ''
        }
        <input value={ name } onChange={ ev => setName(ev.target.value)}/>
        <button disabled={ thing.name === name }>Update</button>
      </form>
      <button onClick={ ()=> destroyThing(thing)}>x</button>
    </div>
  );
};

export default Thing;

