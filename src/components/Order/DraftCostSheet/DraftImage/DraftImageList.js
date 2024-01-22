import React from 'react';
import { connect } from "react-redux";
import { Table, Col } from "antd";
import { useEffect } from 'react';
import { useState } from 'react';
import { getDraftCostSheet } from '../../../../actions/draftcostsheetAction';
import { deleteDraftImage } from '../../../../actions/draftcostsheetAction';
import Rendertable from './Rendertable';

const DraftImageList = ({
    id,draftImage, deleteDraftImage, setnewimage
     }) => {
          const [data, setData]= useState();
        //   const removerImage = () => {
        //     deleteDraftImage(details.id);
        //     setnewimage(true);
        //   };

          console.log(id)

    return (
        <Col span={3} offset={1}>
          <Rendertable 
          List={draftImage}          
          />   
        </Col>
    );
};

export default connect(null,{
    getDraftCostSheet,
})(DraftImageList);

