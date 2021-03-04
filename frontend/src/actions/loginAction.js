import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  MESSAGES_TEMPS_REEL,
} from "../constants/loginConstants";
import axios from "axios";

export const login = (pseudo, motDePasse) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:7289/serveurInt",
      { pseudo, motDePasse },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: "Veuillez vérifier votre pseudo ou de mot de passe",
    });
  }
};
export const nbrMessages = (userInfo) => async (dispptach) => {
  var api = "http://localhost:3000/nbMessagesNonLus/" + userInfo.pseudo;

  fetch(api, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    response.json().then((r) => {
      dispptach({ type: MESSAGES_TEMPS_REEL, payload: r.res });
    });
  });
};
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
