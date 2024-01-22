import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import {
  Drawer,
  Divider,
  Col,
  Row,
  Button,
  message,
  Popconfirm,
  Avatar,
  Descriptions,
} from "antd";
import { Link } from "react-router-dom";
import { deleteEmployee } from "../../../actions/employeeAction";
import EditEmployee from "./EditEmployee";
import GenerateId from "./GenerateId";
import { getSpecificUserEmployeeSalaryPayslipAll } from "../../../actions/PaySlipAction";
import moment from "moment";
import dateFormat from "dateformat";
import ReactToPrint from "react-to-print";
import PdfDownload from "./PdfDownload";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const EmployeeDetails = ({
  details,
  deleteEmployee,
  updatelist,
  setUpdatelist,
  getSpecificUserEmployeeSalaryPayslipAll,
  Auth,
}) => {
  const [visible, setVisible] = useState(false);
  const [history_fetched, setHistory_fetched] = useState(false);
  const [payslip_list, setPayslip_list] = useState([]);
  const componentRef = useRef();

  const showDrawer = () => {
    console.log(details);
    getSpecificUserEmployeeSalaryPayslipAll(details.id).then(function (
      invoices
    ) {
      setPayslip_list(invoices);
      setHistory_fetched(true);
    });
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    deleteEmployee(details.id);
    setVisible(false);
    setUpdatelist(!updatelist);
    message.success(details.name + " Has been deleted from your employee list");
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <Link to="#" onClick={showDrawer} key={details.id}>
        Details
      </Link>

      <Drawer
        width={1200}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <Row>
          <Col span={24}>
            <Avatar size={64} src={details.photo} />
          </Col>
        </Row>
        <Descriptions title="Employee Details" layout="Vertical" bordered>
          <Descriptions.Item label="Name" span={2}>
            {details.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
            {details.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone" span={2}>
            {details.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Emergency Phone" span={2}>
            {details.emergency_phone}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions
          layout="Vertical"
          bordered
          style={{ marginBottom: "10px" }}
        >
          <Descriptions.Item label="Designation" span={2}>
            {details.user_roleName}
          </Descriptions.Item>
          <Descriptions.Item label="Office" span={2}>
            {details.branchName}
          </Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            {details.address}
          </Descriptions.Item>
          <Descriptions.Item label="Shift" span={2}>
            {details.defaultShift}
          </Descriptions.Item>
          <Descriptions.Item label="Entry Time" span={2}>
            {details.defaultEntryTime}
          </Descriptions.Item>
          <Descriptions.Item label="Exit Time" span={2}>
            {details.defaultExitTime}
          </Descriptions.Item>
        </Descriptions>

        {Auth.superuser &&
        Auth.permissions.includes("HRM.Employee_is_delete") ? (
          <Button danger style={{ marginRight: "10px" }}>
            <Popconfirm
              title="Are you sure to delete this contact?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Link to="#">Delete</Link>
            </Popconfirm>
          </Button>
        ) : (
          <></>
        )}
        {/* <EditEmployee details={details} setUpdatelist={setUpdatelist} /> */}

        {/* <GenerateId
          details={details}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        /> */}
        <Divider />
        <p className="site-description-item-profile-p">History</p>
        <Col span={8}>
          <ReactToPrint
            trigger={() => <Button type="primary">Print this out!</Button>}
            content={() => componentRef.current}
          />
          <PdfDownload
            data={payslip_list}
            details={details}
            componentRef={componentRef}
          />
        </Col>
        {history_fetched ? (
          <>
            <br></br>
            <table className="history_table">
              <tr>
                <td>SL.</td>
                <td>Date</td>
                <td>Payment Month</td>
                <td>Leave</td>
                <td>Present</td>
                <td>Absent</td>
                <td>Late</td>
                <td>Total Overtime</td>
                <td>Total Incentive</td>
                <td>Total Allowance</td>
                <td>Fine</td>
                <td>Loan Adjustment</td>
                <td>Advance Adjustment</td>
                <td>Total Paid</td>
              </tr>

              {payslip_list.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{moment(item.paymentDate).format("DD-MM-YYYY")}</td>
                      <td>
                        {monthNames[item.salaryMonth - 1]}, {item.salaryYear}
                      </td>
                      <td>{item.leave}</td>
                      <td>{item.present}</td>
                      <td>{item.absent}</td>
                      <td>{item.late}</td>
                      <td>{item.overtimeTotal}</td>
                      <td>{item.incentiveTotal}</td>
                      <td>{item.dailyAllowanceTotal}</td>
                      <td>{item.fine}</td>
                      <td>{item.loan_adjustment}</td>
                      <td>{item.advance_adjustment}</td>
                      <td>{item.net_salary}</td>
                    </tr>
                  </>
                );
              })}
            </table>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Drawer>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  deleteEmployee,
  getSpecificUserEmployeeSalaryPayslipAll,
})(EmployeeDetails);
