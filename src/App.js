import "./App.css";
import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";

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
import TripStart from "./Pages/user/Trip/TripStart";
import DetailsPlace from "./Pages/user/Trip/DetailsPlace";
import AccountAdmin from "./Pages/admin/Account/account";
import RegisterAdminForm from "./Pages/register/RegisterAdmin";
import PostAdmin from "./Pages/admin/Post/PostAdmin";
import PlacesManager from "./Pages/admin/Place/PlacesManager";
import AccountDetail from "./Pages/admin/Account/accountdetail";
import ProfileAdmin from "./Pages/admin/Profile/ProfileAdmin";
import Dashboard from "./Pages/admin/Home/dashboard";
import { useNavigate } from "react-router-dom";
import HoSo from "./Pages/user/Profile/HoSo";
const ProtectedRoute = ({ children, requiredRole }) => {
  const userRole = Cookies.get("role");


  if (requiredRole && userRole !== requiredRole) {
    if (userRole === "Admin") {
      return <Navigate to="/dashboard" replace />;
    } else if (userRole === "User") {
      return <Navigate to="/index" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

function App() {
  const token = Cookies.get("token");
  const userRole = Cookies.get("role");

  const defaultRoute = () => {
    if (!token) {
      return "/login";
    }
    return userRole === "Admin" ? "/dashboard" : "/index";
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to={defaultRoute()} replace />} />
        <Route
          path=""
          element={<ProtectedRoute requiredRole="User"><UserLayout /></ProtectedRoute>}
        >
          <Route path="index" element={<PostList />} />
          <Route path="cal" element={<TripPlanner />} />
          <Route path="myprofile" element={<MyProfileLayout />} />
          <Route path="friendprofile/:username" element={<FriendLayout />} />
          <Route path="friends" element={<FriendList />} />
          <Route path="friends" element={<FriendList />} />
          <Route path="place" element={<TripLayout />} />
          <Route path="hoso" element={<HoSo />} />
          <Route path="tripstart" element={<TripStart />} />
          <Route path="detailsplan" element={<DetailsPlan />} />
          <Route path="detailsplace/:addressFilter" element={<DetailsPlace />} />
        </Route>
        <Route
          path="/chat"
          element={
            <ProtectedRoute requiredRole="User">
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<ProtectedRoute requiredRole="Admin"><AdminLayout /></ProtectedRoute>}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="place" element={<PlacesManager />} />
          <Route path="account" element={<AccountAdmin />} />
          <Route path="account-detail" element={<AccountDetail />} />
          <Route path="post" element={<PostAdmin />} />
          <Route path="register-admin" element={<RegisterAdminForm />} />
          <Route path="profile" element={<ProfileAdmin />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/register" element={<RegisterForm />} />
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