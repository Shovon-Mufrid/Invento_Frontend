import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Space,
  Select,
  Divider,
  Skeleton,
  Card,
  AutoComplete,
  Button,
} from "antd";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excelldownload = ({ data, data1 }) => {
  console.log(data);
  return (
    <ExcelFile element={<Button type="primary">Download</Button>}>
      <ExcelSheet data={data} name="All Invoices">
        <ExcelColumn label="Date" value="issue_date" />
        <ExcelColumn label="PO No." value="purchase_number" />
        <ExcelColumn label="Bill" value="bill" />
        <ExcelColumn label="Reference" value="reference" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default Excelldownload;
