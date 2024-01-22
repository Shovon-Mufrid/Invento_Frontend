import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Divider, Col, Row, Button, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { deleteUserRole } from "../../../actions/userRoleAction";
import Edit from "./Edit";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const UserRoleDetails = ({ details, deleteUserRole, setUpdatelist ,auth}) => {
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
        <p className="site-description-item-profile-p">Salary details</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="employee" content={details.employeeName} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Role" content={details.employeeRole} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Branch" content={details.employeeBranch} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Basic Salary" content={details.monthlySalary} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Daily Allowance" content={details.dailyAllowance} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Incentive" content={details.incentive} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Wage/Day" content={details.dailyWage} />
          </Col>
        </Row>
       
        <Row >
          <Col span={12}>
            <DescriptionItem title="Wage/Hour" content={details.perHourWageDay} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Wage/Hour(Night)" content={details.perHourWageNight} />
          </Col>
        </Row>
       

        {auth.permissions.includes("HRM.Salary Setup_is_delete") ?   <Button danger style={{ marginRight: "10px", marginTop: "30px"}}>
          <Popconfirm
            title="Are you sure to delete this contact?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Link to="#">Delete</Link>
          </Popconfirm>
        </Button>:""}
        {auth.permissions.includes("HRM.Salary Setup_is_update") ? <Edit  style={{ marginTop: "30px"}} details={details} setUpdatelist={setUpdatelist} />:""}
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

export default connect(mapStateToProps, { deleteUserRole })(UserRoleDetails);
