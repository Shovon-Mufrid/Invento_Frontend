import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { getProductSearchResult } from "./../../actions/productDetails";

import { DeleteOutlined, CaretRightOutlined } from "@ant-design/icons";
import {
  createInvoiceItem,
  createInvoice,
  createService,
  updateInvoice,
} from "../../actions/invoiceItem";
import { updateVariationfromSrock } from "../../actions/variableProductAction";
import { getSpecificChartofaccountsbycode } from "../../actions/chartofaccountsAction";
import { updateCupon } from "../../actions/cupon";
import { getAllOutlet } from "../../actions/warehouseAction";
import { createMeasurement } from "../../actions/measurment";
import { createjournals } from "../../actions/journalAction";
import { getAllAccount } from "../../actions/accountsAction";
import { getCuponSearchResult } from "../../actions/cupon";

import AddService from "./AddService";
import AddMeasurements from "./AddMeasurements";
import AddShipping from "./AddShipping";
import ContctSearch from "./ContctSearch";
import dateFormat from "dateformat";

import {
  Divider,
  AutoComplete,
  Row,
  Col,
  Image,
  InputNumber,
  Affix,
  Button,
  message,
  DatePicker,
  Space,
  Select,
  Input,
  TreeSelect,
  Switch,
  Collapse,
} from "antd";
const { Option } = Select;
const { Panel } = Collapse;

const SearchStock = ({
  getProductSearchResult,
  List,
  WarehouseList,
  Contacts,
  cartItems,
  setCart,
  cart,
  createInvoiceItem,
  createInvoice,
  updateVariationfromSrock,
  createService,
  getAllOutlet,
  createMeasurement,
  createjournals,
  getAllAccount,
  location,
  getSpecificChartofaccountsbycode,
  setshowinvoice,
  newinvoice,
  getCuponSearchResult,
  updateCupon,
  setsearch,
  Auth,
  updateInvoice,
  packagingItems,
  setrealodpackage,
  fullpageloading,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");
  const services = useRef([]);
  const measurements = useRef([]);
  const packaging = useRef([]);

  const [servicetrigger, setservicetrigger] = useState(false);
  const [accounts, setaccounts] = useState([]);

  var currentdate = new Date();
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment(currentdate, "YYYY-MM-DD");
  }
  var invoiceNumber =
    currentdate.getDate().toString() +
    (currentdate.getMonth() + 1).toString() +
    currentdate.getFullYear().toString() +
    currentdate.getHours().toString() +
    currentdate.getMinutes().toString() +
    currentdate.getSeconds().toString();
  const bill = useRef({
    Contact: null,
    MaxDiscount: 0,
    Discount: 0,
    subTotal: 0,
    Total: 0,
    TotalSell: 0,
    Due: 0,
    Tax: 0,
    Cost: 0,
    Paid: 0, //payment 1
    PaymentMethod: "Cash", //payment 1
    AccountNumber: "", //payment 1
    Account_no: "", //payment 1
    transection: "", //payment 1

    Paid_2: 0, //payment 2
    PaymentMethod_2: "Cash", //payment 2
    AccountNumber_2: "", //payment 2
    Account_no_2: "", //payment 2
    transection_2: "", //payment 2
    payment2_active: false, //payment 2

    Issue: "",
    Deliver: "",
    DeliveryCharge: 0,
    InvoiceNumber: invoiceNumber,
    shipping_address: "",
    remarks: "",
    location: Auth.profile.Office,
    Program: "",
    Cupon: null,
    Cupon_name: "",
    Payable: 0,
    AddPayable: false,
    Advance: null,
  });

  useEffect(() => {
    getAllAccount().then((result) => {
      setaccounts(result);
    });
    getAllOutlet();
    location.current = bill.current.location;
  }, []);

  useEffect(() => {
    let Total = 0;
    let maxdiscount = 0;
    let Totalcost = 0;
    let productprice = 0;
    bill.current.TotalSell = 0;
    cartItems.current.map((item) => {
      Total += parseFloat(item.total_price);
      bill.current.TotalSell += parseFloat(item.total_price);
      productprice += parseFloat(item.total_price);
      Totalcost += parseFloat(item.purchase_price) * item.quantity;
      if (bill.current.Cupon == null) {
        maxdiscount += parseFloat(item.discount) * item.quantity;
      }
    });

    bill.current.Cost = Totalcost;
    bill.current.MaxDiscount = maxdiscount;
    services.current.map((item) => {
      Total += parseFloat(item.Total_Price);
    });

    if (bill.current.DeliveryCharge > 0) {
      bill.current.subTotal =
        parseFloat(Total) + parseFloat(bill.current.DeliveryCharge);
    } else {
      bill.current.subTotal = parseFloat(Total) + parseFloat(0);
    }
    bill.current.Total = bill.current.subTotal;

    //cupon
    if (bill.current.Cupon != null) {
      if (bill.current.Cupon.ref_type == "A") {
        bill.current.Discount = parseFloat(bill.current.Cupon.amount);
      } else {
        bill.current.Discount = parseFloat(
          (bill.current.TotalSell * bill.current.Cupon.amount) / 100
        );
      }
    }

    if (bill.current.Discount > 0) {
      bill.current.Total =
        parseFloat(bill.current.subTotal) - parseFloat(bill.current.Discount);
    } else {
      bill.current.Total = parseFloat(bill.current.subTotal) - parseFloat(0);
    }
    if (bill.current.Total < 0) {
      bill.current.Total = 0;
    }

    //previous payment
    if (bill.current.Payable > 0 && bill.current.AddPayable) {
      if (bill.current.Total > bill.current.Payable) {
        bill.current.Advance = bill.current.Payable;
      } else {
        bill.current.Advance = bill.current.Total;
      }
    } else {
      bill.current.Advance = 0;
    }

    //due count
    if (bill.current.Total == bill.current.Paid) {
      bill.current.Paid_2 = 0;
    }
    if (bill.current.Paid == 0) {
      bill.current.Paid_2 = 0;
    }
    if (bill.current.Paid > 0 || bill.current.Paid == 0) {
      bill.current.Due =
        parseFloat(bill.current.Total) -
        parseFloat(bill.current.Paid) -
        parseFloat(bill.current.Paid_2) -
        parseFloat(bill.current.Advance);
    }
    productprice = productprice - bill.current.Discount;
    bill.current.Tax = Math.abs(productprice - productprice / (1 + 0.075));
    setservicetrigger(false);
    setCart(false);
  }, [cart, servicetrigger]);

  const submitOrder = () => {
    const formData = new FormData();
    if (bill.current.PaymentMethod != "Cash") {
      formData.append("account", bill.current.AccountNumber);
    } else {
      for (let i = 0; i < accounts.length; i++) {
        console.log(accounts[i]);
        console.log(bill.current.PaymentMethod);
        if (accounts[i].type == bill.current.PaymentMethod) {
          formData.append("account", accounts[i].id);
          bill.current.AccountNumber = accounts[i].id;
        }
      }
    }

    if (
      bill.current.Deliver == "" ||
      bill.current.Contact == null ||
      bill.current.AccountNumber == ""
    ) {
      alert("Please Insert a Delevery Date and contact");
    } else if (bill.current.Paid_2 > 0 && bill.current.PaymentMethod_2 == "") {
      alert("Please Insert a payment method");
    } else {
      fullpageloading(true);
      formData.append("contact", bill.current.Contact);

      formData.append("bill", bill.current.Total.toFixed(2));
      formData.append("discount", bill.current.Discount.toFixed(2));
      formData.append(
        "delivery_charge",
        bill.current.DeliveryCharge.toFixed(2)
      );

      if (bill.current.Advance > 0) {
        formData.append("advance_payment", bill.current.Advance.toFixed(2));
        formData.append(
          "payment",
          (bill.current.Paid + bill.current.Advance).toFixed(2)
        );
      } else {
        formData.append("payment", bill.current.Paid.toFixed(2));
      }

      formData.append("due", bill.current.Due.toFixed(2));
      formData.append("Payment_method", bill.current.PaymentMethod);
      formData.append("issue_date", bill.current.Issue);
      formData.append("delivery_date", bill.current.Deliver);
      if (bill.current.Program != "") {
        formData.append("program_date", bill.current.Program);
      }

      formData.append("invoice_number", bill.current.InvoiceNumber);
      formData.append("discountlimit", bill.current.MaxDiscount);
      formData.append("shipping_address", bill.current.shipping_address);
      formData.append("Account_no", bill.current.Account_no);
      formData.append("Transection_no", bill.current.transection);
      formData.append("tax", bill.current.Tax.toFixed(2));
      formData.append("remarks", bill.current.remarks);
      formData.append("location", bill.current.location);
      formData.append("costing", bill.current.Cost.toFixed(2));
      formData.append("employe", Auth.profile.id);

      if (bill.current.Cupon != null) {
        formData.append("cupon", bill.current.Cupon.id);
      }
      formData.append("data", "");
      // item count
      let totalquantity = 0;
      for (let c = 0; c < cartItems.current.length; c++) {
        totalquantity += cartItems.current[c].quantity;
      }
      for (let s = 0; s < services.current.length; s++) {
        totalquantity += services.current[s].Quantity;
      }
      formData.append("quantity", totalquantity);
      let promises = [];
      createInvoice(formData).then(function (result) {
        async function someProcedure() {
          let formData = new FormData();

          for (let c = 0; c < cartItems.current.length; c++) {
            var newstock =
              cartItems.current[c].limit - cartItems.current[c].quantity;
            formData = new FormData();
            formData.append("invoice", result);
            formData.append("product", cartItems.current[c].id);
            formData.append("price", cartItems.current[c].price);
            formData.append(
              "purchase_price",
              cartItems.current[c].purchase_price
            );
            formData.append("quantity", cartItems.current[c].quantity);
            formData.append("data", "");
            promises.push(createInvoiceItem(formData));
            formData = new FormData();
            formData.append("quantity", newstock);
            promises.push(
              updateVariationfromSrock(
                cartItems.current[c].id,
                formData,
                newstock
              )
            );
          }

          //packaing items
          let packaging_cost = 0;
          for (let p = 0; p < packagingItems.length; p++) {
            if (packagingItems[p].quantity > 0) {
              var newpackagingstock =
                packagingItems[p].limit - packagingItems[p].quantity;
              packaging_cost =
                packaging_cost + parseFloat(packagingItems[p].price);
              const formData = new FormData();
              formData.append("quantity", newpackagingstock);
              updateVariationfromSrock(
                packagingItems[p].id,
                formData,
                newpackagingstock
              );
            }
          }

          for (let s = 0; s < services.current.length; s++) {
            const formData = new FormData();
            formData.append("invoice", result);
            formData.append("details", services.current[s].Description);
            formData.append("price", services.current[s].Price);
            formData.append("quantity", services.current[s].Quantity);
            formData.append("status", "Pending");
            formData.append("data", "");
            promises.push(createService(formData));
          }
          // cartItems.current.map((item) => {
          // });
          // services.current.map((item) => {});
          if (measurements.current.length > 0) {
            measurements.current[0].invoice = result;
            measurements.current[0].data = "";
            promises.push(createMeasurement(measurements.current[0]));
          } else {
            measurements.current[0] = { invoice: result, data: "" };
            promises.push(createMeasurement(measurements.current[0]));
          }
          formData = new FormData();
          if (
            bill.current.Cupon != null &&
            bill.current.Cupon.limit_type == "limited"
          ) {
            var newLimit = parseInt(bill.current.Cupon.limit) - 1;
            formData.append("limit", newLimit);
            promises.push(updateCupon(bill.current.Cupon.id, formData));
          }

          //2nd payment
          if (bill.current.Paid_2 > 0) {
            formData = new FormData();
            if (bill.current.PaymentMethod_2 != "Cash") {
              formData.append("account", bill.current.AccountNumber_2);
            } else {
              for (let i = 0; i < accounts.length; i++) {
                if (accounts[i].type == bill.current.PaymentMethod_2) {
                  console.log(accounts[i].id);
                  formData.append("account", accounts[i].id);
                  // bill.current.AccountNumber_2 = accounts[i].id;
                }
              }
            }
            let total_payment = 0;
            if (bill.current.Advance > 0) {
              total_payment =
                bill.current.Paid_2 + bill.current.Paid + bill.current.Advance;
            } else {
              total_payment = bill.current.Paid_2 + bill.current.Paid;
            }

            formData.append("payment", total_payment.toFixed(2));
            formData.append("Payment_method", bill.current.PaymentMethod_2);
            formData.append("Account_no", bill.current.Account_no_2);
            formData.append("Transection_no", bill.current.transection_2);

            promises.push(updateInvoice(result, formData));
          }

          //journal entry
          if (packaging_cost > 0) {
            let formData2 = new FormData();
            formData2.append("contact", bill.current.Contact);
            formData2.append("invoice", result);
            formData2.append("increase", false);
            formData2.append("location", bill.current.location);
            formData2.append(
              "details",
              "Packaging items for sell invoice no.  " +
                bill.current.InvoiceNumber
            );
            formData2.append("amount", parseFloat(packaging_cost).toFixed(2));
            // inventory journal entry
            promises.push(
              getSpecificChartofaccountsbycode(1000100015).then((res) => {
                formData2.append("chartofaccount", res[0].id);
                promises.push(createjournals(formData2));
              })
            );
          }

          if (packaging_cost > 0) {
            let formData3 = new FormData();
            formData3.append("contact", bill.current.Contact);
            formData3.append("invoice", result);
            formData3.append("increase", true);
            formData3.append("location", bill.current.location);
            formData3.append(
              "details",
              "Packaging items for sell invoice no.  " +
                bill.current.InvoiceNumber
            );
            formData3.append("amount", parseFloat(packaging_cost).toFixed(2));
            // Cost of goods sold entry
            promises.push(
              getSpecificChartofaccountsbycode(400020).then((res) => {
                formData3.append("chartofaccount", res[0].id);
                promises.push(createjournals(formData3));
              })
            );
          }

          return "done";
        }
        someProcedure().then(() => {
          Promise.all(promises).then((e) => {
            newinvoice.current = result;
            message.success("Order has been taken");
            setshowinvoice(true);
            // window.location.reload();
          });
        });
      });
    }
  };

  const { REACT_APP_API_URL } = process.env;
  const renderImage = (image) => {
    if (image) {
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
      <Row style={{ minHeight: "23vh" }}>
        <Col span={14}>
          <ContctSearch bill={bill} setCart={setCart} />
          <Row>
            <AddShipping bill={bill} />
          </Row>
        </Col>
        <Col span={10}>
          <Space direction="vertical" style={{ width: "100%" }}>
            {Auth.superuser ? (
              <Row style={{ margin: "auto" }}>
                <Col span={7} style={{ textAlign: "right" }}>
                  <h3>
                    <span style={{ color: "red" }}>*</span>Branch
                  </h3>
                </Col>
                <Col span={16} offset={1}>
                  <Select
                    style={{ width: "100%" }}
                    // defaultValue={bill.current.location}
                    onChange={(e) => {
                      cartItems.current = [];
                      bill.current.location = e;
                      location.current = bill.current.location;
                      setCart(true);
                      setsearch(true);
                      setrealodpackage(true);
                    }}
                  >
                    {WarehouseList.map((warehouse) => {
                      return (
                        <Option value={warehouse.id}>{warehouse.name}</Option>
                      );
                    })}
                  </Select>
                </Col>
              </Row>
            ) : (
              ""
            )}

            <Row style={{ margin: "auto" }}>
              <Col span={7} style={{ textAlign: "right" }}>
                <h3>Invoice No.</h3>
              </Col>
              <Col span={16} offset={1}>
                <InputNumber
                  value={bill.current.InvoiceNumber}
                  disabled
                  style={{ color: "black" }}
                />
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <h1>Description</h1>
        </Col>
        <Col span={3} style={{ textAlign: "center" }}>
          <h1>Quantity</h1>
        </Col>
        <Col span={5} style={{ textAlign: "center" }}>
          <h1>Price (BDT) </h1>
        </Col>
      </Row>
      {cartItems.current.map((item) => {
        const index = cartItems.current.indexOf(item);
        return (
          <>
            <Row
              style={{
                borderRadius: "10px",
                padding: "10px",
                background: "#F0F2F5",
                marginBottom: "2px",
              }}
            >
              <Col span={2}>
                {renderImage(
                  item.details.ProductImage ? item.details.ProductImage : []
                )}
              </Col>
              <Col span={14}>
                <p>
                  {item.title}{" "}
                  {item.Attribute_details == "" ? (
                    ""
                  ) : (
                    <>
                      <br></br>
                      {item.Attribute_details}
                    </>
                  )}
                </p>
              </Col>
              <Col span={3} style={{ textAlign: "center", margin: "auto" }}>
                <InputNumber
                  min={1}
                  max={cartItems.current[index].limit}
                  value={cartItems.current[index].quantity}
                  onChange={(e) => {
                    cartItems.current[index].quantity = e;
                    cartItems.current[index].total_price =
                      e * cartItems.current[index].price;

                    setCart(true);
                  }}
                  defaultValue={1}
                />
              </Col>
              <Col span={5} style={{ textAlign: "center", margin: "auto" }}>
                {item.total_price}
                <DeleteOutlined
                  style={{ color: "Red", float: "right", margin: "auto" }}
                  onClick={(e) => {
                    cartItems.current.splice(index, 1);
                    setCart(true);
                  }}
                />
              </Col>
            </Row>
          </>
        );
      })}

      {services.current.map((item) => {
        const index = services.current.indexOf(item);
        return (
          <>
            <Row
              style={{
                borderRadius: "10px",
                padding: "10px",
                background: "#F0F2F5",
                marginBottom: "2px",
              }}
            >
              <Col span={16}>
                <div
                  dangerouslySetInnerHTML={{ __html: item.Description }}
                ></div>
              </Col>
              <Col span={3} style={{ textAlign: "center", margin: "auto" }}>
                <InputNumber
                  min={1}
                  onChange={(e) => {
                    services.current[index].Quantity = e;
                    services.current[index].Total_Price =
                      e * services.current[index].Price;
                    setservicetrigger(true);
                  }}
                  defaultValue={1}
                />
              </Col>
              <Col span={5} style={{ textAlign: "center", margin: "auto" }}>
                {item.Total_Price}
                <DeleteOutlined
                  style={{ color: "Red", float: "right", margin: "auto" }}
                  onClick={(e) => {
                    services.current.splice(index, 1);
                    setCart(true);
                  }}
                />
              </Col>
            </Row>
          </>
        );
      })}
      <AddService service={services} setservicetrigger={setservicetrigger} />
      <br></br>
      <AddMeasurements measurements={measurements} />
      <Divider />
      <Row>
        <Col span={10}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Row style={{ margin: "auto" }}>
              <Col span={10} style={{ textAlign: "left" }}>
                <h3>
                  <span style={{ color: "red" }}>*</span>Delivery date
                </h3>
              </Col>
              <Col span={13} offset={1}>
                <DatePicker
                  disabledDate={disabledDate}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    if (e != null) {
                      bill.current.Deliver = e.format("YYYY-MM-DD");
                    }
                    setCart(true);
                  }}
                />
              </Col>
            </Row>
            <Row style={{ margin: "auto" }}>
              <Col span={10} style={{ textAlign: "left" }}>
                <h3>Program date</h3>
              </Col>
              <Col span={13} offset={1}>
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    if (e != null) {
                      bill.current.Program = e.format("YYYY-MM-DD");
                    }
                    setCart(true);
                  }}
                />
              </Col>
            </Row>
          </Space>
        </Col>
        <Col span={14} style={{ marginTop: "1rem" }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>VAT</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  value={Math.abs(bill.current.Tax.toFixed(2))}
                  disabled
                  style={{ color: "black" }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3> Delivery Charge</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  min={0}
                  // defaultValue={0}
                  onChange={(e) => {
                    if (e > 0) {
                      bill.current.DeliveryCharge = e;
                    } else {
                      bill.current.DeliveryCharge = 0;
                    }
                    setCart(true);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3> Sub Total</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  value={bill.current.subTotal}
                  disabled
                  style={{ color: "black" }}
                />
              </Col>
            </Row>

            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3> Coupon</h3>
              </Col>
              <Col span={8} offset={1} style={{ textAlign: "center" }}>
                <Input
                  onChange={(e) => {
                    bill.current.Cupon_name = e.target.value;
                  }}
                />
              </Col>
              <Col span={4} style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  onClick={() => {
                    getCuponSearchResult(bill.current.Cupon_name).then(
                      (result) => {
                        if (result.length == 1) {
                          if (result[0].status == "Active") {
                            if (
                              (result[0].limit_type == "limited" &&
                                result[0].limit > 0) ||
                              result[0].limit_type == "Unlimited"
                            ) {
                              var currentdate = new Date();

                              var d1 = dateFormat(
                                result[0].start,
                                "yyyy-mm-dd HH:MM:ss"
                              );
                              var d2 = dateFormat(
                                result[0].end,
                                "yyyy-mm-dd HH:MM:ss"
                              );
                              var current = dateFormat(
                                currentdate,
                                "yyyy-mm-dd HH:MM:ss"
                              );
                              var date1 = new Date(d1);
                              var date2 = new Date(d2);
                              var currenttime = new Date(current);

                              var diff1 =
                                currenttime.getTime() - date1.getTime();
                              var diff2 =
                                date2.getTime() - currenttime.getTime();
                              var lte = diff1 / (1000 * 3600 * 24);
                              var gte = diff2 / (1000 * 3600 * 24);

                              if (lte >= 0 && gte >= 0) {
                                message.success("Coupon has been applied");
                                bill.current.Cupon = result[0];
                                setCart(true);
                              }
                            }
                          }
                        }
                      }
                    );
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col span={11} style={{ textAlign: "right" }}></Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                {bill.current.Cupon != null ? (
                  <small>
                    Coupon discount: {parseInt(bill.current.Cupon.amount)}
                    {bill.current.Cupon.ref_type == "A" ? " BDT" : "%"}
                    <Button
                      type="link"
                      style={{ color: "red" }}
                      onClick={() => {
                        bill.current.Cupon = null;
                        bill.current.Discount = 0;
                        setCart(true);
                        setservicetrigger(true);
                      }}
                    >
                      x
                    </Button>
                  </small>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            {bill.current.Cupon == null ? (
              <Row>
                <Col span={11} style={{ textAlign: "right" }}>
                  <h3> Discount</h3>
                </Col>
                <Col span={12} offset={1} style={{ textAlign: "center" }}>
                  <InputNumber
                    max={bill.current.MaxDiscount}
                    onChange={(e) => {
                      if (e > 0) {
                        bill.current.Discount = e;
                        setCart(true);
                      } else {
                        bill.current.Discount = 0;
                        setCart(true);
                      }
                    }}
                  />
                  <small>
                    Max discount: {formatter.format(bill.current.MaxDiscount)}
                  </small>
                </Col>
              </Row>
            ) : (
              ""
            )}
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Grand Total</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  value={bill.current.Total}
                  disabled
                  style={{ color: "black" }}
                />
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Payment method</h3>
              </Col>
              <Col span={12} offset={1}>
                <Select
                  defaultValue="Cash"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    bill.current.PaymentMethod = e;
                    bill.current.AccountNumber = "";
                    setCart(true);
                  }}
                >
                  <Option value="Cash">Cash</Option>
                  <Option value="Bank">Bank</Option>
                  <Option value="Mobile banking">Mobile banking</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              {bill.current.PaymentMethod != "Cash" ? (
                <>
                  <Col span={11} style={{ textAlign: "right" }}>
                    <h3>
                      <span style={{ color: "red" }}>*</span>Account
                    </h3>
                  </Col>
                  <Col span={12} offset={1}>
                    <Select
                      value={bill.current.AccountNumber}
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        bill.current.AccountNumber = e;
                        setCart(true);
                      }}
                    >
                      {accounts.map((account) => {
                        if (account.type == bill.current.PaymentMethod) {
                          return (
                            <Option value={account.id}>{account.name}</Option>
                          );
                        }
                      })}
                    </Select>
                  </Col>
                </>
              ) : (
                ""
              )}
            </Row>
            {bill.current.PaymentMethod == "Cash" ? (
              ""
            ) : (
              <Row>
                <Col span={11} style={{ textAlign: "right" }}>
                  <h3>Account no.</h3>
                </Col>
                <Col span={12} offset={1} style={{ textAlign: "center" }}>
                  <InputNumber
                    onChange={(e) => {
                      bill.current.Account_no = e;
                    }}
                  />
                </Col>
              </Row>
            )}

            {bill.current.PaymentMethod == "Cash" ? (
              ""
            ) : (
              <Row>
                <Col span={11} style={{ textAlign: "right" }}>
                  <h3>Transection ID.</h3>
                </Col>
                <Col span={12} offset={1} style={{ textAlign: "center" }}>
                  <InputNumber
                    onChange={(e) => {
                      bill.current.transection = e;
                    }}
                  />
                </Col>
              </Row>
            )}
            {bill.current.Payable > 0 ? (
              <Row>
                <Col span={11} style={{ textAlign: "right" }}>
                  <h3>Payable adjustment</h3>
                </Col>
                <Col span={12} offset={1} style={{ textAlign: "center" }}>
                  <InputNumber value={bill.current.Advance} disabled />
                  <small>
                    Total payable : {formatter.format(bill.current.Payable)}{" "}
                    <Switch
                      size="small"
                      onChange={(value) => {
                        bill.current.AddPayable = value;
                        setCart(true);
                      }}
                    />
                  </small>
                </Col>
              </Row>
            ) : (
              ""
            )}
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Payment</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  min={0}
                  max={bill.current.Total}
                  onChange={(e) => {
                    if (bill.current.Contact == null) {
                      alert("Please select a customer first");
                    } else if (e != "" && e != null) {
                      bill.current.Paid = e;
                      setservicetrigger(true);
                      setCart(true);
                    } else {
                      bill.current.Paid = 0;
                      setservicetrigger(true);
                      setCart(true);
                    }
                  }}
                />
              </Col>
            </Row>

            {/* payment method 2 */}
            {bill.current.Paid > 0 ? (
              <>
                <Switch
                  // size="small"
                  style={{ float: "right" }}
                  checkedChildren="Turn Off Second Payment"
                  unCheckedChildren="Turn On Second Payment"
                  onChange={(value) => {
                    bill.current.payment2_active = value;
                    bill.current.Paid_2 = 0;
                    setservicetrigger(true);

                    setCart(true);
                  }}
                />
                {bill.current.payment2_active ? (
                  <>
                    <Divider />
                    <Row>
                      <Col span={11} style={{ textAlign: "right" }}>
                        <h3>Payment method</h3>
                      </Col>
                      <Col span={12} offset={1}>
                        <Select
                          defaultValue="Cash"
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            bill.current.PaymentMethod_2 = e;
                            bill.current.AccountNumber_2 = "";
                            setCart(true);
                          }}
                        >
                          <Option value="Cash">Cash</Option>
                          <Option value="Bank">Bank</Option>
                          <Option value="Mobile banking">Mobile banking</Option>
                        </Select>
                      </Col>
                    </Row>
                    <Row>
                      {bill.current.PaymentMethod_2 != "Cash" ? (
                        <>
                          <Col span={11} style={{ textAlign: "right" }}>
                            <h3>
                              <span style={{ color: "red" }}>*</span>Account
                            </h3>
                          </Col>
                          <Col span={12} offset={1}>
                            <Select
                              value={bill.current.AccountNumber_2}
                              style={{ width: "100%" }}
                              onChange={(e) => {
                                bill.current.AccountNumber_2 = e;
                                setCart(true);
                              }}
                            >
                              {accounts.map((account) => {
                                if (
                                  account.type == bill.current.PaymentMethod_2
                                ) {
                                  return (
                                    <Option value={account.id}>
                                      {account.name}
                                    </Option>
                                  );
                                }
                              })}
                            </Select>
                          </Col>
                        </>
                      ) : (
                        ""
                      )}
                    </Row>
                    {bill.current.PaymentMethod_2 == "Cash" ? (
                      ""
                    ) : (
                      <Row>
                        <Col span={11} style={{ textAlign: "right" }}>
                          <h3>Account no.</h3>
                        </Col>
                        <Col
                          span={12}
                          offset={1}
                          style={{ textAlign: "center" }}
                        >
                          <InputNumber
                            onChange={(e) => {
                              bill.current.Account_no_2 = e;
                            }}
                          />
                        </Col>
                      </Row>
                    )}
                    {bill.current.PaymentMethod_2 == "Cash" ? (
                      ""
                    ) : (
                      <Row>
                        <Col span={11} style={{ textAlign: "right" }}>
                          <h3>Transection ID.</h3>
                        </Col>
                        <Col
                          span={12}
                          offset={1}
                          style={{ textAlign: "center" }}
                        >
                          <InputNumber
                            onChange={(e) => {
                              bill.current.transection_2 = e;
                            }}
                          />
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col span={11} style={{ textAlign: "right" }}>
                        <h3>Payment 2</h3>
                      </Col>
                      <Col span={12} offset={1} style={{ textAlign: "center" }}>
                        <InputNumber
                          min={0}
                          max={bill.current.Total - bill.current.Paid}
                          onChange={(e) => {
                            console.log(e);
                            if (bill.current.Contact == null) {
                              alert("Please select a customer first");
                            } else if (e != "" && e != null) {
                              bill.current.Paid_2 = e;
                              setservicetrigger(true);
                              setCart(true);
                            } else {
                              bill.current.Paid_2 = 0;
                              setservicetrigger(true);
                              setCart(true);
                            }
                          }}
                        />
                      </Col>
                    </Row>{" "}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
            <Divider />
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Due</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  value={bill.current.Due}
                  disabled
                  style={{ color: "black" }}
                />
              </Col>
            </Row>

            <Button
              type="primary"
              onClick={submitOrder}
              style={{ float: "right" }}
            >
              Confirm Order
            </Button>
          </Space>
        </Col>
      </Row>

      <Divider />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
    List: state.ProductDetails.productdetails,
    Contacts: state.contacts.contactlistsearchresult,
    WarehouseList: state.warehouse.outletlist,
  };
};

export default connect(mapStateToProps, {
  getProductSearchResult,
  createInvoiceItem,
  createInvoice,
  updateVariationfromSrock,
  createService,
  getAllOutlet,
  createMeasurement,
  createjournals,
  getAllAccount,
  getSpecificChartofaccountsbycode,
  getCuponSearchResult,
  updateCupon,
  updateInvoice,
})(SearchStock);
