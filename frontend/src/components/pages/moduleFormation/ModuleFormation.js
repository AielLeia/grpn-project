import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ModuleFormation.css';

function ModuleFormation({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/connexion');
    }
  }, [userInfo, history]);
  return <div className='container'>Salut, module de formation</div>;
}

export default ModuleFormation;
