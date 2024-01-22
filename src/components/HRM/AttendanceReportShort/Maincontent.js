import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import EmployeeAttendanceReport from "./EmployeeAttendanceReport";
import Excelldownload from "./Excelldownload";
import { DatePicker, Select, TreeSelect, Col, Space, Row, Button } from "antd";
import moment from "moment";
import ReactToPrint from "react-to-print";
import PdfDownload from "./PdfDownload";
import { getAllLocation } from "../../../actions/warehouseAction";

const Maincontent = ({
  RoleList,
  businessprofile,
  employeeList,
  getAllLocation,
  locationList,
  auth,
}) => {
  const [updatelist, setUpdatelist] = useState(true);
  const dateFormat = "YYYY-MM-DD";
  var date = new Date();
  var todayDate = moment(date).format(dateFormat);
  const { Option } = Select;
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState(moment().format(dateFormat));
  const [endDate, setEndDate] = useState(moment().format(dateFormat));
  const [employee, setEmployee] = useState();
  const [location, setlocation] = useState(auth.profile.Office);
  const [data, setData] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    getAllLocation();
  }, []);

  const onMonthChange = (value, dateString) => {
    const myArr = dateString.split("-");
    let year = myArr[0];
    let mnth = myArr[1];
    setYear(year);
    setMonth(mnth);
  };
  const onStartDateChange = (value, dateString) => {
    setStartDate(dateString);
  };
  const onEndDateChange = (value, dateString) => {
    setEndDate(dateString);
  };
  const onEmployeeChange = (value) => {
    setEmployee(value);
  };
  const onLocationChange = (value) => {
    setlocation(value);
  };
  return (
    <>
      <Row wrap={false}>
        <Col flex="auto">
          Start Date :
          <DatePicker
            style={{ width: "100%" }}
            defaultValue={moment()}
            onChange={onStartDateChange}
            format={dateFormat}
          />
        </Col>
        <Col flex="auto">
          End Date :
          <DatePicker
            style={{ width: "100%" }}
            defaultValue={moment()}
            onChange={onEndDateChange}
            format={dateFormat}
          />
        </Col>
        <Col flex="auto">
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
        </Col>
        {auth.superuser ? (
          <Col flex="auto">
            Locations :
            <TreeSelect
              style={{ width: "100%" }}
              treeData={locationList}
              defaultValue={location}
              onChange={(value) => {
                setlocation(value);
                setUpdatelist(!updatelist);
              }}
            />
          </Col>
        ) : (
          ""
        )}
        <Col flex="auto">
          .
          <Excelldownload
            data={data}
            data1={data}
            startDate={startDate}
            endDate={endDate}
          />
        </Col>
        <Col flex="auto">
          .
          <ReactToPrint
            trigger={() => (
              <Button style={{ width: "100%" }} type="primary">
                Print this out!
              </Button>
            )}
            content={() => componentRef.current}
          />
          <PdfDownload
            data={data}
            data1={data}
            componentRef={componentRef}
            startDate={startDate}
            endDate={endDate}
          />
        </Col>
      </Row>

      <div className="site-layout-background main-frame">
        <EmployeeAttendanceReport
          startDate={startDate}
          componentRef={componentRef}
          endDate={endDate}
          employee={employee}
          location={location}
          data={data}
          setData={setData}
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
    businessprofile: state.settings.businessprofile,
    locationList: state.warehouse.locationlist,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getAllLocation })(Maincontent);
