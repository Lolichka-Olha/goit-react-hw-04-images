import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalBody = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  width: 1100px;
  height: 700px;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;