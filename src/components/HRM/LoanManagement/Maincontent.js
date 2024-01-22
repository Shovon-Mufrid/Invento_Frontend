import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import LoanList from "./LoanList";
import CreateNewLoan from "./CreateNewLoan";
import Excelldownload from "./Excelldownload";
import PdfDownload from "./PdfDownload";
import ReactToPrint from "react-to-print";
import moment from "moment";

const Maincontent = ({ auth }) => {
  const [updatelist, setUpdatelist] = useState(true);
  const [data, setData] = useState([]);
  const componentRef = useRef();

  return (
    <>
      <div className="site-layout-background main-frame">
        {auth.permissions.includes("HRM.Loan Management_is_create") ? (
          <CreateNewLoan
            setUpdatelist={setUpdatelist}
            updatelist={updatelist}
          />
        ) : (
          ""
        )}

        <Excelldownload data={data} data1={data} />

        <ReactToPrint
          trigger={() => <Button type="primary">Print this out!</Button>}
          content={() => componentRef.current}
        />
        <PdfDownload
          data={data}
          data1={data}
          componentRef={componentRef}
          date={moment()}
        />

        <LoanList
          updatelist={updatelist}
          setUpdatelist={setUpdatelist}
          setData={setData}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Maincontent);
