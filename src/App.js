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

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Định tuyến User */}
        <Route path="/user">
          <Route path="index" element={<UserLayout />} />
        </Route>

        {/* Định tuyến Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
        </Route>
      </>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={route} />
    </React.StrictMode>
  );
}

export default App;
