import { Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import About from "./pages/About";
import AdDetails from "./pages/AdDetails";
import HomePage from "./pages/HomePage";
import NewADForm from "./pages/NewAdForm";
import NewCat from "./pages/NewCategoryAdd";
import AdSearchPage from "./pages/AdSearchPage";
import AdByCategory from "./pages/AdByCategory";
import AdModificationPage from "./pages/AdmodificationPage";
import { ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS
import { useQuery, gql } from "@apollo/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function App() {
  return (
    <>
      <Routes>
        {/* Define a parent route "/" with Layout as the component */}
        <Route path="/" element={<Layout />}>
          {/* Nested route - this will render components in the <Outlet /> of Layout */}
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="ad/new" element={<NewADForm />} />
          <Route path="ad/:id" element={<AdDetails />} />
          <Route path="category/new" element={<NewCat />} />
          <Route path="ad/search/:keyword" element={<AdSearchPage />} />
          <Route path="ad/category/:category" element={<AdByCategory />} />
          <Route path="/ad/modify/:id" element={<AdModificationPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
