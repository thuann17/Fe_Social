import "./App.css";
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import UserLayout from "./Layouts/UserLayout";
import AdminLayout from "./Layouts/AdminLayout"; 
import MyProfileLayout from "./Layouts/MyProfileLayout"; 
import FriendLayout from "./Layouts/FriendLayout"; 
import LoginForm from "./login";
import RegisterForm from "./register";



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* User Routes */}
        <Route path="/user" >
          <Route path="index" element={<UserLayout />} /> {/* Redirect to UserLayout by default */}
          <Route path="profile" element={<MyProfileLayout />} />
          <Route path="friends" element={<FriendLayout />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Uncomment and define your Admin routes here */}
          {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
        </Route>

        <Route>
          <Route path="login" element={<LoginForm />} /> {/* Redirect to UserLayout by default */}
          <Route path="register" element={<RegisterForm />} />
        </Route>
      </>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;