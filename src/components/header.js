import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';
import logoutIcon from '../asset/image/logout.svg';
import logo from '../asset/image/logo.svg';
import logoName from '../asset/image/logo-name.svg'; 
import multiSelection from '../asset/image/selelction-list.svg'; 
  import { getCookie, removeCookie } from '../common/Cookie';

/**
 * 헤더
 * @author 구지웅
 * @since 2024.09.04
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.04  구지웅        최초 생성 
 * 2024.09.10  정은지        로그인, 로그아웃 기능 구현
 * </pre>
 */
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();  // useNavigate 훅 사용

  useEffect(() => {
    const loginId = getCookie('loginId');
    if (loginId) {
      setIsLoggedIn(true);
    }
}, []);

  const handleLogout = () => {
      removeCookie('token');
      removeCookie('loginId');
      setIsLoggedIn(false);
      navigate('/login');
  };

  const handleLogin = () => {
      navigate('/login');  
  };

  const handleLogoClick = () => {
    navigate('/');
  };


    return (
      <header className="header">
        <div className="logo-container" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" className="logo" />
          <img src={logoName} alt="Logo Name" className="logo-name" />
        </div>
        <div className="header-menu">
                {isLoggedIn ? (
                    <div className="admin">
                        <div className="login-id">{getCookie("loginId")}</div>
                        <img src={logoutIcon} alt="Logout" className="logout-icon" onClick={handleLogout} />
                    </div>
                ) : (
                    <div className="admin" onClick={handleLogin}>
                        로그인
                    </div>
                )}
            </div>
        <div className='multi-select'>
          <span className='ellipsis'>...</span>
        </div>
      </header>
    );
};

export default Header;
