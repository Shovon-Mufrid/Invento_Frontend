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
  let fileName = "Vat Report";
  return (
    <ExcelFile
      element={<Button type="primary">Download</Button>}
      filename={fileName}
    >
      <ExcelSheet data={data} name="Vat Report">
        <ExcelColumn label="Invoice No." value="invoice_number" />
        <ExcelColumn label="Date" value="Vat_issued_date" />
        <ExcelColumn
          label="Customer Name"
          value={(col) => (col.Contact ? col.Contact[0].name : "")}
        />
        <ExcelColumn
          label="Contact No."
          value={(col) => (col.Contact ? col.Contact[0].phone : "")}
        />
        {/* <ExcelColumn
          label="Product Details"
          value={(col) => (col.Contact ? col.invoice_items[0].Details : "")}
        />
        <ExcelColumn
          label="Quantity"
          value={(col) => (col.Contact ? col.invoice_items[0].quantity : "")}
        />
        <ExcelColumn
          label="Rate"
          value={(col) => (col.Contact ? col.invoice_items[0].price : "")}
        /> */}
        <ExcelColumn label="Quantity" value="quantity" />
        <ExcelColumn label="Amount(BDT)" value="bill" />
        <ExcelColumn label="Disc" value="discount" />
        <ExcelColumn label="VAT incl." value="tax" />
        <ExcelColumn label="Paid" value="payment" />
        <ExcelColumn label="Due" value="due" />
        <ExcelColumn label="Total" value="bill" />
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
