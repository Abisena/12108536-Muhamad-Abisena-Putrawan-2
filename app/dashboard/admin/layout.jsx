import React from "react";
import SidebarAdmin from "../../ui/sidebarAdmin/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <SidebarAdmin>{children}</SidebarAdmin>
    </>
  );
};

export default Layout;
