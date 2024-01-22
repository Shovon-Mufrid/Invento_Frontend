import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAlloffice, getAllLocation } from "../../../actions/warehouseAction";
import Rendertable from "./Rendertable";
import Chart from "./Chart";

const WarehouseList = ({
  getAlloffice,
  List,
  updatelist,
  setUpdatelist,
  getAllLocation,
}) => {
  useEffect(() => {
    getAllLocation().then((e) => {
      // console.log(e);
    });
    setUpdatelist(true);
  }, [updatelist, setUpdatelist]);

  return (
    <>
      {/* <Chart List={List} /> */}
      <Rendertable
        List={List}
        updatelist={updatelist}
        setUpdatelist={setUpdatelist}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.warehouse.locationlist,
    // List: state.officelocation.OfficeLocationlist,
  };
};

export default connect(mapStateToProps, {
  getAlloffice,
  getAllLocation,
  Chart,
})(WarehouseList);
