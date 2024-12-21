import "./App.css";
import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"; // Đảm bảo là từ react-router-dom

// Các Layouts và Pages
import UserLayout from "./Layouts/UserLayout";
import TripPlanner from "./Pages/user/Trip/TripPlanner";
// import TripStart from "./Pages/user/Trip/TripStart";
import Login from "./Pages/login/login";
import ForgotPassword from "./Pages/login/ForgotPassword";
import Chat from './Pages/user/Chat/Chat';
import AdminLayout from "./Layouts/AdminLayout";
import MyProfileLayout from "./Layouts/MyProfileLayout";

import RegisterForm from "./Pages/register/register";
import FriendLayout from "./Pages/user/Friend/FriendLayout";
import PostList from "./Pages/user/Post/PostList";
import UploadImage from "./Services/UploadImage";

function App() {
  // Define the router object
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Định tuyến User */}
        <Route path="/user">
          <Route path="index" element={<UserLayout />}/>
          <Route path="cal" element={<TripPlanner />} />
          {/* <Route path="start" element={<TripStart />} /> */}
          <Route path="profile" element={<MyProfileLayout />} />
          <Route path="friends" element={<FriendLayout />} />
          <Route path="" element={<UploadImage />} />
        </Route>

        {/* Định tuyến Admin */}
        <Route path="/admin">
          <Route path="dashboard" element={<AdminLayout />} />
        </Route>

        {/* Định tuyến cho Login và Forgot Password */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="" element={<UploadImage />}></Route>
        {/* Định tuyến cho Register */}
        <Route path="/register" element={<RegisterForm />} />

        {/* Chỉnh lại cấu trúc sao cho các Route không trùng lặp */}
      </>
    )
  );

  return (
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
    </React.StrictMode>
  );
}

export default App;
