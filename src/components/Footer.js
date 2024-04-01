import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <p style={{paddingLeft:'150px',paddingRight:'150px',paddingBottom:'10px',fontSize:'23px'}}>PAY YOUR FEE AND BOOK A TC SLOT! </p>
      <p style={{paddingLeft:'400px',paddingRight:'400px',fontSize:'19px'}}>
        'eKMIT' enables students of KMIT to pay their college fees online and book appointments to collect their Transfer Certificates.  
        </p>
        
      {/* <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h4>About Us</h4>
          </div>
          <div class='footer-link-items'>
            <h4>Academics</h4></div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h4>Departments</h4></div>
          <div class='footer-link-items'>
            <h4>Social Media</h4></div>
        </div>
      </div> */}
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            {/* <Link to='/' className='social-logo'>
              eKMIT
              <i class='fab fa-typo3' />
            </Link> */}
          </div>
          <small style={{paddingLeft:'250px',paddingTop:'40px'}}class='website-rights'>eKMIT © 2021</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;