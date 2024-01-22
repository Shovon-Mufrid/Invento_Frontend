import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";
import { Button } from "antd";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excelldownload = ({ data }) => {
  return (
    <ExcelFile element={<Button type="primary">Excel data</Button>}>
      <ExcelSheet data={data} name="Attribute">
        <ExcelColumn label="id" value="id" />
        <ExcelColumn label="Name" value="name" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default Excelldownload;
