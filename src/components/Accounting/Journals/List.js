import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Skeleton, Tree, Row, Col, Divider } from "antd";
import { getAlljournalsPagination } from "../../../actions/journalAction";
import Rendertable from "./Rendertable";
import Excelldownload from "./Excelldownload";

const List = ({ getAlljournalsPagination, reload, setreload }) => {
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);
  const pageno = useRef(1);
  const page_size = useRef(10);

  useEffect(() => {
    getAlljournalsPagination(pageno.current, page_size.current).then(
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
        <Row flex="auto" style={{marginBottom: "10px"}}>
          <Excelldownload data={data.results} />
        </Row>
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
  getAlljournalsPagination,
})(List);
