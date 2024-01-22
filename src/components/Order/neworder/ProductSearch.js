import React, { Component, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import SearchProduct from "../SearchProduct";
import GenerateInvoice from "../GenerateInvoice";
import { getProductSearchResultforsales } from "../../../actions/productDetails";
import Showinvoice from "../Showinvoice";
import Addpackaging from "../Addpackaging";

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

const ProductSearch = ({
  List,
  getProductSearchResultforsales,
  location,
  cartItems,
  packagingItems,
  cart,
  setCart,
}) => {
  //   const [cart, setCart] = useState(false);
  const [realodpackage, setrealodpackage] = useState(true);
  const [data, setdata] = useState([]);
  const BarcodeInput = useRef(null);
  const [form] = Form.useForm();

  const onKeyUp = (event) => {
    if (location.current == "") {
      alert("Please select a outlet first");
    } else {
      if (event.keyCode == 13) {
        if (event.target.value != "") {
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

                      message.success(
                        item.Deatils[0].title + " has been added"
                      );
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
        } else {
          setdata([]);
        }
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

  return (
    <>
      <Row>
        <Col span={24}>
          {/* <SearchProduct cartItems={cartItems} /> */}
          <h3>Enter barcode or product code to search product</h3>
          <Form form={form} layout="vertical">
            <Form.Item name="remarks" label="">
              <AutoComplete
                ref={BarcodeInput}
                placeholder="Enter barcode or product code"
                // onChange={onChange}
                onKeyUp={onKeyUp}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>

          <Divider />

          <Row>
            {data &&
              data.map((item, index) => {
                if (
                  item.parent_category == "CLOTHING" &&
                  item.is_active &&
                  index < 4
                ) {
                  return (
                    <>
                      <Col
                        span={12}
                        sm={{ span: 6 }}
                        lg={{ span: 6 }}
                        style={{ padding: "5px" }}
                      >
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
                                    item.Deatils[0].title + " has been added"
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
                            setdata([]);
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
          {/* <Addpackaging
            packagingItems={packagingItems}
            location={location}
            setrealodpackage={setrealodpackage}
            realodpackage={realodpackage}
          /> */}
        </Col>
      </Row>
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
})(ProductSearch);
