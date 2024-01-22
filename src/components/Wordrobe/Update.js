import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { DatabaseFilled, DeleteOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import {
  updateWordrobe,
  getWordrobeItem,
  updateWordrobeItem,
  deleteWordrobeItem,
  deleteWordrobe,
} from "../../actions/wordrobe";
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
  Popconfirm,
} from "antd";

import { Link } from "react-router-dom";

const { Option } = Select;

const Quickview = ({
  wordrobe,
  updateWordrobe,
  getWordrobeItem,
  updateVariation,
  updateWordrobeItem,
  deleteWordrobeItem,
  deleteWordrobe,
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
    getWordrobeItem(details.id).then((items) => {
      console.log(items);
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
    updateWordrobe(details.id, values).then((result) => {
      if (result) {
        setVisible(false);
        form.resetFields();
        window.location.reload();
      }
    });
  };

  const showDrawer = () => {
    getWordrobeItem(details.id).then((items) => {
      setdata(items);
      setloading(false);
    });
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };
  const confirm = () => {
    data.map((item) => {
      let formData = new FormData();
      let mainproduct = item.Product[0].quantity + item.quantity;
      formData.append("quantity", mainproduct);
      formData.append("data", "");
      updateVariation(item.Product[0].id, formData).then((rsult) => {
        formData = new FormData();
        formData.append("is_returned", true);
        formData.append("data", "");
        updateWordrobeItem(item.id, formData).then((result) => {
          setloading(true);
          setrefresh(true);
          window.location.reload();
        });
      });
    });
    let formData = new FormData();
    formData.append("is_returned", true);
    // formData.append("status", "Complete");
    formData.append("data", "");
    updateWordrobe(details.id, formData).then((result) => {
      // setVisible(false);
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
              <Col span={14} style={{ margin: "auto" }}>
                {index + 1}. {data.Details}
              </Col>
              <Col span={4}>
                {!data.is_returned ? (
                  <InputNumber
                    min={1}
                    defaultValue={data.quantity}
                    max={data.quantity + data.Product[0].quantity}
                    onChange={(value) => {
                      if (value != null) {
                        let diff = data.quantity - value;
                        let mainproduct = data.Product[0].quantity + diff;
                        console.log(
                          "wordrobe : " + value + " main stock : " + mainproduct
                        );
                        let formData = new FormData();

                        formData.append("quantity", value);
                        formData.append("data", "");
                        updateWordrobeItem(data.id, formData);
                        formData = new FormData();
                        formData.append("quantity", mainproduct);
                        formData.append("data", "");
                        updateVariation(data.Product[0].id, formData).then(
                          (e) => {
                            setloading(true);
                            setrefresh(true);
                          }
                        );
                      }
                    }}
                  ></InputNumber>
                ) : (
                  data.quantity
                )}
              </Col>
              <Col span={5} style={{ textAlign: "center", margin: "auto" }}>
                {data.price * data.quantity}
                {!data.is_returned ? (
                  <DeleteOutlined
                    style={{ color: "Red", float: "right", marginTop: "4px" }}
                    onClick={(e) => {
                      // deleteServicesCosting(cost.id);
                      // setloadcosting(true);
                      let formData = new FormData();
                      let mainproduct =
                        data.Product[0].quantity + data.quantity;
                      formData.append("quantity", mainproduct);
                      formData.append("data", "");
                      updateVariation(data.Product[0].id, formData);
                      deleteWordrobeItem(data.id).then((rsult) => {
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
        <Row>
          <Col span={12} style={{ paddingTop: "10px" }}>
            <Row>
              <Col span={6}>
                <h3>Order no.</h3>
                {details.wordrobe_number}
              </Col>
              <Col span={7}>
                <h3>Issue date</h3>
                {dateFormat(details.issue_date, "mmmm dS, yyyy")}
              </Col>

              {/* <Col span={4} style={{ textAlign: "center" }}>
                  <h3>Penalty</h3>
                  {Wallet.current.Bill}
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  <h3>Due</h3>
                  {Wallet.current.Due}
                </Col>
                <Col span={4} style={{ textAlign: "center" }}>
                  <h3>Payment</h3>
                  {Wallet.current.Payment}
                </Col> */}
            </Row>
            <Divider />

            <Row gutter={16}>
              {/* <Col span={24}>
                  <Form.Item name="rent" label="Penalty">
                    <InputNumber placeholder="Amount" />
                  </Form.Item>
                </Col>
                {Wallet.current.Due > 0 ? (
                  <>
                    <Col span={24}>
                      <Form.Item name="paymentt" label="New Payment">
                        <InputNumber
                          max={Wallet.current.Due}
                          placeholder="Amount"
                        />
                      </Form.Item>
                    </Col>
                  </>
                ) : (
                  ""
                )} */}

              {/* <Col span={24}>
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
                      <Option value="Delivered to sponsor">
                        Delivered to sponsor
                      </Option>

                      <Option value="Ongoing">Ongoing</Option>
                      <Option value="Completed">Completed</Option>
                    </Select>
                  </Form.Item>
                </Col> */}
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
                <Col span={24}>
                  <Form.Item
                    name="delivery_date"
                    label="Return date"
                    rules={[
                      { required: true, message: "Please choose a status" },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>

                <Form.Item>
                  <Space>
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginRight: 8 }}
                    >
                      Update
                    </Button>
                    {!details.is_returned ? (
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
                          <Link to="#">Received all products</Link>
                        </Popconfirm>
                      </Button>
                    ) : (
                      ""
                    )}
                  </Space>
                </Form.Item>
              </Form>
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
            {!details.is_returned ? (
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
            )}

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
      </>
    );
  };
  return (
    <>
      <>
        <a href="#" onClick={showDrawer} style={{ margin: 4 }}>
          Update
        </a>
        <Drawer
          title="Wordrobe Details"
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

// const mapStateToProps = (state) => {
//   return {
//     Variations: state.ProductDetails.productdetails,
//   };
// };

export default connect(null, {
  updateWordrobe,
  getWordrobeItem,
  updateVariation,
  updateWordrobeItem,
  deleteWordrobeItem,
  deleteWordrobe,
})(Quickview);
