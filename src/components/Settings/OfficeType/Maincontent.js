import React, { useState } from "react";
import { connect } from "react-redux";
import List from "./List";
import Create from "./Create";

const Maincontent = ({ auth }) => {
  const [updatelist, setUpdatelist] = useState(true);

  return (
    <>
      <div className="site-layout-background main-frame">
        {auth.permissions.includes("Settings.Office Type_is_create") ? (
          <Create setUpdatelist={setUpdatelist} updatelist={updatelist} />
        ) : (
          ""
        )}
        <List updatelist={updatelist} setUpdatelist={setUpdatelist} />
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
