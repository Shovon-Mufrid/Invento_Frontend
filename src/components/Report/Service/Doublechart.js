import React, { useState, useEffect } from "react";
import { Scatter } from "@ant-design/charts";

const DemoScatter = ({ data1, data2 }) => {
  const [data, setData] = useState([]);

  console.log("fetch data:", data);
  var config = {
    appendPadding: 10,
    data: data1,
    xField: "delivery_date",
    yField: "price",
    shape: "circle",
    colorField: "status",
    size: 8,
    yAxis: {
      nice: true,
      line: { style: { stroke: "#aaa" } },
    },
    xAxis: {
      grid: { line: { style: { stroke: "#eee" } } },
      line: { style: { stroke: "#aaa" } },
    },
  };
  return <Scatter {...config} />;
};

export default DemoScatter;
