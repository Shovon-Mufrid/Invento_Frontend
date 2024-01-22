import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { DualAxes } from "@ant-design/charts";

// bill: 1500
// due: 0
// issue_date: "2022-01-06"
// payment: 1500
// quantity: 1
// total_invoices: 1  Invoices

const DemoLine = ({ data, xField, yField }) => {
  console.log(data);
  var config = {
    // data: data,
    data: [data, data],
    padding: "auto",
    xField: xField,
    // yField: "bill",
    yField: ["bill", "total_invoices"],
    xAxis: { tickCount: 10 },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
    geometryOptions: [
      {
        geometry: "line",
        smooth: true,
        color: "#5B8FF9",
        // seriesField: "type",
        // label: {
        //   formatter: (datum) => {
        //     return `${datum.bill}`;
        //   },
        // },
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
      },
      {
        geometry: "line",
        smooth: true,
        color: "#5AD8A6",
        lineStyle: {
          lineWidth: 4,
          opacity: 0.5,
        },
        // label: {
        //   formatter: (datum) => {
        //     return `${datum.total_invoices}`;
        //   },
        // },
        point: {
          shape: "circle",
          size: 4,
          style: {
            opacity: 0.5,
            stroke: "#5AD8A6",
            fill: "#fff",
          },
        },
      },
    ],
  };
  return (
    <>
      {/* <Line {...config} /> */}
      <DualAxes {...config} />
    </>
  );
};

export default DemoLine;
