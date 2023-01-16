import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/error/NotFound";
import Signin from "../pages/Login/Signin";
import Signout from "../pages/Login/Signout";
import Signup from "../pages/Login/Signup";
import MainPage from "../pages/Main/MainPage";
import ProductRegistration from "../pages/Product/ProductRegistration";

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
        {/* Error */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
