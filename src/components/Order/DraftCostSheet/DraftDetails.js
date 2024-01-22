import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Drawer, Row, Col, Divider, Popconfirm, message, Space, Descriptions } from "antd";
import CreateNewDraftOrder from "./DraftOrder/CreateNewDraftOrder";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {deleteDraftCostSheet, deleteDraftOrder} from "../../../actions/draftcostsheetAction";
import {updateDraftOrder, updateDraftCostSheet} from "../../../actions/draftcostsheetAction";
import EditDraftCostSheet from "./EditDraftCostSheet";
import DraftOrderList from "./DraftOrder/DraftOrderList";
import { CloseCircleOutlined } from "@ant-design/icons";
// import Rendertable from './DraftOrder/Rendertable';

// import 

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const DraftDetails = ({ details, setUpdatelist, reload , deleteDraftCostSheet, deleteDraftOrder}) => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    setUpdatelist(false);
  };
  const [orderlist, setOrderlist] = useState(true);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const renderDetails = () => {
    if (!details) {
      return "";
    }

    const {
      id,
      style_name,
      client_name,
      style_code,
      designer_name,
      description,
      date,
      quantity,
      net_total_cost,
      profit_percentage,
      net_selling_price,
      draftOrder,
      cost_sheet_items,

    } = details;
    console.log(draftOrder)

    const confirm = () => {
      deleteDraftCostSheet(id);
      setVisible(false);
      setUpdatelist(false);
      message.success(style_name + " Has been deleted from your list");
    };
    return (
      <div>
        {/* <Row> */}
          <Descriptions title="Draft Cost Sheet Details" layout="Vertical" bordered>
          <Descriptions.Item label="Style Name" span={2}>
            {style_name}
          </Descriptions.Item>
          <Descriptions.Item label="Style Code" span={2}>
            {style_code}
          </Descriptions.Item>
          <Descriptions.Item label="Designer Name" span={2}>
            {designer_name}
          </Descriptions.Item>
          <Descriptions.Item label="Client Name" span={2}>
            {client_name}
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {/* {description} */}
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </Descriptions.Item>
          <Descriptions.Item label="Order Date"  span={2}>
            {moment(date).format("DD-MM-YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="quantity" span={2}>
            {quantity}
          </Descriptions.Item>
          <Descriptions.Item label="Net Total Cost" span={2}>
            {net_total_cost}
          </Descriptions.Item>
          <Descriptions.Item label="Profit Percentage" span={2}>
            {profit_percentage}
          </Descriptions.Item>
          <Descriptions.Item label="Net Selling Price" span={3}>
            {net_selling_price}
          </Descriptions.Item>
        </Descriptions>
        <Divider />

        <EditDraftCostSheet details={details} setUpdatelist={setUpdatelist} />
        <Button danger style={{ marginRight: "10px" }}>
            <Popconfirm
              title="Are you sure to delete this Cost Sheet?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Link to="#">Delete</Link>
            </Popconfirm>
         </Button>
         <Divider />
        <p className="site-description-item-profile-p">Draft Order</p>
        <CreateNewDraftOrder
          cost_sheet_id={details.id}
          details={details}
          setUpdatelist={setUpdatelist}
        />
       <DraftOrderList id={id} draftOrder={draftOrder}/>
       <Divider />

      </div>
    );
  };
  return (
    <>
      <a
        // type="primary"
        onClick={() => setVisible(true)}
        // style={{ marginRight: 8 }}
      >
        View Details
      </a>
      <Drawer
        width={800}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        {renderDetails()}
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  deleteDraftCostSheet, deleteDraftOrder, 
})(DraftDetails);
