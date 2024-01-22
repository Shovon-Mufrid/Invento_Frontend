import React, { useState } from "react";
import { connect } from "react-redux";
import DepartmentList from "./DepartmentList";
import CreateNewDepartment from "./CreateNewDepartment";

const Maincontent = ({auth}) => {
  const [updatelist, setUpdatelist] = useState(true);

  return (
    <>
      <div className="site-layout-background main-frame">
     { auth.permissions.includes("HRM.Departments_is_create")
            ?  <CreateNewDepartment
          setUpdatelist={setUpdatelist}
          updatelist={updatelist}
        />:""}
        <DepartmentList updatelist={updatelist} setUpdatelist={setUpdatelist} />
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
