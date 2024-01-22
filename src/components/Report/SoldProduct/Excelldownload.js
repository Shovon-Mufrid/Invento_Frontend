import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";
import { Button } from "antd";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excelldownload = ({ data, data1 }) => {
  let product = "";
  let product_details = "";
  let color = "";
  let size = "";
  return (
    <ExcelFile
      element={
        <Button type="primary" style={{ width: "100%" }}>
          Download
        </Button>
      }
    >
      <ExcelSheet data={data} name="Sold products">
        <ExcelColumn label="Date" value="issue_date" />
        <ExcelColumn label="Invoice No." value="Invoice_no" />
        <ExcelColumn label="Customer" value="Customer" />
        <ExcelColumn label="Contact" value="Contact" />
        <ExcelColumn
          label="Product"
          value={(col) => {
            product = col.Details.split("--");
            if (product.length > 1) {
              product_details = product[1].split("/");
              return product[0];
            }
          }}
        />
        <ExcelColumn label="Category" value="parent_category" />
        <ExcelColumn label="Sub category" value="main_category" />
        <ExcelColumn
          label="Color"
          value={(col) => {
            if (product.length > 1) {
              let color = product_details[0];
              return color;
            }
          }}
        />
        <ExcelColumn
          label="Size"
          value={(col) => {
            if (product.length > 1) {
              let size = product_details.length > 1 ? product_details[1] : "";
              return size;
            }
          }}
        />
        <ExcelColumn label="Quantity" value="quantity" />
        <ExcelColumn label="Price" value="price" />

        <ExcelColumn
          label="Amount"
          value={(col) => {
            return col.quantity * col.price;
          }}
        />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default Excelldownload;
