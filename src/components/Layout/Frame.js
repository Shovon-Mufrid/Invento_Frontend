import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import NewSidebar from "./NewSidebar";
const { Content } = Layout;

const SideNav = () => {
  return (
    <div>
      <Layout className="window-frame">
        {/* <Sidebar/> */}
        <NewSidebar />
        <Layout className="site-layout">
          <Navbar />
          <Content className="main-frame-content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default SideNav;
