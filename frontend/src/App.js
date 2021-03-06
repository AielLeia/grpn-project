import React from "react";
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
import MessagesR from "./components/pages/messages/MessagesR";

function App() {
  return (
    <Router>
      <Route component={Navbar} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/connexion" component={Connexion} />
        <Route path="/contact-us" component={ContactUs} />
        <Route
          path="/unite-pedagogique/:id/par-module-formation"
          component={UnitePedagogique}
        />
        <Route path="/envoyerMessage" component={EnvoyerMessage} />
        <Route path="/messagesRecus" component={MessagesR} />
        <Route path="/unite-pedagogique" component={ModuleFormation} />
        <Route path="/accueil" component={AccueilRecherchePseudo} />
      </Switch>
    </Router>
  );
}

export default App;
