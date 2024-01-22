import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import { getAllInvoices } from "../../actions/invoiceItem";
import { getAllOutlet } from "../../actions/warehouseAction";
import { getSalesReport, getSalesReportP } from "../../actions/report";
import RenderTable from "./RenderTable";
import { Divider, Skeleton, Space } from "antd";
import {
  Layout,
  Breadcrumb,
  DatePicker,
  Select,
  AutoComplete,
  Row,
  Col,
} from "antd";
const { RangePicker } = DatePicker;
const { Content } = Layout;
const { Option } = Select;
const Index = ({ getSalesReport, getSalesReportP, Auth, getAllOutlet }) => {
  const [data, setData] = useState([]);
  const pageno = useRef(1);
  const page_size = useRef(10);
  const [reload, setreload] = useState(false);
  const [update, setUpdate] = useState(false);
  const [outletlist, setoutletlist] = useState([]);
  const [type, setType] = useState("date");
  const start = useRef("");
  const end = useRef("");
  const keyward = useRef("");
  const status = useRef("");
  const location = useRef(Auth.superuser ? "" : Auth.profile.branch.id);

  useEffect(() => {
    getAllOutlet().then((result) => {
      setoutletlist(result);
    });
    getSalesReportP(
      start.current,
      end.current,
      keyward.current,
      "",
      "",
      "",
      status.current,
      "",
      location.current,
      "",
      pageno.current,
      page_size.current
    ).then(function (result) {
      setData(result);
      setUpdate(true);
    });
  }, [reload]);

  const onChange = (event) => {
    if (event.keyCode == 13) {
      pageno.current = 1;
      keyward.current = event.target.value;
      setreload(!reload);
    }
  };

  const rendertable = () => {
    if (update) {
      return (
        <RenderTable
          List={data}
          pageno={pageno}
          page_size={page_size}
          setreload={setreload}
          reload={reload}
          setUpdate={setUpdate}
        />
      );
    } else {
      return <Skeleton active />;
    }
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>All Orders</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        <Row>
          <Space>
            Keyward :
            <AutoComplete
              placeholder="input search text"
              // onChange={onChange}
              onKeyUp={onChange}
              style={{ width: "200px" }}
            />
            Issue Date :
            <RangePicker
              style={{ width: "100%" }}
              picker={type}
              onChange={(value) => {
                if (value) {
                  if (type === "date") {
                    start.current = value[0].format("YYYY-MM-DD") + "T00:00:00";
                    end.current = value[1].format("YYYY-MM-DD") + "T23:59:59";
                  } else if (type === "month") {
                    start.current =
                      value[0].startOf("month").format("YYYY-MM-DD") +
                      "T00:00:00";
                    end.current =
                      value[1].endOf("month").format("YYYY-MM-DD") +
                      "T23:59:59";
                  } else if (type === "year") {
                    start.current =
                      value[0].startOf("year").format("YYYY-MM-DD") +
                      "T00:00:00";
                    end.current =
                      value[1].endOf("year").format("YYYY-MM-DD") + "T23:59:59";
                  }

                  setreload(!reload);
                }
              }}
            />
            Status :
            <Select
              style={{ width: 150 }}
              placeholder="Status"
              onChange={(value) => {
                status.current = value;
                setreload(!reload);
              }}
            >
              <Option value="">All</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Factory Received">Factory received</Option>
              <Option value="Outlet received">Outlet received</Option>
              <Option value="Ready">Ready</Option>
              <Option value="Picked by courier">Picked by courier</Option>
              <Option value="Delivered">Delivered</Option>
              <Option value="Paid">Paid</Option>
              <Option value="Booked">Booked</Option>
              <Option value="Exchanged">Exchanged</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
            {Auth.superuser ? (
              <>
                Outlet:
                <Select
                  style={{ width: 200 }}
                  placeholder="Please select a outlet"
                  // style={{ width: "100%" }}
                  onChange={(e) => {
                    console.log(e);
                    location.current = e;
                    setreload(!reload);
                  }}
                >
                  <Option value="">All</Option>
                  {outletlist.map((outlet) => {
                    return <Option value={outlet.id}>{outlet.name}</Option>;
                  })}
                </Select>
              </>
            ) : (
              ""
            )}
          </Space>
        </Row>
        <Divider />
        {rendertable()}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    Auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getSalesReport,
  getSalesReportP,
  getAllOutlet,
})(Index);
