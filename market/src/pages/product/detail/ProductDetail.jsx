import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ProductCommentList from "./ProductCommentList";

import Layout from "../../../components/Layout";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { gTheme } from "../../../theme/globalTheme";
import { useDispatch, useSelector } from "react-redux";
import {
  __detailPost,
  __productFavorite,
} from "../../../redux/modules/productSlice";
import { priceToString } from "../../../shared/utils/priceToString";
import {
  __submitComment,
  __getComments,
  __deleteComment,
  __modifyComment,
} from "../../../redux/modules/commentSlice";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detailPost = useSelector((state) => state.post.detailPost);
  const commentsData = useSelector((state) => state.comment.comments);
  const categoryAndDateString = (detailPost) => {
    const date = new Date(detailPost.createdAt);
    const category = detailPost.category;
    return `${category} • ${date.toLocaleString()}`;
  };
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite((state) => !state);
    dispatch(__productFavorite(productId));
  };

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    let commentData = {
      comment: comment,
      isReply: false,
      referenceId: productId,
    };
    dispatch(__submitComment(commentData));
    setComment("");
  };

  const handleCommentDelete = (commentId) => {
    dispatch(__deleteComment(commentId));
  };

  const handleCommentModify = (data) => {
    const payload = { comment: data.comment, commentId: data.commentId };
    dispatch(__modifyComment(payload));
  };

  useEffect(() => {
    dispatch(__detailPost(productId));
    dispatch(__getComments(productId));
  }, [dispatch]);

  useEffect(() => {
    setComments(commentsData);
    setFavorite(detailPost.wishState);
  }, [commentsData, detailPost]);

  return (
    <Layout>
      <SWrapper>
        <SContentContainer>
          <SImageContainer>
            <SImage src={detailPost.imageUrl} />
          </SImageContainer>
          <SUserContainer>
            <SUserInfo>
              <SUserProfileThubnail src={detailPost.userUrl} />
              <SUserName>{detailPost.nickname}</SUserName>
            </SUserInfo>
            <SUserActions>
              {detailPost.state && (
                <>
                  <IconButton sx={{ color: "lightgray" }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: "lightgray" }}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
              <IconButton sx={{ color: "orange" }} onClick={handleFavorite}>
                {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </SUserActions>
          </SUserContainer>
          <SDivider />
          <SProductContainer>
            <SProductTitle>{detailPost.name}</SProductTitle>
            <SProductCategoryAndCreatedDate>
              {categoryAndDateString(detailPost)}
            </SProductCategoryAndCreatedDate>
            <SProductPrice>{priceToString(detailPost.price)}</SProductPrice>
            <SProductDescription>{detailPost.description}</SProductDescription>
          </SProductContainer>
          <SDivider />
          <SCommentContainer>
            <SCommentInputContainer>
              <SCommentTextField
                id="outlined-basic"
                label="댓글"
                variant="outlined"
                value={comment}
                onChange={onChangeComment}
              />
              <SCommentRegistration
                variant="contained"
                sx={{ ml: 1, bgcolor: gTheme.color.primary }}
                onClick={handleCommentSubmit}
              >
                등록
              </SCommentRegistration>
            </SCommentInputContainer>
            <ProductCommentList
              comments={comments}
              onClickDelete={handleCommentDelete}
              onClickModify={handleCommentModify}
            />
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
