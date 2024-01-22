import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getContactSearchResult } from "../../../actions/contactAction";
import Rendertable from "./Rendertable";

const ContactList = ({
  getContactSearchResult,
  List,
  updatelist,
  setUpdatelist,
}) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    getContactSearchResult("", "Supplier").then((result) => {
      setdata(result);
      setloading(false);
    });
    setUpdatelist(true);
  }, [getContactSearchResult, updatelist, setUpdatelist]);

  if (loading) {
    return <Skeleton active />;
  } else
    return (
      <>
        {
          <Rendertable
            List={List}
            updatelist={updatelist}
            setUpdatelist={setUpdatelist}
          />
        }
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
