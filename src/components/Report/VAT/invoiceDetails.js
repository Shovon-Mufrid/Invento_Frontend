import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { getInvoiceItem, getServices } from "../../../actions/invoiceItem";

const InvoiceDetails = ({ invoice, getInvoiceItem }) => {
  const loading = useRef(true);
  return (
    <>
      <p>loading</p>
    </>
  );
};

export default connect(null, {
  getInvoiceItem,
})(InvoiceDetails);
