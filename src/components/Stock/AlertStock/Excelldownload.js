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

const Excelldownload = ({ data, data1 }) => {
  let fileName = 'Stock Alert Report';
  return (
    <ExcelFile element={<button>Download</button>} filename={fileName}>
      <ExcelSheet data={data} name='Stock Alert Report}'>
        <ExcelColumn label="Barcode" value="barcode" />
        <ExcelColumn label="Product" value="title" />
        <ExcelColumn label="Category" value="category" />
        <ExcelColumn label="Color" value="color" />
        <ExcelColumn label="Size" value="size" />
        <ExcelColumn label="Quantity" value="quantity" />
        <ExcelColumn label="Price" value="selling_price" />
        <ExcelColumn label="Warehouse" value="Warehouse_name" />
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
