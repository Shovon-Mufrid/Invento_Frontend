import React, { useEffect, useState, useRef } from "react";
import { Button } from "antd";
import ReactExport from "react-export-excel";
import moment from "moment";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
  {
    name: "Johson",
    amount: 30000,
    sex: "M",
    is_married: true,
  },
  {
    name: "Monika",
    amount: 355000,
    sex: "F",
    is_married: false,
  },
  {
    name: "John",
    amount: 250000,
    sex: "M",
    is_married: false,
  },
  {
    name: "Josef",
    amount: 450500,
    sex: "M",
    is_married: true,
  },
];

var dataSet2 = [
  {
    name: "Johnson",
    total: 25,
    remainig: 16,
  },
  {
    name: "Josef",
    total: 25,
    remainig: 7,
  },
];

const Excelldownload = ({ data, data1 }) => {
  let fileName = "AttendanceTemplate";
  return (
    <ExcelFile
      element={<Button style={{ width: "100%" }}>Download Template</Button>}
      filename={fileName}
    >
      <ExcelSheet data={data} name="Attendance Template}">
        <ExcelColumn label="employee_id" value="id" />
        <ExcelColumn label="employee_name" value="name" />
        <ExcelColumn label="date" value="attendanceDate" />
        <ExcelColumn label="shift" value="shift" />
        <ExcelColumn
          label="isAttended"
          value={(col) => (col.isAttended ? "TRUE" : "FALSE")}
        />
        <ExcelColumn label="entryTime" value="entryTime" />
        <ExcelColumn label="exitTime" value="exitTime" />
        <ExcelColumn label="overTime" value="overTime" />
        <ExcelColumn label="note" value="note" />
        {/* <ExcelColumn
          label="Marital Status"
          value={(col) => (col.is_married ? "Married" : "Single")}
        /> */}
      </ExcelSheet>
      {/* <ExcelSheet data={data1} name="Leaves">
        <ExcelColumn label="Name" value="name" />
        <ExcelColumn label="Total Leaves" value="total" />
        <ExcelColumn label="Remaining Leaves" value="remaining" />
      </ExcelSheet> */}
    </ExcelFile>
  );
};

export default Excelldownload;
