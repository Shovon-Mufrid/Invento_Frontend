import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Skeleton, Tree, Row, Col, Divider } from "antd";
import { getAlluserlogPagination } from "../../../actions/userlogAction";
import Rendertable from "./Rendertable";
import Excelldownload from "./Excelldownload";

const List = ({ getAlluserlogPagination, reload, setreload }) => {
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);
  const pageno = useRef(1);
  const page_size = useRef(10);

  useEffect(() => {
    getAlluserlogPagination(pageno.current, page_size.current).then(
      (result) => {
        setdata(result);
        setloading(false);
      }
    );
  }, [reload, pageno.current, page_size.current]);

  if (loading) {
    return <Skeleton active />;
  } else {
    return (
      <>
        <Excelldownload data={data.results} />
        <Rendertable
          List={data}
          pageno={pageno}
          page_size={page_size}
          setreload={setreload}
          setloading={setloading}
          reload={reload}
        />
      </>
    );
  }
};

export default connect(null, {
  getAlluserlogPagination,
})(List);
