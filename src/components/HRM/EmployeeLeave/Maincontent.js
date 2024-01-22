import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import EmployeeLeaveList from "./EmployeeLeaveList";
import CreateNewEmployeeLeave from "./CreateNewEmployeeLeave";
import Excelldownload from "./Excelldownload";
import PdfDownload from "./PdfDownload";
import ReactToPrint from "react-to-print";
import { Button } from "antd";
import moment from "moment";

const Maincontent = ({ auth }) => {
  const [updatelist, setUpdatelist] = useState(true);
  const [data, setData] = useState([]);
  const componentRef = useRef();

  return (
    <>
      <div className="site-layout-background main-frame">
        {auth.permissions.includes("HRM.Employee Leave_is_create") ? (
          <CreateNewEmployeeLeave
            setUpdatelist={setUpdatelist}
            updatelist={updatelist}
          />
        ) : (
          ""
        )}

        <EmployeeLeaveList
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
          setData={setData}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Maincontent);
