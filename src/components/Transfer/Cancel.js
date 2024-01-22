import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { deleteTransfer, getTransferItem } from "../../actions/transfer";
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
  deleteTransfer,
  Auth,
  getTransferItem,
  updateVariation,
}) => {
  const confirm = () => {
    let promises = [];
    getTransferItem(details.id).then((res) => {
      for (let i = 0; i < res.length; i++) {
        let productQunatity =
          res &&
          res[i] &&
          res[i].Product &&
          res[i].Product[0] &&
          res[i].Product[0].quantity;
        let formData = new FormData();
        formData.append("quantity", res[i].quantity + productQunatity);
        promises.push(updateVariation(res[i].Product[0].id, formData));
      }
    });
    Promise.all(promises).then((e) => {
      deleteTransfer(details.id).then((e) => {
        window.location.reload();
      });
    });
  };
  return (
    <>
      {Auth.superuser ||
      Auth.profile.Office == details.destance ||
      Auth.profile.Office == details.source ? (
        <Button danger type="link">
          <Popconfirm
            title="Are you sure you want to delete this Challan ?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Link to="#">Cancel</Link>
          </Popconfirm>
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  deleteTransfer,
  getTransferItem,
  updateVariation,
})(Delete);
