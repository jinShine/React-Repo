import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/error/NotFound";
import Signin from "../pages/login/Signin";
import Signout from "../pages/login/Signout";
import Signup from "../pages/login/Signup";
import MainPage from "../pages/main/MainPage";
import ProductRegistration from "../pages/product/ProductRegistration";
import ProductDetail from "../pages/product/detail/ProductDetail"


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main */}
        <Route path={"/"} element={<MainPage />} />
        {/* Login */}
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/signout"} element={<Signout />} />
        <Route path={"/signup"} element={<Signup />} />
        {/* Product */}
        <Route
          path={"/product-registration"}
          element={<ProductRegistration />}
        />
        <Route path={"/product-detail"} element={<ProductDetail />} />
        {/* Error */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
