import React, { useEffect, useState, useRef } from "react";
import ReactExport from "react-export-excel";
import { Button } from "antd";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excelldownload = ({ data }) => {
  console.log(data);
  return (
    <ExcelFile
      style={{ width: "100%" }}
      element={
        <Button
          className="akashvai"
          type="primary"
          style={{ align: "right", width: "100%" }}
        >
          Download
        </Button>
      }
    >
      <ExcelSheet data={data} name="All Invoices">
        <ExcelColumn label="ID" value="id" />
        <ExcelColumn label="Details" value="details" />
        <ExcelColumn label="Group" value="Group" />
        <ExcelColumn label="Sub Group" value="Subgroup" />
        <ExcelColumn
          label="Debit"
          value={(details) => {
            if (details.type == "Debit") return details.amount;
          }}
        />
        <ExcelColumn
          label="Debit"
          value={(details) => {
            if (details.type != "Debit") return details.amount;
          }}
        />
        <ExcelColumn label="Created at" value="created" />
        {/* <ExcelColumn
          label="Debit"
          value={(details) => 
         <>{details.amount}</>
        }
        />
        <ExcelColumn
          label="Credit"
          value={(details) => 
            <>{details.amount}</>
        }
        /> */}
      </ExcelSheet>
    </ExcelFile>
  );
};

export default Excelldownload;
