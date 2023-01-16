import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authInstance, defaultInstance } from "../../shared/api";

///////// 게시글 추가 thunk,POST ///////////////////
export const __addPostThunk = createAsyncThunk(
  "ADD_POST",
  async (payload, thunkAPI) => {
    // const formData = new FormData();

    // const request = {
    //   name: payload.name,
    //   description: payload.description,
    //   price: payload.price,
    // };
    // console.log(request);
    // const json = JSON.stringify(request);
    // const blob = new Blob([json], { type: "application/json" });

    // formData.append("name", payload.name);
    // console.log("form", formData);
    // formData.append("description", payload.description);
    // formData.append("price", payload.price);
    // formData.append("file", payload.file);
    // formData.append("request", blob);

    try {
      const { data } = await defaultInstance.post(
        `/posts`,
        payload
        // , formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

///////// 전체 게시글 조회 thunk,GET ///////////////////
export const __getPostThunk = createAsyncThunk(
  "GET_POSTS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await defaultInstance.get(`/posts`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

///////// 게시글 삭제 thunk,DELETE ///////////////////

/////////////// 게시글 수정 ////////////////////////

/////////// 단일 게시글 조회 /////////////////

///////////// initialState //////////////////////////
const initialState = {
  post_list: [],
  post: {
    id: 0,
    name: "",
    discription: "",
    price: 0,
    // category: "",
    // image: "",
  },
  error: null,
  isLoading: false,
};

/////////////// slice /////////////
export const productSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [__getPostThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post_list = action.payload;
    },
    [__getPostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addPostThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__addPostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post_list = [...state.post_list, action.payload];
    },
    [__addPostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
// export const {} = guestBooksSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default productSlice.reducer;
