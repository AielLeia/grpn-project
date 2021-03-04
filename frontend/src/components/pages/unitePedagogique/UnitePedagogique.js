import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

function UnitePedagogique({ history, match }) {
  const [unitePedagogiques, setUnitePedagogiques] = useState([]);

  const { id } = match.params;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/connexion');
    } else {
      const fetch = async () => {
        const { data } = await axios.get(
          `http://localhost:7289/unite-pedagogique/${id}/par-module-formation`
        );
        setUnitePedagogiques(data);
      };
      fetch();
    }
  }, [userInfo, history, id]);
  return (
    <div className='container'>
      <div className='row'>
        {unitePedagogiques &&
          unitePedagogiques.map((up, idx) => {
            return (
              <div key={idx} className='col-4'>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>{up.nom}</h5>
                    <h6 className='card-subtitle mb-2 text-muted'>
                      Enseignant {userInfo && userInfo.nom}
                    </h6>
                    <p className='card-text'>
                      Resources: <a href={up.url_resource}>ici</a>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UnitePedagogique;
