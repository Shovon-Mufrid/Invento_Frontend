import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Divider, Col, Row, Button, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { deleteWarehouse } from "../../../actions/warehouseAction";
import Edit from "./Edit";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const WarehouseDetails = ({
  details,
  deleteWarehouse,
  setUpdatelist,
  auth,
}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    deleteWarehouse(details.id);
    setVisible(false);
    setUpdatelist(false);
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
        <img src={details.logo} width="200px" />
        <Row>
          <Col span={24}>
            <br></br>
            <h3>{details.name}</h3>

            <div
              className="d-div"
              dangerouslySetInnerHTML={{ __html: details.address }}
            ></div>
            <br></br>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            {/* <DescriptionItem title="Address" content={details.address} /> */}
          </Col>
        </Row>
        {auth.permissions.includes("Settings.Warehouse_is_create") ? (
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
          ""
        )}
        {auth.permissions.includes("Settings.Warehouse_is_update") ? (
          <Edit details={details} setUpdatelist={setUpdatelist} />
        ) : (
          ""
        )}
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

export default connect(mapStateToProps, { deleteWarehouse })(WarehouseDetails);
