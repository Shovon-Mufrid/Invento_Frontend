import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Divider, Button, message } from "antd";
import * as XLSX from "xlsx";
import { uploadProduct } from "../../../actions/variableProductAction";

const Excelimport = ({ uploadProduct }) => {
  const [items, setItems] = useState([]);
  const productid = useRef(null);
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
    let list = [];
    let promises = [];

    for (let k = 0; k < items.length; k++) {
      const value = {
        title: items[k].Product,
        Category: items[k].Category,
        Size: items[k].Size,
        Color: items[k].Color,
        Warehouse: items[k].Warehouse,
        quantity: items[k].Stock,
        purchase_price: parseFloat(items[k].Purchase_price).toFixed(2),
        selling_price: parseFloat(items[k].Selling_price).toFixed(2),
        discount: parseFloat(items[k].Discount).toFixed(2),
        discount_type: items[k].Discount_Type ? items[k].Discount_Type : "%",
        stock_alart_amount: items[k].stock_alart_amount,
        stock_unit: items[k].measurement_unit,
        ProductDetails: "",
      };
      promises.push(uploadProduct(value));
    }
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
        </>
      ) : (
        <></>
      )}
      <Divider />
      <table className="table_import">
        <tr className="table_heading">
          <th scope="col">Product</th>
          <th scope="col">Category</th>
          <th scope="col">Size</th>
          <th scope="col">Color</th>
          <th scope="col">Warehouse</th>
          <th scope="col">Stock</th>
          <th scope="col">Purchase_price</th>
          <th scope="col">Selling_price</th>
          <th scope="col">Discount Type</th>
          <th scope="col">Discount</th>
          <th scope="col">stock_alart_amount</th>
          <th scope="col">measurement_unit</th>
        </tr>

        {items.map((e) => {
          return (
            <tr>
              <td>{e.Product}</td>
              <td>{e.Category}</td>
              <td>{e.Size}</td>
              <td>{e.Color}</td>
              <td>{e.Warehouse}</td>
              <td>{e.Stock}</td>
              <td>{e.Purchase_price}</td>
              <td>{e.Selling_price}</td>
              <td>{e.Discount_Type}</td>
              <td>{e.Discount}</td>
              <td>{e.stock_alart_amount}</td>
              <td>{e.measurement_unit}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default connect(null, {
  uploadProduct,
})(Excelimport);
