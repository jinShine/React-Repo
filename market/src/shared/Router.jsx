import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import Signin from "../pages/login/Signin";
import Signout from "../pages/login/Signout";
import Signup from "../pages/login/Signup";
import ProductRegistration from "../pages/product/ProductRegistration";
import ProductDetail from "../pages/product/detail/ProductDetail";
import NotFound from "../pages/error/NotFound";

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
        <Route path={"/product-detail"}>
          <Route path={":productId"} element={<ProductDetail />} />
        </Route>
        {/* Error */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
