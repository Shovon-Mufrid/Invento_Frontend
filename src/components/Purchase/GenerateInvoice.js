import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getProductSearchResult } from "../../actions/productDetails";

import { DeleteOutlined } from "@ant-design/icons";

import { createPurchase, createPurchaseItem } from "../../actions/purchase";
import { updateVariationfromSrock } from "../../actions/variableProductAction";
import { getAllWarehouse } from "../../actions/warehouseAction";
import { getAllAccount } from "../../actions/accountsAction";
import { getAllLocation } from "../../actions/warehouseAction";

// import AddService from "./AddService";
// import AddShipping from "./AddShipping";
import CreateNewProduct from "./CreateNewProduct";
import ContctSearch from "./ContctSearch";

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
  setfullpageloading,
  getProductSearchResult,
  List,
  WarehouseList,
  Contacts,
  search,
  cartItems,
  setCart,
  cart,
  getAllAccount,
  createPurchase,
  updateVariationfromSrock,
  Auth,
  getAllWarehouse,
  createPurchaseItem,
  getAllLocation,
  location,
}) => {
  const initial = { Note: "" };
  const services = useRef([]);
  const load = useRef(false);
  var formatter = new Intl.NumberFormat("en-IN");
  const [accounts, setaccounts] = useState([]);
  const [servicetrigger, setservicetrigger] = useState(false);
  const [locationList, setlocationList] = useState([]);
  var currentdate = new Date();
  const { TreeNode } = TreeSelect;
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
    ContactBalance: 0,
    Discount: 0,
    subTotal: 0,
    Total: 0,
    Total_product: 0,
    Due: 0,
    Paid: 0,
    PaymentMethod: "Cash",
    AccountNumber: "",
    Issue: "",
    Deliver: "",
    InvoiceNumber: invoiceNumber,
    location: Auth.profile.Office,
    Account_no: "",
    remarks: "",
    reference: "",
    Location: null,
    Adjustment: 0,
  });
  console.log(Auth);
  useEffect(() => {
    getAllAccount().then((result) => {
      setaccounts(result);
    });
    getAllLocation().then((result) => {
      setlocationList(result);
    });
  }, []);

  useEffect(() => {
    let Total = 0;
    let totoal_product = 0;
    cartItems.current.map((item) => {
      Total += parseFloat(item.total_price);
      totoal_product += parseFloat(item.quantity);
    });
    bill.current.Total = parseFloat(Total);
    bill.current.Total_product = parseFloat(totoal_product);
    if (bill.current.Discount > 0) {
      bill.current.Total =
        parseFloat(bill.current.Total) - parseFloat(bill.current.Discount);
    } else {
      bill.current.Total = parseFloat(bill.current.Total) - parseFloat(0);
    }

    bill.current.Due =
      parseFloat(bill.current.Total) -
      parseFloat(bill.current.Paid) -
      parseFloat(bill.current.Adjustment);
  }, [cart, load.current]);

  const submitOrder = () => {
    if (bill.current.Due == 0 || bill.current.Due > 0) {
      const formData = new FormData();
      let promises = [];
      if (bill.current.PaymentMethod != "Cash") {
        formData.append("account", bill.current.AccountNumber);
      } else {
        for (let i = 0; i < accounts.length; i++) {
          if (accounts[i].type == bill.current.PaymentMethod) {
            formData.append("account", accounts[i].id);
            bill.current.AccountNumber = accounts[i].id;
          }
        }
      }
      if (
        bill.current.Contact == null ||
        bill.current.AccountNumber == "" ||
        bill.current.Deliver == "" ||
        location.current == null
      ) {
        alert("Please Insert a Delevery Date and contact");
      } else {
        setfullpageloading(true);
        formData.append("contact", bill.current.Contact);
        formData.append("bill", parseFloat(bill.current.Total).toFixed(2));
        formData.append(
          "discount",
          parseFloat(bill.current.Discount).toFixed(2)
        );
        formData.append(
          "payment",
          parseFloat(bill.current.Paid + bill.current.Adjustment).toFixed(2)
        );
        formData.append(
          "adjustment",
          parseFloat(bill.current.Adjustment).toFixed(2)
        );
        formData.append("due", parseFloat(bill.current.Due).toFixed(2));
        formData.append("Payment_method", bill.current.PaymentMethod);
        formData.append("issue_date", bill.current.Issue);
        formData.append("delivery_date", bill.current.Deliver);
        formData.append("purchase_number", bill.current.InvoiceNumber);
        formData.append("remarks", bill.current.remarks);
        formData.append("reference", bill.current.reference);
        formData.append("location", location.current);
        formData.append("employe", Auth.profile.id);
        formData.append("data", "");
        promises.push(
          createPurchase(formData).then((result) => {
            console.log(result);
            for (let i = 0; i < cartItems.current.length; i++) {
              const formData = new FormData();
              formData.append("purchase", result.id);
              formData.append("product", cartItems.current[i].id);
              formData.append("price", cartItems.current[i].price);
              formData.append("quantity", cartItems.current[i].quantity);
              formData.append("data", "");
              promises.push(createPurchaseItem(formData));
            }
          })
        );

        Promise.all(promises).then((r) => {
          message.success("Order has been taken");
          window.location.href = "/Purchase";
          // history.push("/Purchase");
        });
      }
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
        <Col span={15}>
          <ContctSearch
            bill={bill}
            setservicetrigger={setservicetrigger}
            setCart={setCart}
          />
        </Col>
        <Col span={9}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Row style={{ margin: "auto" }}>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Order No.</h3>
              </Col>
              <Col span={12} offset={1}>
                <InputNumber
                  value={bill.current.InvoiceNumber}
                  disabled
                  style={{ color: "black" }}
                />
              </Col>
            </Row>
            <Row style={{ margin: "auto" }}>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>
                  <span style={{ color: "red" }}>*</span>Delivery date
                </h3>
              </Col>
              <Col span={12} offset={1}>
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
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>
                  <span style={{ color: "red" }}>*</span>Warehouse
                </h3>
              </Col>
              <Col span={12} offset={1}>
                {/* <Select
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    location.current = value;
                  }}
                >
                  
                  {locationList.map((item) => {
                    if (!item.is_office && !item.is_outlet) {
                      return <Option value={item.id}>{item.name}</Option>;
                    }
                  })}
                </Select> */}
                <TreeSelect
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    location.current = value;
                  }}
                  // value={locationList}
                  treeData={locationList}
                >
                 
                  {/* {locationList.map((item) => {
                    if (!item.is_office && !item.is_outlet) {
                      // {console.log(item)}
                      return <TreeNode value={item.id}>
                        {item.name}
                        </TreeNode>;
                    }
                  })} */}
                </TreeSelect>
              </Col>
            </Row>
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
        // console.log(item);
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
              <Col span={9}>
                {item.title}
                <br></br>
                {item.Attribute_details}
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
                {formatter.format(item.total_price)}
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
      <Row>
        <Col span={11}>
          <h1></h1>
        </Col>

        <Col span={3} offset={1} style={{ textAlign: "center" }}>
          <h1>Total : {formatter.format(bill.current.Total_product)}</h1>
        </Col>
        <Col span={3} style={{ textAlign: "center" }}>
          <h1></h1>
        </Col>
        <Col span={5} style={{ textAlign: "center" }}>
          <h1>{formatter.format(bill.current.Total)}</h1>
        </Col>
      </Row>
      <Row>{search()}</Row>
      <CreateNewProduct
        cartItems={cartItems}
        bill={bill}
        setCart={setCart}
        load={load}
        location={location}
      />
      <Row>
        <Col span={14}>
          <br></br>
          <br></br>

          <h3>Note: </h3>
          <ReactQuill
            theme="snow"
            style={{ height: "20vh" }}
            onChange={(e) => (bill.current.remarks = e)}
          />
        </Col>
        <Col span={10} style={{ marginTop: "1rem" }}>
          <Space direction="vertical" style={{ width: "100%" }}>
        
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3> Discount</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  max={bill.current.Total}
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
              </Col>
            </Row>
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3> Total</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  value={bill.current.Total}
                  disabled
                  style={{ color: "black" }}
                />
              </Col>
            </Row>
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
        
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Payment</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  defaultValue={0}
                  min={0}
                  max={bill.current.Total}
                  onChange={(e) => {
                    console.log(e);
                    if (e != null) {
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
            <Row>
              <Col span={11} style={{ textAlign: "right" }}>
                <h3>Due</h3>
              </Col>
              <Col span={12} offset={1} style={{ textAlign: "center" }}>
                <InputNumber
                  defaultValue={0}
                  min={0}
                  value={bill.current.Due}
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
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getProductSearchResult,
  getAllLocation,
  createPurchase,
  updateVariationfromSrock,
  getAllAccount,
  getAllWarehouse,
  createPurchaseItem,
})(SearchStock);
