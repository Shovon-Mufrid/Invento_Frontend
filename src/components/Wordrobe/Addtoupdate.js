import React, { Component, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import { getProductSearchResultforsales } from "./../../actions/productDetails";
import { createWordrobeItem, updateWordrobeItem } from "../../actions/wordrobe";
import { updateVariation } from "../../actions/variableProductAction";

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
  message,
  Input,
} from "antd";
const { Content } = Layout;

const Dashboard = ({
  details,

  setrefresh,
  getProductSearchResultforsales,
  wordrobeitems,
  createWordrobeItem,
  updateWordrobeItem,
  updateVariation,
}) => {
  const [cart, setCart] = useState(false);
  const cartItems = useRef([]);
  const [searchresult, setsearchresult] = useState([]);
  const BarcodeInput = useRef(null);
  const barcode = useRef();
  const location = useRef("");
  const [form] = Form.useForm();
  console.log(searchresult);

  // const onChange = (data) => {
  //   barcode.current = data;

  //   if (barcode.current == "") {
  //     console.log(barcode.current);
  //     setsearchresult([]);
  //   } else {
  //     getProductSearchResultforsales(barcode.current, location.current).then(
  //       (result) => {
  //         setsearchresult(result);
  //       }
  //     );
  //   }
  // };
  const onKeyUp = (event) => {
    if (event.target.value == "") {
      setsearchresult([]);
    }
    if (event.keyCode == 13) {
      getProductSearchResultforsales(
        event.target.value,
        details.location == 6 ? "" : details.location,
        1,
        100
      ).then((result) => {
        setsearchresult(result.results);
        if (result.count == 1) {
          result.results.map((item) => {
            let flag = 0;
            wordrobeitems.map((wordrobeitem) => {
              if (wordrobeitem.product == item.id) {
                //product already exist
                let newamount = wordrobeitem.quantity + 1;
                console.log(newamount + "match" + item.quantity);
                if (item.quantity > 0) {
                  console.log("newamount");
                  let formData = new FormData();

                  formData.append("quantity", newamount);
                  formData.append("data", "");
                  updateWordrobeItem(wordrobeitem.id, formData);
                  formData = new FormData();
                  formData.append("quantity", item.quantity - 1);
                  formData.append("data", "");
                  updateVariation(item.id, formData).then((e) => {
                    setsearchresult([]);
                    setrefresh(true);
                  });
                } else {
                  setsearchresult([]);
                  alert("Out of stock");
                }

                flag = 1;
              }
            });
            if (flag == 0) {
              let formData = new FormData();
              formData.append("product", item.id);
              formData.append("quantity", 1);
              formData.append("price", item.selling_price);
              formData.append("wordrobe", details.id);
              formData.append("data", "");
              createWordrobeItem(formData);
              formData = new FormData();
              formData.append("quantity", item.quantity - 1);
              formData.append("data", "");
              updateVariation(item.id, formData).then((e) => {
                setsearchresult([]);
                setrefresh(true);
              });
            }
            form.resetFields();
            setCart(true);
            BarcodeInput.current.focus();
          });
        }
      });
    }
  };
  useEffect(() => {
    setCart(false);
  }, [cart]);
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
          <img src={`${REACT_APP_API_URL}${image[0].photo}`} width="40px" />
        </>
      );
    }
  };

  return (
    <>
      <Col span={24}>
        <h3>Enter barcode or product code to add new product</h3>
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
                      width: "100%",
                      border: "1px solid lightgray",
                      padding: "5px",
                      borderRadius: "5px",
                      backgroundColor: "whitesmoke",
                    }}
                    onClick={(e) => {
                      let flag = 0;
                      wordrobeitems.map((wordrobeitem) => {
                        if (wordrobeitem.product == item.id) {
                          //product already exist
                          console.log("match");
                          let newamount = wordrobeitem.quantity + 1;
                          console.log(newamount + "match" + item.quantity);
                          if (item.quantity > 0) {
                            console.log("newamount");
                            let formData = new FormData();

                            formData.append("quantity", newamount);
                            formData.append("data", "");
                            updateWordrobeItem(wordrobeitem.id, formData);
                            formData = new FormData();
                            formData.append("quantity", item.quantity - 1);
                            formData.append("data", "");
                            updateVariation(item.id, formData).then((e) => {
                              setsearchresult([]);
                              setrefresh(true);
                              form.resetFields();
                            });
                          } else {
                            setsearchresult([]);
                            alert("Out of stock");
                          }

                          flag = 1;
                        }
                      });
                      if (flag == 0) {
                        let formData = new FormData();
                        formData.append("product", item.id);
                        formData.append("quantity", 1);
                        formData.append("price", item.selling_price);
                        formData.append("wordrobe", details.id);
                        formData.append("data", "");
                        createWordrobeItem(formData);
                        formData = new FormData();
                        formData.append("quantity", item.quantity - 1);
                        formData.append("data", "");
                        updateVariation(item.id, formData).then((e) => {
                          setsearchresult([]);
                          setrefresh(true);
                          form.resetFields();
                        });
                      }
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

const mapStateToProps = (state) => {
  return {
    List: state.ProductDetails.productdetails,
  };
};

export default connect(mapStateToProps, {
  getProductSearchResultforsales,
  createWordrobeItem,
  updateVariation,
  updateWordrobeItem,
})(Dashboard);
