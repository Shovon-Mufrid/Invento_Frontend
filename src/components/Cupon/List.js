import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllCupon } from "../../actions/cupon";
import Rendertable from "./Rendertable";

const List = ({ getAllCupon, setUpdatelist, updatelist }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    setLoading(true);
    getAllCupon().then((result) => {
      setData(result);
      setLoading(false);
      setUpdatelist(false);
    });
  }, [updatelist]);
  if (loading) {
    return <Skeleton active />;
  } else {
    return <>{<Rendertable List={data} setUpdatelist={setUpdatelist} />}</>;
  }
};

export default connect(null, {
  getAllCupon,
})(List);
