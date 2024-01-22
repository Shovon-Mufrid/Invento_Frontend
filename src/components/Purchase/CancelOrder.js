import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { deletePurchase, getPurchase } from "../../actions/purchase";

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

const Delete = ({ details, deletePurchase, getPurchase, updateVariation }) => {
  const confirm = () => {
    async function someProcedure() {
      deletePurchase(details.id);
      return "done";
    }
    someProcedure().then(() => {
      // deletePurchase(details.id);
      window.location.reload();
    });
  };

  return (
    <>
      <Button danger type="link" style={{ padding: "0px" }}>
        <Popconfirm
          title="Are you sure you want to delete this order ?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <Link to="#">Cancel</Link>
        </Popconfirm>
      </Button>
    </>
  );
};

export default connect(null, {
  deletePurchase,
  getPurchase,
  updateVariation,
})(Delete);
