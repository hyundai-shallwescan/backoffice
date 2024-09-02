import React from 'react';
import '../styles/header.css';
import logoutIcon from '../asset/image/logout.svg';
import logo from '../asset/image/logo.svg';
import logoName from '../asset/image/logo-name.svg'; 
import multiSelection from '../asset/image/selelction-list.svg'; 

const Header = () => {
    return (
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <img src={logoName} alt="Logo Name" className="logo-name" />
        </div>
        <div className="header-menu">
          <div className="admin">admin1234</div>
          <img src={logoutIcon} alt="Logout" className="logout-icon" />
        </div>
        <div className='multi-select'>
          <span className='ellipsis'>...</span>
        </div>
      </header>
    );
};

export default Header;
