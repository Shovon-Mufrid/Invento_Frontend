import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllworkstations } from "../../../actions/Manufacturing/workstationsAction";
import Rendertable from "./Rendertable";

const ContactList = ({
  getAllworkstations,
  List,
  updatelist,
  setUpdatelist,
}) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getAllworkstations().then((result) => {
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
  getAllworkstations,
})(ContactList);
