import React from "react";
import styled from "styled-components";
import ProductCommentListItem from "./ProductCommentListItem";

const ProductCommentList = ({ comments, onClickDelete, onClickModify }) => {
  return (
    <SWrapper>
      {comments &&
        comments.map((comment) => (
          <ProductCommentListItem
            key={comment.id}
            comment={comment}
            onClickDelete={onClickDelete}
            onClickModify={onClickModify}
          />
        ))}
    </SWrapper>
  );
};

export default ProductCommentList;

/* Style */
const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 100px;
`;
