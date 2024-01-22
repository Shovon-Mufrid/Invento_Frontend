import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import {
  getSalesReportByInvoiceCount,
  getDeliveryReport,
  getSalesReportP,
} from "../../../actions/report";
import { getdeliverytype } from "../../../actions/settings";
import { getAllOutlet } from "../../../actions/warehouseAction";
import moment from "moment";

import Calendar from "./Calendar";
import DemoDualAxes from "../Delivery/Doublechart";
import RenderTable from "./RenderTable";
import Excelldownload from "./Excelldownload";

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
  Spin,
} from "antd";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const DeliveryReport = ({
  getSalesReportByInvoiceCount,
  getDeliveryReport,
  getAllOutlet,
  getdeliverytype,
  courier,
  getSalesReportP,
  Auth,
}) => {
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
    "1" +
    "T00:00:00";
  const from = useRef(datetime);
  const to = useRef(datetime);
  const start = useRef("");
  const end = useRef("");
  const pageno = useRef(1);
  const page_size = useRef(10);
  const location = useRef("");
  const DeliveryType = useRef("");
  useEffect(() => {
    getdeliverytype();
    getAllOutlet().then((result) => {
      setoutletlist(result);
    });
  }, []);

  useEffect(() => {
    getDeliveryReport(
      start.current,
      end.current,
      "",
      "",
      "",
      "Delivered",

      "",
      location.current,
      "",
      DeliveryType.current,
      pageno.current,
      page_size.current
    ).then(function (result) {
      setData(result);
      console.log(result);
      setloading(false);
    });
  }, [reload]);

  const PickerWithType = ({ type, onChange }) => {
    if (type === "time") return <TimePicker onChange={onChange} />;
    if (type === "date") return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
  };

  const SwitchablePicker = () => {
    return (
      <Row wrap={false}>
        <Col flex="auto">
          Select a date range :
          {/* <PickerWithType type={type} onChange={(value) => console.log(value)} /> */}
          <RangePicker
            style={{ width: "80%" }}
            picker={type}
            onChange={(value) => {
              if (value) {
                from.current = value[0].format("YYYY-MM-DD");
                to.current = value[1].format("YYYY-MM-DD");
                start.current = value[0].format("YYYY-MM-DD") + "T00:00:00";
                end.current = value[1].format("YYYY-MM-DD") + "T23:59:59";
                setreload(!reload);
              }
            }}
          />
          <Select value={type} onChange={setType} style={{ width: "20%" }}>
            <Option value="date">Date</Option>

            <Option value="month">Month</Option>

            <Option value="year">Year</Option>
          </Select>
        </Col>
        <Col flex="auto">
          Outlet:
          <Select
            placeholder="Please select a outlet"
            // defaultValue={
            //   Auth.profile.branch.is_outlet ? Auth.profile.branch.id : ""
            // }
            disabled={
              Auth.superuser ||
              Auth.profile.user_role.id == 10 ||
              Auth.profile.user_role.id == 36 ||
              Auth.profile.user_role.id == 38 ||
              Auth.profile.user_role.id == 6 ||
              Auth.profile.user_role.id == 29
                ? false
                : true
            }
            style={{ width: "100%", minWidth: "200px" }}
            onChange={(e) => {
              location.current = e;
              setreload(!reload);
            }}
          >
            <Option value="">All</Option>
            {outletlist.map((outlet) => {
              return <Option value={outlet.id}>{outlet.name}</Option>;
            })}
          </Select>
        </Col>
        <Col flex="auto">
          Courier :
          <Select
            placeholder="Please choose a courier"
            style={{ fontWeight: "400", width: "100%", minWidth: "200px" }}
            onChange={(e) => {
              DeliveryType.current = e;
              setreload(!reload);
            }}
          >
            <Option value="">All</Option>
            {courier.map((method) => {
              return <Option value={method.id}> {method.name}</Option>;
            })}
          </Select>
        </Col>
        <Col flex="auto">
          Data:
          <Excelldownload data={data} data1={data1} />
        </Col>
      </Row>
    );
  };

  const Rendercontent = () => {
    return (
      <>
        <Row>
          {/* <Calendar /> */}
          <Col
            style={{ padding: "1rem", border: "1px solid whitesmoke" }}
            span={24}
          >
            {SwitchablePicker()}
            <Divider />
            {/* <DemoDualAxes data1={data} data2={data} /> */}
          </Col>
          <Col
            span={24}
            style={{ padding: "1rem", border: "1px solid whitesmoke" }}
          >
            <Spin spinning={loading}>
              <RenderTable
                List={data}
                pageno={pageno}
                page_size={page_size}
                setreload={setreload}
                reload={reload}
                setloading={setloading}
              />
            </Spin>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Report</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">{Rendercontent()}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    courier: state.settings.deliverytype,
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getSalesReportByInvoiceCount,
  getDeliveryReport,
  getAllOutlet,
  getdeliverytype,
  getSalesReportP,
})(DeliveryReport);
