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
import { deleteGroupOfCompany } from "../../../actions/groupofcompanyAction";
import Edit from "./Edit";

const DepartmentDetails = ({
  details,
  deleteGroupOfCompany,
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
    deleteGroupOfCompany(details.id);
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
            <Descriptions title="Group details" layout="horizontal" bordered>
              <Descriptions.Item label="Group Name">
                {details.name}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Divider />
        {Auth.permissions.includes("Settings.Group Of Company_is_delete")
                ?(Auth.superuser ? (
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
        )):""}
      { Auth.permissions.includes("Settings.Group Of Company_is_update")
                ? <Edit details={details} setUpdatelist={setUpdatelist} />:""}
      </Drawer>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, { deleteGroupOfCompany })(
  DepartmentDetails
);
