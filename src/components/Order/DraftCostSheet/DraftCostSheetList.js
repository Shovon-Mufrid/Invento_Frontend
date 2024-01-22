import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { getAllDraftCostSheet } from "../../../actions/draftcostsheetAction"
import Rendertable from "./Rendertable";

const DraftCostSheetList = ({
  getAllDraftCostSheet, List, updatelist, setUpdatelist 
}) => {
  const [data, setData]= useState();
  useEffect(() => {
    getAllDraftCostSheet().then((res)=>{
      console.log(res);
      setData(res);
    })
  }, []);

    return (
      <div>
        <Rendertable List={data} setUpdatelist={setUpdatelist}  />
      </div>
    );
};

export default connect(null,{
  getAllDraftCostSheet,
})(DraftCostSheetList);

