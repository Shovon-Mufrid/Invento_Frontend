import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Excelldownload from "./Excelldownload";
import {
  getAllContact,
  getContactSearchResult,
} from "../../../actions/contactAction";
import { getcontacttype } from "../../../actions/settings";
import dateFormat from "dateformat";

import { Layout, Col, Select } from "antd";

const Index = ({
  getContactSearchResult,
  getcontacttype,
  type,
  role,
  loading,
  setloading,
  Contacttype,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getcontacttype();
    getContactSearchResult("", type.current, role.current).then((result) => {
      let array = [];
      for (let i = 0; i < result.length; i++) {
        result[i].special_dates = dateFormat(
          result[i].special_dates,
          "yyyy-mm-dd"
        );
        array.push(result[i]);
      }
      setData(array);
      console.log(array);
      setloading(false);
    });
  }, [loading]);

  const renderdata = () => {
    if (loading) {
      return (
        <Col span={10} offset={1}>
          <p>Loading</p>
        </Col>
      );
    } else {
      return (
        <>
          <Col span={10} offset={1}>
            <Excelldownload data={data} data1={Contacttype} />
          </Col>
        </>
      );
    }
  };

  return <>{renderdata()}</>;
};

const mapStateToProps = (state) => {
  return {
    Contacttype: state.contacts.contacttype,
  };
};

export default connect(mapStateToProps, {
  getAllContact,
  getContactSearchResult,
  getcontacttype,
})(Index);
