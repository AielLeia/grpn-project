import React from "react";

export default class MessageRecus extends React.Component {
  constructor() {
    super();
  }

  state = {
    messages: [],
    nonLus: 0,
  };

  miseAjour(pseudo) {
    //var api="https://alihdj.alwaysdata.net/messages/"+pseudo;

    var api = "http://localhost:3000/messages/" + pseudo;
    fetch(api, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((r) => this.setState({ messages: r }));
      this.messagesNonLus(pseudo);
    });
  }

  componentDidMount() {
    //var api='http://localhost:3000/envoyerMessage';
    this.miseAjour("ali");
  }

  messagesNonLus(pseudo) {
    var api = "http://localhost:3000/nbMessagesNonLus/" + pseudo;
    fetch(api, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((r) => this.setState({ nonLus: r }));
    });
  }
  lireMessage(id) {
    localStorage.setItem("userInfo", localStorage.getItem("userInfo"));
    var api = "http://localhost:3000/lireMessage/" + id;
    fetch(api, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  render() {
    return (
      <div
        style={{
          width: "80%",
          border: "solid black",
          padding: "5%",
          backgroudColor: "rgb(240,235,244)",
          position: "relative",
          left: "10%",
          top: "10%",
          backgroudColor: "grey",
        }}
      >
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Pseudo
          </label>
          <div className="d-flex justify-content-between">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Pseudo "
              style={{ margin: "5%" }}
            />
            <button
              onClick={() => {
                this.miseAjour(
                  document.getElementById("formGroupExampleInput").value
                );
              }}
              className="btn btn-sucess"
            >
              chercher
            </button>
          </div>
          <div>
            <table className="table table-info ">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Depuis</th>
                  <th scope="col">pour</th>
                  <th scope="col">Message</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.messages.map((e) => (
                  <tr className={e.lu == true ? "table-info" : "table-danger"}>
                    {" "}
                    <th>{e.date}</th>
                    <th>{e.idSource}</th>
                    <th>{e.idDestination}</th>
                    <th>{e.contenu}</th>{" "}
                    <th>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          this.lireMessage(e._id);
                        }}
                      >
                        lire message{" "}
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
