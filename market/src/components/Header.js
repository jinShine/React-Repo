import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = window.location;

  return (
    <StContainer>
      <div>
        <img src="img/fleamarket.png" />
      </div>
      {pathname === "/" && (
        <>
          <button onClick={() => navigate("/signin")}>로그인</button>
          <button onClick={() => navigate("/product-registration")}>
            상품등록
          </button>
        </>
      )}
    </StContainer>
  );
};

export default Header;

const StContainer = styled.div`
  position: sticky;
  top: 0;
  max-width: 1200px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: center;
  padding: 20px;
  & > div > img {
    width: 80px;
    height: 80px;
  }
`;
