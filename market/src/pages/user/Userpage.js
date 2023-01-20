import { Button, Modal, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { AlertView } from "../../components/ui/Alert";
import { Loading } from "../../components/ui/Loading";
import {
  __changePassword,
  __deleteUser,
  __userReset,
} from "../../redux/modules/userSlice";
import { clearToken } from "../../shared/api/api";
import { gTheme } from "../../theme/globalTheme";

const Userpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordOpen, setPasswordOpen] = React.useState(false);
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const { isSuccess, isLoading, error } = useSelector((state) => state.user);
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });
  const { userName } = useSelector((state) => state.user);

  //onClick
  const handlePasswordOpen = () => setPasswordOpen(true);
  const handlePasswordClose = () => setPasswordOpen(false);
  const handleLogoutOpen = () => setLogoutOpen(true);
  const handleLogoutClose = () => setLogoutOpen(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  console.log(userName);

  useEffect(() => {
    setAlertMessage({ type: "error", message: error });
    handleSuccess();
  }, [error, isSuccess]);

  const handleChangePw = (user) => {
    user.username = userName;
    console.log(user);
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

  const logoutSubmit = () => {
    localStorage.clear();
    clearToken();
    // clear안하면 instance에 저장되어 있는 토큰매니저에 토큰이 계속 있는상태임
    // 그래서 instance에 있는 토큰을 지워야함
    navigate("/");
    // window.location.reload();
    // 계속 success 가 true상태니까 로그아웃하고 로그인 누르면 signin으로 안가고 홈으로 감
    // success를 클린업 해야함
  };

  const deleteSubmit = () => {
    localStorage.clear();
    dispatch(__deleteUser(userName));
    clearToken();
    navigate("/");
  };

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
          <div onClick={handlePasswordOpen}>비밀번호 변경</div>
          <Modal
            open={passwordOpen}
            onClose={handlePasswordClose}
            aria-labelledby="first-modal-title"
            aria-describedby="first-modal-description"
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
                  id="first-modal-title"
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
                  id="first-modal-description"
                  sx={{ mb: 2, fontSize: 20 }}
                >
                  변경할 비밀번호를 입력해주세요.
                </Typography>
              </StModalBox>
            </form>
          </Modal>
        </>

        {/* /////////////////////// 로그 아웃 /////////////////////// */}
        <>
          <div onClick={handleLogoutOpen}>로그아웃</div>
          <Modal
            open={logoutOpen}
            onClose={handleLogoutClose}
            aria-labelledby="second-modal-title"
            aria-describedby="second-modal-description"
          >
            <form onSubmit={logoutSubmit}>
              <StModalBox>
                <Typography
                  id="second-modal-title"
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

        {/*//////////////////////////// 계정 삭제 /////////////////////////////////////  */}
        <>
          <div onClick={handleDeleteOpen}>계정 삭제</div>
          <Modal
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="third-modal-title"
            aria-describedby="third-modal-description"
          >
            <form onSubmit={deleteSubmit}>
              <StModalBox>
                <Typography
                  id="third-modal-title"
                  variant="h6"
                  component="h2"
                  fontSize={40}
                >
                  계정을 삭제하시겠어요? 🥺
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
                    계정 삭제
                  </SButton>
                </StPwBox>
                <SLoadingContainer>
                  {isLoading && <Loading />}
                </SLoadingContainer>
              </StModalBox>
            </form>
          </Modal>
        </>
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
  padding: 20px;
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
