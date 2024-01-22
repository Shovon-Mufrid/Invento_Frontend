import { Skeleton, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getContactSearchResult } from "../../../actions/contactAction";
import Rendertable from "./Rendertable";

const ContactList = ({ getContactSearchResult, List, reload, setreload }) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getContactSearchResult("", "Customer").then((result) => {
      setdata(result);
      setloading(false);
    });
  }, [reload]);
  if (loading) {
    return <Skeleton active />;
  } else
    return (
      <>
        <Rendertable List={List} reload={reload} setreload={setreload} />
      </>
    );
};

const mapStateToProps = (state) => {
  return {
    List: state.contacts.contactlistsearchresult,
  };
};

export default connect(mapStateToProps, {
  getContactSearchResult,
})(ContactList);
