import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from "react-router-dom";

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

  var countKey = Object.keys(pseudo).length;
  console.log(countKey);
  if(countKey>1){

  return (
    <div className='container'>
      <div className='row'>
        <table className="table">
            <thead className="thead-light">
              <tr>
              <th scope="col">ID</th>
                <th scope="col">Pseudo</th>
                <th scope="col">Nom</th>
                <th scope="col">Prenom</th>
                <th scope="col">adresse Mail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <th scope="row">{pseudo.id}</th>
                <td>{pseudo.pseudo}</td>
                <td>{pseudo.nom}</td>
                <td>{pseudo.prenom}</td>
                <td>{pseudo.adresseMail}</td>
              </tr>
            </tbody>
          </table>
      </div>
      <Link to="/" type='submit' className='btn btn-primary'>
     Retour
    </Link>
    </div>
  );
}else{
  
  return (
    <div className='container'>
      <div className='row'>
        <div className='text-danger'> Aucun pseudo trouvé</div>
        <table className="table">
            <thead className="thead-light">
              <tr>
              <th scope="col">ID</th>
                <th scope="col">Pseudo</th>
                <th scope="col">Nom</th>
                <th scope="col">Prenom</th>
                <th scope="col">adresse Mail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
      </div>
      <Link to="/" type='submit' className='btn btn-primary'>
     Retour
    </Link>
    </div>
    
    
    );
}
}

export default AccueilRecherchePseudo;
