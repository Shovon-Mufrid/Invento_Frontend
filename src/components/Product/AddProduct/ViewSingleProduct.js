import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { updateSingleProduct } from "../../../actions/singleProductAction";
import { getAllCategory } from "../../../actions/categoryAction";
import { getAllContactMerchandiser } from "../../../actions/contactAction";
import { getAllWarehouse } from "../../../actions/warehouseAction";
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
  Divider,
  Drawer,
} from "antd";

const { Option } = Select;

const EditSingpleProduct = ({
  createContact,
  setUpdatelist,
  List,
  getAllCategory,
  getAllContactMerchandiser,
  Merchandiser,
  getAllWarehouse,
  Warehouse,
  updateSingleProduct,
  details,
  location_id,
}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const onFinish = (values) => {
    console.log(details);
    updateSingleProduct(location_id, details[0].id, values);
    setUpdatelist(false);
    message.success(values.name + " Has been added to your contact list");
    setVisible(false);
  };

  useEffect(() => {
    getAllCategory();
    getAllContactMerchandiser();
    getAllWarehouse();
    details[0].Discount = {
      discount: details[0].discount,
    };
    details[0].Discount_type = {
      discount_type: details[0].discount_type,
    };
    // if (details[0].discount_type == 1) {
    //   details[0].Discount_type = {
    //     discount_type: "%",
    //   };
    // } else {
    //   details[0].Discount_type = {
    //     discount_type: "$",
    //   };
    // }
  }, [getAllCategory, getAllContactMerchandiser, getAllWarehouse]);

  return (
    <>
      <>
        <Button type="primary" onClick={showDrawer} style={{ marginRight: 10 }}>
          View
        </Button>
        <Drawer
          title="Edit Product"
          width={1000}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            layout="vertical"
            hideRequiredMark
            onFinish={onFinish}
            initialValues={details[0]}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="title"
                  label="Product Name"
                  rules={[
                    { required: true, message: "Please enter product name" },
                  ]}
                >
                  <Input placeholder="Please enter product name" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="Category" label="Category">
                  <TreeSelect treeData={List} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="Merchandiser" label="Merchandiser">
                  <TreeSelect treeData={Merchandiser} />
                </Form.Item>
              </Col>
            </Row>
            <Divider></Divider>

            <Row gutter={16}>
              <Col span={7}>
                <Form.Item name="Warehouse" label="Warehouse Name">
                  <TreeSelect treeData={Warehouse} />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item name="stock_alart_amount" label="Stock Alert Amount">
                  <InputNumber placeholder="Stock Alert Amount" />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  name="quantity"
                  label="Stock"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a Stock Amount",
                    },
                  ]}
                >
                  <InputNumber placeholder="Stock Amount" />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name="stock_unit" label="Stock Unit">
                  <Input placeholder="Stock Unit" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={7}>
                <Form.Item
                  name="purchase_price"
                  label="Purchase Price"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a purchase price",
                    },
                  ]}
                >
                  <Input
                    addonBefore="$"
                    type="number"
                    placeholder="purchase price"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  name="selling_price"
                  label="Selling Price"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a Selling price",
                    },
                  ]}
                >
                  <Input
                    addonBefore="$"
                    type="number"
                    placeholder="Selling price"
                  />
                </Form.Item>
              </Col>

              <Col span={5}>
                {/* <Form.Item name="discount_type" label="Discount Type">
                <InputNumber placeholder="Discount Type" />
              </Form.Item> */}
                <Form.Item label="Discount">
                  <Input.Group compact>
                    <Form.Item name={"discount_type"} noStyle>
                      <Select>
                        <Option value="%">%</Option>
                        <Option value="$">$</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name={"discount"} noStyle>
                      <Input
                        type="number"
                        style={{ width: "70%" }}
                        placeholder="Discount"
                      />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name="tax" label="Tax">
                  <Input type="number" addonBefore="%" placeholder="Tax" />
                </Form.Item>
              </Col>
            </Row>
            <Divider></Divider>
            <Row gutter={16}>
              <Col span={5}>
                <Form.Item name="height" label="Height">
                  <Input type="number" placeholder="Height" addonAfter={"cm"} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name="width" label="Width">
                  <Input type="number" placeholder="Width" addonAfter={"cm"} />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item name="weight" label="Weight">
                  <Input
                    type="number"
                    placeholder="Weight"
                    addonAfter={"grams"}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="Short_description"
                  label="Drescription"
                  rules={[
                    {
                      required: true,
                      message: "please enter Address",
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter Address" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="is_active" valuePropName="checked" checked>
                  <Checkbox>Active Product !</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.category.categorylist,
    Merchandiser: state.contacts.contactlistsearchresult,
    Warehouse: state.warehouse.warehouselist,
  };
};

export default connect(mapStateToProps, {
  getAllCategory,
  getAllContactMerchandiser,
  getAllWarehouse,
  updateSingleProduct,
})(EditSingpleProduct);
