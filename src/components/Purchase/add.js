import React, { Component, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import GenerateInvoice from "./GenerateInvoice";
import { getProductSearchResultbywarehouse } from "./../../actions/productDetails";

import {
  Layout,
  Breadcrumb,
  Divider,
  AutoComplete,
  Row,
  Col,
  Image,
  Affix,
  message,
  Form,
  Input,
  Spin,
} from "antd";
const { Content } = Layout;

const Dashboard = ({ List, getProductSearchResultbywarehouse }) => {
  const [cart, setCart] = useState(false);
  const [fullpageloading, setfullpageloading] = useState(false);
  const cartItems = useRef([]);
  const [searchresult, setsearchresult] = useState([]);
  const BarcodeInput = useRef(null);
  const barcode = useRef();
  const location = useRef("");
  const [form] = Form.useForm();

  const onKeyUp = (event) => {
    if (event.target.value == "") {
      setsearchresult([]);
    } else {
      if (event.keyCode == 13) {
        getProductSearchResultbywarehouse(
          event.target.value,
          location.current
        ).then((result) => {
          setsearchresult(result.results);
          if (result.count == 1) {
            result.results.map((item) => {
              let flag = 0;
              cartItems.current.map((cartitem, index) => {
                if (cartitem.id == item.id) {
                  cartitem.quantity = cartitem.quantity + 1;
                  cartitem.total_price =
                    parseFloat(cartitem.total_price) + parseFloat(item.price);
                  if (cartitem.quantity > cartitem.limit) {
                    alert("out of stock");
                    cartitem.quantity = cartitem.quantity - 1;
                    cartitem.total_price =
                      parseFloat(cartitem.total_price) - parseFloat(item.price);
                  } else {
                    message.success(item.Deatils[0].title + " has been added");
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
                  price: item.purchase_price,
                  landing_price: item.purchase_price,
                  total_price: item.purchase_price,
                  quantity: 1,
                  limit: item.quantity,
                  Attribute_details: item.Attribute_details,
                  details: item,
                };
                cartItems.current.push(arr);
                message.success(item.Deatils[0].title + " has been added");
              }
              setCart(true);
              // cartItems.current = arr;
              form.resetFields();
              setCart(true);
              BarcodeInput.current.value = "";
              BarcodeInput.current.focus();
              setsearchresult([]);
              // event.select();
            });
          }
        });
      }
    }
  };
  useEffect(() => {
    // console.log("reloading");

    setCart(false);
  }, [cart]);

  const search = () => {
    return (
      <>
        <Col span={10}>
          <h3>Instant Search for existing products</h3>
          <Form form={form} layout="vertical">
            <Form.Item name="remarks" label="" style={{ marginBottom: "0px" }}>
              <AutoComplete
                ref={BarcodeInput}
                placeholder="input search text"
                // onChange={onChange}
                onKeyUp={onKeyUp}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>

          <div
            style={{
              position: "absolute",
              width: "100%",
              zIndex: "5",
            }}
          >
            {searchresult.map((item, index) => {
              if (index < 10) {
                return (
                  <>
                    <Row
                      style={{
                        border: "1px solid lightgray",
                        padding: "5px",
                        borderRadius: "5px",
                        height: "50px",
                        backgroundColor: "whitesmoke",
                      }}
                      onClick={(e) => {
                        let flag = 0;
                        cartItems.current.map((cartitem, index) => {
                          if (cartitem.id == item.id) {
                            cartitem.quantity = cartitem.quantity + 1;
                            cartitem.total_price =
                              parseFloat(cartitem.total_price) +
                              parseFloat(cartitem.price);
                            if (cartitem.quantity > cartitem.limit) {
                              alert("out of stock");
                              cartitem.quantity = cartitem.quantity - 1;
                              cartitem.total_price =
                                parseFloat(cartitem.total_price) -
                                parseFloat(cartitem.price);
                            } else {
                              message.success(
                                item.Deatils[0].title + " has been added"
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
                            price: item.purchase_price,
                            landing_price: item.purchase_price,
                            total_price: item.purchase_price,
                            discount: 0,
                            quantity: 1,
                            limit: item.quantity,
                            Attribute_details: item.Attribute_details,
                            details: item,
                          };
                          cartItems.current.push(arr);
                          message.success(
                            item.Deatils[0].title + " has been added"
                          );
                        }
                        // cartItems.current = arr;
                        form.resetFields();
                        BarcodeInput.current.focus();
                        setCart(true);
                        setsearchresult([]);
                      }}
                    >
                      <Col span={3}>{renderImage(item.ProductImage)}</Col>
                      <Col span={15}>
                        {item.Deatils[0].title}
                        <br></br>
                        {item.Attribute_details}
                      </Col>

                      <Col span={5}>{item.Warehouse_name}</Col>
                    </Row>
                  </>
                );
              }
            })}
          </div>
        </Col>
      </>
    );
  };
  const { REACT_APP_API_URL } = process.env;
  const renderImage = (image) => {
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
          <img src={`${image[0].photo}`} width="40px" />
        </>
      );
    }
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Add</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Row>
          <Col
            span={24}
            style={{
              borderRight: "1px solid lightgray",
              padding: "0rem 2rem 0rem 0rem",
            }}
          >
            <Spin spinning={fullpageloading}>
              <GenerateInvoice
                cartItems={cartItems}
                cart={cart}
                setCart={setCart}
                search={search}
                location={location}
                setfullpageloading={setfullpageloading}
              />
            </Spin>
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.ProductDetails.productdetails,
  };
};

export default connect(mapStateToProps, {
  getProductSearchResultbywarehouse,
})(Dashboard);
