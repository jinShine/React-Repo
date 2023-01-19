import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authInstance, client, defaultInstance } from "../../shared/api/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/* Action Type */
export const actionType = {
  product: {
    GET_POST_DETAIL: "GET_POST_DETAIL",
    POST_POST_FAVORITE: "POST_POST_FAVORITE",
  },
};

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

    // const json = JSON.stringify(request);
    // const blob = new Blob([json], { type: "application/json" });

    // formData.append("name", payload.name);
    // formData.append("description", payload.description);
    // formData.append("price", payload.price);
    // formData.append("category", payload.category);
    // formData.append("image_url", payload.image_url);
    // formData.append("request", blob);

    // const productData = useSelector((state) => state.file.fileData);
    // const [imageURL, setImageURL] = useState("");

    // useEffect(() => {
    //   setImageURL(productData.url);
    // }, [productData]);

    // const newPayload = {
    //   name: payload.name,
    //   description: payload.description,
    //   price: payload.price,
    //   category: payload.category,
    //   imageUrl: payload.imageResponseDto.url,
    // };

    // console.log(newPayload);

    try {
      const { data } = await axios.post(
        `http://43.201.34.54:8080/posts`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dGVzdEBAIiwiYXV0aCI6IlVTRVIiLCJleHAiOjE2NzQwNjM0MDQsImlhdCI6MTY3NDAyMDIwNH0.TFVHChWI4H3QCXmdMW2YB3ez_nLhuQeZnDkTNlrnNlo",
          },
          // params: {
          //   page: 1,
          //   size: 10,
          //   isAsc: true,
          //   sortBy: "id",
          // },
        }
      );
      console.log("data", data);
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

///////// 이미지 업로드 thunk,POST ///////////////////
// export const __addProductImgPostThunk = createAsyncThunk(
//   "ADD_PRODUCT_IMG_POST",
//   async (payload, thunkAPI) => {
//     const formData = new FormData();

//     formData.append("file", payload.file);

//     try {
//       const { data } = await axios.post(
//         `http://43.201.34.54:8080/files/image`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             // Authorization:
//             // "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dGU0ISEiLCJhdXRoIjoiVVNFUiIsImV4cCI6MTY3Mzk3MTkyNywiaWF0IjoxNjczOTY4MzI3fQ.J3POP6SstOzeVLFfrQgG7urpbG-nadac4OSrbAtBL94",
//           },
//         }
//       );
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

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
            // Authorization:
            //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJidXp6IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE2NzM5NDUzMTEsImlhdCI6MTY3Mzk0MTcxMX0.RPFBk53OaCwL7dfwuZth3ulMI5pS0X1q5h3ltFSm77I",
          },
          params: {
            page: 1,
            size: 30,
            isAsc: false,
            sortBy: "id",
          },
        },
        { withCredentials: true }
      );
      console.log("get data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

///////// 게시글 삭제 thunk,DELETE ///////////////////

/////////////// 게시글 수정 ////////////////////////

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
      console.log(result.data);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
  detailPost: {},
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
      console.log("action.payload", action.payload);
      state.post_list = action.payload.content;
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
      console.log("action.payload", action.payload);
    },
    [__addPostThunk.rejected]: (state, action) => {
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
      console.log("상세 데이터!", action.payload);
    },
    [__detailPost.rejected]: (state, action) => {
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
      console.log("상세 데이터!", action.payload);
    },
    [__detailPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // [__addProductImgPostThunk.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__addProductImgPostThunk.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   // state.post_list = [...state.post_list, action.payload];
    // },
    // [__addProductImgPostThunk.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
// export const {} = guestBooksSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default productSlice.reducer;
