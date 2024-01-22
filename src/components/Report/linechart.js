import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";

const DemoLine = ({ data, xField, yField }) => {
  var config = {
    data: data,
    padding: "auto",
    xField: xField,
    yField: yField,
    xAxis: { tickCount: 5 },
    slider: {
      start: 0,
      end: 1,
    },
  };
  return (
    <>
      <Line {...config} />
    </>
  );
};

export default DemoLine;
