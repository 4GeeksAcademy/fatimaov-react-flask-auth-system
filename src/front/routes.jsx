// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Private } from "./pages/Private";
import { UserProfile } from "./components/UserProfile";


export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <>
      <Route path="/" element={<Navigate to={"/login"} replace/>} errorElement={<h1>Not found!</h1>} />
      <Route path="/login" element={<Login />} errorElement={<h1>Not found!</h1>} />
      <Route path="/signup" element={<Signup />} errorElement={<h1>Not found!</h1>}/>
      <Route path="/private" element={<Private />} errorElement={<h1>Not found!</h1>}>
        <Route index element={<UserProfile />} />
      </Route>
    </>

  )
);