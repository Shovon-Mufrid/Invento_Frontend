import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Drawer,
  Divider,
  Col,
  Row,
  Button,
  message,
  Popconfirm,
  Descriptions,
} from "antd";
import { Link } from "react-router-dom";
import { deleteDepartment } from "../../../actions/departmentActions";
import Edit from "./Edit";

const DepartmentDetails = ({
  details,
  deleteDepartment,
  setUpdatelist,
  Auth,
}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    deleteDepartment(details.id);
    setVisible(false);
    setUpdatelist(false);
    message.success(
      details.name + " Has been deleted from your department list"
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
        {/* <p className="site-description-item-profile-p">Department details</p> */}
        <Row>
          <Col span={24}>
            <Descriptions
              title="Department details"
              layout="horizontal"
              bordered
            >
              <Descriptions.Item label="Department Name">
                {details.name}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Divider />
        {Auth.superuser && Auth.permissions.includes("HRM.Departments_is_delete")  ? (
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
        {Auth.permissions.includes("HRM.Departments_is_update") ? (
          <Edit details={details} setUpdatelist={setUpdatelist} />
        ) : (
          ""
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

export default connect(mapStateToProps, { deleteDepartment })(
  DepartmentDetails
);
