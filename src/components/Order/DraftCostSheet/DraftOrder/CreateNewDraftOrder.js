import React, { useState } from "react";
import { connect } from "react-redux";

import { createDraftOrder } from "../../../../actions/draftcostsheetAction";
import { Form, Input, Drawer, Button, Col, Row, message, Divider, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CreateNewDraftOrder = ({
    cost_sheet_id,
    createDraftOrder,
    setUpdatelist,
    details,
  }) => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = () => {
        setVisible(true);
      };
    
    const onClose = () => {
    setVisible(false);
    form.resetFields();
    };
    
    const onFinish = (values) => {
        try {
          createDraftOrder(values, cost_sheet_id);
          setVisible(false);
          setUpdatelist(false);
          message.success(values.name + " Has been added to your contact list");
          form.resetFields();
        } catch {
          message.warning("There are something wrong with the API");
        }
      };
    const options = [
      { value: 'Fabrics', label: 'Fabrics' },
      { value: 'Trims/Accessories', label: 'Trims/Accessories' },
      { value: 'Labor Cost', label: 'Labor Cost' }
    ];  

    const unit_name = [
      { value: 'Yards', label: 'Yards' },
      { value: 'Pcs', label: 'Pcs' },
      { value: 'Hours', label: 'Hours' }
    ];  
    
      return (
        <>
          <>
            <Button
              type="primary"
              onClick={showDrawer}
              style={{ marginBottom: "10px" }}
            >
              <PlusOutlined /> Add Draft Order
            </Button>
            <Drawer
              title="Create a Draft Order"
              width={1080}
              onClose={onClose}
              visible={visible}
              bodyStyle={{ paddingBottom: 80 }}
            >
              <Form
                form={form}
                layout="vertical"
                hideRequiredMark
                onFinish={onFinish}
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="cost_sheet_items"
                      label="Cost Sheet Name"
                      rules={[
                        { required: true, message: "Please enter cost sheet" },
                      ]}
                    >
                      {/* <Input placeholder="Please enter cost sheet" /> */}
                      <Select 
                        options={options}
                        placeholder="Select an option"
                      />
                    </Form.Item>
                    <Form.Item
                      name="draft_name"
                      label="Name"
                      rules={[
                        { required: true, message: "Add Name" },
                      ]}
                    >
                      <Input type="text" min={0} placeholder="Name" />                     
                    </Form.Item>
                    <Form.Item
                      name="unit_quantity"
                      label="Unit Quantity"
                      rules={[
                        { required: true, message: "Quantity" },
                      ]}
                    >
                      <Input type="number" min={0} placeholder="Quantity" />                     
                    </Form.Item>
                    <Form.Item
                      name="unit_name"
                      label="Unit Name"
                      rules={[
                        { required: true, message: "Please enter Unit Name" },
                      ]}
                    >
                      <Select 
                        options={unit_name}
                        placeholder="Unit Name"
                      />
                    </Form.Item>
                    <Form.Item
                      name="unit_price"
                      label="Unit Price"
                      rules={[
                        { required: true, message: "Please input Unit Price" },
                      ]}
                    >
                      <Input type="number" min={0} placeholder="Unit Price" />                     
                    </Form.Item>
                    <Form.Item
                      name="amount"
                      label="Amount"
                      rules={[
                        { required: true, message: "Please Input Amount" },
                      ]}
                    >
                      <Input type="number" min={0} placeholder="Amount" />                     
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button onClick={onClose} style={{ marginRight: 8 }}>
                    Cancel
                  </Button>
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
export default connect(null, { createDraftOrder }) (CreateNewDraftOrder);    