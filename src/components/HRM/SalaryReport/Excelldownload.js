import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";
import moment from 'moment';
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

const Excelldownload = ({ data, data1, from, to }) => {
  // console.log(data);
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  let fileName = 'PaySlip Report:' + from +'-'+to;
  const buttonStyle = {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '5px 5px',
    cursor: 'pointer',
  };
  return (
    <ExcelFile element={<button style={buttonStyle}>Download</button>} filename={fileName}>
      <ExcelSheet data={data} name='All Payslip}'>
        <ExcelColumn label="ID" value="id" />
        <ExcelColumn label="Name" value="employeeName" />
        <ExcelColumn label="Department" value="employeeDepartment" />
        <ExcelColumn label="Present" value="present" />
        <ExcelColumn label="Absent" value="absent" />
        <ExcelColumn label="Late" value="late" />
        <ExcelColumn label="Leave" value="leave" />
        <ExcelColumn label="Loan Adjustment" value="loan_adjustment" />
        <ExcelColumn label="Advance Adjustment" value="advance_adjustment" />
        <ExcelColumn label="Allowance" value="dailyAllowanceTotal" />
        <ExcelColumn label="Overtime" value="overtimeTotal" />
        <ExcelColumn label="Incentive" value="incentiveTotal" />
        <ExcelColumn label="Paid Salary" value="net_salary" />
        <ExcelColumn label="Payment Date" value={(col)=> (moment(col.paymentDate).format("DD-MM-YYYY"))} />
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
