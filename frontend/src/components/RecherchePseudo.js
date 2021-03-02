import React from 'react';
import axios from 'axios';
import './RecherchePseudo.css';
import { withRouter } from 'react-router-dom';

class RecherchePseudo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { pseudo: '' };

    this.handleChangePseudo = this.handleChangePseudo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePseudo(event) {
    this.setState({ pseudo: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    

    const { data } = await axios.get(
      `http://localhost:7289/serveurInt/${this.state.pseudo}`
    );
    console.log(data); 
    this.props.history.push('/Accueil');

  }

  render() {
    return (
      <div className='container recherchedupseudo'>
        <div className='lesTextes'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group '>
            <label className='lesTextes'>Rechercher un Pseudo</label>
            <input
              type='text'
              className='form-control'
              value={this.state.pseudo}
              onChange={this.handleChangePseudo}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Rechercher
          </button>
        </form>
        </div>
      </div>
    );
  }
}
export default withRouter(RecherchePseudo);
