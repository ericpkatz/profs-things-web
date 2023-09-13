import { useParams } from 'react-router-dom';

const Thing = ({ things, destroyThing })=> {
  const params = useParams();
  const id = params.id*1;
  const thing = things.find(thing => thing.id === id);
  if(!thing){
    return null;
  }

  return (
    <div>
      <h1>Detail for { thing.name }</h1>
      <button onClick={ ()=> destroyThing(thing)}>x</button>
    </div>
  );
};

export default Thing;

