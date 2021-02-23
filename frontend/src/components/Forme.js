import React from 'react';
import axios from 'axios';

class Forme extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pseudo: '', motDePasse: '' };

    this.handleChangePseudo = this.handleChangePseudo.bind(this);
    this.handleChangeMotDePasse = this.handleChangeMotDePasse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeMotDePasse(event) {
    this.setState({ motDePasse: event.target.value });
  }

  handleChangePseudo(event) {
    this.setState({ pseudo: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { data } = await axios.post(
      'http://localhost:3000/api-bdr/compte/login/Connexion',
      {
        ...this.state,
        // pseudo: this.state.pseudo,
        // motDePasse: this.state.motDePasse
      }
    );
    console.log(data);
  }

  render() {
    return (
      <div
        className='container d-flex justify-content-between align-items-center'
        style={{ width: '400px', height: 'calc(100vh - 80px)' }}
      >
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label>Pseudo</label>
            <input
              type='text'
              className='form-control'
              value={this.state.pseudo}
              onChange={this.handleChangePseudo}
            />
          </div>
          <div className='form-group'>
            <label>Mot de passe</label>
            <input
              type='password'
              className='form-control'
              value={this.state.motDepasse}
              onChange={this.handleChangeMotDePasse}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Se Connecter
          </button>
        </form>
      </div>
    );
  }
}

export default Forme;
