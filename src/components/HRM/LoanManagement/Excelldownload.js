import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";
import moment from "moment";
import { Button } from "antd";
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
  let fileName = "LoanReport";
  return (
    <ExcelFile
      element={
        <Button type="primary" style={{ marginRight: "10px" }}>
          Download
        </Button>
      }
      filename={fileName}
    >
      <ExcelSheet data={data} name="All Loan Report}">
        <ExcelColumn label="ID" value="employeeId" />
        <ExcelColumn label="Name" value="employeeName" />
        <ExcelColumn label="Loan Amount" value="loanAmount" />
        <ExcelColumn label="Loan Type" value="loanType" />
        <ExcelColumn label="Payable Months" value="loanPayableMonths" />
        <ExcelColumn label="Paid Months" value="total_payment_count" />
        <ExcelColumn label="Payable Per Month" value="loanPayableAmount" />
        <ExcelColumn label="Note" value="note" />
        <ExcelColumn label="Status" value="loanStatus" />
        <ExcelColumn label="Paid" value="total_paid" />
        <ExcelColumn label="Due" value="total_due_payment" />
        <ExcelColumn label="Payment Status" value="loanPaymentStatus" />
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
