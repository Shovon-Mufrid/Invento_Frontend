import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import { updateEmployeeLeave } from "../../../actions/employeeLeaveActions";
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
  leaveType,
  setUpdatelist,
  updateEmployeeLeave,
}) => {
  const [visible, setVisible] = useState(false);
  // details['leaveStart'] = details['leaveStart'].format('YYYY-MM-DD');
  // details['leaveEnd'] = details['leaveEnd'].format('YYYY-MM-DD');
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const data = { ...details };
  data.leaveStart = moment(data.leaveStart, dateFormat);
  data.leaveEnd = moment(data.leaveEnd, dateFormat);
  const [leaveStart, setLeaveStart] = useState(data.leaveStart);
  const [leaveEnd, setLeaveEnd] = useState(data.leaveEnd);
  const [totalLeave, setTotalLeave] = useState(data.leaveDays);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    const value = {
      ...values,
      leaveStart: values["leaveStart"].format("YYYY-MM-DD"),
      leaveEnd: values["leaveEnd"].format("YYYY-MM-DD"),
    };
    value["employee_id"] = value.employee.id;
    value["leaveType_id"] = value.leaveType.id;
    updateEmployeeLeave(data.id, value);
    setUpdatelist(false);
    setVisible(false);
  };
  useEffect(() => {
    // console.log(leaveStart);
    // console.log(leaveEnd);
    const startDate = moment(leaveStart);
    const timeEnd = moment(leaveEnd);
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);
    const days = diffDuration.days() + 1;

    setTotalLeave(days);
    // console.log(totalLeave);
    // console.log(days);
    form.setFieldsValue({ leaveDays: days });
  }, [leaveStart, leaveEnd]);

  const onStartChage = (value) => {
    setLeaveStart(value);
  };
  const onEndChage = (value) => {
    setLeaveEnd(value);
  };
  // console.log(data);

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>

      <Drawer
        title="Edit Employee Leave"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={data}
        >
          <Row gutter={16}>
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
                <TreeSelect treeData={employeeList} disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="leaveType"
                label="Leave Type"
                rules={[
                  {
                    required: true,
                    message: "Please select Leave Category",
                  },
                ]}
              >
                <TreeSelect treeData={leaveType} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="leaveStart"
                label="Leave Start From"
                rules={[
                  {
                    required: true,
                    message: "Please enter Leave Starting Date",
                  },
                ]}
              >
                <DatePicker
                  format={dateFormat}
                  onChange={onStartChage}
                  disabled={data.leaveStatus != "pending" ? true : false}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="leaveEnd"
                label="Leave End On"
                rules={[
                  { required: true, message: "Please enter Leave Ending Date" },
                ]}
              >
                <DatePicker
                  format={dateFormat}
                  onChange={onEndChage}
                  disabled={data.leaveStatus != "pending" ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="leaveDays" label="Total Days">
                <Input
                  disabled={true}
                  defaultValue={totalLeave}
                  placeholder="Please enter Total Leave Days"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="note" label="Note">
                <Input.TextArea rows={4} placeholder="please enter Details" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="leaveStatus"
                label="Status"
                rules={[{ required: true, message: "Please Update Statuss" }]}
              >
                <Select placeholder="Please choose Status">
                  <Option value="pending">Pending</Option>
                  <Option value="approved">Approved</Option>
                  <Option value="denied">Denied</Option>
                </Select>
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
    leaveType: state.leaveType.leaveTypelist,
  };
};
export default connect(mapStateToProps, { updateEmployeeLeave })(Edit);
