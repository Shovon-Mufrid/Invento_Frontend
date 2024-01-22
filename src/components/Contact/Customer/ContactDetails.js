import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Drawer, Divider, Col, Row, Button, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { deleteContact } from "../../../actions/contactAction";
import {
  getAllInvoicesByContact,
  getInvoiceItem,
  getServices,
} from "../../../actions/invoiceItem";
import EditContact from "./EditContact";
import ReactToPrint from "react-to-print";
import PdfDownload from "./PdfDownload";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const ContactDetails = ({
  details,
  deleteContact,
  reload,
  setreload,
  getAllInvoicesByContact,
  getInvoiceItem,
  getServices,
  Auth,
}) => {
  const [visible, setVisible] = useState(false);
  const [order_fetched, setOrder_fetched] = useState(false);
  const [invoice_list, setInvoice_list] = useState([]);
  const due = useRef(0);
  const bill = useRef(0);
  const paid = useRef(0);
  const componentRef = useRef();
  var formatter = new Intl.NumberFormat("en-IN");

  const showDrawer = () => {
    getAllInvoicesByContact(details.id).then(function (invoices) {
      setInvoice_list(invoices);
      due.current = 0;
      bill.current = 0;
      paid.current = 0;
      invoices.forEach((element) => {
        due.current = due.current + parseFloat(element.due);
        bill.current = bill.current + parseFloat(element.bill);
        paid.current = paid.current + parseFloat(element.payment);
      });
      setOrder_fetched(true);
    });
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    deleteContact(details.id);
    setVisible(false);
    setreload(!reload);
    message.success(details.name + " Has been deleted from your contact list");
  };

  return (
    <>
      <Link to="#" onClick={showDrawer} key={details.id}>
        View Profile
      </Link>

      <Drawer
        width={640}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <p
          className="site-description-item-profile-p"
          style={{ marginBottom: 24 }}
        >
          Information
        </p>
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="name" content={details.name} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone" content={details.phone} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content={details.email} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Type" content={details.Role} />
          </Col>
        </Row>
        {/* <Row>
          <Col span={12}>
            <DescriptionItem title="Balance" content={details.account_balance} />
          </Col>
        </Row> */}
        <Row>
          <Col span={24}>
            <DescriptionItem title="Address" content={details.address} />
          </Col>
          <Col span={24}>
            <div className="site-description-item-profile-wrapper">
              <p className="site-description-item-profile-p-label">Remarks:</p>

              <div dangerouslySetInnerHTML={{ __html: details.remarks }}></div>
            </div>
          </Col>
        </Row>
        {Auth.superuser && Auth.permissions.includes("Contacts.Customer_is_delete") ? (
          <Button danger style={{ marginRight: "10px" }}>
            <Popconfirm
              title="Are you sure to delete this contact?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Link to="#">Delete</Link>
            </Popconfirm>
          </Button>
        ) : (
          <></>
        )}
        {Auth.permissions.includes("Contacts.Customer_is_update") ? (
          <EditContact
            details={details}
            reload={reload}
            setreload={setreload}
          />
        ) : (
          ""
        )}
        <Divider />
        {details.account_balance < 0 ? (
          <>
            <h3>Accounts Receivable: {Math.abs(details.account_balance)}</h3>
          </>
        ) : (
          <>
            <h3>Advance From Customer: {Math.abs(details.account_balance)}</h3>
          </>
        )}
        <p className="site-description-item-profile-p">History</p>
        <Col span={8}>
          <ReactToPrint
            trigger={() => <Button type="primary">Print this out!</Button>}
            content={() => componentRef.current}
          />
          <PdfDownload
            // key={invoice_list.id}
            data={invoice_list}
            details={details}
            componentRef={componentRef}
          />
        </Col>
        {order_fetched ? (
          <>
            <br></br>
            <table className="history_table">
              <thead>
                <tr>
                  <th>SL.</th>
                  <th>Date</th>
                  <th>Purchase No.</th>
                  <th>Total Qty</th>
                  <th>Total Price</th>
                  <th>Paid Amount</th>
                  <th>Due Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice_list.map((item, index) => {
                  return (
                    <>
                      {console.log(item)}

                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.issue_date}</td>
                        <td>{item.purchase_number}</td>
                        <td>{item.quantity}</td>
                        <td style={{ textAlign: "right" }}>
                          {formatter.format(item.bill)}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {formatter.format(item.payment)}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {formatter.format(item.due)}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4}>Total</td>
                  <td style={{ textAlign: "right" }}>
                    {formatter.format(bill.current)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatter.format(paid.current)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {formatter.format(due.current)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  deleteContact,
  getAllInvoicesByContact,
  getInvoiceItem,
  getServices,
})(ContactDetails);
