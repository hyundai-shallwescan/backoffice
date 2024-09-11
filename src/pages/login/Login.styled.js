import styled from 'styled-components';
import { colors } from '../../styles/colors';

/**
 * 로그인 페이지 Styled Component
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
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${colors.light_green};
`;

export const LogoContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  text-align: center;
  margin-bottom: 20px;
`;

export const TitleLogo = styled.img`
  width: 250px;
  height: auto;
  margin-bottom: 20px;
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 5px;
`;

export const LoginBox = styled.div`
  background-color: ${colors.white};
  padding: 20px 40px 20px 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.075);
  text-align: center;
  width: 500px;

  @media (max-width: 768px) {
    width: 80%;
    padding: 20px;
  }

  @media (max-width: 480px) {
    width: 80%;
    padding: 15px;
  }
`;

export const LoginTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 40px;
`;

export const Form = styled.form`
  flex-direction: column;
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  text-align: left;
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  max-width: 400px;
  padding: 10px;
  border: 0px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 1000;
  box-shadow: 0px 8px 15px 8px rgba(131, 131, 131, 0.075);
  margin-bottom: 10px;
  color: ${colors.dark_green};

  &:focus {
    border-color: ${colors.main};
    outline: none;
  }

  &::placeholder {
    color: ${colors.nav_gray};
  }

  @media (max-width: 768px) {
    max-width: 80%;
  }
`;

export const LoginButton = styled.button`
  height: 50px;
  background-color: ${colors.main};
  color: ${colors.white};
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 19px;
  cursor: pointer;
  font-weight: 1000;
  width: 50%;
  margin-top: 10px;
  margin-bottom: 20px;

  &:hover {
    background-color: ${colors.dark_green};
  }
`;