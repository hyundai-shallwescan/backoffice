import styled from 'styled-components';
import { colors } from '../../styles/colors';

/**
 * 모달 Styled Component
 * @author 정은지
 * @since 2024.09.14
 * @version 1.0
 *
 * <pre>
 * 수정일      	 수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.09.14  정은지        최초 생성
 * </pre>
 */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  width: 100%;
  text-align: center;
`;

export const CloseButton = styled.button`
  background-color: ${colors.main};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: ${colors.dark_green};
  }
`;
