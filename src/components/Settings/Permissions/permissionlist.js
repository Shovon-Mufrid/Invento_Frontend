import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  get_role_permission,
  get_sub_module,
  update_role_permission,
  get_module,
} from "../../../actions/settings";
import Addpermission from "./Addpermission";
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Divider,
  Space,
  Popconfirm,
  Button,
  message,
  Select,
  Table,
  Checkbox,
} from "antd";
const { Option } = Select;

const PermissionList = ({
  get_role_permission,
  RoleList,
  selectedRole,
  reload,
  setreload,
  get_sub_module,
  update_role_permission,
  get_module,
}) => {
  const [data, setdata] = useState([]);
  const [modules, setmodules] = useState([]);
  useEffect(() => {
    console.log(selectedRole.current);
    if (selectedRole.current !== null) {
      get_module().then((res) => {
        setmodules(res);
      });
      get_role_permission(selectedRole.current).then((res) => {
        setdata(res);
      });
    }
  }, [reload]);

  const updatePermission = (id, field, value) => {
    let formData = new FormData();
    formData.append(field, value);
    update_role_permission(id, formData).then((res) => {
      setreload(!reload);
    });
  };

  const renderPermission = (module) => {
    return data.map((item) => {
      if (module.name === item.Module) {
        return (
          <>
            <tr>
              <td>{module.name}</td>
              <td>{item.Sub_Module}</td>
              <td>
                <Checkbox
                  checked={item.is_read}
                  onChange={(e) => {
                    updatePermission(item.id, "is_read", e.target.checked);
                  }}
                ></Checkbox>
              </td>
              <td>
                <Checkbox
                  checked={item.is_create}
                  onChange={(e) => {
                    updatePermission(item.id, "is_create", e.target.checked);
                  }}
                ></Checkbox>
              </td>

              <td>
                <Checkbox
                  checked={item.is_update}
                  onChange={(e) => {
                    updatePermission(item.id, "is_update", e.target.checked);
                  }}
                ></Checkbox>
              </td>
              <td>
                <Checkbox
                  checked={item.is_delete}
                  onChange={(e) => {
                    updatePermission(item.id, "is_delete", e.target.checked);
                  }}
                ></Checkbox>
              </td>
            </tr>
          </>
        );
      }
    });
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Addpermission
            selectedRole={selectedRole}
            reload={reload}
            setreload={setreload}
            data={data}
          />
          <table
            style={{ width: "100%", border: "1px solid lightgray" }}
            className="product_table"
          >
            <thead>
              <tr>
                <th>Module</th>
                <th>Sub-Module</th>
                <th>View</th>
                <th>Create</th>

                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            {modules.map((module) => {
              return renderPermission(module);
            })}
          </table>
        </Col>
      </Row>
    </>
  );
};

export default connect(null, {
  get_role_permission,
  get_sub_module,
  update_role_permission,
  get_module,
})(PermissionList);
