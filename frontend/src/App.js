import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Connexion from "./components/pages/Connexion";
import ContactUs from "./components/pages/ContactUs";
import ModuleFormation from "./components/pages/moduleFormation/ModuleFormation";
import UnitePedagogique from "./components/pages/unitePedagogique/UnitePedagogique";
import AccueilRecherchePseudo from "./components/pages/accueil/AccueilRecherchePseudo";
import EnvoyerMessage from "./components/pages/messages/EnvoyerMessage";
import MessagesRecus from "./components/MessagesRecus";
import { useSelector, useDispatch } from "react-redux";
import { nbrMessages } from "./actions/loginAction";
function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, nbrMessages } = userLogin;
  const dispatch = useDispatch();
  useEffect(
    function () {
      if (userInfo) {
        dispatch(nbrMessages(userInfo));
      }

      console.log(userInfo);
    },
    [userInfo, nbrMessages]
  );

  return (
    <Router>
      <Route component={(props) => <Navbar {...props} />} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/connexion" component={Connexion} />
        <Route path="/contact-us" component={ContactUs} />
        <Route
          path="/unite-pedagogique/:id/par-module-formation"
          component={UnitePedagogique}
        />
        <Route path="/envoyerMessage" component={EnvoyerMessage} />
        <Route path="/MessagesRecus" component={MessagesRecus} />
        <Route path="/unite-pedagogique" component={ModuleFormation} />
        <Route path="/accueil" component={AccueilRecherchePseudo} />
      </Switch>
    </Router>
  );
}

export default App;
