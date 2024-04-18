import React from "react";
import SidebarEmploye from "../../ui/sidebarEmploye/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <SidebarEmploye>{children}</SidebarEmploye>
    </>
  );
};

export default Layout;
