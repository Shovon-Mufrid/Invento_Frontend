import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";

import { updateSingleProduct } from "../../../actions/singleProductAction";
import { getAllCategory } from "../../../actions/categoryAction";
import { getAllContactMerchandiser } from "../../../actions/contactAction";
import { getAllLocation } from "../../../actions/warehouseAction";
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
  getAllLocation,
  Warehouse,
  updateSingleProduct,
  details,
  location_id,
}) => {
  const [visible, setVisible] = useState(false);
  const wrapper_ref = React.useRef();
  const showDrawer = () => {
    setVisible(true);
  };

  const printt = () => {
    const opt = {
      scale: 4,
    };
    const elem = wrapper_ref.current;
    html2canvas(elem, opt).then((canvas) => {
      const iframe = document.createElement("iframe");
      iframe.name = "printf";
      iframe.id = "printf";
      iframe.height = 0;
      iframe.width = 0;
      document.body.appendChild(iframe);

      const imgUrl = canvas.toDataURL({
        format: "jpeg",
        quality: "1.0",
      });

      // const style = `

      //     position:absolute;
      //     left:0:
      //     top:0;
      // `;

      let url = `<tr>`;
      for (var i = 0; i < 4; i++) {
        url += `<td style="padding: 10px;text-align:center;">
        <h5 style="margin-bottom: 1px;">${details[0].title}</h5>
        <img style="margin-bottom: 1px;" width="400%" src="${imgUrl}"/>
        <h4 style="margin-top: 1px;margin-bottom: 1px;">ANJARA FASHION</h4>
        <h3 style="margin-top: 1px;margin-bottom: 1px;">BDT ${details[0].selling_price}</h3>
        <h5 style="margin-top: 1px;margin-bottom: 1px;">(VAT inclusive)</h3>
        </td>`;
      }
      url += `</tr>`;
      let page = "";
      for (var i = 0; i < 5; i++) {
        page += url;
      }
      var newWin = window.frames["printf"];
      newWin.document.write(
        `<body onload="window.print()"><table>${page}<table></body>`
      );
      newWin.document.close();
    });
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
    getAllLocation();
    details[0].Discount = {
      discount: details[0].discount,
    };
    details[0].Discount_type = {
      discount_type: details[0].discount_type,
    };
  }, [getAllCategory, getAllContactMerchandiser, getAllLocation]);

  return (
    <>
      <>
        <Button type="primary" onClick={showDrawer}>
          Details
        </Button>
        <Drawer
          title="Product Details"
          width={1000}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form
            layout="vertical"
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
                <Form.Item name="stock_unit" label="Measurement Unit">
                  <Input placeholder="Measurement Unit" />
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
                <Form.Item name="tax" label="VAT">
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
                <Form.Item name="Short_description" label="Drescription">
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
              <Button onClick={printt} style={{ marginRight: 4 }}>
                Print Barcode
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <div ref={wrapper_ref}>
              <Barcode value={details[0].barcode_code} format="EAN13" />
            </div>
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
    Warehouse: state.warehouse.locationlist,
  };
};

export default connect(mapStateToProps, {
  getAllCategory,
  getAllContactMerchandiser,
  getAllLocation,
  updateSingleProduct,
})(EditSingpleProduct);
