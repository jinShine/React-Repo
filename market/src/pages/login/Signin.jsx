import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { __signin, __userReset } from "../../redux/modules/userSlice";
import { gTheme } from "../../theme/globalTheme";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { AlertView } from "../../components/ui/Alert";
import { Loading } from "../../components/ui/Loading";
import { __userInfo } from "../../redux/modules/userSlice";
import Header from "../../components/Header";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const { isSuccess, isLoading, error } = useSelector((state) => state.user);
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });

  useEffect(() => {
    setAlertMessage({ type: "error", message: error });

    handleSuccess();

    // 클린업 (userReset으로 success상태를 false로 변경)
    // 로그인 성공 (true) ->> 로그인 완료 하면 success상태를 다시 false로 변경
    return () => {
      dispatch(__userReset());
    };
  }, [error, isSuccess]);

  const handleLogin = (user) => {
    dispatch(__signin(user));
  };

  const handleError = (error) => {
    console.log(error);
  };

  const handleSuccess = () => {
    if (isSuccess) {
      //로그인 완료 되었을 때 데이터가 다 들어오고 완료상태일때
      // isSuccess를 true로 바꾸고 홈화면으로 이동
      setAlertMessage({});
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <SWrapper>
        <SCard>
          {alertMessage.message && (
            <AlertView
              type={alertMessage.type}
              message={alertMessage.message}
            />
          )}
          <STitleContainer>
            <Avatar sx={{ bgcolor: gTheme.color.primary }}>
              <LockOutlinedIcon />
            </Avatar>
            <STitle>로그인</STitle>
          </STitleContainer>
          <form onSubmit={handleSubmit(handleLogin, handleError)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="아이디"
              name="id"
              autoComplete="id"
              autoFocus
              {...register("username")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {})}
            />
            <SLoadingContainer>{isLoading && <Loading />}</SLoadingContainer>
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
              }}
            >
              로그인
            </SButton>
            <SSignupContainer>
              <SSignupText>아직 회원이 아니세요?</SSignupText>
              <StLink to={"/signup"}>회원가입</StLink>
            </SSignupContainer>
          </form>
        </SCard>
      </SWrapper>
    </>
  );
};

export default Signin;

const SWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80vh;
  margin: auto;
`;

const SLoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 450px;
  border-radius: 10px;
  padding: 48px 28px 36px 28px;
  box-shadow: 0px 2px 10px 0px rgba(76, 78, 100, 0.22);
`;

const STitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const STitle = styled.p`
  text-align: center;
  font-size: 24px;
`;

const SButton = styled(Button)`
  height: 44px;
  font-size: 100;
  font-weight: 600;
`;

const SSignupContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
`;

const SSignupText = styled.p`
  margin-right: 6px;
  color: gray;
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: #004a7c;
`;
