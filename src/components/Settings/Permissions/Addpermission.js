import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  get_sub_module,
  create_role_permission,
} from "../../../actions/settings";
import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Drawer,
  TreeSelect,
  Button,
  Col,
  Row,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const Addpermission = ({
  create_role_permission,
  get_sub_module,
  selectedRole,
  reload,
  setreload,
  data,
}) => {
  const initial = { remarks: "" };
  const [visible, setVisible] = useState(false);
  const [sub_module, setsub_module] = useState([]);
  const [form] = Form.useForm();

  const showDrawer = () => {
    get_sub_module().then((res) => {
      setsub_module(res);
      setVisible(true);
    });
  };

  const onClose = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    values["user_role"] = selectedRole.current;
    create_role_permission(values);
    form.resetFields();
    setreload(!reload);
    setVisible(false);
  };

  const generatePermission = () => {
    get_sub_module().then((res) => {
      let array = [];
      let result = [];
      let promises = [];
      for (let i = 0; i < data.length; i++) {
        array.push(data[i].sub_module);
      }
      // console.table(array);
      result = res.filter((el) => !array.includes(el.id));
      // console.table(result);
      for (let j = 0; j < result.length; j++) {
        let formData = new FormData();
        formData.append("Designation", selectedRole.current);
        formData.append("sub_module", result[j].id);
        promises.push(create_role_permission(formData));
      }

      Promise.all(promises).then((res) => {
        setreload(!reload);
      });
    });
  };

  return (
    <>
      <>
        {selectedRole.current !== null ? (
          <Button
            type="primary"
            onClick={generatePermission}
            style={{ marginBottom: "10px", float: "right" }}
          >
            <PlusOutlined /> Generate Permission
          </Button>
        ) : (
          ""
        )}
      </>
    </>
  );
};

export default connect(null, { get_sub_module, create_role_permission })(
  Addpermission
);
