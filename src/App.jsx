import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
// layout
import MainLayout from "./layouts/MainLayout";

// pages
import HomePage from "./pages/HomePage";
import WishlistPage from "./pages/WishlistPage";
import ShippingPage from "./pages/ShippingPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import BlogsPage from "./pages/BlogsPage";
import BlogPage from "./pages/BlogPage";
import FeaturePage from "./pages/FeaturePage";
import TrackingStatusOrderPage from "./pages/TrackingStatusOrderPage";
import QRpaymentPage from "./pages/QRpaymentPage";
import ProductTypePage from "./pages/ProductTypePage";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {/* sub-page will have breadcrumb ex. Home / Wishlists */}
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/tracking" element={<TrackingStatusOrderPage />} />
        <Route path="/payment" element={<QRpaymentPage />} />
        <Route path="/products">
          <Route index element={<ProductsPage />} />
          <Route path=":typeProduct">
            <Route index element={<ProductTypePage />} />
            <Route path=":productName" element={<ProductPage />} />
          </Route>
        </Route>
        <Route path="/blogs">
          <Route index element={<BlogsPage />} />
          <Route path=":blog" element={<BlogPage />} />
        </Route>

        <Route path="/feature" element={<FeaturePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
