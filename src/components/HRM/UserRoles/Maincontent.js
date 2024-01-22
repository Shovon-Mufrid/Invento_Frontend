import React, { useState } from "react";
import { connect } from "react-redux";
import UserRoleList from "./UserRoleList";
import CreateNewUserRole from "./CreateNewUserRole";

const Maincontent = ({auth}) => {
  const [updatelist, setUpdatelist] = useState(true);

  return (
    <>
      <div className="site-layout-background main-frame">
     { auth.permissions.includes("HRM.Designation_is_create")
            ?  <CreateNewUserRole
          setUpdatelist={setUpdatelist}
          updatelist={updatelist}
        />:""}
        <UserRoleList updatelist={updatelist} setUpdatelist={setUpdatelist} />
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
