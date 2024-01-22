import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { signOut } from "../../actions/authAction";
import { Link } from "react-router-dom";
import history from "../../history";

import {
  Layout,
  Row,
  Col,
  Button,
  Dropdown,
  Badge,
  Avatar,
  Divider,
  notification,
  Space,
} from "antd";
import {
  PoweroffOutlined,
  NotificationFilled,
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  getAllNotification,
  getAllUnreadNotification,
  markasRead,
  markAllasRead,
} from "../../actions/notificationAction";

const { Header } = Layout;

const Navbar = ({
  auth,
  signOut,
  allnotificationList,
  getAllNotification,
  getAllUnreadNotification,
  markasRead,
  markAllasRead,
  unreadnotificationList,
}) => {
  // const enterLoading = () => {
  //   signOut();
  // };

  // useEffect(() => {
  //   getAllNotification();
  //   getAllUnreadNotification();
  // }, []);

  // let notificationRedirect = {
  //   loan: "/loan-management",
  //   leave: "/employee-leave",
  //   transfer: "/stock/transfer/history",
  //   services: "/service",
  // };
  // let backgroundColor = "white";
  // const notificationRead = (id) => {
  //   console.log("notification reading:" + id);
  //   markasRead(id);
  // };
  // const notification = (
  //   <Row
  //     style={{
  //       backgroundColor: "white",
  //       overflowY: "scroll",
  //       height: "auto",
  //       maxHeight: "60vh",
  //       width: "500px",
  //       padding: "15px",
  //     }}
  //   >
  //     <h3>Notifications</h3>
  //     <Divider />

  //     {unreadnotificationList.map((notification, index) => (
  //       <Row span={24} className="notifi_bar">
  //         <Link
  //           aria-current="page"
  //           onClick={() => notificationRead(notification["id"])}
  //           to={notificationRedirect[notification["description"]]}
  //           style={{
  //             color: "black",
  //             // width: "350px",
  //             margin: "5px",

  //             // borderRadius: "5px",
  //             // border: "1px solid black",
  //             // backgroundColor: notification["unread"] ? "#a0c5ed" : "white",
  //           }}
  //         >
  //           {notification["unread"] ? (
  //             <Badge>
  //               <Avatar
  //                 shape="square"
  //                 size="small"
  //                 style={{
  //                   height: "20px",
  //                   width: "20px",
  //                   backgroundColor: "#1890FF",
  //                   marginRight: "10px",
  //                 }}
  //               />
  //             </Badge>
  //           ) : (
  //             <Badge>
  //               <Avatar
  //                 shape="square"
  //                 size="small"
  //                 style={{
  //                   height: "20px",
  //                   width: "20px",
  //                   marginRight: "10px",
  //                   // backgroundColor: "#1890FF",
  //                 }}
  //               />
  //             </Badge>
  //           )}{" "}
  //           {notification["verb"]}
  //         </Link>{" "}
  //       </Row>
  //     ))}
  //   </Row>
  // );

  return (
    <Header className="site-layout-background">
      <Row>
        <Col span={19}>
          <Space size="large">
            {/* <span>Welcome {auth.email}</span>
            <span>
              {" "}
              <HomeOutlined /> {auth.profile.branchName}
            </span> */}
            <span>Welcome Demo</span>
          </Space>
        </Col>
        <Col span={5}>
          <Space>
            <Badge
              count={unreadnotificationList.length}
              style={{ marginRight: "10px" }}
            >
              <Dropdown overlay={notification} placement="bottomLeft">
                <Avatar
                  shape="square"
                  size="default"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #1890FF",
                    marginTop: "-2px",
                    marginRight: "10px",
                  }}
                >
                  <NotificationFilled style={{ color: "#1890FF" }} />
                </Avatar>
              </Dropdown>
            </Badge>
            {auth.permissions.includes("Sales.Add new order_is_read") ? (
              <>
                <Link aria-current="page" to="/order/add">
                  <Button type="danger" icon={<ShoppingCartOutlined />}>
                    POS
                  </Button>
                </Link>
              </>
            ) : (
              ""
            )}

            <Button
              type="primary"
              icon={<PoweroffOutlined />}
              //   onClick={enterLoading}
            >
              Sign Out
            </Button>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default connect(null)(Navbar);

// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth,
//     allnotificationList: state.notifications.allnotificationList,
//     unreadnotificationList: state.notifications.unreadnotificationList,
//   };
// };

// export default connect(mapStateToProps, {
//   signOut,
//   getAllNotification,
//   getAllUnreadNotification,
//   markasRead,
//   markAllasRead,
// })(Navbar);
