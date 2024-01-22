import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";
import { Button } from "antd";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const sheets = (chart, journals) => {
  // console.log(chart.account_name);
  // console.log(journals);
  return (
    <ExcelSheet data={journals} name="data">
      <ExcelColumn label="Date" value="created" />
      <ExcelColumn label="Narration" value="details" />
      <ExcelColumn label="Amount" value="amount" />
    </ExcelSheet>
  );
};

const sheetsBlank = (chart, journals) => {
  return (
    <ExcelSheet data={journals} name="blank">
      <ExcelColumn label="Date" value="created" />
      <ExcelColumn label="Narration" value="details" />
      <ExcelColumn label="Amount" value="amount" />
    </ExcelSheet>
  );
};

const Excelldownload = ({ charts, journals }) => {
  console.log(journals);
  return (
    <ExcelFile
      element={
        <Button type="primary" style={{ width: "98%" }}>
          Download
        </Button>
      }
    >
      <ExcelSheet data={journals} name="blank">
        <ExcelColumn label="Date" value="created" />
        <ExcelColumn label="Group" value="Group" />
        <ExcelColumn label="Sub group" value="Subgroup" />
        <ExcelColumn label="Narration" value="details" />
        <ExcelColumn label="Amount" value="amount" />
      </ExcelSheet>
      {/* {charts.map((chart) => {
        let entry = [];
        for (let i = 0; i < journals.length; i++) {
          if (journals[i].chartofaccount == chart.id) {
            entry.push(journals[i]);
          }
        }
        if (entry.length > 0) {
          return sheets(chart, entry);
        }

        return sheetsBlank(chart, entry);
      })} */}
    </ExcelFile>
  );
};

export default Excelldownload;
