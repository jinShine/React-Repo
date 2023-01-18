import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../shared/api/api";
import { authAPI } from "../../shared/api/authAPI";
import { gDelay } from "../../shared/utils/delay";

export const actionType = {
  user: {
    POST_SIGNUP: "POST_SIGNUP",
    POST_SIGNIN: "POST_SIGNIN",
    GET_USER_INFO: "GET_USER_INFO",
    DELETE_USER: "DELETE_USER",
    PUT_CHANGE_PASSWORD: "PUT_CHANGE_PASSWORD",
  },
};

const initialState = {
  isSuccess: false,
  isLoading: false,
  error: null,
};

/* 회원가입 */
export const __signup = createAsyncThunk(
  actionType.user.POST_SIGNUP,
  async (user, thunkAPI) => {
    await gDelay(1500);
    try {
      const result = await authAPI.post(
        process.env.REACT_APP_BASE_URL + "/api/user/signup",
        user
      );

      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 로그인 */
export const __signin = createAsyncThunk(
  actionType.user.POST_SIGNIN,
  async (user, thunkAPI) => {
    try {
      const result = await client.post(
        process.env.REACT_APP_BASE_URL + "/api/user/login",
        user
      );
      return thunkAPI.fulfillWithValue(result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 로그인 유저 이름 반환 */
export const __userInfo = createAsyncThunk(
  actionType.user.GET_USER_INFO,
  async (_, thunkAPI) => {
    try {
      const result = await client.get(
        process.env.REACT_APP_BASE_URL + "/api/user/info"
      );
      return thunkAPI.fulfillWithValue(result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    __userReset: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 회원가입
      .addCase(__signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__signup.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(__signup.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      })
      // 로그인
      .addCase(__signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__signin.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(__signin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // 유저 정보
      .addCase(__userInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__userInfo.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(__userInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { __userReset } = userSlice.actions;
export default userSlice.reducer;
