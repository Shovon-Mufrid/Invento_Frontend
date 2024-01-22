import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";
import { Button } from "antd";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excelldownload = ({ data, data1 }) => {
  return (
    <ExcelFile element={<Button type="primary">Download Data</Button>}>
      <ExcelSheet data={data} name="All Invoices">
        <ExcelColumn label="Barcode" value="barcode" />
        <ExcelColumn label="Product" value="title" />
        <ExcelColumn label="Category" value="category" />
        <ExcelColumn label="Color" value="color" />
        <ExcelColumn label="Size" value="size" />
        {/* <ExcelColumn label="Bill" value="bill" /> */}
        <ExcelColumn label="Warehouse" value="Warehouse_name" />
        <ExcelColumn label="Quantity" value="quantity" />
        <ExcelColumn label="Price" value="selling_price" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default Excelldownload;
