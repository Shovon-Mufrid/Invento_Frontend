import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllLeaveType } from "../../../actions/leaveTypeActions";
import Rendertable from "./Rendertable";

const LeaveTypeList = ({
  getAllLeaveType,
  List,
  updatelist,
  setUpdatelist,
}) => {
  useEffect(() => {
    getAllLeaveType();
    setUpdatelist(true);
  }, [getAllLeaveType, updatelist, setUpdatelist]);

  return (
    <>
      {
        <Rendertable
          List={List}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.leaveType.leaveTypelist,
  };
};

export default connect(mapStateToProps, {
  getAllLeaveType,
})(LeaveTypeList);
