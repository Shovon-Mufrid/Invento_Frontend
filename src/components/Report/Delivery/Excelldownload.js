import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";
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
  console.log(data);
  return (
    <ExcelFile
      element={
        <Button style={{ width: "100%" }} type="primary">
          Download
        </Button>
      }
    >
      <ExcelSheet data={data} name="All Invoices">
        <ExcelColumn label="Date" value="issue_date" />
        <ExcelColumn label="Invoice No." value="invoice_number" />
        <ExcelColumn label="Order No." value="order_number" />
        <ExcelColumn label="Status" value="status" />
        <ExcelColumn label="Bill" value="bill" />
        <ExcelColumn label="Payment" value="payment" />
        <ExcelColumn label="Due" value="due" />
        <ExcelColumn label="Payment method" value="Payment_method" />
        <ExcelColumn label="Delivery date" value="delivery_date" />
        <ExcelColumn label="Delivery method" value="delivery_method" />
        <ExcelColumn label="Delivery cost" value="delivery_cost" />

        <ExcelColumn label="Account no." value="Account_no" />
        <ExcelColumn label="Transection" value="Transection_no" />
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
