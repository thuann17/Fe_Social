import "./App.css";
import React, { useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie"; // Thư viện để xử lý cookies

// Các Layouts và Pages
import UserLayout from "./Layouts/UserLayout";
import TripPlanner from "./Pages/user/Trip/TripPlanner";
import Login from "./Pages/login/login";
import ForgotPassword from "./Pages/login/ForgotPassword";
import Chat from "./Pages/user/Chat/Chat";
import AdminLayout from "./Layouts/AdminLayout";
import TripLayout from "./Layouts/TripLayout";
import MyProfileLayout from "./Layouts/MyProfileLayout";
import FriendLayout from "./Layouts/FriendLayout";
import RegisterForm from "./Pages/register/register";
import FriendList from "./Pages/user/Friend/FriendList";
import PostList from "./Pages/user/Post/PostList";
import DetailsPlan from "./Pages/user/Trip/DetailsPlanner";
import DetailsPlace from "./Pages/user/Trip/DetailsPlace";
import MapTest from "./Pages/user/Trip/MapTest";
import UploadImage from "./Services/UploadImage";
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = Cookies.get("token");
  const userRole = Cookies.get("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  // x
  return children;
};

function App() {
  // Định nghĩa router với các routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Định tuyến User */}
        <Route path="/user" element={<ProtectedRoute requiredRole="User"><UserLayout /></ProtectedRoute>}>
        
          <Route path="index" element={<PostList />} />
          <Route path="cal" element={<TripPlanner />} />
          <Route path="profile" element={<MyProfileLayout />} />
          <Route path="friendprofile" element={<FriendLayout />} />
          <Route path="friends" element={<FriendList />} />
          <Route path="place" element={<TripLayout />} />
          <Route path="detailsplan" element={<DetailsPlan />} />
          <Route path="detailsplace/:addressFilter" element={<DetailsPlace />} />
        </Route>

        {/* Định tuyến Admin */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="Admin"><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<div>Admin Dashboard</div>} />
        </Route>

        {/* Định tuyến cho Login và Forgot Password */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/user/chat" element={<Chat />} />
        <Route path="/map" element={<MapTest />} />
        <Route path="/load" element={<UploadImage />} />
        {/* Định tuyến cho Register */}
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
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
