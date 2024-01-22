import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { getProductSearchResult } from "../../actions/productDetails";
import { DeleteOutlined } from "@ant-design/icons";

import { createWordrobe, createWordrobeItem } from "../../actions/wordrobe";
import { updateVariationfromSrock } from "../../actions/variableProductAction";
import { getAllWarehouse } from "../../actions/warehouseAction";

import ContctSearch from "./ContctSearch";

import {
  Divider,
  AutoComplete,
  Row,
  Col,
  Image,
  InputNumber,
  Affix,
  Button,
  message,
  DatePicker,
  Space,
  Select,
  Input,
  TreeSelect,
} from "antd";
const { Option } = Select;

const SearchStock = ({
  search,
  cartItems,
  setCart,
  cart,
  createWordrobe,
  createWordrobeItem,
  updateVariationfromSrock,
  getAllWarehouse,
  WarehouseList,
  Auth,
  location,
}) => {
  const services = useRef([]);
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  });

  const [servicetrigger, setservicetrigger] = useState(false);

  var currentdate = new Date();

  getAllWarehouse();
  var invoiceNumber =
    currentdate.getDate().toString() +
    (currentdate.getMonth() + 1).toString() +
    currentdate.getFullYear().toString() +
    currentdate.getHours().toString() +
    currentdate.getMinutes().toString() +
    currentdate.getSeconds().toString();
  const bill = useRef({
    Contact: null,
    Discount: 0,
    subTotal: 0,
    Total: 0,
    Due: 0,
    Paid: 0,
    PaymentMethod: "Cash",
    Issue: "",
    Deliver: "",
    model_name: "",
    makeup_artist_name: "",
    rent: 0,
    wordrobe_number: invoiceNumber,
    photographer_name: "",
    company_profile_link: "",
    reference: "",
    status: "",
  });
  const { REACT_APP_API_URL } = process.env;
  const renderImage = (image) => {
    if (image) {
      if (!image.length > 0) {
        return (
          <>
            <img
              src="data:image/png;base64,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"
              width="40px"
            />
          </>
        );
      } else {
        return (
          <>
            <img src={`${REACT_APP_API_URL}${image[0].photo}`} width="40px" />
          </>
        );
      }
    } else {
      return (
        <>
          <img src={`${REACT_APP_API_URL}${image[0].photo}`} width="40px" />
        </>
      );
    }
  };

  useEffect(() => {
    let Total = 0;
    cartItems.current.map((item) => {
      Total += parseFloat(item.total_price);
    });
    bill.current.subTotal = parseFloat(Total);
    bill.current.Due =
      parseFloat(bill.current.rent) - parseFloat(bill.current.Paid);
    setCart(false);
  }, [cart]);

  const submitOrder = () => {
    let promises = [];
    if (
      bill.current.Contact != null &&
      bill.current.Deliver != "" &&
      location.current != ""
    ) {
      const formData = new FormData();
      formData.append("contact", bill.current.Contact);
      formData.append("rent", bill.current.rent.toFixed(2));
      formData.append("due", bill.current.Due.toFixed(2));
      formData.append("payment", bill.current.Paid.toFixed(2));
      formData.append("product_cost", bill.current.subTotal.toFixed(2));
      formData.append("Payment_method", bill.current.PaymentMethod);
      formData.append("issue_date", bill.current.Issue);
      if (bill.current.Deliver != "") {
        formData.append("delivery_date", bill.current.Deliver);
      }
      formData.append("wordrobe_number", bill.current.wordrobe_number);

      formData.append("location", location.current);
      formData.append("remarks", bill.current.remarks);
      formData.append("reference", bill.current.reference);
      formData.append("makeup_artist_name", bill.current.makeup_artist_name);
      formData.append("model_name", bill.current.model_name);
      formData.append("photographer_name", bill.current.photographer_name);
      formData.append(
        "company_profile_link",
        bill.current.company_profile_link
      );
      formData.append("status", "Delivered to sponsor");
      formData.append("data", "");
      promises.push(
        createWordrobe(formData).then(function (result) {
          async function someProcedure() {
            cartItems.current.map((item) => {
              const formData = new FormData();
              formData.append("wordrobe", result.id);
              formData.append("product", item.id);
              formData.append("price", item.price);
              formData.append("quantity", item.quantity);
              formData.append("data", "");
              promises.push(createWordrobeItem(formData));
            });
            cartItems.current.map((item) => {
              const formData = new FormData();
              formData.append("wordrobe", result.id);
              formData.append("product", item.id);
              formData.append("price", item.price);
              formData.append("data", "");
              var newstock = item.limit - item.quantity;
              formData.append("quantity", newstock);
              promises.push(
                updateVariationfromSrock(item.id, formData, newstock)
              );
            });
            return "done";
          }
          someProcedure().then(() => {
            Promise.all(promises).then(() => {
              message.success("Order has been taken");
              window.location.href = "/wordrobe";
              // history.push("/wordrobe");
            });
          });
        })
      );
    } else {
      alert("Please insert all the required fields");
    }
  };

  return (
    <>
      <Row style={{ minHeight: "23vh" }}>
        <Col span={10}>
          <h3>Contact Details</h3>
          <ContctSearch bill={bill} />
        </Col>
        <Col span={14}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Row style={{ margin: "auto" }}>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>
                  <span style={{ color: "red" }}>*</span>Location
                </h3>
              </Col>
              <Col span={12} offset={1}>
                <Select
                  style={{ width: "100%" }}
                  // defaultValue={bill.current.location}
                  onChange={(e) => {
                    cartItems.current = [];
                    location.current = e;
                    setCart(true);
                  }}
                >
                  {WarehouseList.map((warehouse) => {
                    return (
                      <Option value={warehouse.id}>{warehouse.name}</Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row style={{ margin: "auto" }}>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Order No.</h3>
              </Col>
              <Col span={12} offset={1}>
                <InputNumber
                  value={bill.current.wordrobe_number}
                  disabled
                  style={{ color: "black" }}
                />
              </Col>
            </Row>

            <Row style={{ margin: "auto" }}>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Reference</h3>
              </Col>
              <Col span={12} offset={1}>
                <Input
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    bill.current.reference = value.target.value;
                    setCart(true);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ margin: "auto" }}>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Facebook Link</h3>
              </Col>
              <Col span={12} offset={1}>
                <Input
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    bill.current.company_profile_link = value.target.value;
                    setCart(true);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ margin: "auto" }}>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Photographer name / FB link</h3>
              </Col>
              <Col span={12} offset={1}>
                <Input
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    bill.current.photographer_name = value.target.value;
                    setCart(true);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ margin: "auto" }}>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Model name / FB link</h3>
              </Col>
              <Col span={12} offset={1}>
                <Input
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    bill.current.model_name = value.target.value;
                    setCart(true);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ margin: "auto" }}>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Makeup Artist name / FB link</h3>
              </Col>
              <Col span={12} offset={1}>
                <Input
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    bill.current.makeup_artist_name = value.target.value;
                    setCart(true);
                  }}
                />
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={11}>
          <h1>Description</h1>
        </Col>

        <Col span={3} offset={1} style={{ textAlign: "center" }}>
          <h1>Quantity</h1>
        </Col>
        <Col span={3} style={{ textAlign: "center" }}>
          <h1>Price</h1>
        </Col>
        <Col span={5} style={{ textAlign: "center" }}>
          <h1> Total (BDT) </h1>
        </Col>
      </Row>
      {cartItems.current.map((item) => {
        const index = cartItems.current.indexOf(item);
        return (
          <>
            <Row
              style={{
                borderRadius: "10px",
                padding: "10px",
                background: "#F0F2F5",
                marginBottom: "2px",
              }}
            >
              <Col span={2}>
                {renderImage(
                  item.details.ProductImage ? item.details.ProductImage : []
                )}
              </Col>
              <Col span={9}>
                {item.title}
                <br></br>
                {item.Attribute_details}
              </Col>

              <Col span={3} style={{ textAlign: "center", margin: "auto" }}>
                <InputNumber
                  min={1}
                  value={cartItems.current[index].quantity}
                  onChange={(e) => {
                    cartItems.current[index].quantity = e;
                    cartItems.current[index].total_price =
                      e * cartItems.current[index].price;
                    console.log(cartItems.current[index]);
                    setCart(true);
                  }}
                  max={cartItems.current[index].limit}
                />
              </Col>
              <Col span={3} style={{ textAlign: "center", margin: "auto" }}>
                {cartItems.current[index].price}
              </Col>

              <Col span={5} style={{ textAlign: "center", margin: "auto" }}>
                {item.total_price}
                <DeleteOutlined
                  style={{ color: "Red", float: "right", margin: "auto" }}
                  onClick={(e) => {
                    cartItems.current.splice(index, 1);
                    setCart(true);
                  }}
                />
              </Col>
            </Row>
          </>
        );
      })}

      <Row>{search()}</Row>

      <Divider />
      <Row>
        <Col span={14}></Col>
        <Col span={10} style={{ marginTop: "1rem" }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Product price</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  value={bill.current.subTotal}
                  disabled
                  style={{ color: "black" }}
                />
              </Col>
            </Row>
            {/* <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3> Rent</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  onChange={(e) => {
                    bill.current.rent = e;
                    setCart(true);
                  }}
                />
              </Col>
            </Row> */}

            {/* <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Payment method</h3>
              </Col>
              <Col span={12} offset={1}>
                <Select
                  defaultValue="Cash"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    bill.current.PaymentMethod = e;
                    setCart(true);
                  }}
                >
                  <Option value="Card">Card</Option>
                  <Option value="Bkash">Bkash</Option>
                  <Option value="Nagad">Nagad</Option>
                  <Option value="Cash">Cash</Option>
                  <Option value="Bank">Bank</Option>
                </Select>
              </Col>
            </Row> */}
            {/* <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Paid</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  onChange={(e) => {
                    bill.current.Paid = e;

                    setCart(true);
                  }}
                />
              </Col>
            </Row> */}
            {/* <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Due</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  value={bill.current.Due}
                  disabled
                  style={{ color: "black" }}
                />
              </Col>
            </Row> */}
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>
                  <span style={{ color: "red" }}>*</span>Return date
                </h3>
              </Col>
              <Col span={12} offset={1}>
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    if (e != null) {
                      bill.current.Deliver = e.format("YYYY-MM-DD");
                    }
                    setCart(true);
                  }}
                />
              </Col>
            </Row>

            <Button
              type="primary"
              onClick={submitOrder}
              style={{ float: "right" }}
            >
              Confirm Order
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    List: state.ProductDetails.productdetails,
    Contacts: state.contacts.contactlistsearchresult,
    WarehouseList: state.warehouse.locationlist,
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getProductSearchResult,
  getAllWarehouse,
  createWordrobe,
  createWordrobeItem,
  updateVariationfromSrock,
  getAllWarehouse,
})(SearchStock);
