import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Divider, Col, Row, Button, message, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { deleteEmployeeLoan } from "../../../actions/loanManagementAction";
import Edit from "./Edit";
import { getSpecificUserEmployeeLoanPaymentForLoan } from "../../../actions/loanPaymentManagementAction";
import moment from "moment";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const UserLoanDetails = ({
  details,
  deleteEmployeeLoan,
  getSpecificUserEmployeeLoanPaymentForLoan,
  setUpdatelist,
  updatelist,
  auth,
}) => {
  const [visible, setVisible] = useState(false);
  const [history_fetched, setHistory_fetched] = useState(false);
  const [loan_payment_list, setLoan_payment_list] = useState([]);

  const showDrawer = () => {
    getSpecificUserEmployeeLoanPaymentForLoan(details.id).then(function (
      loan_payment
    ) {
      setLoan_payment_list(loan_payment);
      setHistory_fetched(true);
    });
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    deleteEmployeeLoan(details.id);
    setVisible(false);
    setUpdatelist(false);
    message.success(details.name + " Has been deleted from your Loan Request");
  };

  return (
    <>
      <Link to="#" onClick={showDrawer} key={details.id}>
        View Details
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
        <p className="site-description-item-profile-p">Loan details</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="employee" content={details.employeeName} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Loan Amount" content={details.loanAmount} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Loan Type" content={details.loanType} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Loan Payable Months"
              content={details.loanPayableMonths}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Loan Payable Amount Per Month"
              content={details.loanPayableAmount}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Note" content={details.note} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Status" content={details.loanStatus} />
          </Col>
        </Row>
        {details.loanStatus != "paid" && auth.permissions.includes("HRM.Loan Management_is_delete")  ? (
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
          ""
        )}
        {auth.permissions.includes("HRM.Loan Management_is_update") ? (
          <Edit
            details={details}
            setUpdatelist={setUpdatelist}
            updatelist={updatelist}
          />
        ) : (
          ""
        )}
        <Divider />
        <p className="site-description-item-profile-p">History</p>
        {history_fetched ? (
          <>
            <br></br>
            <table className="history_table">
              <tr>
                <td>SL.</td>
                <td>Date</td>
                <td>Paid Amount</td>
              </tr>

              {loan_payment_list.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{moment(item.paymentDate).format("DD-MM-YYYY")}</td>
                      <td>{item.paidAmount}</td>
                    </tr>
                  </>
                );
              })}
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
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  deleteEmployeeLoan,
  getSpecificUserEmployeeLoanPaymentForLoan,
})(UserLoanDetails);
