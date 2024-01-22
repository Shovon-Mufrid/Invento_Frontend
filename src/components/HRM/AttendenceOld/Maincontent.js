import React, { useState, useEffect, useRef } from "react";
// import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import EmployeeAttendanceList from "./EmployeeAttendanceList";
import { getAllWarehouse } from "../../../actions/warehouseAction";
import AttendanceTemplateDownload from "./AttendanceTemplateDownload";
import { DatePicker, Select, TreeSelect, Col, Row, Button, Spin } from "antd";
import moment from "moment";

const Maincontent = ({ getAllWarehouse, warehouseList, auth }) => {
  const [updatelist, setUpdatelist] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [shift, setShift] = useState("day");
  const [branch, setBranch] = useState(auth.profile.Office);
  const dateFormat = "YYYY-MM-DD";
  var date = new Date();
  const loading = useRef(true);
  var todayDate = moment(date).format(dateFormat);
  const { Option } = Select;
  // const history = useHistory();
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllWarehouse();
  }, []);
  return (
    <>
      <Row wrap={false}>
        <Col flex="auto">
          Date:
          <DatePicker
            style={{ width: "100%" }}
            selected={startDate}
            defaultValue={moment()}
            format={dateFormat}
            onChange={(date) => {
              setStartDate(date);
              loading.current = true;
            }}
          />
        </Col>
        <Col flex="auto">
          Shift:
          <Select
            style={{ width: "100%" }}
            defaultValue={shift}
            placeholder="Please choose Shift"
            onChange={(value) => {
              setShift(value);
              loading.current = true;
            }}
          >
            <Option value="day">Day</Option>
            <Option value="night">Night</Option>
          </Select>
        </Col>
        {auth.superuser ? (
          <Col flex="auto">
            Outlet:
            <TreeSelect
              style={{ width: "100%" }}
              treeData={warehouseList}
              defaultValue={branch}
              onChange={(value) => setBranch(value)}
            />
          </Col>
        ) : (
          ""
        )}
        <Col flex="auto">
          Import:
          <Button
            // onClick={() => history.push("/import-attendance")}
            onClick={() => (window.location.href = "/import-attendance")}
            style={{ width: "100%" }}
          >
            Attendance Data!
          </Button>
        </Col>
        <Col flex="auto">
          Template:
          <AttendanceTemplateDownload data={data} data1={data} />
        </Col>
      </Row>

      <div className="site-layout-background main-frame">
        {/* <Spin spinning={loading.current}> */}
        <EmployeeAttendanceList
          date={startDate}
          shift={shift}
          updatelist={updatelist}
          branch={branch}
          setUpdatelist={setUpdatelist}
          loading={loading}
          setData={setData}
        />
        {/* </Spin> */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    warehouseList: state.warehouse.locationlist,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getAllWarehouse })(Maincontent);
