import { useParams } from 'react-router-dom';

const ThingsByLetter = ({ things })=> {
  const params = useParams();
  const { alpha } = params;
  const filtered = things.filter(thing => thing.name.toLowerCase().startsWith(alpha));
  return (
    <div>
    <h1>By Letter {alpha}</h1>
    {
      filtered.map( thing => {
        return (
          <h2 key={ thing.id }>{ thing.name }</h2>
        );
      })
    }
    </div>
  );
};

export default ThingsByLetter;

