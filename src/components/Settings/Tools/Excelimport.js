import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Divider } from "antd";
import * as XLSX from "xlsx";

const Excelimport = () => {
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

        const data = XLSX.utils.sheet_to_json(ws);

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

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <Divider />
      <table className="table_import">
        <tr className="table_heading">
          <th scope="col">Product Name</th>
          <th scope="col">Product Code</th>
          <th scope="col">Category</th>
          <th scope="col">Sub category</th>
          <th scope="col">Size</th>
          <th scope="col">Color</th>
          <th scope="col">Warehouse</th>
          <th scope="col">Stock</th>
          <th scope="col">Purchase</th>
          <th scope="col">Sell</th>
          <th scope="col">Discount</th>
        </tr>

        {items.map((e) => {
          return (
            <tr>
              <td>{e.Product_name}</td>
              <td>{e.Product_code}</td>
              <td>{e.Category}</td>
              <td>{e.Subcategory}</td>
              <td>{e.Size}</td>
              <td>{e.Color}</td>
              <td>{e.Warehouse}</td>
              <td>{e.Stock}</td>
              <td>{e.Purchase}</td>
              <td>{e.sell}</td>
              <td>{e.discount}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default connect()(Excelimport);
