import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import ReactToPrint from "react-to-print";

import { getContactSearchResult } from "../../../actions/contactAction";
import { getAllInvoicesByContact } from "../../../actions/invoiceItem";
import { getAllPurchaseByContact } from "../../../actions/purchase";

import moment from "moment";
import { Layout, Breadcrumb, Row, Col, Divider, Skeleton, Button } from "antd";
const { Content } = Layout;

const PayableAndRecevable = ({
  getContactSearchResult,
  getAllInvoicesByContact,
  getAllPurchaseByContact,
}) => {
  const componentRefReceivable = useRef();
  const componentRefPayable = useRef();

  const [customer, setCustomer] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const [dataFetched, setDateFetched] = useState(false);
  const payableTotal = useRef(0);
  const receivableTotal = useRef(0);
  useEffect(() => {}, [reload]);

  useEffect(() => {
    setCustomer([]);
    setSupplier([]);
    getContactSearchResult("", "Customer").then((result) => {
      result.forEach((item) => {
        getAllInvoicesByContact(item.id).then(function (invoice) {
          invoice.forEach((inv) => {
            if (parseInt(inv.due) > 0) {
              receivableTotal.current =
                parseFloat(receivableTotal.current) + parseFloat(inv.due);
              setCustomer((customer) => [...customer, inv]);
            }

            // if(parseInt(inv.advance_payment) > 0)
            // {
            //   console.log(inv);
            //   payableTotal.current = parseFloat(payableTotal.current) + parseFloat(inv.advance_payment);
            //   setSupplier(supplier => [...supplier, inv]);
            // }
          });

          setreload(true);
          setloading(false);
        });
      });
      setDateFetched(true);
    });
    getContactSearchResult("", "Supplier").then((result) => {
      result.forEach((item) => {
        getAllPurchaseByContact(item.id).then(function (invoice) {
          // console.log(item);
          // console.log(invoice);
          let total = 0;
          invoice.forEach((inv) => {
            if (parseInt(inv.due) > 0) {
              payableTotal.current =
                parseFloat(payableTotal.current) + parseFloat(inv.due);
              setSupplier((supplier) => [...supplier, inv]);
            }
            // if(parseInt(inv.advance_payment) > 0)
            // {
            //   console.log(inv);
            //   receivableTotal.current = parseFloat(receivableTotal.current) + parseFloat(inv.advance_payment);
            //   setCustomer(customer => [...customer, inv]);
            // }
          });

          setreload(true);
          setloading(false);
        });
      });
      setDateFetched(true);
    });
  }, []);

  const SwitchablePicker = () => {
    return (
      <Row>
        <Col span={4}>
          {/* <Excelldownload data={data} data1={data1} /> */}
          <ReactToPrint
            trigger={() => <Button type="primary">Print Receivable</Button>}
            content={() => componentRefReceivable.current}
          />
        </Col>
        <Col span={1}> </Col>
        <Col span={4}>
          {/* <Excelldownload data={data} data1={data1} /> */}
          <ReactToPrint
            trigger={() => <Button type="primary">Print Payable</Button>}
            content={() => componentRefPayable.current}
          />
        </Col>
      </Row>
    );
  };

  const Rendercontent = () => {
    if (loading) {
      return (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      );
    } else {
      return (
        <>
          <Row>
            <Col
              span={24}
              style={{ padding: "1rem", border: "1px solid whitesmoke" }}
            >
              {SwitchablePicker()}
              <Divider />
              <div ref={componentRefReceivable} style={{ padding: "20px" }}>
                <h1>
                  <b>Receivable</b>
                </h1>
                <table className="history_table">
                  <tr>
                    <td>SL.</td>
                    <td>Date</td>
                    <td>Invoice No.</td>
                    <td>Cutomer Name</td>
                    <td>Due Amount</td>
                  </tr>

                  {customer.map((item, index) => {
                    // console.log(item);
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {moment(item.issue_date).format("DD-MM-YYYY")}
                          </td>
                          <td>{item.invoice_number}</td>
                          <td>{item.Contact[0].name}</td>
                          <td>{item.due}</td>
                        </tr>
                      </>
                    );
                  })}
                  <tr>
                    <td colSpan={4}>Total</td>
                    <td>{receivableTotal.current}</td>
                  </tr>
                </table>
              </div>
              <div ref={componentRefPayable} style={{ padding: "20px" }}>
                <h1>
                  <b>Payable</b>
                </h1>
                <table className="history_table">
                  <tr>
                    <td>SL.</td>
                    <td>Date</td>
                    <td>Invoice No.</td>
                    <td>Cutomer/Supplier Name</td>
                    <td>Due Amount</td>
                  </tr>

                  {supplier.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {moment(item.issue_date).format("DD-MM-YYYY")}
                          </td>
                          <td>{item.invoice_number}</td>
                          <td>{item.Contact[0].name}</td>
                          <td>{item.due}</td>
                        </tr>
                      </>
                    );
                  })}
                  <tr>
                    <td colSpan={4}>Total</td>
                    <td>{payableTotal.current}</td>
                  </tr>
                </table>
              </div>
            </Col>
          </Row>
        </>
      );
    }
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Payable & Receivable</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">{Rendercontent()}</div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, {
  getContactSearchResult,
  getAllInvoicesByContact,
  getAllPurchaseByContact,
})(PayableAndRecevable);
