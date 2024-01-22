import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";

import { getspecificproductvariation } from "../../../actions/variableProductAction";

const CountVariation = ({ id, getspecificproductvariation }) => {
  const [data, setdata] = useState();
  const [update, setupdate] = useState(false);
  let count = 0;
  useEffect(() => {
    getspecificproductvariation(id).then((result) => {
      setdata(result);
      setupdate(true);
    });
  }, []);

  if (update) {
    return (
      <>
        {data.map((data) => {
          count = count + data.quantity;
        })}
        {count}
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
