import React, { useState } from "react";
import { connect } from "react-redux";
import WarehouseList from "./WarehouseList";

const Maincontent = () => {
  const [updatelist, setUpdatelist] = useState(true);

  return (
    <>
      <div className="site-layout-background main-frame">
        <WarehouseList updatelist={updatelist} setUpdatelist={setUpdatelist} />
      </div>
    </>
  );
};

export default connect()(Maincontent);
