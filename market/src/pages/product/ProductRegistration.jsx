import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
// import { gTheme } from "../../theme/globalTheme";
import { FormControl } from "@mui/material";
import { __addPostThunk, __postReset } from "../../redux/modules/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { gTheme } from "../../theme/globalTheme";
import { __addProductImgPostThunk } from "../../redux/modules/productSlice";
import {
  __fileReset,
  __productImageUpload,
} from "../../redux/modules/fileSlice";
import { __userInfo } from "../../redux/modules/userSlice";

const ProductRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUploadSucces = useSelector((state) => state.post.isSuccess);
  const productData = useSelector((state) => state.file.fileData);

  const [imageURL, setImageURL] = useState("");

  const [category, setCategory] = useState("");
  const [image, setImage] = useState("img/base_img.png");
  const [imageFile, setImageFile] = useState("");

  const [post, setPost] = useState({
    category: "",
    description: "",
    imageResponseDto: "",
    name: "",
    price: "",
  });

  useEffect(() => {
    setImageURL(productData.url);
    // setImageURL에 url을 넣었기 때문에 productData 안에 내용물(url)은 더이상 필요 없음
    // fileData는 임시 저장소 같은 느낌 (이미지 url 받으려고)
    // 비워주지 않으면 내용물이 계속 남아있음
    // 게시글 post 해서 서버에 데이터 보내고 GET으로 가져오면 되니까 store에 img url은 필요없음
    setPost({
      ...post,
      imageResponseDto: productData,
    });
  }, [productData]);

  useEffect(() => {
    // true일때만 home으로
    // 게시글이 등록된것이 확인 되었을 때 navegate
    // 어쩔땐 등록이 되고 어쩔땐 등록이 안되고 그랬던 이유가
    // 시점이 안맞아서 그랬던거임
    // 상태값을 받아서 통신 성공이 확인 되면 그때 navigate
    if (isUploadSucces) {
      navigate("/");
    }

    return () => {
      dispatch(__fileReset());
      dispatch(__postReset());
    };
  }, [isUploadSucces]);
  // isUploadSucces가 변경되면 useEffect 실행
  // 클린업 실행해서 succes 상태 변경

  const imagePreview = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  const imageUpLoad = async (e) => {
    imagePreview(e.target.files[0]);
    setImageFile(e.target.files[0]);
    const imgFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", imgFile);
    dispatch(__productImageUpload(formData));
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setPost({
      ...post,
      [name]: value,
      category: category,
    });
  };

  const handleDelete = () => {
    setImage("img/base_img.png");
    setPost({
      ...post,
      imageResponseDto: null,
    });
  };

  return (
    <Layout>
      <Header />

      <Stdiv>
        <Button
          variant="contained"
          sx={{ bgcolor: gTheme.color.primary }}
          onClick={() => {
            navigate("/");
          }}
        >
          이 전 으 로
        </Button>
      </Stdiv>

      {/* 전체를 감싸는 div */}
      <StContainer>
        <StForm
          onSubmit={(event) => {
            event.preventDefault();
            if (
              post.name.trim() === "" ||
              post.price.trim() === "" ||
              post.description.trim() === ""
            ) {
              return alert("모든 항목을 입력해주세요.");
            }
            dispatch(__addPostThunk(post));
            setPost({ name: "", price: "", description: "" });
          }}
        >
          {/* 이미지 등록 구역 div */}
          <StImgBox>
            <ViewImg>
              {/* <img  src="img/base_img.png"/> */}
              {/* 판매할 상품 사진을 등록해주세요. */}
              <img src={image} />
            </ViewImg>
            <div>
              <Button
                variant="contained"
                component="label"
                sx={{ bgcolor: gTheme.color.primary }}
              >
                Upload
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={imageUpLoad}
                />
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                sx={{ bgcolor: gTheme.color.primary }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </StImgBox>

          {/* input 구역 div */}
          <StInputBox>
            {/* <StInputdiv> */}

            {/* <span>상 품 명</span> */}
            <TextField
              id="standard-basic"
              label="상 품 명"
              variant="standard"
              onChange={onChangeHandler}
              value={post.name || ""}
              name="name"
              maxLength={20}
            />

            {/* <span>가 격</span> */}
            <TextField
              id="standard-basic"
              label="가 격"
              variant="standard"
              onChange={onChangeHandler}
              value={post.price || ""}
              name="price"
              maxLength={20}
            />

            {/* 카테고리 select box */}
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">
                카 테 고 리
              </InputLabel>

              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={category}
                label="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"디지털 기기"}>디지털 기기</MenuItem>
                <MenuItem value={"생활 가전"}>생활 가전</MenuItem>
                <MenuItem value={"의류"}>의류</MenuItem>
                <MenuItem value={"잡화"}>잡화</MenuItem>
                <MenuItem value={"도서"}>도서</MenuItem>
                <MenuItem value={"식품"}>식품</MenuItem>
                <MenuItem value={"식물"}>식물</MenuItem>
                <MenuItem value={"기타"}>기타</MenuItem>
              </Select>
            </FormControl>

            {/* <div>상 품 설 명</div> */}
            <Textarea
              rows="10"
              maxLength={200}
              placeholder="상품 설명을 입력해주세요. (200자 이내)"
              onChange={onChangeHandler}
              value={post.description || ""}
              name="description"
            />

            <Button
              variant="contained"
              type="submit"
              sx={{ bgcolor: gTheme.color.primary }}
            >
              판매글 등록하기
            </Button>
            {/* </StInputdiv> */}
          </StInputBox>
        </StForm>
      </StContainer>
    </Layout>
  );
};

export default ProductRegistration;

const StContainer = styled.div`
  color: black;
  width: 1200px;
  height: 100%;
`;

const StForm = styled.form`
  width: 100%;
  display: flex;

  /* justify-content: center; */
  /* padding: 0px 10px 10px 10px; */
  /* margin-left: 40px; */
  margin-top: 60px;
`;

const StInputBox = styled.div`
  color: #333333;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  width: 50%;
  font-size: 20px;
  padding: 0px 100px 0px 100px;
  & > div {
    padding-bottom: 20px;
    width: 100%;
  }

  & > p {
    margin: 0;
  }
`;

const StImgBox = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* padding: 15px 40px 0px 40px; */
  /* margin-right: 40px; */
  /* & > div:first-child {
  width: 60%;
  height: 370px;
  margin-top: 40px;
 } */
  & > div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60px;
    width: 100%;
    margin-top: 40px;
    padding-top: 30px;
  }
  /* & > div:nth-child(2) button {
  
 } */
`;

const Stdiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 20px 110px 0px 0px;
`;

const ViewImg = styled.div`
  border: 1px solid #004a7c;
  border-radius: 10px;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

// const StInputdiv = styled.div`
//   border: 1px solid black;
//   margin: 30px;
//   & > div {
//     padding-top: 20px;
//   }
//   padding-left: 60px;
// `;

const Textarea = styled.textarea`
  width: 95%;
  /* border: 1px solid #004A7C; */
  padding: 12px;
  /* margin-top: 30px; */
  margin-top: 20px;
  margin-bottom: 60px;
  font-size: 14px;
`;
