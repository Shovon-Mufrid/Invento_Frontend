import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import EmployeeSalaryList from "./EmployeeSalaryList";
import { getAllEmployee } from "../../../actions/employeeAction";

import { DatePicker, Select, TreeSelect, Col, Space, Row, Button } from "antd";
import moment from "moment";
import Excelldownload from "./Excelldownload";
import ReactToPrint from "react-to-print";
import PdfDownload from "./PdfDownload";
const Maincontent = ({ getAllEmployee, employeeList }) => {
  const [updatelist, setUpdatelist] = useState(true);
  const dateFormat = "YYYY-MM-DD";
  var date = new Date();
  var todayDate = moment(date).format(dateFormat);
  const { Option } = Select;
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  let today = year + "-" + month;
  const [employee, setEmployee] = useState();
  const [fromMonth, setFromMonth] = useState(today);
  const [toMonth, setToMonth] = useState(today);
  const [data, setData] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    getAllEmployee();
  }, []);
  const onFromMonthChange = (value, dateString) => {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    const myArr = dateString.split("-");
    let year = myArr[0];
    let mnth = myArr[1];
    // setYear(year);
    // setMonth(mnth);
    setFromMonth(year + "-" + mnth);
  };
  const onToMonthChange = (value, dateString) => {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    const myArr = dateString.split("-");
    let year = myArr[0];
    let mnth = myArr[1];
    // setYear(year);
    // setMonth(mnth);
    setToMonth(year + "-" + mnth);
  };
  const onEmployeeChange = (value) => {
    setEmployee(value);
  };
  // console.log(year);
  // console.log(month);
  const styles = `@media print {
    @page { size: landscape; }
  }`;
  return (
    <>
      <Row style={{marginBottom: "15px"}}>
        <Col style={{marginRight: "10px"}}>
          From : {" "}
          <DatePicker
            picker="month"
            defaultValue={moment()}
            onChange={onFromMonthChange}
          />
        </Col>
        <Col style={{marginRight: "10px"}}>
          To : {" "}
          <DatePicker
            picker="month"
            defaultValue={moment()}
            onChange={onToMonthChange}
          />
        </Col>
        <Col style={{marginRight: "10px"}}>
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
              <Option value="" select>
                All
              </Option>
              {employeeList.map((employee) => {
                return <Option value={employee.id}>{employee.name}</Option>;
              })}
            </Select>
          </Space>
        </Col>
        <Col style={{marginRight: "10px"}}>
          <Excelldownload
            data={data}
            data1={data}
            from={fromMonth}
            to={toMonth}
          />
        </Col>
        <Col>
          <ReactToPrint
            trigger={() => <Button type="primary">Print this out!</Button>}
            content={() => componentRef.current}
          />
          <PdfDownload
            data={data}
            data1={data}
            componentRef={componentRef}
            from={fromMonth}
            to={toMonth}
          />
        </Col>
      </Row>

      <div className="site-layout-background main-frame">
        <EmployeeSalaryList
          from={fromMonth}
          to={toMonth}
          employee={employee}
          updatelist={updatelist}
          data={data}
          setData={setData}
          setUpdatelist={setUpdatelist}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeList: state.employee.employeelist,
  };
};

export default connect(mapStateToProps, { getAllEmployee })(Maincontent);
