import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { gTheme } from "../theme/globalTheme";
import { Button } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = window.location;

  return (
    <StContainer>
      <div onClick={() => navigate("/")}>
        <img src="img/fleamarket2.png" />
      </div>
      {pathname === "/" && (
        <StBtnContainer>
          <Button
            variant="contained"
            sx={{ bgcolor: gTheme.color.primary }}
            onClick={() => navigate("/product-registration")}
          >
            상품 등록
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: gTheme.color.primary }}
            onClick={() => navigate("/signin")}
          >
            로그인
          </Button>
        </StBtnContainer>
      )}
      {pathname === "/product-registration" && <div>님 안녕하세요.</div>}
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
  padding: 20px;
  backdrop-filter: blur(30px);
  & > div > img {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }
`;

const StBtnContainer = styled.div`
  display: flex;
  gap: 30px;
`;
