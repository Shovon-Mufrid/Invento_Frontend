import React, { useState, useEffect } from "react";
import { DualAxes } from "@ant-design/charts";

const DemoDualAxes = ({ data1, data2 }) => {
  var config = {
    data: [data1, data2],
    padding: "auto",
    xField: "issue_date",
    yField: ["total", "number"],

    geometryOptions: [
      {
        geometry: "column",
        color: "#5B8FF9",
      },
      {
        geometry: "line",
        smooth: true,
        color: "#5AD8A6",
      },
    ],
    legend: {
      custom: true,
      position: "bottom",
      items: [
        {
          value: "total",
          name: "Amount",
          marker: {
            symbol: "square",
            style: {
              fill: "#5B8FF9",
              r: 5,
            },
          },
        },

        {
          value: "number",
          name: "Sell",
          marker: {
            symbol: "square",
            style: {
              fill: "#5AD8A6",
              r: 5,
            },
          },
        },
      ],
    },
  };
  return <DualAxes {...config} />;
};

export default DemoDualAxes;
