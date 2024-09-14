import React from 'react';
import {
    ModalOverlay,
    ModalContent,
    CloseButton
} from './Modal.styled';

/**
 * 모달 컴포넌트
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
export const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <p>{message}</p>
        <CloseButton onClick={onClose}>확인</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};
