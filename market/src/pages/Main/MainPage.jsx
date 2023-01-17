import React, {useEffect, useState}from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import styled from "styled-components";
import { __getPostThunk } from "../../redux/modules/productSlice";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {post_list} = useSelector((state) => state.post);
  console.log(post_list)

  const [modal, setModal] = useState();

  useEffect(() => {
    dispatch(__getPostThunk());
  }, [dispatch]);


  return (
    <Layout>

      <Header setModal={setModal}/>
        <StHalves>
          <img src="img/clem.jpg"/>
          <StHalves_half>
            <p>당신의 중고 직거래 플랫폼</p>
            <p>FLEA MARKET</p>
          </StHalves_half>
        </StHalves>
        <StPost>
          {post_list.map((post) => (
              <Card key={post.id} post={post}/>
          ))}
        </StPost>
      
    </Layout>
  );
};

export default MainPage;

const StHalves = styled.div`
  display: flex;
  margin: 50px 0;
  img {
    flex: 1 1 50%;
     width: 50%;
  }
`;

const StHalves_half = styled.div`
  flex: 1 1 50%;
  background-color: #FAFAFA;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    font-size: 30px;
    color: #005691;
  }
  p:nth-child(2) {
    font-size: 50px;
    font-weight: bold;
  }
`;

const StPost = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 100px 40px;
  margin-top: 100px;
  padding: 20px;
`;