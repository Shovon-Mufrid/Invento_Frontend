import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getPurchase,
  updatePurchaseItem,
  deletePurchaseItem,
  updatePurchase,
  searchPurchase,
} from "../../actions/purchase";
import { updateVariation } from "../../actions/variableProductAction";
import { createjournals } from "../../actions/journalAction";
import { getSpecificChartofaccountsbycode } from "../../actions/chartofaccountsAction";
import { updateAccount } from "../../actions/accountsAction";

import Addtoupdate from "./Addtoupdate";
import RenderTable from "./Renderitemstable";

import { getAllAccount } from "../../actions/accountsAction";
import {
  Form,
  InputNumber,
  Button,
  Col,
  Row,
  Select,
  Space,
  Divider,
  Drawer,
  Skeleton,
  Spin,
} from "antd";
import _default from "@ant-design/icons/lib/icons/AccountBookFilled";

const { Option } = Select;

const Quickview = ({
  invoice,
  updatePurchase,
  getPurchase,
  updateVariation,
  updatePurchaseItem,
  deletePurchaseItem,
  getAllAccount,
  updateAccount,
  createjournals,
  getSpecificChartofaccountsbycode,
  searchPurchase,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [fullpageloading, setfullpageloading] = useState(false);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [accounts, setaccounts] = useState([]);
  const [cart, setcart] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [data, setdata] = useState();
  const [form] = Form.useForm();
  let details = { ...invoice };
  const shipping = useRef(details.shipping);
  const Wallet = useRef({
    Bill: details.bill,
    Due: details.due,
    Payment: details.payment,
    Advance: details.advance_payment,
    PaymentMethod: details.Payment_method,
    total_received_item_price: details.received_item_price,
  });

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setselectedRowKeys({ selectedRowKeys });
  };

  useEffect(() => {
    if (visible) {
      getAllAccount().then((result) => {
        setaccounts(result);
      });
      setloading(true);
      let totoal = 0;
      searchPurchase("", "", details.purchase_number).then((result) => {
        details = { ...result[0] };
      });
      getPurchase(details.id).then((items) => {
        setdata(items);

        for (const item of items) {
          totoal =
            parseFloat(totoal) +
            parseFloat(item.price) * parseInt(item.quantity);
        }
        Wallet.current.Bill = totoal;
        Wallet.current.Bill = totoal - parseFloat(details.discount);
        Wallet.current.Due = Wallet.current.Bill - Wallet.current.Payment;
        Wallet.current.total_received_item_price = details.received_item_price;
        if (details.payment > Wallet.current.Bill) {
          console.log(details.payment);
          console.log(Wallet.current.Bill);
          Wallet.current.Advance = parseFloat(
            details.payment - Wallet.current.Bill
          ).toFixed(2);
          Wallet.current.Due = 0;
        } else {
          Wallet.current.Advance = 0;
        }
        // updatePurchase(details.id, formData);
        setloading(false);
      });
      // setrefresh(false);
    }
  }, [refresh]);

  const confirm = () => {
    setfullpageloading(true);
    let promises = [];
    let formData = new FormData();
    let addition_landing_cost = 0;
    let total_cost = 0;
    if (details.shipping > 0) {
      let total_quantity = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].received != 1) {
          total_quantity += parseInt(data[i].quantity);
        }
      }
      addition_landing_cost = parseFloat(details.shipping / total_quantity);
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].received != 1) {
        var newstock = data[i].Product[0].quantity + data[i].quantity;
        total_cost += data[i].price * data[i].quantity;
        formData = new FormData();
        formData.append(
          "purchase_price",
          parseFloat(
            parseFloat(data[i].price) + parseFloat(addition_landing_cost)
          ).toFixed(2)
        );
        console.log(newstock);
        formData.append("quantity", newstock);
        formData.append("data", "");
        promises.push(updateVariation(data[i].Product[0].id, formData));
        let updatestatus = new FormData();
        updatestatus.append("data", "");
        updatestatus.append("received", 1);
        promises.push(updatePurchaseItem(data[i].id, updatestatus));
      }
    }

    //journal entry of inventory
    let formData2 = new FormData();
    formData2.append("voucher_type", "cash");
    formData2.append("contact", details.contact.id);
    formData2.append("purchasee", details.id);
    formData2.append("increase", true);
    formData2.append("location", details.location);
    // inventory journal entry
    if (total_cost > 0) {
      formData2.append("details", "purchase number " + details.purchase_number);
      formData2.append("amount", parseFloat(total_cost).toFixed(2));
      formData2.append("account", 1);
      promises.push(
        getSpecificChartofaccountsbycode(1000100015).then((res) => {
          formData2.append("chartofaccount", res[0].id);
          promises.push(
            // inventory journal entry
            createjournals(formData2)
          );
        })
      );
    }

    Promise.all(promises).then((r) => {
      formData = new FormData();
      formData.append("is_received", true);
      updatePurchase(details.id, formData).then((result) => {
        if (result) {
          setloading(true);
          setrefresh(!refresh);
          setVisible(false);
          form.resetFields();
          window.location.reload();
        }
      });
    });
  };

  const onFinish = (values) => {
    setfullpageloading(true);
    if (values.paymentt > 0) {
      values.payment = (
        parseFloat(details.payment) + parseFloat(values.paymentt)
      ).toFixed(2);
      values.due = (
        parseFloat(details.due) - parseFloat(values.paymentt)
      ).toFixed(2);
    }
    if (values.adjustmentt > 0) {
      values.adjustment = (
        parseFloat(details.adjustment) + parseFloat(values.adjustmentt)
      ).toFixed(2);
      values.payment = (
        parseFloat(
          values.paymentt != undefined ? values.payment : details.payment
        ) + parseFloat(values.adjustmentt)
      ).toFixed(2);
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

    updatePurchase(details.id, values).then((result) => {
      if (result) {
        setVisible(false);
        form.resetFields();
        window.location.reload();
      }
    });
  };

  const showDrawer = () => {
    setVisible(true);
    setrefresh(!refresh);
    form.resetFields();
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const renderitems = () => {
    let needupdate = [];
    if (loading) {
      return <Skeleton active />;
    } else {
      return (
        <RenderTable
          List={data}
          Wallet={Wallet}
          setloading={setloading}
          setrefresh={setrefresh}
          accounts={accounts}
          updateAccount={updateAccount}
          refresh={refresh}
          updatePurchaseItem={updatePurchaseItem}
          deletePurchaseItem={deletePurchaseItem}
          updateVariation={updateVariation}
          details={details}
          createjournals={createjournals}
          getSpecificChartofaccountsbycode={getSpecificChartofaccountsbycode}
        />
      );
    }
  };

  const renderData = () => {
    return (
      <>
        <Row>
          <Col span={10}>
            <Form
              form={form}
              labelCol={{
                span: 8,
              }}
              labelAlign="left"
              wrapperCol={{
                span: 15,
              }}
              // layout="vertical"
              onFinish={onFinish}
              initialValues={details}
            >
              <Row>
                <Col span={5}>
                  <h3>Order No.</h3>
                  {details.purchase_number}
                </Col>
                {/* <Col span={7}>
                  <h3>Issue date</h3>
                  {dateFormat(details.issue_date, "mmmm dS, yyyy")}
                </Col> */}

                <Col span={5} style={{ textAlign: "center" }}>
                  <h3>Bill</h3>
                  {formatter.format(parseFloat(Wallet.current.Bill).toFixed(2))}
                </Col>
                <Col span={5} style={{ textAlign: "center" }}>
                  <h3>Payment</h3>
                  {formatter.format(
                    parseFloat(Wallet.current.Payment).toFixed(2)
                  )}
                </Col>
                <Col span={5} style={{ textAlign: "center" }}>
                  <h3>Due</h3>
                  {formatter.format(parseFloat(Wallet.current.Due).toFixed(2))}
                </Col>
                <Col span={4} style={{ textAlign: "center" }}>
                  <h3>Discount</h3>
                  {formatter.format(parseFloat(details.discount).toFixed(2))}
                </Col>
              </Row>
              <Divider />

              <Row>
                {Wallet.current.Advance > 0 ? (
                  <>
                    <Col span={24}>
                      <Form.Item name="advance_payment" label="Advance Payment">
                        {Wallet.current.Advance}
                      </Form.Item>
                    </Col>
                  </>
                ) : (
                  ""
                )}
                {/* {Wallet.current.Due > 0 && details.contact ? (
                  <>
                    {details.contact.account_balance < 0 ? (
                      <>
                        <Col span={24}>
                          <small>
                            Advance Payment :{" "}
                            {formatter.format(
                              Math.abs(details.contact.account_balance)
                            )}{" "}
                            BDT
                          </small>

                          <Form.Item
                            name="adjustmentt"
                            label="Advance Adjustment"
                          >
                            <InputNumber
                              placeholder="Amount"
                              max={Math.abs(details.contact.account_balance)}
                            />
                          </Form.Item>
                        </Col>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  ""
                )} */}
                {Wallet.current.Due > 0 ? (
                  <>
                    <Col span={24}>
                      <Form.Item
                        name="paymentt"
                        label="New Payment"
                        style={{ color: "blue" }}
                      >
                        <InputNumber placeholder="Amount" />
                      </Form.Item>
                    </Col>
                  </>
                ) : (
                  ""
                )}
                <Col span={24}>
                  <Form.Item name="account" label="Payment Method">
                    <Select>
                      {accounts.map((account) => {
                        return (
                          <Option value={account.id}>{account.name}</Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                {Wallet.current.Due > 0 ? (
                  <Col span={24}>
                    <Form.Item name="discount" label="Discount">
                      <InputNumber
                        placeholder="Amount"
                        min={0}
                        max={Wallet.current.Bill}
                        onChange={(e) => (shipping.current = e)}
                      />
                    </Form.Item>
                  </Col>
                ) : (
                  ""
                )}

                {/* {!details.is_received ? (
                  <Col span={24}>
                    <Form.Item name="shipping" label="Shipping cost">
                      <InputNumber
                        placeholder="Amount"
                        onChange={(e) => (shipping.current = e)}
                      />
                    </Form.Item>
                  </Col>
                ) : (
                  <Col span={24}>
                    <Form.Item name="shippingggg" label="Shipping cost">
                      {details.shipping}
                    </Form.Item>
                  </Col>
                )} */}
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
                      <Option value="Partial Payment">Partial Payment</Option>
                      <Option value="Complete">Complete</Option>

                      {/* <Option value="Processing">Canceled</Option> */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="remarks" label="Note">
                    <ReactQuill theme="snow" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Space>
                  <Button onClick={onClose} style={{ marginRight: 8 }}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                  {/* {!details.is_received ? (
                    <Button
                      style={{
                        backgroundColor: "lightgreen",
                        color: "black",
                      }}
                    >
                      <Popconfirm
                        title="Are you sure you have received all the products ?"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Link to="#">Receive All</Link>
                      </Popconfirm>
                    </Button>
                  ) : (
                    "Received"
                  )} */}
                </Space>
              </Form.Item>
            </Form>
          </Col>
          <Col
            span={14}
            style={{
              padding: "30px",
              paddingTop: "10px",
              backgroundColor: "whitesmoke",
              borderRadius: "10px",
              minHeight: "85vh",
            }}
          >
            {!details.is_received ? (
              <>
                <Addtoupdate
                  wordrobeitems={data}
                  setrefresh={setrefresh}
                  refresh={refresh}
                  details={details}
                />
                <Divider />
              </>
            ) : (
              ""
            )}
            {/* <Row
              style={{
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <Col span={11}>
                <h3>Product Details</h3>
              </Col>
              <Col span={4}>
                <h3>Quantity</h3>
              </Col>
              <Col span={5}>
                <h3>Unit Price</h3>
              </Col>
            </Row> */}
            {renderitems()}
            {/* {rendertable()} */}
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
          title="Update Purchase Record"
          width="1200"
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
    // Variations: state.ProductDetails.productdetails,
  };
};

export default connect(null, {
  updatePurchase,
  getPurchase,
  updateVariation,
  updatePurchaseItem,
  deletePurchaseItem,
  getAllAccount,
  createjournals,
  getSpecificChartofaccountsbycode,
  updateAccount,
  searchPurchase,
})(Quickview);
