import React, { useState } from "react";
import { connect } from "react-redux";
import EmployeeSalaryList from "./EmployeeSalaryList";
import CreateNewEmployeeSalary from "./CreateNewEmployeeSalary";

const Maincontent = ({auth}) => {
  const [updatelist, setUpdatelist] = useState(true);

  return (
    <>
      <div className="site-layout-background main-frame">
     { auth.permissions.includes("HRM.Salary Setup_is_create") ?   <CreateNewEmployeeSalary
          setUpdatelist={setUpdatelist}
          updatelist={updatelist}
        />:""}
        <EmployeeSalaryList updatelist={updatelist} setUpdatelist={setUpdatelist} />
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
