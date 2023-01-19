import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { gTheme } from "../theme/globalTheme";
import { Button } from "@mui/material";
import { tokenManager } from "../shared/utils/tokenManager";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = window.location;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userName = useSelector((state) => state.user.userName);

  return (
    <StContainer>
      <div onClick={() => navigate("/")}>
        <img src="img/fleamarket2.png" />
      </div>
      {pathname === "/" && (
        <StBtnContainer>
          {tokenManager.token ? (
            <Button
              variant="contained"
              sx={{ bgcolor: gTheme.color.primary }}
              onClick={() => navigate("/product-registration")}
            >
              상품 등록
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{ bgcolor: gTheme.color.primary }}
                onClick={handleOpen}
              >
                상품 등록
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <StModalBox>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    fontSize={30}
                  >
                    로그인 기록이 없습니다.
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    상품 등록을 하시려면 로그인을 해주세요.
                  </Typography>
                </StModalBox>
              </Modal>
            </>
          )}

          {tokenManager.token ? (
            <Button
              icon={<FaceIcon />}
              label="With Icon"
              variant="contained"
              sx={{ bgcolor: gTheme.color.primary }}
              onClick={() => navigate("/userpage")}
            >
              내 프로필
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ bgcolor: gTheme.color.primary }}
              onClick={() => navigate("/signin")}
            >
              로그인
            </Button>
          )}
        </StBtnContainer>
      )}
      {pathname === "/product-registration" && <div></div>}
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

const StModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 200px;
  background-color: #fafafa;
  border-radius: 10px;
  border: 2px solid #004a7c;
  box-shadow: 24px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
