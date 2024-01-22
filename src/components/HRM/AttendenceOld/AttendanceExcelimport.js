import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Divider, Button, message } from "antd";
import * as XLSX from "xlsx";
import { createAttendence } from "../../../actions/AttendenceAction";
import moment from "moment";

const Excelimport = ({ createAttendence }) => {
  const [items, setItems] = useState([]);

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
        // console.log(data);
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
  const onConfirm = () => {
    items.forEach((data) => {
      let date = String(data.date);
      // console.log(date);
      date = new Date(date);
      // console.log(date);
      date = moment(date).format(dateFormat);

      let entryTime = moment(data.entryTime, format);
      entryTime = entryTime.format(format24);
      let exitTime = moment(data.exitTime, format);
      exitTime = exitTime.format(format24);
      let isAttended = data.isAttended == "TRUE" ? true : false;
      const value = {
        id: data.employee_id,
        attendanceDate: date,
        shift: data.shift,
        isAttended: isAttended,
        entryTime: entryTime,
        exitTime: exitTime,
        overTime: data.overTime,
        note: data.note,
      };
      // console.log(value['attendanceDate']);
      // console.log(value['id']);
      // console.log(value['name']);
      // console.log(value['isAttended']);
      // console.log(value);

      createAttendence(value);
    });
    message.success("Attendance Updated");
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
        Update
      </Button>
      <Divider />
      <table className="table_import">
        <tr className="table_heading">
          <th scope="col">Employee ID</th>
          <th scope="col">Employee Name</th>
          <th scope="col">Date</th>
          <th scope="col">Shift</th>
          <th scope="col">isAttended</th>
          <th scope="col">Entry Time</th>
          <th scope="col">Exit Time</th>
          <th scope="col">OverTime</th>
          <th scope="col">Note</th>
        </tr>

        {items.map((e) => {
          return (
            <tr>
              <td>{e.employee_id}</td>
              <td>{e.employee_name}</td>
              <td>{e.date}</td>
              <td>{e.shift}</td>
              <td>{e.isAttended}</td>
              <td>{e.entryTime}</td>
              <td>{e.exitTime}</td>
              <td>{e.overTime}</td>
              <td>{e.note}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default connect(null, { createAttendence })(Excelimport);
