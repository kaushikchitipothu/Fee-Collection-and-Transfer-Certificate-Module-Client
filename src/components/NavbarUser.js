import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function NavbarUser() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const logout = () => {
    // window.location='/AdminLogin';
     //return <Redirect to="/Home"></Redirect>
     localStorage.removeItem("token");
     window.location="/";
  /*   Axios.get("http://localhost:3002/auth/logout")
     .then((response) => {
       if (response.data.goto == '/out') {
         //setLoginStatus(response.data.message);
         window.location='/UserLogin';
       } 
     });*/
   };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <h5>eKMIT</h5>
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/User' className='nav-links' onClick={closeMobileMenu}>
                <h3>Home</h3>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/FeeDetails'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <h3>Fee</h3>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/TransferCertificate'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <h3>TC Slot</h3>
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/Profile'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <h3>Profile</h3>
              </Link>
            </li>
            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>

            
          </ul>
          {button && <button onClick={logout} buttonStyle='btn--outline'>LOG OUT</button>}
        </div>
      </nav>
    </>
  );
}

export default NavbarUser;