import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";

import { getspecificproductvariation } from "../../../actions/variableProductAction";

const CountVariation = ({ id, getspecificproductvariation }) => {
  var formatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  });
  const [data, setdata] = useState();
  const [update, setupdate] = useState(false);
  let max = 0;
  let min = 0;
  useEffect(() => {
    getspecificproductvariation(id).then((result) => {
      setdata(result);
      setupdate(true);
    });
  }, []);

  if (update) {
    return (
      <>
        {data.map((data, index) => {
          if (index == 0) {
            max = parseFloat(data.selling_price).toFixed(2);
            min = parseFloat(data.selling_price).toFixed(2);
          }
          if (parseFloat(data.selling_price) > max) {
            max = parseFloat(data.selling_price).toFixed(2);
          }
          if (parseFloat(data.selling_price) < min) {
            min = parseFloat(data.selling_price).toFixed(2);
          }
        })}
        {max == min ? (
          formatter.format(max)
        ) : (
          <>
            {formatter.format(min)}
            {" - "}
            {formatter.format(max)}
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        <Spin />
      </>
    );
  }
};

export default connect(null, { getspecificproductvariation })(CountVariation);
