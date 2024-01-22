import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getAllLocation } from "../../../actions/warehouseAction";
import { DeleteOutlined } from "@ant-design/icons";
import { createTransfer, createTransferItem } from "../../../actions/transfer";
import { updateVariation } from "../../../actions/variableProductAction";

import {
  Divider,
  AutoComplete,
  Row,
  Col,
  Skeleton,
  TreeSelect,
  Form,
  Affix,
  InputNumber,
  Button,
} from "antd";
import AddtoTransfer from "./AddtoTransfer";

const SearchStock = ({
  Auth,
  getAllLocation,
  createTransfer,
  createTransferItem,
  updateVariation,
}) => {
  const [Loactions, setLoaction] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [refresh, setrefresh] = useState(false);
  const To = useRef("");
  const From = useRef(Auth.profile.Office);
  const cartItems = useRef([]);
  var currentdate = new Date();
  var invoiceNumber =
    currentdate.getDate().toString() +
    (currentdate.getMonth() + 1).toString() +
    currentdate.getFullYear().toString() +
    currentdate.getHours().toString() +
    currentdate.getMinutes().toString() +
    currentdate.getSeconds().toString();
  useEffect(() => {
    setrefresh(false);
    console.log(cartItems);
    setLoading(false);
  }, [refresh]);

  useEffect(() => {
    getAllLocation().then((result) => {
      setLoaction(result);
      setLoading(false);
    });
  }, []);
  if (Loading) {
    return <Skeleton active />;
  } else {
    return (
      <>
        <Row>
          <Col span={12} style={{ paddingTop: "10px", paddingRight: "10px" }}>
            <Affix>
              <AddtoTransfer
                cartItems={cartItems}
                setrefresh={setrefresh}
                setLoading={setLoading}
                from={From}
                Loactions={Loactions}
              />
            </Affix>
          </Col>

          <Col
            span={12}
            style={{
              padding: "30px",
              paddingTop: "10px",
              backgroundColor: "whitesmoke",
              borderRadius: "10px",
              minHeight: "85vh",
            }}
          >
            <Row>
              <Col style={{ width: "100%" }}>
                <Form.Item name="Merchandiser" label="To">
                  <TreeSelect
                    treeData={Loactions}
                    onChange={(value) => {
                      To.current = value;
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row className="Item-list-header" style={{ textAlign: "center" }}>
              <Col span={1}>
                <h3>SL.</h3>
              </Col>
              <Col span={10}>
                <h3>Product</h3>
              </Col>
              <Col span={6}>
                <h3>Details</h3>
              </Col>
              <Col span={4}>
                <h3>Quantity</h3>
              </Col>
              <Col span={3}>
                <h3>Action</h3>
              </Col>
            </Row>
            {cartItems.current.map((item, index) => {
              return (
                <Row className="Item-list" style={{ textAlign: "center" }}>
                  <Col span={1}>{index + 1}</Col>
                  <Col span={10}>{item.title}</Col>
                  <Col span={6}>{item.Attribute_details}</Col>
                  <Col span={4}>
                    <InputNumber
                      max={item.limit}
                      min={1}
                      value={item.quantity}
                      onChange={(value) => {
                        item.quantity = value;
                        setrefresh(true);
                      }}
                    ></InputNumber>
                  </Col>
                  <Col span={3}>
                    <DeleteOutlined
                      style={{ color: "Red" }}
                      onClick={(e) => {
                        cartItems.current.splice(index, 1);
                        setrefresh(true);
                      }}
                    />
                  </Col>
                </Row>
              );
            })}
            <Divider />
            <Button
              type="primary"
              onClick={(e) => {
                if (From.current == "" || To.current == "") {
                  alert("Please insert all the required fields");
                } else {
                  let formData = new FormData();
                  formData.append("tansfer_number", invoiceNumber);
                  formData.append("status", "Processing");
                  formData.append("source", From.current);
                  formData.append("destance", To.current);
                  formData.append("data", "");
                  createTransfer(formData).then((result) => {
                    for (const item of cartItems.current) {
                      formData = new FormData();
                      formData.append("transfer", result.id);
                      formData.append("product", item.id);
                      formData.append("quantity", item.quantity);
                      formData.append("is_received", false);
                      formData.append("data", "");
                      createTransferItem(formData);
                      formData = new FormData();
                      formData.append("quantity", item.limit - item.quantity);
                      // formData.append("Warehouse", From.current);
                      formData.append("data", "");
                      updateVariation(item.id, formData);
                    }
                    window.location.href = "/stock/transfer/history";
                    // history.push("/stock/transfer/history");
                  });
                }
              }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getAllLocation,
  createTransfer,
  createTransferItem,
  updateVariation,
})(SearchStock);
