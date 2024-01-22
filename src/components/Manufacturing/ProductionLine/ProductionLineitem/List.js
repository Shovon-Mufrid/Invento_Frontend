import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getproductionlinesitembyfilter } from "../../../../actions/Manufacturing/productionlinesitemAction";
import Rendertable from "./Rendertable";

const ContactList = ({
  getproductionlinesitembyfilter,
  details,
  List,
  updatelist,
  setUpdatelist,
}) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getproductionlinesitembyfilter(details.id, "", "").then((result) => {
      setdata(result);
      setloading(false);
    });
  }, [updatelist]);

  if (loading) {
    return <Skeleton active />;
  } else
    return (
      <>
        {
          <Rendertable
            List={data}
            updatelist={updatelist}
            setUpdatelist={setUpdatelist}
          />
        }
      </>
    );
};

export default connect(null, {
  getproductionlinesitembyfilter,
})(ContactList);
