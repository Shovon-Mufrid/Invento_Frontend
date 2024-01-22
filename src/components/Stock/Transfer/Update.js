import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { DatabaseFilled, DeleteOutlined } from "@ant-design/icons";

import dateFormat from "dateformat";
import "react-quill/dist/quill.snow.css";
import moment from "moment";

import {
  updateTransfer,
  getTransferItem,
  updateTransferItem,
  deleteTransferItem,
  deleteTransfer,
} from "../../../actions/transfer";
import {
  updateVariation,
  createVariation,
  createNewProduct,
} from "../../../actions/variableProductAction";
import { getProductSearchResultResponse } from "../../../actions/productDetails";

import Addtoupdate from "./Addtoupdate";

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Col,
  Row,
  Select,
  message,
  TreeSelect,
  Space,
  Divider,
  Drawer,
  Image,
  Skeleton,
  DatePicker,
  Popconfirm,
} from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

const Quickview = ({
  wordrobe,
  updateVariation,
  updateTransfer,
  getTransferItem,
  updateTransferItem,
  deleteTransferItem,
  deleteTransfer,
  createVariation,
  getProductSearchResultResponse,
  createNewProduct,
  Auth,
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [refresh, setrefresh] = useState(false);
  const [data, setdata] = useState();
  const [form] = Form.useForm();
  const details = { ...wordrobe };
  details.delivery_date = moment(details.delivery_date);
  const Wallet = useRef({
    Bill: details.rent,
    Due: details.rent - details.payment,
    Payment: details.payment,
  });

  useEffect(() => {
    setloading(true);
    getTransferItem(details.id).then((items) => {
      setdata(items);
      setloading(false);
      setrefresh(false);
    });
  }, [refresh]);

  const onFinish = (values) => {
    values.delivery_date = values.delivery_date.format("yyyy-MM-DD");
    if (values.paymentt > 0) {
      values.payment =
        parseFloat(details.payment) + parseFloat(values.paymentt);
      values.due = parseFloat(Wallet.current.Due) - parseFloat(values.paymentt);
    }
    updateTransfer(details.id, values).then((result) => {
      if (result) {
        setVisible(false);
        form.resetFields();
        window.location.reload();
      }
    });
  };

  const showDrawer = () => {
    setloading(true);
    getTransferItem(details.id).then((items) => {
      setdata(items);
      setloading(false);
    });
    setVisible(true);
    form.resetFields();
  };

  const arrayEquals = (a, b) => {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };
  const confirm = () => {
    let promises = [];
    for (const item of data) {
      let formData = new FormData();

      promises.push(
        getProductSearchResultResponse(item.Product[0].ProductDetails.id).then(
          (result) => {
            console.log(result);
            console.log(item);
            let flag = 0;
            for (const rslt of result) {
              if (
                rslt.Color == item.Product[0].Color &&
                rslt.Size == item.Product[0].Size &&
                rslt.Warehouse == details.destance &&
                rslt.ProductDetails.id == item.Product[0].ProductDetails.id
              ) {
                // Already exist
                console.log("match");
                flag = 1;
                formData.append("data", "");
                // formData.append("Warehouse", rslt.Warehouse);
                formData.append("quantity", rslt.quantity + item.quantity);
                // promises.push(
                //   updateVariation(rslt.id, formData).then((rsult) => {
                //     formData = new FormData();
                //     formData.append("is_received", true);
                //     formData.append("data", "");
                //     promises.push(
                //       updateTransferItem(item.id, formData).then((result) => {
                //         setloading(true);
                //         setrefresh(true);
                //       })
                //     );
                //   })
                // );
              }
            }
            if (flag == 0) {
              // create new
              console.log("New item");
              formData = new FormData();
              formData.append(
                "ProductDetails",
                item.Product[0].ProductDetails.id
              );
              if (item.Product[0].Color > 0) {
                formData.append("Color", item.Product[0].Color);
              }
              if (item.Product[0].Size > 0) {
                formData.append("Size", item.Product[0].Size);
              }
              formData.append("Attribute", item.Product[0].Attributes);
              formData.append("Warehouse", item.Transfer[0].destance);
              formData.append("quantity", item.quantity);
              formData.append("purchase_price", item.Product[0].purchase_price);
              formData.append("selling_price", item.Product[0].selling_price);
              formData.append("data", "");

              // promises.push(
              //   createNewProduct(formData).then(() => {
              //     formData = new FormData();
              //     formData.append("is_received", true);
              //     formData.append("data", "");
              //     updateTransferItem(item.id, formData).then((result) => {
              //       setloading(true);
              //       setrefresh(true);
              //     });
              //   })
              // );
            }
          }
        )
      );
    }
    let formData = new FormData();
    formData.append("status", "Received");
    formData.append("data", "");
    Promise.all(promises).then((e) => {
      updateTransfer(details.id, formData).then((result) => {
        // setloading(true);
        // setrefresh(true);
        // window.location.reload();
      });
    });
  };

  const renderitems = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return data.map((data, index) => {
        return (
          <>
            <Row
              style={{
                borderRadius: "5px",
                padding: "10px",

                border: "1px solid gray",
                marginBottom: "5px",
              }}
            >
              <Col span={1} style={{ margin: "auto" }}>
                {index + 1}.
              </Col>
              <Col span={8} style={{ margin: "auto" }} offset={1}>
                {data.Product[0].title}
              </Col>
              <Col span={7} style={{ margin: "auto" }}>
                {data.Product[0].Attribute_details}
              </Col>
              <Col span={4} style={{ textAlign: "center" }}>
                {data.quantity}
              </Col>
              <Col span={2} style={{ textAlign: "center", margin: "auto" }}>
                {/* {!data.is_received ? (
                  <DeleteOutlined
                    style={{ color: "Red", float: "right", marginTop: "4px" }}
                    onClick={(e) => {
                      deleteTransferItem(data.id).then((rsult) => {
                        setloading(true);
                        setrefresh(true);
                      });
                    }}
                  />
                ) : (
                  ""
                )} */}
              </Col>
            </Row>
          </>
        );
      });
    }
  };

  const renderData = () => {
    return (
      <>
        <Form
          form={form}
          labelCol={{
            span: 7,
          }}
          labelAlign="left"
          wrapperCol={{
            span: 16,
          }}
          // layout="vertical"
          onFinish={onFinish}
          initialValues={details}
        >
          <Row>
            <Col
              span={24}
              style={{
                padding: "30px",
                paddingTop: "10px",
                backgroundColor: "whitesmoke",
                borderRadius: "10px",
                minHeight: "85vh",
              }}
            >
              <Row>
                <Col span={4}>
                  <h3>Order no.</h3>
                  {details.tansfer_number}
                </Col>
                <Col span={4} offset={1}>
                  <h3>Issue date</h3>
                  {dateFormat(details.issue_date, "mmmm dS, yyyy")}
                </Col>

                <Col span={4} style={{ textAlign: "center" }} offset={1}>
                  <h3>From</h3>
                  {details.source ? details.Source[0].name : ""}
                </Col>
                <Col span={4} style={{ textAlign: "center" }} offset={1}>
                  <h3>To</h3>
                  {details.destance ? details.Destance[0].name : ""}
                </Col>
                <Col span={4} style={{ textAlign: "center" }}>
                  <h3>Action</h3>

                  {details.status != "Received" ? (
                    <Button
                      style={{
                        backgroundColor: "lightgreen",
                        color: "black",
                      }}
                    >
                      <Popconfirm
                        title="Are you sure you have received all the products"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Link to="#">Receive</Link>
                      </Popconfirm>
                    </Button>
                  ) : (
                    "Received"
                  )}
                </Col>
              </Row>
              <Divider />

              <Row
                style={{
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Col span={1}>
                  <h3>SL.</h3>
                </Col>
                <Col span={16} offset={1}>
                  <h3>Product Details</h3>
                </Col>
                <Col span={3}>
                  <h3>Quantity</h3>
                </Col>
              </Row>
              {renderitems()}
            </Col>
          </Row>
        </Form>
      </>
    );
  };
  return (
    <>
      <>
        {Auth.superuser || Auth.profile.branch.id == details.destance ? (
          <a href="#" onClick={showDrawer} style={{ margin: 4 }}>
            Update
          </a>
        ) : (
          ""
        )}
        <Drawer
          title="Challan Details"
          width="800"
          onClose={onClose}
          visible={visible}
        >
          {renderData()}
        </Drawer>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  updateVariation,
  updateTransfer,
  getTransferItem,
  updateTransferItem,
  deleteTransferItem,
  deleteTransfer,
  createVariation,
  getProductSearchResultResponse,
  createNewProduct,
})(Quickview);
