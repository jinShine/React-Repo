import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { gTheme } from "../../../theme/globalTheme";

const ProductCommentListItem = ({ comment, onClickDelete, onClickModify }) => {
  const [isModifyComment, setIsModifyComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const onClickModifyCancel = (event) => {
    event.stopPropagation();
    toggleModifyComment();
  };

  const onClickModifyHandler = (event) => {
    event.stopPropagation();
    onClickModify({ comment: commentText, commentId: comment.id });
    toggleModifyComment();
  };

  const onClickDeleteHandler = (event) => {
    event.stopPropagation();
    onClickDelete(comment.id);
  };

  const onClickModifyToggleHandler = (event) => {
    event.stopPropagation();
    toggleModifyComment();
  };

  const onChangeModifyComment = (event) => {
    setCommentText(event.target.value);
  };

  function toggleModifyComment() {
    setIsModifyComment((prev) => !prev);
  }

  useEffect(() => {
    setCommentText(comment.comment);
  }, []);

  return (
    <SWrapper>
      <SCommentContainer>
        {isModifyComment ? (
          <>
            <SCommentTextField
              height={30}
              value={commentText}
              onChange={onChangeModifyComment}
            />
            <>
              <IconButton
                sx={{ color: "lightgray" }}
                onClick={onClickModifyCancel}
              >
                <CloseIcon />
              </IconButton>
              <IconButton
                sx={{ color: gTheme.color.primary }}
                onClick={onClickModifyHandler}
              >
                <DoneIcon />
              </IconButton>
            </>
          </>
        ) : (
          <>
            <SContentText>{comment.comment}</SContentText>
            <SCommentActions>
              {comment.state && (
                <>
                  <IconButton
                    sx={{ color: "lightgray" }}
                    onClick={onClickModifyToggleHandler}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: "lightgray" }}
                    onClick={onClickDeleteHandler}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </SCommentActions>
          </>
        )}
      </SCommentContainer>
    </SWrapper>
  );
};

export default ProductCommentListItem;

/* Style */
const SWrapper = styled.div`
  width: 100%;
  padding: 16px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 50px;
  border-top: 1px solid rgb(240, 240, 240);
`;

const SCommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
`;

const SCommentTextField = styled(TextField)`
  width: 100%;
`;

const SCommentActions = styled.div`
  width: 13%;
`;

const SContentText = styled.div`
  width: 100%;
  font-size: 16px;
  white-space: pre-wrap;
`;
