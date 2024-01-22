import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Divider, Col, Row, Button, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { deleteLeaveType } from "../../../actions/leaveTypeActions";
import Edit from "./Edit";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const LeaveTypeDetails = ({ details, deleteLeaveType, setUpdatelist , auth}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    deleteLeaveType(details.id);
    setVisible(false);
    setUpdatelist(false);
    message.success(
      details.name + " Has been deleted from your leave type list"
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
        <p className="site-description-item-profile-p">Leave Type details</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="name" content={details.Typename} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="days" content={details.initialDays} />
          </Col>
        </Row>

        { auth.permissions.includes("HRM.LeaveType_is_delete") ?    <Button danger style={{ marginRight: "10px" }}>
          <Popconfirm
            title="Are you sure to delete this contact?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Link to="#">Delete</Link>
          </Popconfirm>
        </Button>:""}
        { auth.permissions.includes("HRM.LeaveType_is_update") ?   <Edit details={details} setUpdatelist={setUpdatelist} />:""}
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
export default connect(mapStateToProps, { deleteLeaveType })(LeaveTypeDetails);
