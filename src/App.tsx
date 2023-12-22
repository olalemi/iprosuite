import RootLayout from "./layouts/RootLayout.tsx";
import LaunchPage from "./screens/LaunchPage.tsx";
import HomePage from "./screens/HomePage.tsx";
import UserProvider from "./utility/UserProvider";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index={true} element={<HomePage />} />
      <Route path="/launch/:id" element={<LaunchPage />} />
    </Route>,
  ),
);
function App() {
  return (
    <>
      <div>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </div>
    </>
  );
}

export default App;
