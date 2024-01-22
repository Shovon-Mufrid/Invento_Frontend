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
import { deleteUserRole } from "../../../actions/userRoleAction";
import Edit from "./Edit";

const UserRoleDetails = ({ details, deleteUserRole, setUpdatelist, Auth }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    deleteUserRole(details.id);
    setVisible(false);
    setUpdatelist(false);
    message.success(details.name + " Has been deleted from your role list");
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
        <Descriptions title="Designation details" layout="Vertical" bordered>
          <Descriptions.Item label="Designation Name" span={2}>
            {details.name}
          </Descriptions.Item>
          <Descriptions.Item label="Rank" span={2}>
            {details.rank}
          </Descriptions.Item>
          <Descriptions.Item label="Department" span={4}>
            {details.DepartmentName}
          </Descriptions.Item>
          <Descriptions.Item label="Responsibilty">
            {details.responsibility}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        {Auth.superuser && Auth.permissions.includes("HRM.Designation_is_delete")  ? (
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
          <> </>
        )}
        {Auth.permissions.includes("HRM.Designation_is_update") ? (
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

export default connect(mapStateToProps, { deleteUserRole })(UserRoleDetails);
