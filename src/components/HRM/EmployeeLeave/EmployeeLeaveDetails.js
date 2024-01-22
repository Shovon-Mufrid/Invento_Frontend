import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Divider, Col, Row, Button, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { deleteEmployeeLeave } from "../../../actions/employeeLeaveActions";
import Edit from "./Edit";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const UserLeaveDetails = ({ details, deleteEmployeeLeave, setUpdatelist, auth }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    deleteEmployeeLeave(details.id);
    setVisible(false);
    setUpdatelist(false);
    message.success(
      details.name + " Has been deleted from your role list"
    );
  };

  return (
    <>
      <Link to="#" onClick={showDrawer} key={details.id}>
        View Details
      </Link>

      <Drawer
        width={640}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <p
          className="site-description-item-profile-p"
          style={{ marginBottom: 24 }}
        >
          Information
        </p>
        <p className="site-description-item-profile-p">Department details</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="employee" content={details.employeeName} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Leave Type" content={details.leaveTypeName} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Leave Start" content={details.leaveStart} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Leave End" content={details.leaveEnd} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Leave Days" content={details.leaveDays} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Note" content={details.note} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Leave Status" content={details.leaveStatus} />
          </Col>
        </Row>

        {auth.permissions.includes("HRM.Employee Leave_is_delete") ? <Button danger style={{ marginRight: "10px" }}>
          <Popconfirm
            title="Are you sure to delete this contact?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Link to="#">Delete</Link>
          </Popconfirm>
        </Button>:""}
        {auth.permissions.includes("HRM.Employee Leave_is_update") ?   <Edit details={details} setUpdatelist={setUpdatelist} />:""}
        <Divider />
        <p className="site-description-item-profile-p">History</p>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { deleteEmployeeLeave })(UserLeaveDetails);
