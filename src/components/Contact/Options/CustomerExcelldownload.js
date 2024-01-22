import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excelldownload = ({ data, data1 }) => {
  console.log(data);
  return (
    <ExcelFile element={<button>Download customers</button>}>
      <ExcelSheet data={data} name="All Contacts">
        <ExcelColumn label="Customer_Supplier" value="Type" />
        <ExcelColumn label="Type_Code" value="role" />
        <ExcelColumn label="Type" value="Role" />
        <ExcelColumn label="name" value="name" />
        <ExcelColumn label="email" value="email" />
        <ExcelColumn label="phone" value="phone" />
        <ExcelColumn label="emergency_contact" value="emergency_contact" />
        <ExcelColumn label="address" value="address" />
        <ExcelColumn label="remarks" value="remarks" />
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
