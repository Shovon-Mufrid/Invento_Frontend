import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { getProductSearchResult } from "../../actions/productDetails";

import { DeleteOutlined } from "@ant-design/icons";
import {
  createInvoiceItem,
  createInvoice,
  createService,
} from "../../actions/invoiceItem";
import { createPurchase, createPurchaseItem } from "../../actions/purchase";
import { updateVariationfromSrock } from "../../actions/variableProductAction";
import { getAllWarehouse } from "../../actions/warehouseAction";
import { getSpecificChartofaccountsbycode } from "../../actions/chartofaccountsAction";
import { createjournals } from "../../actions/journalAction";

// import AddService from "./AddService";
// import AddShipping from "./AddShipping";
import ContctSearch from "./ContctSearch";
import CreateNewProduct from "./CreateNewProduct";

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
} from "antd";
const { Option } = Select;

const SearchStock = ({
  getProductSearchResult,
  List,
  WarehouseList,
  Contacts,
  search,
  cartItems,
  setCart,
  cart,
  createInvoiceItem,
  createPurchase,
  updateVariationfromSrock,
  createService,
  getAllWarehouse,
  createPurchaseItem,
  getSpecificChartofaccountsbycode,
  createjournals,
}) => {
  const services = useRef([]);
  const load = useRef(false);
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  });

  const [servicetrigger, setservicetrigger] = useState(false);

  var currentdate = new Date();
  var invoiceNumber =
    currentdate.getDate().toString() +
    (currentdate.getMonth() + 1).toString() +
    currentdate.getFullYear().toString() +
    currentdate.getHours().toString() +
    currentdate.getMinutes().toString() +
    currentdate.getSeconds().toString();
  const bill = useRef({
    Contact: null,
    Discount: 0,
    subTotal: 0,
    Total: 0,
    Due: 0,
    Paid: 0,
    PaymentMethod: "Cash",
    Issue: "",
    Deliver: "",
    InvoiceNumber: invoiceNumber,
    Account_no: "",
    remarks: "",
    reference: "",
  });

  useEffect(() => {
    let Total = 0;
    cartItems.current.map((item) => {
      Total += parseFloat(item.total_price);
    });
    bill.current.subTotal = parseFloat(Total);
    bill.current.Total =
      parseFloat(bill.current.subTotal) - parseFloat(bill.current.Discount);
    bill.current.Due =
      parseFloat(bill.current.Total) - parseFloat(bill.current.Paid);
    load.current = false;
  }, [cart, load.current]);

  const submitOrder = () => {
    if (bill.current.Contact != null) {
      let formData = new FormData();
      formData.append("contact", bill.current.Contact);
      formData.append("bill", bill.current.Total.toFixed(2));
      formData.append("due", bill.current.Total.toFixed(2));
      formData.append("Payment_method", bill.current.PaymentMethod);
      formData.append("issue_date", bill.current.Issue);
      // formData.append("delivery_date", bill.current.Deliver);
      formData.append("purchase_number", bill.current.InvoiceNumber);
      formData.append("remarks", bill.current.remarks);
      formData.append("reference", bill.current.reference);
      formData.append("data", "");
      createPurchase(formData).then(function (result) {
        async function someProcedure() {
          cartItems.current.map((item) => {
            const formData = new FormData();
            formData.append("purchase", result.id);
            formData.append("product", item.id);
            formData.append("price", item.price);
            formData.append("quantity", item.quantity);
            formData.append("data", "");
            createPurchaseItem(formData);
          });
          cartItems.current.map((item) => {
            const formData = new FormData();
            formData.append("purchase", result.id);
            formData.append("product", item.id);
            formData.append("data", "");
            var newstock = item.limit + item.quantity;
            formData.append("purchase_price", item.price);
            formData.append("quantity", newstock);
            updateVariationfromSrock(item.id, formData, newstock);
          });
          return "done";
        }
        someProcedure().then(() => {
          message.success("Order has been taken");
          // history.push("/Purchase");
          // window.location.reload();
        });
      });
    } else {
      alert("Please select a vendor");
    }
  };

  return (
    <>
      <Row style={{ minHeight: "23vh" }}>
        <Col span={15}>
          <ContctSearch bill={bill} />
        </Col>
        <Col span={9}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Row style={{ margin: "auto" }}>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>PO No.</h3>
              </Col>
              <Col span={12} offset={1}>
                <InputNumber
                  value={bill.current.InvoiceNumber}
                  disabled
                  style={{ color: "black" }}
                />
              </Col>
            </Row>
            {/* <Row style={{ margin: "auto" }}>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>
                  <span style={{ color: "red" }}>*</span>Delivery date
                </h3>
              </Col>
              <Col span={12} offset={1}>
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    if (e != null) {
                      bill.current.Deliver = e.format("YYYY-MM-DD");
                    }
                    setCart(true);
                  }}
                />
              </Col>
            </Row> */}
            <Row style={{ margin: "auto" }}>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Reference</h3>
              </Col>
              <Col span={12} offset={1}>
                <Input
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    bill.current.reference = value.target.value;
                    setCart(true);
                  }}
                />
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <h1>Description</h1>
        </Col>

        <Col span={3} offset={1} style={{ textAlign: "center" }}>
          <h1>Quantity</h1>
        </Col>
        <Col span={3} style={{ textAlign: "center" }}>
          <h1>Price</h1>
        </Col>
        <Col span={5} style={{ textAlign: "center" }}>
          <h1> Total (BDT) </h1>
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
              <Col span={11}>
                <p>{item.title}</p>
                <p>
                  color: {item.color} / size: {item.size}
                </p>
              </Col>

              <Col span={3} style={{ textAlign: "center", margin: "auto" }}>
                <InputNumber
                  min={1}
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
              <Col span={3} style={{ textAlign: "center", margin: "auto" }}>
                <InputNumber
                  value={cartItems.current[index].price}
                  onChange={(e) => {
                    cartItems.current[index].price = e;
                    cartItems.current[index].total_price =
                      e * cartItems.current[index].quantity;

                    setCart(true);
                  }}
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

      {/* {services.current.map((item) => {
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
                {item.Price}
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
      })} */}
      <Row>{search()}</Row>
      <CreateNewProduct
        cartItems={cartItems}
        bill={bill}
        setCart={setCart}
        load={load}
      />
      {/* <AddService service={services} setservicetrigger={setservicetrigger} /> */}
      <Row>
        <Col span={14}></Col>
        <Col span={10} style={{ marginTop: "1rem" }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Total</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  value={bill.current.Total}
                  disabled
                  style={{ color: "black" }}
                />
              </Col>
            </Row>

            {/* <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Payment method</h3>
              </Col>
              <Col span={12} offset={1}>
                <Select
                  defaultValue="Cash"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    bill.current.PaymentMethod = e;
                    setCart(true);
                  }}
                >
                  <Option value="Card">Card</Option>
                  <Option value="Bkash">Bkash</Option>
                  <Option value="Nagad">Nagad</Option>
                  <Option value="Cash">Cash</Option>
                  <Option value="Bank">Bank</Option>
                </Select>
              </Col>
            </Row> */}

            <Button
              type="primary"
              onClick={submitOrder}
              style={{ float: "right" }}
            >
              Confirm Purchase
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    List: state.ProductDetails.productdetails,
    Contacts: state.contacts.contactlistsearchresult,
    WarehouseList: state.warehouse.warehouselist,
  };
};

export default connect(mapStateToProps, {
  getProductSearchResult,
  createInvoiceItem,
  createPurchase,
  updateVariationfromSrock,
  createService,
  getAllWarehouse,
  createPurchaseItem,
  getSpecificChartofaccountsbycode,
  createjournals,
})(SearchStock);
