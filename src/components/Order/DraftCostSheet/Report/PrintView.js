import React, { useState, useEffect, useRef } from "react";
import { Table, Breadcrumb, Row, Col } from "antd";
import FabricsTable from "./FabricsTable";
import MaterialTable from "./MaterialTable";
import LaborTable from "./LaborTable";
import ReactToPrint from "react-to-print";
import CostSheetHeader from "./CostSheetHeader";
import CostSheetFooter from "./CostSheetFooter";
import { connect } from "react-redux";
import { getDraftCostSheet } from "../../../../actions/draftcostsheetAction";
import { useParams } from "react-router-dom";
import DraftImageList from "../DraftImage/DraftImageList";

const PrintView = ({ getDraftCostSheet }) => {
  const params = useParams();

  const id = params.id;
  const componentRef = useRef();

  const [draftCostSheet, setDraftCostSheet] = useState([]);
  const [draftFab, setDraftFab] = useState([]);
  const [drafImage, setDrafImage] = useState([]);

  useEffect(() => {
    getDraftCostSheet(id).then((result) => {
      setDraftCostSheet(result);
      setDraftFab(result.draftOrder);
      setDrafImage(result.draftImage);
    });
  }, []);

  console.log(draftFab);
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Sales</Breadcrumb.Item>
        <Breadcrumb.Item>Draft Cost Sheet</Breadcrumb.Item>
        <Breadcrumb.Item>Report</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef.current}
        />
        <div ref={componentRef} style={{ padding: "0px 20px" }}>
          <h1 style={{ textAlign: "center" }}>DRAFT COST SHEET</h1>
          <CostSheetHeader draftCostSheet={draftCostSheet} />
          <Row>
            <Col span={16}>
              
              <FabricsTable data={draftFab} />
              <MaterialTable data={draftFab} />
              <LaborTable data={draftFab} />
            </Col>
            <Col span={8}>
              <DraftImageList id={id} draftImage={drafImage} />
            </Col>
            <Col span={8}>
              <CostSheetFooter draftCostSheet={draftCostSheet} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  getDraftCostSheet,
})(PrintView);
// export default connect(mapStateToProps)(PrintView);
// export default PrintView;
