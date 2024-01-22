import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Divider, Button, message, Progress, Tooltip } from "antd";
import * as XLSX from "xlsx";
import { uploadlog } from "../../../actions/userlogAction";

const Excelimport = ({ uploadlog }) => {
  const [items, setItems] = useState([]);
  const productid = useRef(null);
  const [percent, setPercent] = useState(0);
  const [damaged, setDamaged] = useState(0);
  const [complete, setComplete] = useState(0);
  const uploadcomplete = useRef(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {}, [reload]);

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
  const onConfirm = () => {
    let count = 0;
    let dmg = 0;
    let cmp = 0;
    let list = [];
    let promises = [];
    const value = {
      data: items,
    };
    promises.push(uploadlog(value));

    // for (let k = 0; k < items.length; k++) {
    //   const value = {
    //     id: items[k].id,
    //     sql: items[k].sql,
    //   };

    //   promises.push(
    //     uploadlog(value).then((e) => {
    //       if (e) {
    //         count += 1;
    //         let progress = (count / items.length) * 100;
    //         setPercent(parseFloat(progress).toFixed(2));
    //         cmp += 1;
    //         setComplete(cmp);
    //       }
    //       else {
    //         promises.push(
    //           uploadlog(value).then((e) => {
    //             count += 1;
    //             let progress = (count / items.length) * 100;
    //             setPercent(parseFloat(progress).toFixed(2));
    //             if (e) {
    //               cmp += 1;
    //               setComplete(cmp);
    //             } else {
    //               dmg += 1;
    //               setDamaged(dmg);
    //             }
    //           })
    //         );
    //       }
    //     })
    //   );
    // }
    Promise.all(promises).then((e) => {
      message.success("Products has been updated successfully");
      uploadcomplete.current = true;
      setReload(true);
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
          <h4>Complete : {complete}</h4>
          <h4>Error : {damaged}</h4>
        </>
      ) : (
        <>
          <Progress
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={percent}
          />
          <h4>Complete : {complete}</h4>
          <h4>Error : {damaged}</h4>
        </>
      )}
      <Divider />

      <table className="table_import">
        <tr className="table_heading">
          <th scope="col">id</th>
          <th scope="col">SQL</th>
        </tr>

        {items.map((e) => {
          // console.log(e);
          return (
            <tr>
              <td>{e.id}</td>
              <td>{e.sql}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default connect(null, {
  uploadlog,
})(Excelimport);
