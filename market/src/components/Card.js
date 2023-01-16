import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = ({ post }) => {
  const navigate = useNavigate();
  console.log(post);

  //   onClick={() => {
  //     navigate(`/guestbooks/${guestbook.id}`);
  //   }}

  return (
    <StCard>
      <StBox>
        <div>이미지 구역</div>
        <div>{post.name}</div>
        <div>{post.price}</div>
        <div>댓글 갯수</div>
      </StBox>
    </StCard>
  );
};

export default Card;

const StCard = styled.div`
  border: 1px solid #333333;
  color: #333333;
`;

const StBox = styled.div`
  & > div:first-child {
    width: 200px;
    height: 300px;
  }
`;
