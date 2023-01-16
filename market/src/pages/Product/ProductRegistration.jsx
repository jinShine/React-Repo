import React ,{useState}from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import Header from "../../components/Header";
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
// import { gTheme } from "../../theme/globalTheme";
import { FormControl } from "@mui/material";
import { __addPostThunk } from "../../redux/modules/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { gTheme } from "../../theme/globalTheme";


const ProductRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [age, setAge] = useState('');

  const handleChange = (e) => {
    setAge(e.target.value)};
    
  const [post, setPost] = useState({
    name: "",
    description: "",
    price: "",
    file: "",
  });


  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState("");


  const imagePreview = (fileBlob) =>{
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) =>{
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      }
    })
  }

  const imageUpLoad = (e)=> {
    imagePreview(e.target.files[0]);
    setImageFile(e.target.files[0]);
    setPost({
      ...post,
      file: e.target.files[0],
    })
  }


  const onChangeHandler = (event) => {
    const {name, value} = event.target;
    setPost({
      ...post,
      [name] : value,
    })
  };

  console.log("post", post);

  return (
    <Layout>
      <Header />

        <Stdiv>
          <Button variant="contained" sx={{ bgcolor: gTheme.color.primary }} onClick={() => {
                navigate("/");
              }}>이 전 으 로</Button>
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
            navigate("/")
          }}
          >
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
              <TextField id="standard-basic" label="가 격" variant="standard" 
              onChange={onChangeHandler} value={post.price || ""} name="price"
              maxLength={20}
              />
          
             
            

            
              
              {/* select box */}
              <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">카 테 고 리</InputLabel>
          
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                label="category"
                onChange={handleChange}
                
                >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
            
              <Button variant="contained" type="submit" sx={{ bgcolor: gTheme.color.primary }}>판매글 등록하기</Button>
              {/* </StInputdiv> */}
          </StInputBox>


          {/* 이미지 등록 구역 div */}
          <StImgBox>
            <ViewImg>
              {/* <img  src="img/base_img.png"/> */}
              {/* 판매할 상품 사진을 등록해주세요. */}
              <img src={image}/>
            </ViewImg>
            <div>
            <Button variant="contained" component="label" sx={{ bgcolor: gTheme.color.primary }}>
                        Upload
                <input hidden accept="image/*" multiple type="file" onChange={imageUpLoad}/>
              </Button>
              <Button variant="contained" startIcon={<DeleteIcon />} sx={{ bgcolor: gTheme.color.primary }}>
                   Delete
              </Button>
            </div>
          </StImgBox>
          </StForm>
        </StContainer>
      </Layout>
    );
};

export default ProductRegistration;

const StContainer = styled.div`
  color : black;
  height: 100%;
`;

const StForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0px 10px 10px 10px;
  margin-left: 40px;
  margin-top: 60px;
`;

const StInputBox = styled.div`
  color : #333333;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  width: 50%;
  font-size: 20px;
  padding: 0px 100px 0px 100px;
  & > div{
    padding-bottom: 20px;
    width: 100%;
  }

  & > p {
    margin: 0;
  }
`;

const StImgBox = styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 15px 40px 0px 40px;
margin-right: 40px;
 /* & > div:first-child {
  width: 60%;
  height: 370px;
  margin-top: 40px;
 } */
 & > div:nth-child(2) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-top: 40px;
  
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
  border: 1px solid #004A7C;
  width: 80%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
  width: 100%;
  height: 100%;
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