import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Drawer,
  Divider,
  Col,
  Row,
  Button,
  message,
  Popconfirm,
  Descriptions,
} from "antd";
import { Link } from "react-router-dom";
import { deleteDepartment } from "../../../actions/departmentActions";
import { getAllEmployeeAttendenceOfDateRange } from "../../../actions/AttendenceAction";
import { getSpecificUserEmployeeLeave } from "../../../actions/employeeLeaveActions";
import { getAllLeaveType } from "../../../actions/leaveTypeActions";
import Calendarlist from "./Calenderlist";
const Details = ({
  details,
  startDate,
  endDate,
  getAllEmployeeAttendenceOfDateRange,
  getSpecificUserEmployeeLeave,
  getAllLeaveType,
}) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();

  const showDrawer = () => {
    getAllEmployeeAttendenceOfDateRange(
      startDate,
      endDate,
      "",
      details.id
    ).then((response) => {
      getSpecificUserEmployeeLeave(
        details.id,
        "",
        "",
        "",
        startDate,
        endDate
      ).then((leave) => {
        const mergeddata = [...response, ...leave];
        setData(mergeddata);
        setVisible(true);
      });
    });
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Link to="#" onClick={showDrawer} key={details.id}>
        View Details
      </Link>

      <Drawer
        width={"70%"}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <Calendarlist data={data} />
      </Drawer>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  deleteDepartment,
  getAllEmployeeAttendenceOfDateRange,
  getSpecificUserEmployeeLeave,
  getAllLeaveType,
})(Details);
