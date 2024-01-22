import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllLocation } from "../../../actions/warehouseAction";
import Rendertable from "./Rendertable";
import { Spin, Switch, Alert } from "antd";

const WarehouseList = ({ getAllLocation, List, updatelist, setUpdatelist }) => {
  useEffect(() => {
    getAllLocation();
    setUpdatelist(true);
  }, [updatelist, setUpdatelist]);

  return (
    <>
      <Spin spinning={!setUpdatelist}>
        {
          <Rendertable
            List={List}
            updatelist={updatelist}
            setUpdatelist={setUpdatelist}
          />
        }
      </Spin>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    List: state.warehouse.locationlist,
  };
};

export default connect(mapStateToProps, {
  getAllLocation,
})(WarehouseList);
