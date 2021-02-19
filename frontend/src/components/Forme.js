import React from 'react';

class Forme extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Le nom a été soumis : ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Pseudo : <br></br>
          </label>
           <input type="text" value={this.state.value} onChange={this.handleChange} />
          <br></br>
          <label>
            Mot de passe : <br></br> 
          </label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <br></br>
          <button type="submit" class="btn btn-danger">Danger</button>
        </form>
      );
    }
  }
  
  export default Forme;