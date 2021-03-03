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

// class Forme extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { pseudo: '', motDePasse: '', erreur: '' };

//     this.handleChangePseudo = this.handleChangePseudo.bind(this);
//     this.handleChangeMotDePasse = this.handleChangeMotDePasse.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChangeMotDePasse(event) {
//     this.setState({ motDePasse: event.target.value });
//   }

//   handleChangePseudo(event) {
//     this.setState({ pseudo: event.target.value });
//   }

//   async handleSubmit(event) {
//     event.preventDefault();
//     const { data } = await axios.post('http://localhost:7289/serveurInt', {
//       ...this.state,
//       // pseudo: this.state.pseudo,
//       // motDePasse: this.state.motDePasse
//     });
//     console.log(data);
//     if (data.Connexion === 'ok') {
//       this.props.history.push('/unite-pedagogique');
//     } else {
//       this.setState({ erreur: 'identifiant incorrecte' });
//     }
//   }

//   render() {
//     return (
//       <div
//         className='container d-flex justify-content-between align-items-center'
//         style={{ width: '400px', height: 'calc(100vh - 80px)' }}
//       >
//         {this.state.erreur !== '' && (
//           <div className='alert alert-danger'>{this.state.erreur}</div>
//         )}
//         <form onSubmit={this.handleSubmit}>
//           <div className='form-group'>
//             <label>Pseudo</label>
//             <input
//               type='text'
//               className='form-control'
//               value={this.state.pseudo}
//               onChange={this.handleChangePseudo}
//             />
//           </div>
//           <div className='form-group'>
//             <label>Mot de passe</label>
//             <input
//               type='password'
//               className='form-control'
//               value={this.state.motDepasse}
//               onChange={this.handleChangeMotDePasse}
//             />
//           </div>
//           <button type='submit' className='btn btn-primary'>
//             Se Connecter
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

export default Forme;
