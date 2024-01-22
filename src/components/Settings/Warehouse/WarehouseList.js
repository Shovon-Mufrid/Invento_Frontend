import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllWarehouse } from "../../../actions/warehouseAction";
import Rendertable from "./Rendertable";

const WarehouseList = ({
  getAllWarehouse,
  List,
  updatelist,
  setUpdatelist,
}) => {
  useEffect(() => {
    getAllWarehouse();
    setUpdatelist(true);
  }, [getAllWarehouse, updatelist, setUpdatelist]);

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
    List: state.warehouse.warehouselist,
  };
};

export default connect(mapStateToProps, {
  getAllWarehouse,
})(WarehouseList);
