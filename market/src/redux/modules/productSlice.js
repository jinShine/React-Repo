import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../shared/api/api";

/* Action Type */
export const actionType = {
  product: {
    GET_POST_DETAIL: "GET_POST_DETAIL",
    POST_POST_FAVORITE: "POST_POST_FAVORITE",
    DELETE_POST_FAVORITE: "DELETE_POST_FAVORITE",
  },
};

///////// 게시글 추가 thunk,POST ///////////////////

export const __addPostThunk = createAsyncThunk(
  "ADD_POST",
  async (payload, thunkAPI) => {
    try {
      const { data } = await client.post(
        process.env.REACT_APP_BASE_URL + "/posts",
        payload
      );
      // for (var key of formData.keys()) {
      //   console.log(key);
      // }
      // for (var value of formData.values()) {
      //   console.log(value);
      // }
      return thunkAPI.fulfillWithValue(payload);
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
      const { data } = await client.get(
        `/posts/get`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
            size: 100,
            isAsc: false,
            sortBy: "id",
          },
        },
        { withCredentials: true }
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

///////// 게시글 삭제 thunk,DELETE ///////////////////

export const __deletePost = createAsyncThunk(
  actionType.product.DELETE_POST_FAVORITE,
  async (id, thunkAPI) => {
    try {
      const result = await client.delete(`/posts/${id}`);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/////////// 단일 게시글 조회 /////////////////

export const __detailPost = createAsyncThunk(
  actionType.product.GET_POST_DETAIL,
  async (id, thunkAPI) => {
    try {
      const result = await client.get(`/posts/${id}`);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/////////// 상품 찜 /////////////////

export const __productFavorite = createAsyncThunk(
  actionType.product.POST_POST_FAVORITE,
  async (id, thunkAPI) => {
    try {
      const result = await client.patch(`/posts/like/${id}`);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

///////////// initialState //////////////////////////
const initialState = {
  post_list: [],
  error: null,
  isSuccess: false,
  isLoading: false,
  detailPost: {},
};

/////////////// slice /////////////
export const productSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    __postReset: (state, action) => {
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [__getPostThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post_list = action.payload.content;
    },
    [__getPostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //  게시글 추가 //
    [__addPostThunk.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__addPostThunk.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      // response로 내려오는 값이 없어서 ("작성 완료")
      // payload를 store에 담을 필요가 없음
    },
    [__addPostThunk.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.error = action.payload;
    },
    // 상품 상세
    [__detailPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__detailPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detailPost = action.payload;
    },
    [__detailPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 상품 삭제
    [__deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 찜하기
    [__productFavorite.pending]: (state) => {
      state.isLoading = true;
    },
    [__productFavorite.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__productFavorite.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
// export const {} = guestBooksSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export const { __postReset } = productSlice.actions;
export default productSlice.reducer;
