import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fileAPI } from "../../shared/api/fileAPI";

export const actionType = {
  file: {
    POST_PROFILE_IMAGE: "POST_PROFILE_IMAGE",
    POST_PRODUCT_IMAGE: "POST_PRODUCT_IMAGE",
  },
};

const initialState = {
  isLoading: false,
  error: null,
  fileData: {},
};

// 프로필 이미지 업로드
export const __profileImageUpload = createAsyncThunk(
  actionType.file.POST_PROFILE_IMAGE,
  async (file, thunkAPI) => {
    try {
      const result = await fileAPI.post(
        process.env.REACT_APP_BASE_URL + "/files/profile",
        file
      );

      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 상품 이미지 업로드
export const __productImageUpload = createAsyncThunk(
  actionType.file.POST_PRODUCT_IMAGE,
  async (file, thunkAPI) => {
    try {
      const result = await fileAPI.post(
        process.env.REACT_APP_BASE_URL + "/files/image",
        file
      );

      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    __fileReset: (state, action) => {
      state.fileData = {};
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 프로필 업로드
      .addCase(__profileImageUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__profileImageUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fileData = action.payload;
      })
      .addCase(__profileImageUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // 상품 이미지 업로드
      .addCase(__productImageUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__productImageUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fileData = action.payload;
      })
      .addCase(__productImageUpload.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { __fileReset } = fileSlice.actions;
export default fileSlice.reducer;
