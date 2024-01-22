import React, { Component, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
// import Sidebar from "../layout/Sidebar";
// import Navbar from "../layout/Navbar";
import SearchProduct from "./SearchProduct";
import GenerateInvoice from "./GenerateInvoice";
import { getProductSearchResultforsales } from "./../../actions/productDetails";
import Showinvoice from "./Showinvoice";
import Addpackaging from "./Addpackaging";

import {
  Layout,
  Breadcrumb,
  Divider,
  AutoComplete,
  Row,
  Col,
  Image,
  Affix,
  Form,
  Input,
  Button,
  message,
  Spin,
} from "antd";
const { Content } = Layout;

const Dashboard = ({ List, getProductSearchResultforsales }) => {
  const [cart, setCart] = useState(false);
  const [realodpackage, setrealodpackage] = useState(true);
  const [search, setsearch] = useState(false);
  const [data, setdata] = useState([]);
  const [showinvoice, setshowinvoice] = useState(false);
  const newinvoice = useRef(null);
  const cartItems = useRef([]);
  const BarcodeInput = useRef(null);
  const barcode = useRef("");
  const location = useRef("");
  // const fullpageloading = useRef(false);
  const loading = useRef(false);
  const [form] = Form.useForm();
  const [fullpageloading, setfullpageloading] = useState(false);
  const packagingItems = useRef([]);

  const onKeyUp = (event) => {
    if (location.current == "") {
      alert("Please select a outlet first");
    } else {
      if (event.keyCode == 13) {
        let loc = "";
        if (location.current != 6) {
          loc = location.current;
        }
        getProductSearchResultforsales(event.target.value, loc, 1, 100).then(
          (res) => {
            // setsearch(false);
            setdata(res.results);

            if (res.count == 1) {
              res.results.map((item) => {
                console.log(item);
                if (item.is_active) {
                  let newdiscount = 0;
                  if (item.Deatils[0].discount != null) {
                    newdiscount = item.Deatils[0].discount;
                    if (item.Deatils[0].discount_type == "%") {
                      newdiscount =
                        (item.selling_price * item.Deatils[0].discount) / 100;
                    }
                  }
                  console.log("match");
                  if (cartItems.current.length > 0) {
                    let flag = 0;
                    cartItems.current.map((cartitem, index) => {
                      if (cartitem.id == item.id) {
                        cartitem.quantity = cartitem.quantity + 1;
                        cartitem.total_price =
                          parseFloat(cartitem.total_price) +
                          parseFloat(item.selling_price);
                        if (cartitem.quantity > cartitem.limit) {
                          alert("out of stock");
                          cartitem.quantity = cartitem.quantity - 1;
                          cartitem.total_price =
                            parseFloat(cartitem.total_price) -
                            parseFloat(item.selling_price);
                        } else {
                          message.success(
                            item.Deatils[0].title + " has been added"
                          );
                          BarcodeInput.current.focus();
                        }
                        flag = 1;
                      }
                    });
                    if (flag == 0) {
                      const arr = {
                        id: item.id,
                        title: item.Deatils[0].title,
                        color: item.color,
                        Color: item.Color,
                        size: item.size,
                        Size: item.Color,
                        purchase_price: item.purchase_price,
                        price: item.selling_price,
                        total_price: item.selling_price,
                        quantity: 1,
                        limit: item.quantity,
                        discount: newdiscount,
                      };

                      message.success(
                        item.Deatils[0].title + " has been added"
                      );
                      cartItems.current.push(arr);
                      BarcodeInput.current.focus();
                    }
                    setCart(true);
                  } else {
                    const arr = {
                      id: item.id,
                      title: item.Deatils[0].title,
                      color: item.color,
                      Color: item.Color,
                      size: item.size,
                      Size: item.Color,
                      purchase_price: item.purchase_price,
                      price: item.selling_price,
                      total_price: item.selling_price,
                      quantity: 1,
                      limit: item.quantity,
                      discount: newdiscount,
                    };

                    message.success(item.Deatils[0].title + " has been added");
                    cartItems.current.push(arr);
                    BarcodeInput.current.focus();
                  }
                  // cartItems.current = arr;

                  setCart(true);
                  form.resetFields();
                  BarcodeInput.current.focus();
                  // event.select();
                }
              });
            }
          }
        );
      }
    }
  };

  const { REACT_APP_API_URL } = process.env;
  const renderImage = (image) => {
    if (image == "") {
      return (
        <>
          <img
            src="data:image/png;base64,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"
            width="100%"
          />
        </>
      );
    } else {
      return (
        <>
          <img src={`${image[0].photo}`} width="100%" />
        </>
      );
    }
  };

  const randerdata = () => {
    if (showinvoice) {
      return (
        <>
          <Button
            type={"primary"}
            style={{ position: "absolute", right: "20px" }}
            onClick={() => {
              window.location.reload();
            }}
          >
            New order
          </Button>
          <Showinvoice id={newinvoice.current} />;
        </>
      );
    } else {
      return (
        <Spin spinning={fullpageloading}>
          <Row>
            <Col
              sm={{ span: 24 }}
              lg={{ span: 14 }}
              style={{
                borderRight: "1px solid lightgray",
                padding: "0rem 2rem 0rem 0rem",
              }}
            >
              <GenerateInvoice
                cartItems={cartItems}
                cart={cart}
                setCart={setCart}
                location={location}
                setshowinvoice={setshowinvoice}
                newinvoice={newinvoice}
                setsearch={setsearch}
                packagingItems={packagingItems.current}
                setrealodpackage={setrealodpackage}
                fullpageloading={setfullpageloading}
              />
            </Col>

            <Col
              sm={{ span: 24 }}
              lg={{ span: 10 }}
              style={{
                padding: "0rem 0rem 0rem 2rem",
                position: "-webkit-sticky",
                position: "sticky",
              }}
            >
              <Affix offsetTop={10}>
                {/* <SearchProduct cartItems={cartItems} /> */}
                <h3>Enter barcode or product code for instant Search</h3>
                <Form form={form} layout="vertical">
                  <Form.Item name="remarks" label="">
                    <AutoComplete
                      ref={BarcodeInput}
                      placeholder="input search text"
                      // onChange={onChange}
                      onKeyUp={onKeyUp}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Form>

                <Divider />

                <Row style={{ minHeight: "50vh" }}>
                  {data.map((item, index) => {
                    if (
                      item.parent_category == "CLOTHING" &&
                      item.is_active &&
                      index < 8
                    ) {
                      return (
                        <>
                          <Col span={6} style={{ padding: "5px" }}>
                            <div
                              style={{
                                border: "1px solid lightgray",
                                padding: "5px",
                                textAlign: "center",
                                borderRadius: "5px",
                                minHeight: "150px",
                                backgroundColor: "whitesmoke",
                              }}
                              onClick={(e) => {
                                if (location.current == "") {
                                  alert("Please select a outlet first");
                                } else {
                                  let newdiscount = 0;
                                  if (item.Deatils[0].discount != null) {
                                    newdiscount = item.Deatils[0].discount;
                                    if (item.Deatils[0].discount_type == "%") {
                                      newdiscount =
                                        (item.selling_price *
                                          item.Deatils[0].discount) /
                                        100;
                                    }
                                  }
                                  if (cartItems.current.length > 0) {
                                    let flag = 0;
                                    cartItems.current.map((cartitem, index) => {
                                      if (cartitem.id == item.id) {
                                        cartitem.quantity =
                                          cartitem.quantity + 1;
                                        cartitem.total_price =
                                          parseFloat(cartitem.total_price) +
                                          parseFloat(item.selling_price);
                                        if (
                                          cartitem.quantity > cartitem.limit
                                        ) {
                                          alert("out of stock");
                                          cartitem.quantity =
                                            cartitem.quantity - 1;
                                          cartitem.total_price =
                                            parseFloat(cartitem.total_price) -
                                            parseFloat(item.selling_price);
                                        } else {
                                          message.success(
                                            item.Deatils[0].title +
                                              " has been added"
                                          );
                                        }
                                        flag = 1;
                                      }
                                    });
                                    if (flag == 0) {
                                      const arr = {
                                        id: item.id,
                                        title: item.Deatils[0].title,
                                        color: item.color,
                                        Color: item.Color,
                                        size: item.size,
                                        Size: item.Color,
                                        purchase_price: item.purchase_price,
                                        price: item.selling_price,
                                        total_price: item.selling_price,
                                        quantity: 1,
                                        limit: item.quantity,
                                        discount: newdiscount,
                                      };
                                      cartItems.current.push(arr);
                                      message.success(
                                        item.Deatils[0].title +
                                          " has been added"
                                      );
                                    }
                                    console.log(item.id);
                                    setCart(true);
                                  } else {
                                    const arr = {
                                      id: item.id,
                                      title: item.Deatils[0].title,
                                      color: item.color,
                                      Color: item.Color,
                                      size: item.size,
                                      Size: item.Color,
                                      purchase_price: item.purchase_price,
                                      price: item.selling_price,
                                      total_price: item.selling_price,
                                      quantity: 1,
                                      limit: item.quantity,
                                      discount: newdiscount,
                                    };
                                    message.success(
                                      item.Deatils[0].title + " has been added"
                                    );
                                    cartItems.current.push(arr);
                                  }
                                }
                                // cartItems.current = arr;
                                BarcodeInput.current.focus();
                                form.resetFields();
                                setCart(true);
                              }}
                            >
                              <h4>{item.Deatils[0].title}</h4>
                              {console.log(item)}
                              {renderImage(item.image)}
                              Quantity : {item.quantity}
                              <br></br>
                              {item.color} / {item.size}
                            </div>
                          </Col>
                        </>
                      );
                    }
                  })}
                </Row>
                <Addpackaging
                  packagingItems={packagingItems}
                  location={location}
                  setrealodpackage={setrealodpackage}
                  realodpackage={realodpackage}
                />
              </Affix>
            </Col>
          </Row>
        </Spin>
      );
    }
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        {/* <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item>Add</Breadcrumb.Item> */}
      </Breadcrumb>
      <div className="site-layout-background main-frame">{randerdata()}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.ProductDetails.productdetails.results,
  };
};

export default connect(mapStateToProps, {
  getProductSearchResultforsales,
})(Dashboard);
