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
import AdminLayout from "./Layouts/AdminLayout";
import TripPlanner from "./Pages/user/Trip/TripPlanner";
import TripStart from "./Pages/user/Trip/TripStart";
import Login from "./Pages/login/login";
import ForgotPassword from "./Pages/login/ForgotPassword";
import Chat from './Pages/user/Chat/Chat'
function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <>

        {/* Định tuyến User */}
        <Route path="/user" element={<UserLayout />} >
          <Route path="index" />
          <Route path="cal" element={<TripPlanner />} />
          <Route path="start" element={<TripStart />} />
        </Route>

        {/* Định tuyến Admin */}
        <Route path="/admin">
          <Route path="dashboard" element={<AdminLayout />} />
        </Route>

        {/* Định tuyến cho Login và ForgotPassword */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/chat" element={<Chat />} />
      </>
    )
  );

  return (
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={route} />
      </DndProvider>
    </React.StrictMode>
  );
}

export default App;
