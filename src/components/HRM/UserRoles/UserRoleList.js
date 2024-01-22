import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllUserRole } from "../../../actions/userRoleAction";
import Rendertable from "./Rendertable";

const UserRoleList = ({
  getAllUserRole,
  RoleList,
  updatelist,
  setUpdatelist,
}) => {
  useEffect(() => {
    getAllUserRole();
    setUpdatelist(true);
  }, [getAllUserRole, updatelist, setUpdatelist]);

  // console.log(RoleList);
  
  return (
    <>
      {
        <Rendertable
          List={RoleList}
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
        />
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    RoleList: state.userRole.userRolelist,
  };
};

export default connect(mapStateToProps, {
  getAllUserRole,
})(UserRoleList);
