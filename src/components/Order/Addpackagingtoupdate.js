import React, { Component, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import { getProductSearchResultforpackaging } from "./../../actions/productDetails";
import { getSpecificChartofaccountsbycode } from "../../actions/chartofaccountsAction";
import { getAllCategory } from "../../actions/categoryAction";
import { createjournals } from "../../actions/journalAction";
// import { createWordrobeItem, updateWordrobeItem } from "../../actions/wordrobe";

import { updateVariation } from "../../actions/variableProductAction";
import { updateVariationfromSrock } from "../../actions/variableProductAction";

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
  Skeleton,
  InputNumber,
  Button,
  Drawer,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { findLastIndex } from "lodash";
const { Content } = Layout;

const Dashboard = ({
  getProductSearchResultforpackaging,
  location,
  packagingItems,
  updateVariation,
  updateVariationfromSrock,
  getAllCategory,
  getSpecificChartofaccountsbycode,
  createjournals,
  details,
}) => {
  const [cart, setCart] = useState(false);
  const [showresult, setshowresult] = useState(false);
  const [searchresult, setsearchresult] = useState([]);
  const BarcodeInput = useRef(null);
  const barcode = useRef();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
    setshowresult(false);
    packagingItems.current = [];
    console.log(location);
    getAllCategory().then((result) => {
      let packaging = result.filter((item) => item.name === "PACKAGING");
      getProductSearchResultforpackaging(
        "",
        location == 6 ? "" : location,
        1,
        10,
        packaging[0].id
      ).then((result) => {
        console.log(result);
        setsearchresult(result.results);
        for (let i = 0; i < result.results.length; i++) {
          let packageitem = {
            id: result.results[i].id,
            title: result.results[i].title,
            price: result.results[i].selling_price,
            image: result.results[i].image.photo,
            quantity: 0,
            limit: result.results[i].quantity,
            warehouse: result.results[i].Warehouse_name,
          };
          packagingItems.current.push(packageitem);
        }
        console.log(packagingItems.current);
        setshowresult(true);
      });
    });
  };

  const onClose = () => {
    setVisible(false);
    setshowresult(false);
  };

  const onFinish = (values) => {
    let promises = [];
    let cost = 0;
    for (let p = 0; p < packagingItems.current.length; p++) {
      if (packagingItems.current[p].quantity > 0) {
        var newpackagingstock =
          packagingItems.current[p].limit - packagingItems.current[p].quantity;
        cost = cost + parseFloat(packagingItems.current[p].price);
        const formData = new FormData();
        formData.append("quantity", newpackagingstock);
        promises.push(
          updateVariationfromSrock(
            packagingItems.current[p].id,
            formData,
            newpackagingstock
          )
        );
      }
    }

    //journal entry
    if (cost > 0) {
      let formData2 = new FormData();
      formData2.append("contact", details.contact.id);
      formData2.append("invoice", details.id);
      formData2.append("increase", false);
      formData2.append("location", details.location);
      formData2.append(
        "details",
        "Packaging items for sell invoice no.  " + details.invoice_number
      );
      formData2.append("amount", parseFloat(cost).toFixed(2));
      // inventory journal entry
      promises.push(
        getSpecificChartofaccountsbycode(1000100015).then((res) => {
          formData2.append("chartofaccount", res[0].id);
          promises.push(createjournals(formData2));
        })
      );
    }

    if (cost > 0) {
      let formData3 = new FormData();
      formData3.append("contact", details.contact.id);
      formData3.append("invoice", details.id);
      formData3.append("increase", true);
      formData3.append("location", details.location);
      formData3.append(
        "details",
        "Packaging items for sell invoice no.  " + details.invoice_number
      );
      formData3.append("amount", parseFloat(cost).toFixed(2));
      // Cost of goods sold entry
      promises.push(
        getSpecificChartofaccountsbycode(400020).then((res) => {
          formData3.append("chartofaccount", res[0].id);
          promises.push(createjournals(formData3));
        })
      );
    }

    Promise.all(promises).then(() => {
      message.success("Successfully added");
      setVisible(false);
    });
  };

  // useEffect(() => {}, []);

  const { REACT_APP_API_URL } = process.env;
  const renderImage = (image) => {
    if (!image) {
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
          <img src={`${REACT_APP_API_URL}${image}`} width="40px" />
        </>
      );
    }
  };

  return (
    <>
      <Button type="link" onClick={showDrawer} style={{ paddingLeft: "0px" }}>
        Packaging
        <PlusOutlined />
      </Button>
      <Drawer
        title="Add new packaging"
        width={500}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <h3>Packaging</h3>
        <Row>
          {packagingItems.current.map((item) => {
            return (
              <>
                <Col span={24}>
                  <Row
                    style={{
                      border: "1px solid lightgray",
                      padding: "5px",
                      margin: "5px",
                      borderRadius: "5px",
                      backgroundColor: "whitesmoke",
                    }}
                  >
                    {/* <Col span={6}>{renderImage(item.image)}</Col> */}
                    <Col span={14}>
                      {item.title}
                      <br></br>
                      <small>{item.warehouse}</small>
                    </Col>
                    <Col span={9} offset={1}>
                      <InputNumber
                        defaultValue={item.quantity}
                        min={0}
                        max={item.limit}
                        onChange={(e) => {
                          item.quantity = e;
                        }}
                      ></InputNumber>
                    </Col>
                  </Row>
                </Col>
              </>
            );
          })}
        </Row>
        <Button type="primary" onClick={onFinish}>
          Submit
        </Button>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.ProductDetails.productdetails,
  };
};

export default connect(mapStateToProps, {
  getProductSearchResultforpackaging,
  updateVariation,
  updateVariationfromSrock,
  getAllCategory,
  getSpecificChartofaccountsbycode,
  createjournals,
})(Dashboard);
