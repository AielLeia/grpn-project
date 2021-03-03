import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css';
import { logout } from '../actions/loginAction';

function Navbar() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className='navbar'>
        {/* <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          MPIEL
        </Link> */}
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          {userInfo ? (
            <li className='nav-item'>
              <a
                href='#wesh'
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
                className='nav-links'
              >
                Deconnexion
              </a>
            </li>
          ) : (
            <li className='nav-item'>
              <Link
                to='/connexion'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Connexion
              </Link>
            </li>
          )}

          {userInfo && (
            <li className='nav-item'>
              <Link
                to='/unite-pedagogique'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Modules Formations
              </Link>
            </li>
          )}
          <li className='nav-item'>
            <Link
              to='/contact-us'
              className='nav-links'
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
