import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllWorkorder } from "../../../actions/Manufacturing/workorderAction";
import Rendertable from "./Rendertable";

const ContactList = ({ getAllWorkorder, List, updatelist, setUpdatelist }) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getAllWorkorder().then((result) => {
      setdata(result);
      setloading(false);
    });
    // setUpdatelist(!updatelist);
  }, [getAllWorkorder, updatelist]);

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
  getAllWorkorder,
})(ContactList);
