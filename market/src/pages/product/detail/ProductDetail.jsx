import { Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductCommentList from "./ProductCommentList";

import Layout from "../../../components/Layout";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { gTheme } from "../../../theme/globalTheme";

const ProductDetail = () => {
  const navigate = useNavigate();

  // 테스트
  const comments = [
    { id: 1, comment: "안녕하세요 1" },
    {
      id: 2,
      comment:
        "안녕하세요 2안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 안녕하세요 2안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 안녕하세요 2안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 안녕하세요 2안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 안녕하세요 2안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 안녕하세요 2안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3",
    },
    {
      id: 3,
      comment:
        "안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3안녕하세요 3",
    },
  ];

  return (
    <Layout>
      <SWrapper>
        <SContentContainer>
          <SImageContainer>
            <SImage
              src="https://image.cnet.co.kr/2022/08/25/6b4d4407b48ffc8ab2c88dfb30d2bf3d-770xAAA.png"
              alt=""
            />
          </SImageContainer>
          <SUserContainer>
            <SUserInfo>
              <SUserProfileThubnail src="/img/default_profile.png" />
              <SUserName>김승진</SUserName>
            </SUserInfo>
            <SUserActions>
              <IconButton sx={{ color: "lightgray" }}>
                <EditIcon />
              </IconButton>
              <IconButton sx={{ color: "lightgray" }}>
                <DeleteIcon />
              </IconButton>
            </SUserActions>
          </SUserContainer>
          <SDivider />
          <SProductContainer>
            <SProductTitle>title</SProductTitle>
            <SProductCategoryAndCreatedDate>
              category • 2023년 1월 16일
            </SProductCategoryAndCreatedDate>
            <SProductPrice>15,000원</SProductPrice>
            <SProductDescription>
              맥북 프로 팝니다. <br />
              2019년 구입했습니다. <br />
              <br />
              13.3인치 8기가 256기기입니다. <br />
              <br />
              적전동역 1번 출구에서 거래하면 좋겠습니다~
            </SProductDescription>
          </SProductContainer>
          <SDivider />
          <SCommentContainer>
            <SCommentInputContainer>
              <SCommentTextField
                id="outlined-basic"
                label="댓글"
                variant="outlined"
              />
              <SCommentRegistration variant="contained" sx={{ ml: 1, bgcolor: gTheme.color.primary}}>
                등록
              </SCommentRegistration>
            </SCommentInputContainer>
            <ProductCommentList comments={comments} />
          </SCommentContainer>
        </SContentContainer>
      </SWrapper>
    </Layout>
  );
};

export default ProductDetail;

/* Style */
const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 700px;
`;

const SImageContainer = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    border-radius: 10px;
  }
`;

const SImage = styled.img`
  width: 700px;
  height: 500px;
  object-fit: cover;
`;

const SUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const SUserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SUserActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const SUserProfileThubnail = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;

const SUserName = styled.p`
  margin-left: 10px;
`;

const SDivider = styled.div`
  background-color: rgb(240, 240, 240);
  height: 1px;
`;

const SProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const SProductTitle = styled.div`
  margin-top: 24px;
  font-size: 30px;
  font-weight: 600;
`;
const SProductCategoryAndCreatedDate = styled.div`
  color: gray;
  font-size: 14px;
`;
const SProductPrice = styled.div`
  margin-top: 16px;
  font-family: -apple-system;
  font-size: 20px;
  font-weight: 600;
`;
const SProductDescription = styled.div`
  padding: 30px 0px;
  font-size: 16px;
  white-space: pre-line;
`;

const SCommentContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const SCommentInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
`;

const SCommentTextField = styled(TextField)`
  width: 90%;
  height: 55px;
`;
const SCommentRegistration = styled(Button)`
  height: 53px;
`;
