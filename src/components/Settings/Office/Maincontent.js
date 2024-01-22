import React, { useState } from "react";
import { connect } from "react-redux";
import WarehouseList from "./WarehouseList";
import CreateNewWarehouse from "./CreateNewWarehouse";
import Chart from "./Chart";

const Maincontent = ({auth}) => {
  const [updatelist, setUpdatelist] = useState(true);

  return (
    <>
      <div className="site-layout-background main-frame">
        {/* <Chart /> */}
        {auth.permissions.includes("Settings.Office_is_create") ? (
          <CreateNewWarehouse
            setUpdatelist={setUpdatelist}
            updatelist={updatelist}
          />
        ) : (
          ""
        )}

        <WarehouseList updatelist={updatelist} setUpdatelist={setUpdatelist} />
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
