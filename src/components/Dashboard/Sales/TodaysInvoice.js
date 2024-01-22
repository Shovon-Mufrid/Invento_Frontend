import React, { Component, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { getSpecificEmployee } from "../../../actions/employeeAction";
import { getBusinessProfile } from "../../../actions/settings";
import { getAllLocation, getAllOutlet } from "../../../actions/warehouseAction";
import { getProductSearchResult } from "../../../actions/productDetails";
import { getAllChartofaccounts } from "../../../actions/chartofaccountsAction";
import { getSalesReport } from "../../../actions/report";
import { getAllAttribute } from "../../../actions/attributeAction";
import { getAllDepartment } from "../../../actions/departmentActions";
import { getAllAccount } from "../../../actions/accountsAction";
import RenderTable from "./Sales/RenderTable";
import { getcontacttype } from "../../../actions/settings";
import { getAllNotification } from "../../../actions/notificationAction";
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Space,
  Select,
  Divider,
  Skeleton,
  Card,
} from "antd";
const { Content } = Layout;
const { Option } = Select;

const Dashboard = ({
  getAllLocation,

  getSalesReport,
  Auth,
  location,
  loading,
  setloading,
  reload,
  setreload,
}) => {
  var currentdate = new Date();
  var formatter = new Intl.NumberFormat("en-IN");
  const [List, setList] = useState([]);
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    "T00:00:00";

  const [invoice, setinvoice] = useState([]);

  const [outletlist, setoutletlist] = useState([]);

  useEffect(() => {
    setloading(true);

    getSalesReport(
      datetime,
      datetime,
      "",
      "",
      "",

      "",
      "",
      location.current,
      ""
    ).then(function (result) {
      setinvoice(result);
      setloading(false);
      setreload(false);
    });
    getAllLocation().then((result) => {
      setoutletlist(result);
    });
  }, [reload, location.current]);

  const Rendercontent = () => {
    if (loading) {
      return (
        <>
          <Skeleton active />
        </>
      );
    } else {
      return (
        <>
          <Row>
            <Col
              style={{ padding: "1rem", border: "1px solid whitesmoke" }}
              span={24}
            >
              <Card
                title="Today's Invoices"
                className="summary_card transactions stock"
                bordered={true}
                // extra={<> Total products : {List.length}</>}
              >
                <RenderTable List={invoice} />
              </Card>
            </Col>
          </Row>
        </>
      );
    }
  };

  return (
    <>
      <div>{Rendercontent()}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
    allnotificationList: state.notifications.allnotificationList,
  };
};

export default connect(mapStateToProps, {
  getSpecificEmployee,
  getBusinessProfile,
  getAllLocation,
  getAllAttribute,
  getAllChartofaccounts,
  getAllOutlet,
  getAllDepartment,
  getSalesReport,
  getAllAccount,
  getcontacttype,
  getProductSearchResult,
  getAllNotification,
})(Dashboard);
