import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getWordrobeItem } from "../../actions/wordrobe";
import { deleteWordrobe } from "../../actions/wordrobe";
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

const Delete = ({ details, deleteWordrobe }) => {
  return (
    <>
      <Button danger type="link">
        <Popconfirm
          title="Are you sure you want to delete this order ?"
          onConfirm={(e) => {
            if (details.is_returned) {
              deleteWordrobe(details.id);
              window.location.reload();
            }
            // } else {
            //   alert("not workinf");
            // }
          }}
          okText="Yes"
          cancelText="No"
        >
          <Link to="#">Delete</Link>
        </Popconfirm>
      </Button>
    </>
  );
};

export default connect(null, { deleteWordrobe })(Delete);
