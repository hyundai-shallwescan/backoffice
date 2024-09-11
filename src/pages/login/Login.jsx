import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setCookie } from '../../common/Cookie';
import logo from '../../asset/image/logo.svg'; 
import logoName from '../../asset/image/logo-name.svg'; 
import { login } from '../../apis/authAPI'; 
import axios from 'axios';
import {
  LoginContainer,
  LogoContainer,
  Logo,
  TitleLogo,
  LoginBox,
  LoginTitle,
  Form,
  InputGroup,
  Input,
  LoginButton,
} from './Login.styled'; 

/**
 * 로그인 페이지
 * @author 정은지
 * @since 2024.09.10
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.10  정은지        최초 생성
 * </pre>
 */
const Login = () => {

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
          const token = await login(loginId, password); 
          console.log(token);
          if (token) {
            const accessToken = token.split(' ')[1];
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            // 쿠키 저장 
            setCookie('token', accessToken);
            setCookie('loginId', loginId);
            
            window.location.href = '/';
          } else {
            setError('토큰을 가져오지 못했습니다.');
          }
        } catch (error) {
          setError('로그인 실패. 다시 시도해주세요.');
        }
    };

      return (
        <LoginContainer>
          <LogoContainer>
            <TitleLogo src={logoName} /> 
            <Logo src={logo} />
          </LogoContainer>
        <LoginBox>
          <LoginTitle>관리자 로그인</LoginTitle>
          <Form onSubmit={handleLogin}>
            <InputGroup>
              <Input
                type="text"
                id="id"
                placeholder="아이디"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Input
                type="password"
                id="password"
                placeholder="패스워드"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <LoginButton type="submit">Login</LoginButton>
          </Form>
        </LoginBox>
      </LoginContainer>  
      );
  }
export default Login;