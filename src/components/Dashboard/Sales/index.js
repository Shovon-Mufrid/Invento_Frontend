import React, { Component, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { getSpecificEmployee } from "../../../actions/employeeAction";
import { getBusinessProfile } from "../../../actions/settings";
import { getAllAttribute } from "../../../actions/attributeAction";
import { getAllDepartment } from "../../../actions/departmentActions";
import { getAllAccount } from "../../../actions/accountsAction";
import { getAllChartofaccounts } from "../../../actions/chartofaccountsAction";
import { getcontacttype } from "../../../actions/settings";
import {
  getAllLocation,
  getAllOutlet,
  getAllLocationPlain,
} from "../../../actions/warehouseAction";
import TodaysReport from "./TodaysReport";
import MonthlySalesReport from "./MonthlySalesReport";
import LowStock from "./LowStock";
import DeliveryReport from "./DeliveryReport";
import TransferReport from "./TransferReport";
import PurchaseReport from "./PurchaseReport";
import IncomeExpense from "./Income&Expense";
import TodaysInvoice from "./TodaysInvoice";
import TodaysCashRegister from "./TodaysCashRegister";
// import MediaQuery from "react-responsive";
// import history from "../../history";

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
  Button,
  TreeSelect,
} from "antd";
const { Content } = Layout;
const { Meta } = Card;
const { Option } = Select;

const Dashboard = ({
  getAllLocation,
  getAllLocationPlain,
  Auth,
  getcontacttype,
  getBusinessProfile,
  getAllAttribute,
  getAllChartofaccounts,
  getAllOutlet,
  getAllDepartment,
  getAllAccount,
}) => {
  var currentdate = new Date();
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const [outletlist, setoutletlist] = useState([]);
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
  const location = useRef(Auth.profile.Office);

  useEffect(() => {
    getcontacttype();
    getAllLocationPlain().then((result) => {
      setoutletlist(result);
    });
    getBusinessProfile();

    getAllAttribute();
    getAllChartofaccounts();
    getAllOutlet();
    getAllDepartment();
  }, [location.current]);

  const SwitchablePicker = () => {
    return Auth.superuser || Auth.profile.user_role.id == 10 ? (
      <Row>
        <Col span={24}>
          <Space style={{ float: "right" }}>
            Select a outlet:
            <Select
              placeholder="Please select a outlet"
              style={{ width: "250px" }}
              defaultValue={Auth.profile.branch.name}
              onChange={(e) => {
                location.current = e;
                setreload(true);
              }}
            >
              <Option value="">All</Option>
              {outletlist.map((outlet) => {
                if (!outlet.is_office && outlet.is_outlet)
                  return <Option value={outlet.id}>{outlet.name}</Option>;
              })}
            </Select>
            {/* <TreeSelect
              style={{ width: "250px" }}
              treeData={outletlist}
              // defaultValue={location}
              onChange={(value) => {
                location.current = value;
                setreload(true);
              }}
            /> */}
          </Space>
        </Col>
      </Row>
    ) : (
      ""
    );
  };

  return (
    <>
      {/* <MediaQuery minWidth={1224}> */}
      <div>
        <Row>
          <Col
            span={24}
            style={{ padding: "1rem", border: "1px solid whitesmoke" }}
          >
            {SwitchablePicker()}
            {Auth.permissions.includes("Sales.Add new order_is_read") ||
            Auth.permissions.includes("Sales.All orders_is_read") ||
            Auth.superuser ? (
              <TodaysReport
                location={location}
                loading={loading}
                setloading={setloading}
                reload={reload}
                setreload={setreload}
              />
            ) : (
              ""
            )}
            <Row>
              <Col span={16}>
                {Auth.permissions.includes("Report.Sales report_is_read") ||
                Auth.superuser ? (
                  <MonthlySalesReport
                    location={location}
                    loading={loading}
                    setloading={setloading}
                    reload={reload}
                    setreload={setreload}
                  />
                ) : (
                  ""
                )}
                {Auth.permissions.includes("Report.Sales report_is_read") ||
                Auth.superuser ? (
                  <TodaysInvoice
                    location={location}
                    loading={loading}
                    setloading={setloading}
                    reload={reload}
                    setreload={setreload}
                  />
                ) : (
                  ""
                )}
                {Auth.permissions.includes("Report.Purchase report_is_read") ||
                Auth.superuser ? (
                  <PurchaseReport
                    location={location}
                    loading={loading}
                    setloading={setloading}
                    reload={reload}
                    setreload={setreload}
                  />
                ) : (
                  ""
                )}
              </Col>
              <Col span={8}>
                {Auth.permissions.includes("Sales.Add new order_is_read") ||
                Auth.permissions.includes("Report.Sales report_is_read") ||
                Auth.superuser ? (
                  <TodaysCashRegister
                    location={location}
                    loading={loading}
                    setloading={setloading}
                    reload={reload}
                    setreload={setreload}
                  />
                ) : (
                  ""
                )}

                {/* <IncomeExpense
                        location={location}
                        loading={loading}
                        setloading={setloading}
                        reload={reload}
                        setreload={setreload}
                      /> */}
                {/* {Auth.permissions.includes(
                        "Report.Delivery report_is_read"
                      ) || Auth.superuser ? (
                        <DeliveryReport
                          location={location}
                          loading={loading}
                          setloading={setloading}
                          reload={reload}
                          setreload={setreload}
                        />
                      ) : (
                        ""
                      )} */}
                {Auth.permissions.includes("Stock.Transfer History_is_read") ||
                Auth.superuser ? (
                  <TransferReport
                    location={location}
                    loading={loading}
                    setloading={setloading}
                    reload={reload}
                    setreload={setreload}
                  />
                ) : (
                  ""
                )}
                {/* <LowStock
                        location={location}
                        loading={loading}
                        setloading={setloading}
                        reload={reload}
                        setreload={setreload}
                      /> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {/* </MediaQuery> */}
      {/* <Button
            type="primary"
            onClick={() => {
              history.push("/order/customerprofile");
            }}
          >
            Customer profile
          </Button> */}
      {Auth.permissions.includes("Sales.Customer Profile_is_read") ? (
        <Card
          hoverable
          style={{
            width: 200,
          }}
          // onClick={() => {
          //   history.push("/order/customerprofile");
          // }}
          // cover={
          //   <img
          //     alt="example"
          //     src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          //   />
          // }
        >
          <Meta title="Customer Profile" />
        </Card>
      ) : (
        ""
      )}
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
  getAllLocation,
  getAllLocationPlain,
  getcontacttype,
  getBusinessProfile,
  getAllAttribute,
  getAllChartofaccounts,
  getAllOutlet,
  getAllDepartment,
  getAllAccount,
})(Dashboard);
