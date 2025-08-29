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
import WishlistPage from "./pages/WishlistPage"
import ShippingPage from "./pages/ShippingPage"
import NotFoundPage from "./pages/NotFoundPage";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {/* sub-page will have breadcrumb ex. Home / Wishlists */}
        <Route path="/wishlist" element={<WishlistPage />}/>
        <Route path="/shipping" element={<ShippingPage />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
