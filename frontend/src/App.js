import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Connexion from './components/pages/Connexion';
import ContactUs from './components/pages/ContactUs';
import ModuleFormation from './components/pages/moduleFormation/ModuleFormation';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/connexion' component={Connexion} />
        <Route path='/contact-us' component={ContactUs} />
        <Route path='/unite-pedagogique' component={ModuleFormation} />
        
      </Switch>
    </Router>
  );
}

export default App;
