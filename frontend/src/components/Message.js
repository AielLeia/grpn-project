import React from "react";

export default class Message extends React.Component {
  constructor() {
    super();
    this.handelAjouter = this.handelAjouter.bind(this);
    this.envoyerMessage = this.envoyerMessage.bind(this);
    this.handelVider = this.handelVider.bind(this);
  }
  state = {
    destinataires: [],
  };

  handelAjouter() {
    var elem = document.getElementById("formGroupExampleInput").value;
    document.getElementById("message").disabled = false;
    if (this.state.destinataires.indexOf(elem) > -1) {
      return;
    }
    if (elem === "") {
      return;
    }
    var dest = this.state.destinataires;
    dest.push(elem);
    this.setState({ destinataires: dest });

    document.getElementById("btn-vider").disabled = false;
  }

  handelVider() {
    document.getElementById("message").disabled = true;
    this.setState({ destinataires: [] });
    console.log("handel vider");
    document.getElementById("btn-vider").disabled = true;
  }

  envoyerMessage() {
    var api = "http://localhost:3000/envoyerMessage";
    var cont = document.getElementById("floatingTextarea2").value;
    fetch(api, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSource: "ali",
        idDestination: this.state.destinataires,
        contenu: cont,
      }),
    }).then((response) => {
      document.getElementById("envoyer").innerHTML =
        '<div class="alert alert-primary" role="alert">' +
        "Message envoyé avec  succès</div>";
      setTimeout(() => {
        document.getElementById("envoyer").innerHTML = "";
      }, 2000);
      document.getElementById("formGroupExampleInput").value = "";
    });
  }

  componentDidMount() {
    document.getElementById("message").disabled = true;
  }

  render() {
    return (
      <div
        style={{
          width: "50%",
          border: "solid black",
          padding: "5%",
          backgroudColor: "rgb(240,235,244)",
          position: "relative",
          left: "30%",
          top: "10%",
        }}
      >
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Destinataires
          </label>
          <div className="d-flex justify-content-between">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Distinateires "
            />
            <button
              className="btn btn-success"
              style={{ margin: "5px" }}
              onClick={this.handelAjouter}
            >
              {" "}
              Ajouter
            </button>
            <button
              className="btn btn-danger"
              style={{ margin: "5px" }}
              onClick={this.handelVider}
              id="btn-vider"
            >
              Vider
            </button>
          </div>
          <div>
            {this.state.destinataires.map((e) => (
              <button
                className="btn btn-danger"
                style={{ margin: "5px" }}
                key={e}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px" }}
          />
          <button
            className="btn btn-success"
            onClick={this.envoyerMessage}
            id="message"
          >
            {" "}
            Envoyer
          </button>
          <div id="envoyer"></div>
        </div>
      </div>
    );
  }
}
