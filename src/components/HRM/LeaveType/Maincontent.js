import React, { useState } from "react";
import { connect } from "react-redux";
import LeaveTypeList from "./LeaveTypeList";
import CreateNewLeaveType from "./CreateNewLeaveType";

const Maincontent = ({auth}) => {
  const [updatelist, setUpdatelist] = useState(true);

  return (
    <>
      <div className="site-layout-background main-frame">
      { auth.permissions.includes("HRM.LeaveType_is_create") ?    <CreateNewLeaveType
          setUpdatelist={setUpdatelist}
          updatelist={updatelist}
        />:""}
        <LeaveTypeList updatelist={updatelist} setUpdatelist={setUpdatelist} />
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
