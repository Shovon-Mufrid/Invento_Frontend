import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";
import moment from "moment";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excelldownload = ({ data, data1, startDate, endDate }) => {
  var formatter = new Intl.NumberFormat("en-IN");
  let fileName = "StockValuationReport:" + startDate + "-" + endDate;
  return (
    <ExcelFile element={<button>Download</button>} filename={fileName}>
      <ExcelSheet data={data} name="Stock Valuation Report}">
        <ExcelColumn
          label="Type"
          value={(col) => (col.variations[0].ProductDetails.parent_category)}
        />
        <ExcelColumn
          label="Category"
          value={(col) => (col.variations[0].ProductDetails.main_category)}
        />
        <ExcelColumn
          label="Sub Category"
          value={(col) => (col.variations[0].ProductDetails.category_name)}
        />
        <ExcelColumn label="Product Name" value="title" />
        <ExcelColumn label="Total Quantity" value="quantity" />
        <ExcelColumn label="Total Amount" value="max_price" />
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
