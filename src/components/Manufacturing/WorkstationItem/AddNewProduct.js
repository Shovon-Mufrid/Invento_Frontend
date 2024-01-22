import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AddProduct from "../../Product/AddProduct";

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
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const Create = ({
  createworkstationsitem,
  getAllworkstations,
  getAllproductionlines,
  setUpdatelist,
  ContactList,
  updatelist,
}) => {
  const initial = { description: "" };
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ marginBottom: "10px", float: "right" }}
        >
          <PlusOutlined /> Add new product
        </Button>
        <Drawer
          title="Add new product"
          width="80%"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <AddProduct />
        </Drawer>
      </>
    </>
  );
};

export default connect(null)(Create);
