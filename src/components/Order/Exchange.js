import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import { DeleteOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import {
  updateInvoice,
  getInvoiceItem,
  getServices,
  updateInvoiceItem,
  deleteInvoiceItem,
} from "../../actions/invoiceItem";
import { updateVariation } from "../../actions/variableProductAction";

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
} from "antd";

const { Option } = Select;

const Quickview = ({
  invoice,
  updateInvoice,
  getInvoiceItem,
  getServices,
  updateVariation,
  updateInvoiceItem,
  deleteInvoiceItem,
}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const bill = useRef();
  const [cart, setcart] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [data, setdata] = useState();
  const [form] = Form.useForm();
  const details = { ...invoice };
  details.delivery_date = moment(details.delivery_date);
  const Wallet = useRef({
    Bill: details.bill,
    Due: details.due,
    Payment: details.payment,
  });

  useEffect(() => {
    bill.current = 0;
    setloading(true);
    let totoal = 0;
    getInvoiceItem(details.id).then((items) => {
      getServices(details.id).then((items1) => {
        setdata(items);
        setloading(false);
        for (const item of items) {
          totoal = parseFloat(totoal) + parseFloat(item.price * item.quantity);
        }
        for (const item1 of items1) {
          totoal = parseFloat(totoal) + parseFloat(item1.price);
        }
        // updateInvoice
        Wallet.current.Bill = totoal;
        Wallet.current.Due = Wallet.current.Bill - Wallet.current.Payment;
        let formData = new FormData();
        formData.append("bill", Wallet.current.Bill);
        formData.append("due", Wallet.current.Due);
        updateInvoice(details.id, formData).then((result) => {
          setrefresh(false);
        });
      });
    });
  }, [refresh]);

  const onFinish = (values) => {
    console.log(values);
    values.delivery_date = values.delivery_date.format("yyyy-MM-DD");
    if (values.paymentt > 0) {
      values.payment =
        parseFloat(details.payment) + parseFloat(values.paymentt);
      values.due = parseFloat(details.due) - parseFloat(values.paymentt);
    }
    updateInvoice(details.id, values).then((result) => {
      if (result) {
        setVisible(false);
        form.resetFields();
        window.location.reload();
      }
    });
  };

  const showDrawer = () => {
    setVisible(true);
    setVisible(true);
    form.resetFields();
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
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
              <Col span={14} style={{ margin: "auto" }}>
                {index + 1}. {data.Product[0].title}
              </Col>
              <Col span={4}>
                {!data.is_returned ? (
                  <InputNumber
                    min={1}
                    defaultValue={data.quantity}
                    max={data.quantity + data.Product[0].quantity}
                    onChange={(value) => {
                      let diff = data.quantity - value;
                      let mainproduct = data.Product[0].quantity + diff;
                      console.log(
                        "wordrobe : " + value + " main stock : " + mainproduct
                      );
                      let formData = new FormData();
                      formData.append("quantity", value);
                      formData.append("data", "");
                      updateInvoiceItem(data.id, formData);
                      formData = new FormData();
                      formData.append("quantity", mainproduct);
                      formData.append("data", "");
                      updateVariation(data.Product[0].id, formData).then(
                        (e) => {
                          setloading(true);
                          setrefresh(true);
                        }
                      );
                    }}
                  ></InputNumber>
                ) : (
                  data.quantity
                )}
              </Col>
              <Col span={5} style={{ textAlign: "center", margin: "auto" }}>
                {data.price}
                {!data.is_returned ? (
                  <DeleteOutlined
                    style={{ color: "Red", float: "right", marginTop: "4px" }}
                    onClick={(e) => {
                      let formData = new FormData();
                      let mainproduct =
                        data.Product[0].quantity + data.quantity;
                      formData.append("quantity", mainproduct);
                      formData.append("data", "");
                      updateVariation(data.Product[0].id, formData);
                      deleteInvoiceItem(data.id).then((rsult) => {
                        setloading(true);
                        setrefresh(true);
                      });
                    }}
                  />
                ) : (
                  ""
                )}
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
            <Col span={12}>
              <Row>
                <Col span={6}>
                  <h3>Invoice No.</h3>
                  {details.invoice_number}
                </Col>
                <Col span={7}>
                  <h3>Issue date</h3>
                  {dateFormat(details.issue_date, "mmmm dS, yyyy")}
                </Col>

                <Col span={4} style={{ textAlign: "center" }}>
                  <h3>Bill</h3>
                  {Wallet.current.Bill}
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  <h3>Due</h3>
                  {Wallet.current.Due}
                </Col>
                <Col span={4} style={{ textAlign: "center" }}>
                  <h3>Payment</h3>
                  {Wallet.current.Payment}
                </Col>
              </Row>
              <Divider />

              <Row gutter={16}>
                {/* <Col span={24}>
                  <Form.Item name="bill" label="Bill">
                    <InputNumber
                      placeholder="Amount"
                      value={Wallet.current.Bill}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="due" label="Due">
                    <InputNumber
                      placeholder="Amount"
                      value={Wallet.current.Due}
                    />
                  </Form.Item>
                </Col> */}
                {/* {Wallet.current.Due > 0 ? (
                  <>
                    <Col span={24}>
                      <Form.Item name="paymentt" label="New Payment">
                        <InputNumber placeholder="Amount" />
                      </Form.Item>
                    </Col>
                  </>
                ) : (
                  ""
                )}

                <Col span={24}>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                      { required: true, message: "Please choose a status" },
                    ]}
                  >
                    <Select
                      placeholder="Please choose a status"
                      style={{ fontWeight: "400" }}
                    >
                      <Option value="Pending">Pending</Option>
                      <Option value="Processing">Processing</Option>
                      <Option value="Ready">Ready</Option>
                      <Option value="Delivered">Delivered</Option>
                    </Select>
                  </Form.Item>
                </Col> */}
              </Row>
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
              {/* {!details.is_returned ? (
                <>
                  <Addtoupdate
                    wordrobeitems={data}
                    setrefresh={setrefresh}
                    details={details}
                  />
                  <Divider />
                </>
              ) : (
                <>
                  <h3 style={{ color: "green" }}>
                    All products have been returnd
                  </h3>
                </>
              )} */}
              <Addtoupdate
                wordrobeitems={data}
                setrefresh={setrefresh}
                details={details}
              />
              <Divider />
              <Row
                style={{
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <Col span={14}>
                  <h3>Product Details</h3>
                </Col>
                <Col span={4}>
                  <h3>Quantity</h3>
                </Col>
                <Col span={5} style={{ textAlign: "center" }}>
                  <h3>Price</h3>
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
        <a href="#" onClick={showDrawer} style={{ margin: 4 }}>
          Exchange
        </a>
        <Drawer
          title="Exchange Product"
          width="1200"
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
    // Variations: state.ProductDetails.productdetails,
  };
};

export default connect(null, {
  updateInvoice,
  getInvoiceItem,
  getServices,
  updateVariation,
  updateInvoiceItem,
  deleteInvoiceItem,
})(Quickview);
