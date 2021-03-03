import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/loginAction';

function Forme({ history }) {
  const [pseudo, setPseudo] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/unite-pedagogique');
    }
  }, [userInfo, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(pseudo, motDePasse));
  };

  return (
    <div
      className='container d-flex flex-column justify-content-around align-items-center'
      style={{ width: '400px', height: 'calc(100vh - 80px)' }}
    >
      {error && <div className='alert alert-danger'>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Pseudo</label>
          <input
            type='text'
            className='form-control'
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Mot de passe</label>
          <input
            type='password'
            className='form-control'
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          />
        </div>
        <button disabled={loading} type='submit' className='btn btn-primary'>
          Se Connecter
        </button>
      </form>
    </div>
  );
}

export default Forme;
