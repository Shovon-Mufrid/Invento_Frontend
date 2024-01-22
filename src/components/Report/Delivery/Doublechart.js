import React, { useState, useEffect } from "react";
import { Scatter } from "@ant-design/charts";

const DemoScatter = ({ data1, data2 }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch("https://gw.alipayobjects.com/os/antfincdn/aao6XnO5pW/IMDB.json")
      .then((response) => response.json())
      .then((json) => setData(json))

      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  console.log("fetch data:", data);
  var config = {
    appendPadding: 10,
    data: data1,
    xField: "delivery_date",
    yField: "id",
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
