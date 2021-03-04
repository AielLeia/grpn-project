import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function AccueilRecherchePseudo({ history, location }) {
  const [pseudo, setPseudo] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        `http://localhost:7289/serveurInt/${location.search.split('=')[1]}`
      );
      console.log(data);
      setPseudo(data);
    };
    fetch();
  }, [location]);

  return (
    <div className='container'>
      <div className='row'>
        coucou voila le teste - {JSON.stringify(pseudo)}
      </div>
    </div>
  );
}

export default AccueilRecherchePseudo;
