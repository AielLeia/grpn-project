import React from "react";
import MessagesRecus from "../../MessagesRecus";

export default class MessagesR extends React.Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem("userInfo") == null) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <h1>bonjour</h1>
        <MessagesRecus />
      </div>
    );
  }
}
