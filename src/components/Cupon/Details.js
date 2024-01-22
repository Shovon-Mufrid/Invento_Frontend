import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Divider, Col, Row, Button, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { deleteCupon } from "../../actions/cupon";
import Edit from "./Edit";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const Details = ({ details, deleteCupon, setUpdatelist ,auth}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    deleteCupon(details.id);
    setVisible(false);
    setUpdatelist(true);
    message.success(
      details.name + " Has been deleted from your warehouse list"
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
        <p className="site-description-item-profile-p">Coupon details</p>
        <Row>
          <Col span={12}>Name: {details.name}</Col>
        </Row>
        <Row>
          <Col span={24}>
            Discount: {details.amount}
            {details.ref_type == "P" ? " %" : " BDT"}
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <DescriptionItem title="Status" content={details.status} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Start Date" content={details.start} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="End Date" content={details.end} />
          </Col>
        </Row>
        {auth.permissions.includes("Sales.Coupons_is_delete") ? (
          <Button danger style={{ marginRight: "10px" }}>
            <Popconfirm
              title="Are you sure to delete this coupon?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Link to="#">Delete</Link>
            </Popconfirm>
          </Button>
        ) : (
          ""
        )}
        {auth.permissions.includes("Sales.Coupons_is_update") ? (
          <Edit detail={details} setUpdatelist={setUpdatelist} />
        ) : (
          ""
        )}
        {/* <Divider />
        <p className="site-description-item-profile-p">History</p> */}
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { deleteCupon })(Details);
