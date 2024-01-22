import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";
import { Button } from "antd";
import dateFormat from "dateformat";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excelldownload = ({ data, selectedkeys, data1 }) => {
  // const [loading, setloading] = useState(true);
  let result = [];
  result = data.filter((el) => selectedkeys.includes(el.id));
  let array = [];
  for (let i = 0; i < result.length; i++) {
    result[i].special_dates = dateFormat(result[i].special_dates, "yyyy-mm-dd");
    array.push(result[i]);
  }
  return (
    <ExcelFile element={<Button type="primary">Download selected data</Button>}>
      <ExcelSheet data={array} name="All Contacts">
        <ExcelColumn label="Customer_Supplier" value="Type" />
        {/* <ExcelColumn label="Type_Code" value="role" /> */}
        <ExcelColumn label="Type" value="Role" />
        <ExcelColumn label="name" value="name" />
        <ExcelColumn label="email" value="email" />
        <ExcelColumn label="phone" value="phone" />
        <ExcelColumn label="emergency_contact" value="emergency_contact" />
        <ExcelColumn label="address" value="address" />
        {/* <ExcelColumn label="remarks" value="remarks" /> */}
        <ExcelColumn label="Special_Date_Type" value="Special_Date_Type" />
        <ExcelColumn label="special_dates" value="special_dates" />
      </ExcelSheet>

      {/* <ExcelSheet data={data1} name="Types Chart">
        <ExcelColumn label="Type Code" value="id" />
        <ExcelColumn label="Type" value="Type" />
        <ExcelColumn label="Name" value="name" />
      </ExcelSheet> */}
    </ExcelFile>
  );
};

export default Excelldownload;
