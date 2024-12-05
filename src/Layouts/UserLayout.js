import React from "react";
import { Outlet } from "react-router-dom";
import ClientHeader from "../Components/user/header";
function UserLayout() {
  return (
    <div>
      {/* Header */}
      <ClientHeader />

      {/* Nội dung chính của mỗi trang, ví dụ Dashboard */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      {/* <ClientFooter /> */}
    </div>
  );
}

export default UserLayout;
