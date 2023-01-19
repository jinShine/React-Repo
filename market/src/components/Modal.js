import styled from "styled-components";

const Modal = ({ setModal }) => {
  return (
    <>
      <Wrap>
        <InnerWrap>
          <ModalHeader>
            <CloseModal
              onClick={() => {
                setModal(false);
              }}
            >
              <div style={{ position: "absolute", right: 0, paddingRight: 20 }}>
                X
              </div>
            </CloseModal>
          </ModalHeader>
          <Body>상품 등록을 하시려면 로그인을 해주세요.</Body>
        </InnerWrap>
      </Wrap>
    </>
  );
};
export default Modal;
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0pc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerWrap = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  padding: 15px;
`;

const Body = styled.div``;
const ModalHeader = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
  position: relative;
`;
const CloseModal = styled.div`
  cursor: pointer;
`;
