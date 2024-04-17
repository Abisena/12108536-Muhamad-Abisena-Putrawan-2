import React from "react";
import SidebarWithHeader from "../ui/sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <SidebarWithHeader>{children}</SidebarWithHeader>
    </>
  );
};

export default Layout;