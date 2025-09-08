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
import BlogPage from "./pages/BlogPage";
import FeaturePage from "./pages/FeaturePage";
import TrackingStatusOrder from "./pages/TrackingStatusOrder";
import QRpayment from "./pages/QRpayment";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {/* sub-page will have breadcrumb ex. Home / Wishlists */}
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/tracking" element={<TrackingStatusOrder />} />
        <Route path="/payment" element={<QRpayment />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productID" element={<ProductPage />} />
        <Route path="/blog" element={<BlogPage />} />
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
