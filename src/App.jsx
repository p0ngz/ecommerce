import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
// layout
import MainLayout from "./layouts/MainLayout";

// pages
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage";
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
