import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";

import { getPurchase } from "../../../actions/purchase";

const CountProducts = ({ id, getPurchase }) => {
  const [data, setdata] = useState();
  const [update, setupdate] = useState(false);
  let count = 0;
  useEffect(() => {
    getPurchase(id).then((result) => {
      console.log(result);
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

export default connect(null, { getPurchase })(CountProducts);
