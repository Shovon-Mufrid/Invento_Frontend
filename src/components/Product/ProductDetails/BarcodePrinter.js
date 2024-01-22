import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import ReactToPrint from "react-to-print";

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Col,
  Row,
  Select,
  message,
  TreeSelect,
  Divider,
  Drawer,
} from "antd";

const { Option } = Select;

const BarcodePrinter = ({ details, variation }) => {
  const wrapper_ref = React.useRef();
  const componentRef = useRef();

  var formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "BDT",
  });

  const printt = () => {
    const opt = {
      scale: 4,
    };

    const elem = wrapper_ref.current;
    html2canvas(elem, opt).then((canvas) => {
      const iframe = document.createElement("iframe");
      iframe.name = "printf";
      iframe.id = "printf";
      iframe.height = 0;
      iframe.width = 0;
      document.body.appendChild(iframe);

      const imgUrl = canvas.toDataURL({
        format: "jpeg",
        quality: "1.0",
      });
      let page = "";

      console.log(details);
      // <h3 style="margin-bottom: 1px;font-size: 15px">${formatter.format(
      //   variation.selling_price
      // )}</h3>
      // <h4 style="margin-top: 1px;margin-bottom: 1px;font-size: 15px">(VAT inclusive)</h4>

      page += `
        <div style="padding: 0px;text-align: center">
        <img width="100%" src="${imgUrl}"/>
       <h3 style="margin-top:-2px;margin-bottom: 1px;font-size: 40px"><b>${formatter.format(
         variation.selling_price
       )}</b></h3>
       <h4 style="margin-top:0px;margin-bottom: 1px;font-size: 30px"><b>(VAT inclusive)</b></h4>
        </div></div>`;

      var newWin = window.frames["printf"];
      newWin.document.write(
        `<body onload="window.print()"><style>
        @page { size: auto;  margin: 0mm; }
        </style><table>${page}<table></body>`
      );
      newWin.document.close();
      return page;
    });
  };

  // <h4 style="margin: 0px; font-size: 20px">${
  //   details.product_code
  // }-${i}</h4>
  return (
    <>
      <div ref={wrapper_ref}>
        <Barcode value={variation.barcode} />
      </div>
      <Button onClick={printt}>Print Barcode</Button>
    </>
  );
};

export default connect()(BarcodePrinter);
