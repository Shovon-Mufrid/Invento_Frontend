import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import { updateEmployeeSalary } from "../../../actions/employeeSalaryActions";
import {
  Form,
  Input,
  Drawer,
  DatePicker,
  TreeSelect,
  Button,
  Col,
  Row,
  Select,
} from "antd";

const { Option } = Select;

const Edit = ({
  details,
  employeeList,
  setUpdatelist,
  updateEmployeeSalary,
}) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    updateEmployeeSalary(details.id, values);
    setUpdatelist(false);
    setVisible(false);
  };
  console.log(details);

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>

      <Drawer
        title="Edit Employee Salary"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" onFinish={onFinish} initialValues={details}>
          {/* <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="employee"
                label="Employee"
                rules={[
                  {
                    required: true,
                    message: "Please select A Employee",
                  },
                ]}
              >
                <TreeSelect
                  showSearch
                  optionFilterProp="name"
                  filterOption={(input, option) =>
                    option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  treeData={employeeList}
                />
              </Form.Item>
            </Col>
          </Row> */}

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="monthlySalary"
                label="Basic Salary"
                rules={[
                  { required: true, message: "Please enter Basic Salary" },
                ]}
              >
                <Input placeholder="Please enter Basic Salary" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dailyAllowance"
                label="Daily Allowance"
                rules={[
                  { required: true, message: "Please enter Daily Allowance" },
                ]}
              >
                <Input placeholder="Please enter Daily Allowance" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="incentive"
                label="Incentive"
                rules={[{ required: true, message: "Please enter Incentive" }]}
              >
                <Input placeholder="Please enter Incentive" />
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
  );
};

const mapStateToProps = (state) => {
  return {
    employeeList: state.employee.employeelist,
  };
};
export default connect(mapStateToProps, { updateEmployeeSalary })(Edit);
