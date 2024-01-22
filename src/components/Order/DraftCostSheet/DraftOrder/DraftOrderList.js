
import React from 'react';
import { connect } from "react-redux";
import { Table } from "antd";

import Rendertable from "./Rendertable";
import { useEffect } from 'react';
import { useState } from 'react';
import { getDraftCostSheet } from '../../../../actions/draftcostsheetAction';

const DraftOrderList = ({
    id,draftOrder
     }) => {
          const [data, setData]= useState();

          console.log(id)

    return (
        <div>
          <Rendertable List={draftOrder}  />   
        </div>
    );
};

export default connect(null,{
    getDraftCostSheet,
    // getAllDraftOrder,
})(DraftOrderList);

