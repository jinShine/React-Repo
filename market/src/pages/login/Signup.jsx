import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  __fileReset,
  __profileImageUpload,
} from "../../redux/modules/fileSlice";
import { __signup, __userReset } from "../../redux/modules/userSlice";
import { gTheme } from "../../theme/globalTheme";

import { TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { AlertView } from "../../components/ui/Alert";
import { Loading } from "../../components/ui/Loading";
import { COMMON_DEALY_TIME } from "../../shared/utils/delay";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fileData } = useSelector((state) => state.file);
  const { isSuccess, isLoading, error } = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });

  useEffect(() => {
    setAlertMessage({ type: "error", message: error });

    handleSuccess();
  }, [fileData, error, isSuccess]);

  const handleSignup = (user) => {
    user.imageResponseDto = fileData;
    dispatch(__signup(user));
  };

  const handleError = (error) => {
    console.log(error);
  };

  const handleSelectedImage = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file", img);

    dispatch(__profileImageUpload(formData));
  };

  const handleSuccess = () => {
    if (isSuccess) {
      setAlertMessage({ type: "success", message: "가입 성공🎉" });

      setTimeout(() => {
        dispatch(__userReset());
        dispatch(__fileReset());

        navigate("/signin");
      }, COMMON_DEALY_TIME);
    }
  };

  return (
    <SWrapper>
      <SCard>
        {alertMessage.message && (
          <AlertView type={alertMessage.type} message={alertMessage.message} />
        )}
        <STitleContainer>
          <STitle>회원가입</STitle>
          <Button component="label">
            <Avatar src={fileData.url} sx={{ width: 80, height: 80 }} />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleSelectedImage}
            />
          </Button>
        </STitleContainer>
        <form onSubmit={handleSubmit(handleSignup, handleError)}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="아이디"
            name="username"
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordCheck"
            label="비밀번호 재확인"
            type="password"
            id="passwordCheck"
            autoComplete="current-password"
            {...register("passwordCheck", {})}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            name="nickname"
            label="닉네임"
            type="text"
            id="nickname"
            autoComplete="nickname"
            {...register("nickname", {})}
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
            회원가입
          </SButton>
          <SSignupContainer>
            <SSignupText>이미 계정이 있나요?</SSignupText>
            <Link to={"/signin"}>로그인</Link>
          </SSignupContainer>
        </form>
      </SCard>
    </SWrapper>
  );
};

export default Signup;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
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
