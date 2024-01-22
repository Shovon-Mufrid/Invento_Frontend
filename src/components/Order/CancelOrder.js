import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { deleteInvoice, getInvoiceItem } from "../../actions/invoiceItem";
import { updateVariation } from "../../actions/variableProductAction";
import { Link } from "react-router-dom";

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
  Popconfirm,
} from "antd";

const Delete = ({
  details,
  deleteInvoice,
  getInvoiceItem,
  updateVariation,
}) => {
  const confirm = () => {
    async function someProcedure() {
      getInvoiceItem(details.id).then((items) => {
        for (let i = 0; i < items.length; i++) {
          let formData = new FormData();
          let mainproduct = items[i].Product[0].quantity + items[i].quantity;
          console.log(mainproduct);
          formData.append("quantity", mainproduct);
          formData.append("data", "");
          updateVariation(items[i].Product[0].id, formData);
        }
        deleteInvoice(details.id).then((result) => {
          window.location.reload();
        });
        return "done";
      });
    }
    someProcedure().then(() => {});
  };

  return (
    <>
      <a href="#" danger style={{ margin: 4 }}>
        <Popconfirm
          title="Are you sure you want to delete this order ?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Link to="#">Delete</Link>
        </Popconfirm>
      </a>
    </>
  );
};

export default connect(null, {
  deleteInvoice,
  getInvoiceItem,
  updateVariation,
})(Delete);
