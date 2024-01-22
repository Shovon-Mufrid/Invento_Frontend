import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";
import moment from "moment";
import { Button } from "antd";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const renderdata = (item) => {
  return <></>;
};

const Excelldownload = ({ data, data1 }) => {
  // console.log(data);
  let fileName = "Userlog";
  return (
    <ExcelFile
      element={<Button type="primary">Download</Button>}
      filename={fileName}
    >
      <ExcelSheet data={data} name="Userlog">
        <ExcelColumn label="id" value="id" />
        <ExcelColumn label="sql" value="sql" />
        <ExcelColumn label="action" value="action" />
        <ExcelColumn label="action_type" value="action_type" />
        <ExcelColumn label="action_data" value="action_data" />
        <ExcelColumn label="object_id" value="object_id" />
        <ExcelColumn label="content_type" value="content_type" />
        <ExcelColumn label="model" value="model" />
        <ExcelColumn label="timestamp" value="timestamp" />
        <ExcelColumn label="created_by" value="created_by" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default Excelldownload;
