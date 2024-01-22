import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import {
  getSalesReportByInvoiceCount,
  getDeliveryReport,
} from "../../../actions/report";
import { getAllOutlet } from "../../../actions/warehouseAction";
import moment from "moment";

import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Space,
  Select,
  Divider,
  Skeleton,
  Card,
} from "antd";
import { List } from "antd/lib/form/Form";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const DeliveryReport = ({ getDeliveryReport, location }) => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [accounts, setaccounts] = useState([]);
  const [outletlist, setoutletlist] = useState([]);
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const [type, setType] = useState("date");
  var currentdate = new Date();
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate();
  useEffect(() => {
    setloading(true);
    getDeliveryReport(
      "",
      "",
      "",
      "",
      "",
      "Pending",
      "",
      location.current,
      ""
    ).then(function (result) {
      setData(result);

      setloading(false);
      setreload(false);
    });
  }, [reload, location.current]);

  const Rendercontent = () => {
    if (loading) {
      return (
        <>
          <Skeleton active />
        </>
      );
    } else {
      return (
        <>
          <Row>
            {/* <Calendar /> */}

            <Col
              span={24}
              style={{ padding: "1rem", border: "1px solid whitesmoke" }}
            >
              <Card
                title="Pending delivery"
                className="summary_card transactions stock"
                bordered={true}
                extra={<>Total : {data.length}</>}
              >
                {data.map((item, index) => {
                  if (index < 10) {
                    return (
                      <Row>
                        <Col span={20}>
                          <p>
                            {"Invoice no. "}
                            {item.invoice_number}
                          </p>
                        </Col>
                        <Col span={4} style={{ textAlign: "right" }}>
                          {item.status}
                        </Col>
                      </Row>
                    );
                  }
                })}
              </Card>
            </Col>
          </Row>
        </>
      );
    }
  };

  return <>{Rendercontent()}</>;
};

export default connect(null, {
  getSalesReportByInvoiceCount,
  getDeliveryReport,
  getAllOutlet,
})(DeliveryReport);
