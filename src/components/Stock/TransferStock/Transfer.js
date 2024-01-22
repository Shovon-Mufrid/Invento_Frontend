import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Drawer, Divider, Col, Row, Button, message, InputNumber } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllLocation } from "../../../actions/warehouseAction";
import { getProductSearchResult } from "../../../actions/productDetails";
import { updateVariationfromSrock } from "../../../actions/variableProductAction";
import { createVariation } from "../../../actions/variableProductAction";
// import { deleteContact } from "../../actions/contactAction";
// import EditContact from "./EditContact";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const Details = ({
  details,
  WarehouseList,
  getProductSearchResult,
  getAllLocation,
  Data,
  updateVariationfromSrock,
  createVariation,
}) => {
  const [visible, setVisible] = useState(false);
  const [warehouse, setWarehouse] = useState("");
  const location = useRef("");
  const empty = useRef(true);
  const SelectedItem = useRef(null);
  const amount = useRef(0);

  const showDrawer = () => {
    getAllLocation();
    getProductSearchResult(details.ProductDetails, location.current);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const onChangeAmount = (value) => {
    amount.current = value;
  };
  const Updatestock = () => {
    if (warehouse == "") {
      alert("Select a warehouse");
    } else {
      setVisible(false);
      updateVariationfromSrock(
        details.id,
        details,
        details.quantity - amount.current
      );
      updateVariationfromSrock(
        SelectedItem.current.id,
        SelectedItem.current,
        SelectedItem.current.quantity + amount.current
      );
    }
  };
  const createstock = () => {
    if (warehouse == "") {
      alert("Select a warehouse");
    } else {
      setVisible(false);
      updateVariationfromSrock(
        details.id,
        details,
        details.quantity - amount.current
      );
      createVariation(
        details,
        details.Color,
        details.Size,
        details.selling_price,
        details.purchase_price,
        amount.current,
        warehouse,
        details.Deatils[0].barcode_code
      );
    }
    // window.location.reload();
  };

  const renderWarehouse = () => {
    return WarehouseList.map((Warehouse) => {
      if (Warehouse.id != details.Warehouse) {
        return (
          <>
            <div
              className={
                warehouse == Warehouse.id
                  ? "Stock_Warehouse active"
                  : "Stock_Warehouse"
              }
              style={{
                textAlign: "center",
                border: "1px solid lightgray",
                padding: "1rem",
                paddingBottom: ".5rem",
                marginRight: "1rem",
                minWidth: "10rem",
                borderRadius: "5px",
                color: "gray",
              }}
              onClick={(e) => {
                setWarehouse(Warehouse.id);
              }}
            >
              <ShopOutlined style={{ fontSize: "40px" }} />
              <p>{Warehouse.name}</p>
            </div>
          </>
        );
      }
    });
  };
  const renderStock = () => {
    SelectedItem.current = null;
    empty.current = true;
    return Data.map((d) => {
      if (
        d.Color == details.Color &&
        d.Size == details.Size &&
        d.Warehouse == warehouse &&
        d.ProductDetails == details.ProductDetails
      ) {
        SelectedItem.current = d;
        empty.current = false;
        return (
          <>
            <p className="site-description-item-profile-p">
              Available Stock of this Product
            </p>
            <Row
              style={{
                border: "1px solid gray",
                padding: "1rem",
                borderRadius: "5px",
              }}
            >
              <Col span={11}>{d.title}</Col>
              <Col span={4}>{d.color}</Col>
              <Col span={4}>Size: {d.size}</Col>
              <Col span={5}>Quantity: {d.quantity}</Col>
            </Row>
          </>
        );
      }
    });
  };
  const renderButton = () => {
    if (!empty.current) {
      return (
        <>
          <InputNumber
            style={{
              border: "1px solid gray",
              borderRadius: "5px",
              padding: ".5rem",
            }}
            size="large"
            min={1}
            max={details.quantity}
            placeholder="Insert an amount"
            onChange={onChangeAmount}
          />
          <Divider />
          <Button
            type="primary"
            size="large"
            style={{
              borderRadius: "5px",
            }}
            onClick={Updatestock}
          >
            Submit
          </Button>
        </>
      );
    } else {
      return (
        <>
          <InputNumber
            style={{
              border: "1px solid gray",
              borderRadius: "5px",
              padding: ".5rem",
            }}
            size="large"
            min={1}
            max={details.quantity}
            placeholder="Insert an amount"
            onChange={onChangeAmount}
          />
          <Divider />
          <Button
            type="primary"
            size="large"
            style={{
              borderRadius: "5px",
            }}
            onClick={createstock}
          >
            Submit
          </Button>
        </>
      );
    }
  };

  return (
    <>
      <Link to="#" onClick={showDrawer} key={details.id}>
        Transfer
      </Link>

      <Drawer
        width={640}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <h3
          className="site-description-item-profile-p"
          style={{ marginBottom: 24 }}
        >
          Transfer Product
        </h3>
        <p className="site-description-item-profile-p">Select A Warehouse</p>
        <div
          style={{
            display: "flex",
          }}
        >
          {renderWarehouse()}
        </div>

        <Divider />

        {renderStock()}

        <Divider />
        <p className="site-description-item-profile-p">Transfer Amount</p>

        {renderButton()}
      </Drawer>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    WarehouseList: state.warehouse.locationlist,
    Data: state.ProductDetails.productdetailsfromstock,
  };
};

export default connect(mapStateToProps, {
  getAllLocation,
  getProductSearchResult,
  updateVariationfromSrock,
  createVariation,
})(Details);
