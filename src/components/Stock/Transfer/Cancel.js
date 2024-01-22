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
  return (
    <>
      {Auth.superuser ||
      Auth.profile.Office == details.destance ||
      Auth.profile.Office == details.source ? (
        <Button danger type="link">
          <Popconfirm
            title="Are you sure you want to delete this Challan ?"
            onConfirm={(e) => {
              let promises = [];
              let formData = new FormData();
              promises.push(
                getTransferItem(details.id).then((response) => {
                  for (let i = 0; i < response.length; i++) {
                    let productQunatity = response[i]?.Product[0].quantity;
                    formData = new FormData();
                    formData.append(
                      "quantity",
                      response[i].quantity + productQunatity
                    );
                    // formData.append(
                    //   "Warehouse",
                    //   response[i].Product[0].Warehouse
                    // );
                    promises.push(
                      updateVariation(response[i].Product[0].id, formData)
                    );
                  }
                })
              );
              Promise.all(promises).then((e) => {
                deleteTransfer(details.id);
              });
            }}
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
