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
  Descriptions,
} from "antd";
import { Link } from "react-router-dom";
import { deleteproductionlines } from "../../../actions/Manufacturing/productionlinesAction";
import Edit from "./Edit";
import Create from "./ProductionLineitem/Create";
import List from "./ProductionLineitem/List";

import moment from "moment";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const ContactDetails = ({
  details,
  deleteproductionlines,
  setUpdatelist,
  updatelist,

  Auth,
}) => {
  const [visible, setVisible] = useState(false);
  const [purchase_fetched, setPurchase_fetched] = useState(false);
  const [purchase_list, setPurchase_list] = useState([]);
  const due = useRef(0);
  const bill = useRef(0);
  const paid = useRef(0);
  const componentRef = useRef();
  var formatter = new Intl.NumberFormat("en-IN");

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    deleteproductionlines(details.id).then((rs) => {
      setUpdatelist(!updatelist);
      message.success("Removed");
      setVisible(false);
    });
  };

  return (
    <>
      <Link to="#" onClick={showDrawer} key={details.id}>
        Edit
      </Link>

      <Drawer
        width={640}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <Row>
          <Col span={24}>
            <Descriptions
              title="Production Line details"
              layout="Vertical"
              bordered
            >
              <Descriptions.Item label="Line Name" span={4}>
                {details.line_name}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={4}>
                {details.location}
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={4}>
                <div
                  dangerouslySetInnerHTML={{ __html: details.description }}
                ></div>
              </Descriptions.Item>
              <Descriptions.Item label="Start Date" span={2}>
                {moment(details.start_date).format("DD-MM-YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="End Date" span={2}>
                {moment(details.end_date).format("DD-MM-YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Capacity" span={4}>
                {details.capacity}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Divider />
        {Auth.superuser &&
        Auth.permissions.includes("Manufacturing.Production Line_is_delete") ? (
          <Button danger style={{ marginRight: "10px" }}>
            <Popconfirm
              title="Are you sure to delete this?"
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
        {Auth.permissions.includes(
          "Manufacturing.Production Line_is_update"
        ) ? (
          <Edit
            details={details}
            setUpdatelist={setUpdatelist}
            updatelist={updatelist}
          />
        ) : (
          ""
        )}
        <Divider />
        <Create
          details={details}
          setUpdatelist={setUpdatelist}
          updatelist={updatelist}
        />
        <List
          details={details}
          setUpdatelist={setUpdatelist}
          updatelist={updatelist}
        />
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
  deleteproductionlines,
})(ContactDetails);
