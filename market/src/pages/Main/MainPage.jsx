import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { gTheme } from "../../theme/globalTheme";
import Header from "../../components/Header";

const MainPage = () => {
  const navigate = useNavigate();
  const posts = useSelector((state) => state.post.post_list);

  return (
    <Layout>
      <Header />
      <div>
        <button onClick={() => navigate("/signin")}>로그인</button>
        <button onClick={() => navigate("/product-registration")}>
          상품등록
        </button>
        <button onClick={() => navigate("/product-detail")}>상품상세</button>
      </div>
    </Layout>
  );
};

export default MainPage;
