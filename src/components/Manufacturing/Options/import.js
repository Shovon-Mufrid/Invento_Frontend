import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Divider, Button, message } from "antd";
import * as XLSX from "xlsx";
import { createContact } from "../../../actions/contactAction";
import moment from "moment";

const Excelimport = ({ createContact }) => {
  const [items, setItems] = useState([]);
  const uploadcomplete = useRef(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {}, [loading]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws, {
          raw: false,
        });
        console.log(data);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };
  const dateFormat = "YYYY-MM-DD";
  const format = "h:mm a";
  const format24 = "HH:mm";
  let promises = [];
  const onConfirm = () => {
    items.forEach((data) => {
      const value = {
        Type: data.Customer_Supplier,
        // role: data.Type_Code,
        roleName: data.Type,
        name: data.name,
        phone: data.phone,
        email: data.email,
        emergency_contact: data.emergency_contact,
        address: data.address,
        // remarks: data.remarks,
        Special_Date_Type: data.Special_Date_Type,
        special_dates:
          typeof data.special_dates != "undefined"
            ? data.special_dates + "T00:00:00+06:00"
            : data.special_dates,
      };

      console.log(value);
      if (data.phone == "" || data.phone == null || data.phone == undefined) {
        console.log("phone is empty");
      } else {
        promises.push(createContact(value));
      }
    });
    Promise.all(promises).then((res) => {
      message.success("Import complete");
      uploadcomplete.current = true;
      setloading(true);
    });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <Button type="primary" onClick={onConfirm}>
        Upload
      </Button>
      {uploadcomplete.current ? (
        <>
          <Divider />
          <h3 style={{ color: "green" }}>Upload complete</h3>
        </>
      ) : (
        <></>
      )}
      <Divider />
      <table className="table_import">
        <tr className="table_heading">
          <th scope="col">Customer/Supplier</th>
          {/* <th scope="col">Type Code</th> */}
          <th scope="col">Type</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Emergency Contact</th>
          <th scope="col">Address</th>
          {/* <th scope="col">Remarks</th> */}
          <th scope="col">Special Date Type</th>
          <th scope="col">Special Date</th>
        </tr>

        {items.map((e) => {
          return (
            <tr>
              <td>{e.Customer_Supplier}</td>
              {/* <td>{e.Type_Code}</td> */}
              <td>{e.Type}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.phone}</td>
              <td>{e.emergency_contact}</td>
              <td>{e.address}</td>
              {/* <td>{e.remarks}</td> */}
              <td>{e.Special_Date_Type}</td>
              <td>{e.special_dates}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default connect(null, { createContact })(Excelimport);
