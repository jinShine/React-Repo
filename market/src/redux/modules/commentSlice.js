import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../shared/api/api";

export const actionType = {
  comment: {
    GET_COMMENTS_BY_PRODUCT_ID: "GET_COMMENTS_BY_PRODUCT_ID",
    POST_COMMENT: "POST_COMMENT",
    DELETE_COMMENT: "DELETE_COMMENT",
    MODIFY_COMMENT: "MODIFY_COMMENT",
  },
};

const initialState = {
  isSuccess: false,
  isLoading: false,
  error: null,
  comments: [],
};

/* 댓글 조회 */
export const __getComments = createAsyncThunk(
  actionType.comment.GET_COMMENTS_BY_PRODUCT_ID,
  async (productId, thunkAPI) => {
    try {
      const result = await client.get(`/comments/${productId}`);
      return thunkAPI.fulfillWithValue(result.data.comments);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 댓글 작성 */
export const __submitComment = createAsyncThunk(
  actionType.comment.POST_COMMENT,
  async (commentData, thunkAPI) => {
    try {
      const result = await client.post("/comments", commentData);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 댓글 삭제 */
export const __deleteComment = createAsyncThunk(
  actionType.comment.DELETE_COMMENT,
  async (commentId, thunkAPI) => {
    try {
      let result = await client.delete(`/comments/${commentId}`);
      console.log(result.data);
      return thunkAPI.fulfillWithValue(commentId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 댓글 수정 */
export const __modifyComment = createAsyncThunk(
  actionType.comment.MODIFY_COMMENT,
  async (payload, thunkAPI) => {
    try {
      let result = await client.patch(`/comments/${payload.commentId}`, {
        comment: payload.comment,
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 댓글 조회
      .addCase(__getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getComments.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.comments = action.payload;
        console.log("댓글 데이터!", action.payload);
      })
      .addCase(__getComments.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      })
      // 댓글 작성
      .addCase(__submitComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__submitComment.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;

        const comment = action.payload;
        comment.state = true;
        comment.replies = [];
        // 새로고침 하면 의미없음
        //post 했을때 추가된 값이 response로 내려옴
        // 댓글 조회하는 배열에 추가함 (배열이 변경되어서 스스로 렌더링 -> 리로드)
        state.comments = [...state.comments, comment];
      })
      .addCase(__submitComment.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      })
      // 댓글 삭제
      .addCase(__deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__deleteComment.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(__deleteComment.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      })
      // 댓글 수정
      .addCase(__modifyComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__modifyComment.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.comments = [...state.comments].map((comment) => {
          if (comment.id === action.payload.commentId) {
            const newComment = comment;
            newComment.comment = action.payload.comment;
            return newComment;
          }

          return comment;
        });
      })
      .addCase(__modifyComment.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      });
  },
});

export const {} = commentSlice.actions;
export default commentSlice.reducer;
