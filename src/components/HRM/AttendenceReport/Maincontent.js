import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import EmployeeAttendanceList from "./EmployeeAttendanceList";
import { DatePicker, Select, TreeSelect, Col, Row, Space } from "antd";
import moment from "moment";

const Maincontent = ({ RoleList, warehouseList, employeeList }) => {
  const [updatelist, setUpdatelist] = useState(true);
  const dateFormat = "YYYY-MM-DD";
  var date = new Date();
  var todayDate = moment(date).format(dateFormat);
  const { Option } = Select;
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [employee, setEmployee] = useState();

  const onMonthChange = (value, dateString) => {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    const myArr = dateString.split("-");
    let year = myArr[0];
    let mnth = myArr[1];
    setYear(year);
    setMonth(mnth);
  };
  const onEmployeeChange = (value) => {
    setEmployee(value);
  };
  // console.log(year);
  // console.log(month);
  return (
    <>
      <Row wrap={false}>
        <Col flex="auto">
          Date :
          <DatePicker
            picker="month"
            defaultValue={moment()}
            onChange={onMonthChange}
          />
        </Col>
        <Col flex="auto">
          <Space>
            Employee :
            <Select
              showSearch
              placeholder="Please select a Employee"
              style={{ width: "100%" }}
              onChange={(value) => onEmployeeChange(value)}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="all" select>
                All
              </Option>
              {employeeList.map((employee) => {
                return <Option value={employee.id}>{employee.name}</Option>;
              })}
            </Select>
          </Space>
        </Col>
      </Row>

      <div className="site-layout-background main-frame">
        <EmployeeAttendanceList
          month={month}
          year={year}
          employee={employee}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeList: state.employee.employeelist,
    RoleList: state.userRole.userRolelist,
    warehouseList: state.warehouse.locationlist,
  };
};

export default connect(mapStateToProps)(Maincontent);
