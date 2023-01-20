import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../shared/api/api";
import { authAPI } from "../../shared/api/authAPI";
import { COMMON_DEALY_TIME, gDelay } from "../../shared/utils/delay";
import { tokenManager } from "../../shared/utils/tokenManager";

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
  userName: "",
  nickName: "",
  imgUrl: "",
};

/* 회원가입 */
export const __signup = createAsyncThunk(
  actionType.user.POST_SIGNUP,
  async (user, thunkAPI) => {
    await gDelay(COMMON_DEALY_TIME);
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
    await gDelay(COMMON_DEALY_TIME);
    try {
      const result = await client.post(
        process.env.REACT_APP_BASE_URL + "/api/user/login",
        user
      );
      return thunkAPI.fulfillWithValue(result.headers.authorization);
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
      console.log(result.data);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 비번 변경 */
export const __changePassword = createAsyncThunk(
  actionType.user.PUT_CHANGE_PASSWORD,
  async (user, thunkAPI) => {
    await gDelay(COMMON_DEALY_TIME);
    try {
      const result = await client.put(
        process.env.REACT_APP_BASE_URL + `/api/user/changepw/${user.username}`,
        user
      );
      console.log(result.data);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* 계정 삭제 */
export const __deleteUser = createAsyncThunk(
  actionType.user.DELETE_USER,
  async (user, thunkAPI) => {
    try {
      await client.delete(
        process.env.REACT_APP_BASE_URL + `/api/user/delete/${user}`
      );
      return thunkAPI.fulfillWithValue(user);
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
        console.log(action);
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
        state.isSuccess = true;
        state.isLoading = false;
        tokenManager.token = action.payload;
      })
      .addCase(__signin.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      })
      // 유저 정보
      .addCase(__userInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__userInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userName = action.payload.username;
        state.nickName = action.payload.nickname;
        state.imgUrl = action.payload.imgurl;
      })
      .addCase(__userInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // 비번 변경
      .addCase(__changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__changePassword.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        console.log(action);
      })
      .addCase(__changePassword.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.error = action.payload.response.data.errorMessage;
      })
      // 계정 삭제
      .addCase(__deleteUser.pending, () => {})
      .addCase(__deleteUser.fulfilled, () => {})
      .addCase(__deleteUser.rejected, () => {});
  },
});

export const { __userReset } = userSlice.actions;
export default userSlice.reducer;
