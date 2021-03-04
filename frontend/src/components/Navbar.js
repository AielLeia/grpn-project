import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { logout, nbrMessages } from "../actions/loginAction";

function Navbar(props) {
  const [nbmessages, setNbmessages] = useState(0);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  };
  const nbMessages = () => {
    var pseudo = JSON.parse(localStorage.getItem("userInfo"));
    if (pseudo != null) {
      console.log("bonjouuuur");
      console.log(pseudo);
      var api = "http://localhost:3000/nbMessagesNonLus/" + pseudo.pseudo;
      return fetch(api, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        return response.json().then((r) => {
          console.log(r);
          setNbmessages(r.res);
        });
      });
    }
  };

  // Similaire à componentDidMount et componentDidUpdate :
  useEffect(() => {
    nbMessages();
    console.log(nbmessages);
  });
  return (
    <>
      <nav className="navbar">
        {/* <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          MPIEL
        </Link> */}
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>

          {userInfo && (
            <li className="nav-item">
              <Link
                to="/EnvoyerMessage"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Messages
              </Link>
            </li>
          )}

          {userInfo && (
            <li className="nav-item">
              <Link
                to="/MessagesRecus"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Messages recus{" "}
                <strong style={{ color: "red" }}>{nbmessages}</strong>
              </Link>
            </li>
          )}
          {userInfo ? (
            <li className="nav-item">
              <a
                href="#wesh"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
                className="nav-links"
              >
                Deconnexion
              </a>
            </li>
          ) : (
            <li className="nav-item">
              <Link
                to="/connexion"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Connexion
              </Link>
            </li>
          )}

          {userInfo && (
            <li className="nav-item">
              <Link
                to="/unite-pedagogique"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Modules Formations
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link
              to="/contact-us"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
