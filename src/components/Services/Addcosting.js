import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Drawer,
  Button,
  Col,
  Row,
  Select,
  message,
  AutoComplete,
} from "antd";
import { getProductSearchResult } from "./../../actions/productDetails";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { createcosting } from "../../actions/invoiceItem";
import { updateVariation } from "../../actions/variableProductAction";

const { Option } = Select;
const { Search } = Input;

const CreateNewContact = ({
  id,
  createcosting,
  setloadcosting,
  getProductSearchResult,
  updateVariation,
}) => {
  const initial = { details: "" };
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();
  const barcode = useRef();
  const location = useRef("");
  const BarcodeInput = useRef(null);
  const SelectedProduct = useRef({
    id: -1,
    price: 0,
    total_price: 0,
    quantity: 0,
    limit: 99999,
  });
  const [cart, setCart] = useState(false);
  const [searchresult, setsearchresult] = useState([]);

  useEffect(() => {
    setCart(false);
  }, [cart]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    form.resetFields();
    SelectedProduct.current = {
      id: -1,
      price: 0,
      total_price: 0,
      quantity: 0,
      limit: 99999,
    };
    setVisible(false);
  };

  const onFinish = (values) => {
    values.services = id;
    values.data = "";
    if (SelectedProduct.current.id > 0) {
      values.product = SelectedProduct.current.id;
      values.cost = SelectedProduct.current.total_price.toFixed(2);
      let formData = new FormData();
      formData.append(
        "quantity",
        SelectedProduct.current.limit - SelectedProduct.current.quantity
      );
      formData.append("data", "");
      updateVariation(SelectedProduct.current.id, formData);
      form.resetFields();
      SelectedProduct.current = {
        id: -1,
        price: 0,
        total_price: 0,
        quantity: 0,
        limit: 99999,
      };
    }
    createcosting(values);
    setloadcosting(true);
    setVisible(false);
  };

  const onChange = (data) => {
    barcode.current = data;
    if (barcode.current == "") {
      console.log(barcode.current);
      setsearchresult([]);
    }
  };

  const onKeyUp = (event) => {
    if (event == "") {
      setsearchresult([]);
    } else {
      getProductSearchResult(event, location.current).then((result) => {
        setsearchresult(result.results);
        result.results.map((item) => {
          if (
            barcode.current == item.barcode &&
            item.parent_category == "MATERIAL"
          ) {
            SelectedProduct.current = {
              id: item.id,
              title: item.title,
              category: item.category,
              price: item.selling_price,
              quantity: SelectedProduct.current.quantity + 1,
              total_price:
                SelectedProduct.current.quantity + 1 * item.selling_price,
              limit: item.quantity,
            };
          }
        });
      });
    }
  };
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
          <img src={`http://127.0.0.1:8000${image}`} width="40px" />
        </>
      );
    }
  };

  const search = () => {
    return (
      <>
        <Col span={24}>
          {SelectedProduct.current.id < 0 ? (
            <>
              <h3>Enter material barcode or name</h3>
              <Form.Item name="remarks" label="">
                <Search
                  ref={BarcodeInput}
                  placeholder="input search text"
                  // onChange={onChange}
                  // onKeyUp={onKeyUp}
                  onSearch={onKeyUp}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </>
          ) : (
            <>
              <Row>
                <Col>Material name:</Col>
                <Col offset={1}>
                  {" "}
                  <h4>{SelectedProduct.current.title}</h4>
                </Col>
              </Row>
              <Row>
                <Col>Material category:</Col>
                <Col offset={1}>
                  {" "}
                  <h4>{SelectedProduct.current.category}</h4>
                </Col>
              </Row>

              <Button
                style={{ paddingLeft: "0px" }}
                type="link"
                danger
                onClick={(e) => {
                  SelectedProduct.current = {
                    id: -1,
                    price: 0,
                    total_price: 0,
                    quantity: 0,
                    limit: 99999,
                  };
                  form.resetFields();
                  setCart(true);
                }}
              >
                Remove material
              </Button>
            </>
          )}

          <div
            style={{
              position: "absolute",
              width: "100%",
              zIndex: "5",
            }}
          >
            {searchresult.map((item, index) => {
              if (index < 10 && item.parent_category == "MATERIAL") {
                return (
                  <>
                    <Row
                      style={{
                        border: "1px solid lightgray",
                        padding: "5px",
                        borderRadius: "5px",
                        height: "50px",
                        backgroundColor: "whitesmoke",
                      }}
                      onClick={(e) => {
                        console.log(item);
                        SelectedProduct.current = {
                          id: item.id,
                          title: item.title,
                          category: item.category,
                          price: item.selling_price,
                          quantity: SelectedProduct.current.quantity + 1,
                          total_price:
                            SelectedProduct.current.quantity +
                            1 * item.selling_price,
                          limit: item.quantity,
                        };
                        setCart(true);
                        setsearchresult([]);
                      }}
                    >
                      {/* <Col span={6}>{renderImage(item.image.photo)}</Col> */}
                      <Col span={12}>{item.Deatils[0].title}</Col>
                      <Col span={6}>
                        {" "}
                        {item.color} / {item.size}
                      </Col>
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

  return (
    <>
      <>
        <Button
          type="link"
          onClick={showDrawer}
          style={{ paddingLeft: "10px", fontWeight: "600", fontSize: "16px" }}
        >
          Add new costing
          <PlusOutlined />
        </Button>

        <Drawer
          title="Add new costing"
          width={500}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          {search()}
          {SelectedProduct.current.id > 0 ? (
            <>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={initial}
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name="quantity" label="Quantity">
                      <InputNumber
                        min={1}
                        value={SelectedProduct.current.quantity}
                        onChange={(e) => {
                          SelectedProduct.current.quantity = e;
                          SelectedProduct.current.total_price =
                            e * SelectedProduct.current.price;

                          setCart(true);
                        }}
                        defaultValue={1}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    Cost
                    <br></br>
                    <InputNumber
                      value={SelectedProduct.current.total_price}
                      disabled
                    />
                    <br></br>
                    <br></br>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="details"
                      label="Description"
                      style={{ minHeight: "40vh" }}
                    >
                      <ReactQuill theme="snow" style={{ height: "30vh" }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button onClick={onClose} style={{ marginRight: 8 }}>
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </>
          ) : (
            <></>
          )}
        </Drawer>
      </>
    </>
  );
};

export default connect(null, {
  createcosting,
  getProductSearchResult,
  updateVariation,
})(CreateNewContact);
