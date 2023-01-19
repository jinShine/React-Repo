import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import styled from "styled-components";
import { Button } from "@mui/material";
import { gTheme } from "../../theme/globalTheme";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { AlertView } from "../../components/ui/Alert";
import { useSelector } from "react-redux";
import { Loading } from "../../components/ui/Loading";
import { __changePassword } from "../../redux/modules/userSlice";
import { useDispatch } from "react-redux";

const Userpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();
  const { isSuccess, isLoading, error } = useSelector((state) => state.user);
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });
  const { userName } = useSelector((state) => state.user);

  useEffect(() => {
    setAlertMessage({ type: "error", message: error });
    handleSuccess();
  }, [error, isSuccess]);

  const handleChangePw = (user) => {
    dispatch(__changePassword(user));
  };

  const handleError = (error) => {
    console.log(error);
  };

  const handleSuccess = () => {
    if (isSuccess) {
      setAlertMessage({ type: "success", message: "비밀번호 변경 완료 🎉" });
    }
  };

  const logoutSubmit = () => {};
  console.log(...register);

  return (
    <Layout>
      <Header />
      <Stdiv>
        <Button
          variant="contained"
          sx={{ bgcolor: gTheme.color.primary, mb: 8 }}
          onClick={() => {
            navigate("/");
          }}
        >
          이 전 으 로
        </Button>
      </Stdiv>
      <StContainer>
        {/* ///////////////비번 변경//////////////////// */}
        <>
          <div onClick={handleOpen}>비밀번호 변경</div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form onSubmit={handleSubmit(handleChangePw, handleError)}>
              <StModalBox>
                {alertMessage.message && (
                  <AlertView
                    type={alertMessage.type}
                    message={alertMessage.message}
                  />
                )}

                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  fontSize={40}
                >
                  비밀번호 변경
                </Typography>
                <StPwBox>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="변경할 비밀번호"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...register("password", {})}
                  />

                  <SButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: gTheme.color.primary,
                      fontSize: 16,
                      fontWeight: 700,
                      width: 150,
                    }}
                  >
                    확인
                  </SButton>
                </StPwBox>
                <SLoadingContainer>
                  {isLoading && <Loading />}
                </SLoadingContainer>
                <Typography
                  id="modal-modal-description"
                  sx={{ mb: 2, fontSize: 20 }}
                >
                  변경할 비밀번호를 입력해주세요.
                </Typography>
              </StModalBox>
            </form>
          </Modal>
        </>
        {/* ////////////////////////////////////////////// */}

        {/* /////////////////////// 로그 아웃 /////////////////////// */}
        <>
          <div onClick={handleOpen}>로그아웃</div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form onSubmit={logoutSubmit}>
              <StModalBox>
                {alertMessage.message && (
                  <AlertView
                    type={alertMessage.type}
                    message={alertMessage.message}
                  />
                )}

                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  fontSize={40}
                >
                  로그아웃 하시겠어요? 🥲
                </Typography>
                <StPwBox>
                  <SButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: gTheme.color.primary,
                      fontSize: 16,
                      fontWeight: 700,
                      width: 150,
                    }}
                  >
                    로그아웃
                  </SButton>
                </StPwBox>
                <SLoadingContainer>
                  {isLoading && <Loading />}
                </SLoadingContainer>
              </StModalBox>
            </form>
          </Modal>
        </>

        {/*/////////////////////////////////////////////////////////////////  */}
        <div>회원 탈퇴</div>
      </StContainer>
    </Layout>
  );
};

export default Userpage;

const Stdiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const StContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  div {
    border: 1px solid #004a7c;
    border-radius: 10px;
    width: 400px;
    height: 100px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const StModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  background-color: #fafafa;
  border: 2px solid #004a7c;
  box-shadow: 24px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const SLoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

const SButton = styled(Button)`
  height: 44px;
  font-size: 100;
  font-weight: 600;
`;

const StPwBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  gap: 30px;
  & > div:first-child {
    width: 300px;
  }
`;
