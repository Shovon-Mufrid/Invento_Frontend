import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllUserRole } from "../../../actions/userRoleAction";
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
} from "antd";
const { Option } = Select;

const UserRoleList = ({
  getAllUserRole,
  RoleList,
  selectedRole,
  reload,
  setreload,
}) => {
  useEffect(() => {
    getAllUserRole();
  }, []);

  return (
    <>
      <Row>
        <Col span={24}>
          <Space>
            Select a role:
            <Select
              placeholder="Please select a role"
              showSearch
              style={{ width: 400 }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => {
                selectedRole.current = e;
                setreload(!reload);
              }}
            >
              {RoleList.map((role) => {
                return <Option value={role.id}>{role.title}</Option>;
              })}
            </Select>
          </Space>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    RoleList: state.userRole.userRolelist,
  };
};

export default connect(mapStateToProps, {
  getAllUserRole,
})(UserRoleList);
