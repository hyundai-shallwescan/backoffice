import React, { useState } from 'react';
import { setCookie } from '../../common/Cookie';
import logo from '../../asset/image/logo.svg';
import logoName from '../../asset/image/logo-name.svg';
import { login } from '../../apis/authAPI';
import { Modal } from '../../components/modal/Modal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { accessToken, refreshToken } = await login(loginId, password);
      console.log("response headers: ", refreshToken);

      console.log("accessToken: " + accessToken);
      console.log("refreshToken: " + refreshToken);

      // 액세스 토큰 쿠키에 저장
      setCookie('accessToken', accessToken.split(' ')[1])

      // 리프레쉬 토큰 로컬 스토리지에 저장
      localStorage.setItem('refreshToken', refreshToken.split(' ')[1]);

      // 로그인 아이디 쿠키에 저장
      setCookie('loginId', loginId);

      window.location.href = '/';
    } catch (error) {
      console.log(error)
      const errorMessage = error.response?.data?.message
      setError(errorMessage);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

      <Modal isOpen={isModalOpen} onClose={closeModal} message={error} />
    </LoginContainer>
  );
}
export default Login;