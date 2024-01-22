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
  getSpecificInvoice,
  updateService,
  deleteService,
} from "../../actions/invoiceItem";
import { getdeliverytype } from "../../actions/settings";
import { updateVariation } from "../../actions/variableProductAction";
import { getSpecificContact, updateContact } from "../../actions/contactAction";
import { getAllAccount } from "../../actions/accountsAction";

import Addtoupdate from "./Addtoupdate";
import AddService from "./AddServicetoUpdate";
import Addpackagingtoupdate from "./Addpackagingtoupdate";
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
  Spin,
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
  getdeliverytype,
  getAllAccount,
  courier,
  getSpecificInvoice,
  updateService,
  deleteService,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [fullpageloading, setfullpageloading] = useState(false);
  const [accounts, setaccounts] = useState([]);
  const packagingItems = useRef([]);
  const bill = useRef();
  const [cart, setcart] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [data, setdata] = useState();
  const [services, setservices] = useState();
  const [deliverymethod, setdeliverymethod] = useState([]);
  const [form] = Form.useForm();
  const loaddata = useRef(false);
  const initialdata = useRef();
  let details = {};
  const Wallet = useRef({
    Bill: 0,
    Due: 0,
    Payment: 0,
    Advance: 0,
    PaymentMethod: 0,
    VAT: 0,
    Discount: 0,
    Cupon: null,
    DiscountLimit: 0,
    Quantity: 0,
  });

  useEffect(() => {
    if (visible) {
      // setloading(true);
      getdeliverytype().then((delivery) => {
        setdeliverymethod(delivery);
      });
      getAllAccount().then((acc) => {
        setaccounts(acc);
      });
      getSpecificInvoice(invoice.id).then((result) => {
        result.delivery_date = moment(result.delivery_date);
        form.setFieldsValue(result);
        initialdata.current = result;
        details = { ...result };
        Wallet.current.Bill = details.bill;
        Wallet.current.Due = details.due;
        Wallet.current.Payment = details.payment;
        Wallet.current.Discount = details.discount;
        Wallet.current.DiscountLimit = details.discountlimit;
        Wallet.current.VAT = details.tax;
        Wallet.current.Advance = details.advance_payment;
        Wallet.current.Cupon = details.cupon;
        Wallet.current.Quantity = details.quantity;
        bill.current = 0;

        getInvoiceItem(invoice.id).then((items) => {
          getServices(invoice.id).then((services) => {
            setdata(items);
            setservices(services);
            setloading(false);
          });
        });
        setrefresh(false);
      });
    }
  }, [refresh, visible]);

  const onFinish = (values) => {
    setfullpageloading(true);
    console.log(values);
    values.delivery_date = values.delivery_date.format("yyyy-MM-DD");

    if (values.paymentt > 0) {
      values.payment =
        parseFloat(Wallet.current.Payment) + parseFloat(values.paymentt);
      values.due = parseFloat(Wallet.current.Due) - parseFloat(values.paymentt);
    }
    if (values.account == 1) {
      values.Payment_method = "Cash";
    } else {
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id == values.account) {
          values.Payment_method = accounts[i].type;
        }
      }
    }

    updateInvoice(invoice.id, values).then((result) => {
      if (result) {
        setVisible(false);
        form.resetFields();
        window.location.reload();
      }
    });
  };

  const showDrawer = () => {
    setVisible(true);
    form.resetFields();
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const QuantityUpdate = (value, data) => {
    console.log("on page load");
    let diff = data.quantity - value;
    let mainproduct = data.Product[0].quantity + diff;
    console.log("wordrobe : " + value + " main stock : " + mainproduct);
    let formData = new FormData();
    formData.append("quantity", value);
    formData.append("data", "");
    updateInvoiceItem(data.id, formData);
    formData = new FormData();
    formData.append("quantity", mainproduct);
    formData.append("data", "");
    updateVariation(data.Product[0].id, formData).then((e) => {
      setloading(true);
      setrefresh(true);
    });
  };

  const ServiceUpdate = (quantity, price, data) => {
    let formData = new FormData();
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("data", "");
    updateService(data.id, formData).then((e) => {
      setloading(true);
      setrefresh(true);
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
                {data.Product ? (
                  <InputNumber
                    min={1}
                    value={data.quantity}
                    defaultValue={data.quantity}
                    max={data.quantity + data.Product[0].quantity}
                    onChange={(value) => {
                      // setloading(true);
                      // setrefresh(true);
                      if (value != null) {
                        QuantityUpdate(value, data);
                      }
                    }}
                  ></InputNumber>
                ) : (
                  data.quantity
                )}
              </Col>
              <Col span={5} style={{ textAlign: "center", margin: "auto" }}>
                {data.price}
                {data.Product ? (
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

  const renderServiceitems = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return services.map((data, index) => {
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
                <div
                  className="d-div"
                  dangerouslySetInnerHTML={{ __html: data.details }}
                ></div>
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  // value={data.quantity}
                  defaultValue={data.quantity}
                  onChange={(value) => {
                    if (value != null) {
                      ServiceUpdate(value, data.price, data);
                    }
                  }}
                ></InputNumber>
              </Col>
              <Col span={4} style={{ textAlign: "center", margin: "auto" }}>
                <InputNumber
                  style={{ width: "80%" }}
                  min={0}
                  // value={data.quantity}
                  defaultValue={data.price}
                  onChange={(value) => {
                    if (value != null) {
                      ServiceUpdate(data.quantity, value, data);
                    }
                  }}
                ></InputNumber>
              </Col>
              <Col span={1} style={{ textAlign: "center", margin: "auto" }}>
                <DeleteOutlined
                  style={{ color: "Red", float: "right", marginTop: "4px" }}
                  onClick={(e) => {
                    deleteService(data.id).then((rsult) => {
                      setloading(true);
                      setrefresh(true);
                    });
                  }}
                />
              </Col>
            </Row>
          </>
        );
      });
    }
  };

  const renderData = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <>
          <Row>
            <Col span={24}>
              <Row>
                <Col span={3}>
                  <h3>Invoice No.</h3>
                  {initialdata.current.invoice_number}
                </Col>
                <Col span={3}>
                  <h3>Issue date</h3>
                  {dateFormat(initialdata.current.issue_date, "mmmm dS, yyyy")}
                </Col>
                <Col span={2} style={{ textAlign: "center" }}>
                  <h3>Quantity</h3>
                  {formatter.format(Wallet.current.Quantity)}
                </Col>

                <Col span={3} style={{ textAlign: "center" }}>
                  <h3>Total Bill</h3>
                  {formatter.format(Wallet.current.Bill)}
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  <h3>Payment</h3>
                  {formatter.format(Wallet.current.Payment)}
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  <h3>Due</h3>
                  {formatter.format(Wallet.current.Due)}
                </Col>
                <Col span={2} style={{ textAlign: "center" }}>
                  <h3>Discount</h3>
                  {formatter.format(Wallet.current.Discount)}
                </Col>
                <Col span={2} style={{ textAlign: "center" }}>
                  <h3>VAT</h3>
                  {formatter.format(Wallet.current.VAT)}
                </Col>
                <Col span={3} style={{ textAlign: "center" }}>
                  <h3>Coupon</h3>
                  {Wallet.current.Cupon ? Wallet.current.Cupon.name : "-"}
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col span={14}>
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
                    initialValues={initialdata.current}
                  >
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="status"
                          label="Status"
                          rules={[
                            {
                              required: true,
                              message: "Please choose a status",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Please choose a status"
                            style={{ fontWeight: "400" }}
                          >
                            <Option value="Pending">Pending</Option>
                            <Option value="Factory Received">
                              Factory received
                            </Option>
                            <Option value="Outlet received">
                              Outlet received
                            </Option>
                            <Option value="Ready">Ready</Option>
                            <Option value="Picked by courier">
                              Picked by courier
                            </Option>
                            <Option value="Delivered">Delivered</Option>
                            {Wallet.current.Due == 0 ? (
                              <Option value="Paid">Paid</Option>
                            ) : (
                              <> </>
                            )}
                            <Option value="Booked">Booked</Option>
                            <Option value="Exchanged">Exchanged</Option>
                            <Option value="Cancelled">Cancelled</Option>

                            {/* <Option value="Processing">Canceled</Option> */}
                          </Select>
                        </Form.Item>
                      </Col>
                      {!Wallet.current.Cupon > 0 ? (
                        <Col span={24}>
                          <small>
                            Max discount:{" "}
                            {formatter.format(Wallet.current.DiscountLimit)} BDT
                          </small>
                          <Form.Item name="discount" label="Discount (BDT)">
                            <InputNumber
                              min={0}
                              // defaultValue={Wallet.current.Discount}
                              max={Wallet.current.DiscountLimit}
                              placeholder="Amount"
                            />
                          </Form.Item>
                        </Col>
                      ) : (
                        <Col span={24}>
                          <Form.Item name="discountt" label="Discount">
                            {formatter.format(Wallet.current.Cupon.amount)}
                            {Wallet.current.Cupon.ref_type == "P"
                              ? " %"
                              : " BDT"}
                          </Form.Item>
                        </Col>
                      )}
                      {Wallet.current.Advance > 0 ? (
                        <>
                          <Col span={24}>
                            <Form.Item
                              name="advance_payment"
                              label="Advance Payment"
                            >
                              {formatter.format(Wallet.current.Advance)}
                            </Form.Item>
                          </Col>
                        </>
                      ) : (
                        ""
                      )}
                      {Wallet.current.Due > 0 ? (
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
                      {Wallet.current.Due > 0 ? (
                        <Col span={24}>
                          <Form.Item name="account" label="Payment Method">
                            <Select>
                              {accounts.map((account) => {
                                return (
                                  <Option value={account.id}>
                                    {account.name}
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </Col>
                      ) : (
                        ""
                      )}

                      <Col span={24}>
                        <Form.Item name="DeliveryType" label="Courier">
                          <Select
                            placeholder="Please choose a courier"
                            style={{ fontWeight: "400" }}
                          >
                            {courier.map((method) => {
                              return (
                                <Option value={method.id}>{method.name}</Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          name="delivery_charge"
                          label="Delivery Charge"
                          rules={[
                            { required: true, message: "Minimum cost is zero" },
                          ]}
                        >
                          <InputNumber
                            // defaultValue={0}
                            placeholder="Delivery Charge"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          name="delivery_cost"
                          label="Delivery Cost"
                          rules={[
                            { required: true, message: "Minimum cost is zero" },
                          ]}
                        >
                          <InputNumber
                            // defaultValue={0}
                            placeholder="Delivery Cost"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          name="delivery_date"
                          label="Delivery Date"
                          rules={[
                            {
                              required: true,
                              message: "Please choose a status",
                            },
                          ]}
                        >
                          <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          name="shipping_address"
                          label="Shipping Address"
                        >
                          <Input placeholder="Please enter a shipping address" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item name="remarks" label="Remarks">
                          <ReactQuill theme="snow" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item>
                      <Space>
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                          Cancel
                        </Button>
                        {initialdata.current.status != "Paid" ? (
                          <Button type="primary" htmlType="submit">
                            Update
                          </Button>
                        ) : (
                          ""
                        )}
                      </Space>
                    </Form.Item>
                  </Form>
                </Col>
                <Col
                  span={10}
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
                    details={initialdata.current}
                  />
                  {/* <Divider /> */}
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
                  <Divider />
                  <AddService
                    service={services}
                    setservicetrigger={setrefresh}
                    id={initialdata.current.id}
                    setloading={setloading}
                  />
                  <Row
                    style={{
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    <Col span={14}>
                      <h3>Service Details</h3>
                    </Col>
                    <Col span={4}>
                      <h3>Quantity</h3>
                    </Col>
                    <Col span={4} style={{ textAlign: "center" }}>
                      <h3>Price</h3>
                    </Col>
                  </Row>
                  {renderServiceitems()}
                  {/* {console.log(initialdata.current.location)} */}
                  <Addpackagingtoupdate
                    packagingItems={packagingItems}
                    location={initialdata.current.location}
                    details={initialdata.current}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      );
    }
  };
  return (
    <>
      <>
        <a href="#" onClick={showDrawer} style={{ margin: 4 }}>
          Update
        </a>
        <Drawer
          title="Update Invoice"
          width="90%"
          onClose={onClose}
          visible={visible}
        >
          <Spin spinning={fullpageloading}>{renderData()}</Spin>
        </Drawer>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    courier: state.settings.deliverytype,
  };
};

export default connect(mapStateToProps, {
  updateInvoice,
  getInvoiceItem,
  getServices,
  updateVariation,
  updateInvoiceItem,
  deleteInvoiceItem,
  getdeliverytype,
  getAllAccount,
  getSpecificInvoice,
  updateService,
  deleteService,
})(Quickview);
