import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllOutlet } from "../../../actions/warehouseAction";
import Rendertable from "./Rendertable";

const WarehouseList = ({ getAllOutlet, List, updatelist, setUpdatelist }) => {
  useEffect(() => {
    getAllOutlet();
    setUpdatelist(true);
  }, [getAllOutlet, updatelist, setUpdatelist]);

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
    List: state.warehouse.outletlist,
  };
};

export default connect(mapStateToProps, {
  getAllOutlet,
})(WarehouseList);
