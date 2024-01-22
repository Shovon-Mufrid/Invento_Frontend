import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  DatePicker,
  Select,
  TreeSelect,
  Col,
  Space,
  Row,
  Button,
  Breadcrumb,
  Tabs,
} from "antd";
import moment from "moment";
import Profile from "./Profile/Details";
import Sales from "./Sales";
import Manufacturing from "./Manufacturing";
const { TabPane } = Tabs;

const Dashboard = ({ auth }) => {
  var currentdate = new Date();
  const dateFormat = "YYYY-MM-DD";
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    "T00:00:00Z";
  var monthstart =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() - 1) +
    "-" +
    "1" +
    "T00:00:00Z";
  var onlydateend =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate();
  var onlydatestartmonth =
    currentdate.getFullYear() + "-" + (currentdate.getMonth() - 1) + "-" + "1";
  var onlydatestartyear = currentdate.getFullYear() + "-" + "01-01";
  const [startDate, setStartDate] = useState(monthstart);
  const [endDate, setEndDate] = useState(datetime);
  const [employee, setEmployee] = useState(auth.user_id);
  const [location, setlocation] = useState(auth.profile.Office);

  const onChange = (key) => {
    // console.log(key);
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        {/* <Breadcrumb.Item>Dashboard</Breadcrumb.Item> */}
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Tabs defaultActiveKey="1" onChange={onChange}>
          {/* <TabPane tab="Sales" key="3">
            <Sales />
          </TabPane> */}
          {/* <TabPane tab="Attendance" key="1">
            <Profile
              startDate={onlydatestartmonth}
              startDateByYear={onlydatestartyear}
              endDate={onlydateend}
              employee={employee}
              location={location}
            />
          </TabPane> */}
          {/* <TabPane tab="Acccounts" key="2">
            Content of Tab Pane 2
          </TabPane> */}

          {/* <TabPane tab="Manufacturing" key="4">
            <Manufacturing />
          </TabPane> */}
        </Tabs>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Dashboard);
