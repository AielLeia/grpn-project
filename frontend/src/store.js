import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginRedures } from './reducers/loginReducers';

const redures = combineReducers({
  userLogin: userLoginRedures,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initalState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  redures,
  initalState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
