import RootLayout from "./layouts/RootLayout.tsx";
import LaunchPage from "./screens/LaunchPage.tsx";
import HomePage from "./screens/HomePage.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index={true}  element={<HomePage />} />
      <Route path="/launch/:id" element={<LaunchPage />} />
    </Route>,
  ),
);a
function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
