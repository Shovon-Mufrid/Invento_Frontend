import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Drawer,
  Divider,
  Col,
  Row,
  Button,
  message,
  Popconfirm,
  DatePicker,
} from "antd";
import { Link } from "react-router-dom";
import { deleteWarehouse } from "../../../actions/warehouseAction";
import { getSalesReportByOutLetMonth } from "../../../actions/report";
import moment from "moment";
import Edit from "./Edit";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const WarehouseDetails = ({
  details,
  deleteWarehouse,
  setUpdatelist,
  getSalesReportByOutLetMonth,
  auth,
}) => {
  const [visible, setVisible] = useState(false);
  const [order_fetched, setOrder_fetched] = useState(false);
  const [invoice_list, setInvoice_list] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const showDrawer = () => {
    updateData(details.id, month, year);
    setVisible(true);
  };

  useEffect(() => {
    updateData(details.id, month, year);
  }, [month, year]);
  const onMonthChange = (value, dateString) => {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    const myArr = dateString.split("-");
    let year = myArr[0];
    let mnth = myArr[1];
    setYear(year);
    setMonth(mnth);
  };
  const onClose = () => {
    setVisible(false);
  };

  const confirm = () => {
    deleteWarehouse(details.id);
    setVisible(false);
    setUpdatelist(false);
    message.success(
      details.name + " Has been deleted from your warehouse list"
    );
  };
  const updateData = (id, month, year) => {
    getSalesReportByOutLetMonth(id, month, year).then(function (invoices) {
      let map = {};
      let lists = [];
      invoices.forEach((element) => {
        if (map[element.issue_date]) {
          map[element.issue_date].issue_date = element.issue_date;
          if (map[element.issue_date].total_invoices) {
            map[element.issue_date].total_invoices =
              parseInt(map[element.issue_date].total_invoices) + 1;
          } else {
            map[element.issue_date].total_invoices = 1;
          }
          if (map[element.issue_date].bill) {
            map[element.issue_date].bill =
              parseFloat(map[element.issue_date].bill) +
              parseFloat(element.bill);
          } else {
            map[element.issue_date].bill = parseFloat(element.bill);
          }
          if (map[element.issue_date].quantity) {
            map[element.issue_date].quantity =
              parseFloat(map[element.issue_date].quantity) +
              parseFloat(element.quantity);
          } else {
            map[element.issue_date].quantity = parseFloat(element.quantity);
          }

          if (map[element.issue_date].payment) {
            map[element.issue_date].payment =
              parseFloat(map[element.issue_date].payment) +
              parseFloat(element.payment);
          } else {
            map[element.issue_date].payment = parseFloat(element.payment);
          }

          if (map[element.issue_date].due) {
            map[element.issue_date].due =
              parseFloat(map[element.issue_date].due) + parseFloat(element.due);
          } else {
            map[element.issue_date].due = parseFloat(element.due);
          }
        } else {
          map[element.issue_date] = {
            issue_date: element.issue_date,
            total_invoices: parseInt(1),
            quantity: parseInt(element.quantity),
            bill: parseInt(element.bill),
            payment: parseFloat(element.payment),
            due: parseFloat(element.due),
          };
        }
      });
      for (var key in map) {
        if (map.hasOwnProperty(key)) {
          lists.push([key, map[key]]);
        }
      }
      setInvoice_list(lists);
      console.log(lists);
      setOrder_fetched(true);
    });
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
        <img src={details.logo} width="200px" />
        <Row>
          <Col span={24}>
            <br></br>
            <h3>{details.name}</h3>

            <div
              className="d-div"
              dangerouslySetInnerHTML={{ __html: details.address }}
            ></div>
            <br></br>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            {/* <DescriptionItem title="Address" content={details.address} /> */}
          </Col>
        </Row>
        {auth.permissions.includes("Settings.Outlet_is_delete") ? (
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
        {auth.permissions.includes("Settings.Outlet_is_update") ? (
          <Edit details={details} setUpdatelist={setUpdatelist} />
        ) : (
          ""
        )}
        <Divider />
        <p className="site-description-item-profile-p">History</p>
        <Row gutter={24}>
          <Col span={8}>
            Date :
            <DatePicker
              picker="month"
              defaultValue={moment()}
              onChange={onMonthChange}
            />
          </Col>
        </Row>
        {order_fetched ? (
          <>
            <br></br>
            <table className="history_table">
              <tr>
                <td>SL.</td>
                <td>Date</td>
                <td>Total Invoices</td>
                <td>Total Quantity</td>
                <td>Total Bill</td>
                <td>Total Payment</td>
                <td>Total Due</td>
              </tr>
              {invoice_list.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item[1].issue_date}</td>
                      <td>{item[1].total_invoices}</td>
                      <td>{item[1].quantity}</td>
                      <td>{item[1].bill}</td>
                      <td>{item[1].payment}</td>
                      <td>{item[1].due}</td>
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
  deleteWarehouse,
  getSalesReportByOutLetMonth,
})(WarehouseDetails);
