import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../actions/authAction";
import { Link } from "react-router-dom";

// import history from "../../history";

import { Layout, Row, Col, Button, Space } from "antd";

import {
  ShoppingCartOutlined,
  PoweroffOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const Navbar = ({ auth, signOut }) => {
  const SignOut = () => {
    signOut();
  };
  return (
    <>
      <Header className="site-layout-background">
        <Row>
          <Col md={19} sm={1}>
            <Space size="large">
              {auth.isSignedIn ? (
                <>
                  <span>Welcome {auth.email}</span>
                  <span>
                    {" "}
                    <HomeOutlined /> {auth.profile.branchName}
                  </span>
                  <span>
                    {" "}
                    <UserOutlined /> {auth.profile.user_roleName}
                  </span>
                </>
              ) : (
                ""
              )}
            </Space>
          </Col>
          <Col md={5} sm={24}>
            <Space size="large">
              <>
                <Link aria-current="page" to="/order/add">
                  <Button type="danger" icon={<ShoppingCartOutlined />}>
                    POS
                  </Button>
                </Link>
              </>

              {/* <Link to="/login">
                <Button type="primary">Login</Button>
              </Link> */}
              <Button
                type="primary"
                icon={<PoweroffOutlined />}
                onClick={SignOut}
              >
                Sign Out
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>

      {/* <Outlet /> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { signOut })(Navbar);
