import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './ModuleFormation.css';
import src from './ARC-physics-940x529.jpg';
import { Link } from 'react-router-dom';

function ModuleFormation({ history }) {
  const [moduleFormations, setModuleFormation] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/connexion');
    } else {
      const fetch = async () => {
        const { data } = await axios.get(
          `http://localhost:7289/module-formation/${userInfo.id}/par-enseignant`
        );
        setModuleFormation(data);
      };
      fetch();
    }
  }, [userInfo, history]);
  return (
    <div className='container'>
      {moduleFormations.map((mf, idx) => {
        return (
          <div key={idx} className='card'>
            <div className='row '>
              <div className='col-sm-7'>
                <div className='card-block'>
                  <p className='title'>{mf.nom}</p>
                  <Link
                    to={`/unite-pedagogique/${mf.identifiant_module_formation}/par-module-formation`}
                    className='btn btn-primary'
                  >
                    Unité Pédagogiques
                  </Link>
                </div>
              </div>

              <div className='col-sm-5'>
                <img className='d-block w-100' src={src} alt={mf.nom} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ModuleFormation;
