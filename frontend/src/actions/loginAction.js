import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../constants/loginConstants';
import axios from 'axios';

export const login = (pseudo, motDePasse) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      'http://localhost:7289/serveurInt',
      { pseudo, motDePasse },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: 'Veuillez vérifier votre pseudo ou de mot de passe',
    });
  }
};

export const logout = () => async () => {
  localStorage.removeItem('userInfo');
};
