import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Skeleton, Tree, Row, Col, Divider, Timeline, Pagination } from "antd";
import { getlog } from "../../actions/userlogAction";
import dateFormat from "dateformat";
import moment from "moment";

const List = ({ getlog, module, id, design }) => {
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);
  const [reload, setreload] = useState(false);
  const pageno = useRef(1);
  const page_size = useRef(100);

  const onChange = (page) => {
    pageno.current = page;
    setreload(!reload);
  };

  useEffect(() => {
    setloading(true);
    getlog(pageno.current, page_size.current, module, id).then((result) => {
      setdata(result);
      setloading(false);
    });
  }, [reload]);

  const rendertable = (details) => {
    for (let key in details) {
      if (details.hasOwnProperty(key)) {
        console.log(key + ":");
        console.log("  Old Value: " + details[key].oldValue);
        console.log("  New Value: " + details[key].newValue);
      }
    }
  };

  const datamodule = () => {
    return <></>;
  };

  if (loading) {
    return <Skeleton active />;
  } else {
    return (
      <>
        <h3>History</h3>
        {design == 1 ? (
          <Timeline>
            {data?.results.map((item) => {
              let event = item && item?.action.split(" ")[0];
              let parts = item && item?.action.split(/\(|\)/);
              let details = {};
              if (parts.length > 1) {
                console.log(parts[1]);
                let invoiceDetails = parts[1];
                let items = invoiceDetails.split(", "); // split by comma and space
                for (let i = 0; i < items.length; i++) {
                  let parts = items[i].split(": "); // split by colon and space

                  if (parts.length > 1) {
                    let key = parts[0];
                    let values = parts[1].split(" -> "); // split by arrow and space
                    let oldValue = values[0];
                    let newValue = values[1];
                    details[key] = {
                      oldValue: oldValue,
                      newValue: newValue,
                    };
                  }
                }
              }
              return (
                <Timeline.Item color="green">
                  <Row>
                    <Col flex="auto">
                      <h5>
                        {event} by {item.created_by}
                      </h5>
                    </Col>
                    <Col flex="200px">
                      <h5>
                        {moment(item.timestamp).format("YYYY-MM-DD hh:mm A")}
                      </h5>
                    </Col>
                  </Row>
                  {/* {item?.action} */}
                  <table style={{ width: "100%" }}>
                    {Object.entries(details).map(([key, value]) => {
                      return (
                        <>
                          <tr>
                            <td>{key}</td>
                            <td>{value.oldValue}</td>
                            <td>{value.newValue}</td>
                          </tr>
                        </>
                      );
                    })}
                  </table>
                </Timeline.Item>
              );
            })}
          </Timeline>
        ) : (
          <table
            // style={{
            //   width: "100%",
            //   border: "1px solid lightgray",
            //   padding: "5px",
            // }}
            className="history_table"
          >
            <tr>
              <th>Action</th>
              <th>User</th>
              <th>Time</th>
              <th>Field</th>
              <th>Previous</th>
              <th>New</th>
            </tr>
            {data?.results.map((item) => {
              // console.log(item);
              let event = item && item?.action.split(" ")[0];
              let parts = item && item?.action.split(/\(|\)/);
              let previous = "";
              let details = {};
              // console.log(parts);
              if (parts.length > 1) {
                let invoiceDetails = parts[1];
                let items = invoiceDetails.split(", "); // split by comma and space
                for (let i = 0; i < items.length; i++) {
                  let parts = items[i].split(": "); // split by colon and space
                  // console.log(parts);
                  if (parts.length > 1) {
                    let key = parts[0];
                    let values = parts[1].split(" -> "); // split by arrow and space
                    let oldValue = values[0];
                    let newValue = values[1];
                    details[key] = {
                      oldValue: oldValue,
                      newValue: newValue,
                    };
                  }
                }
              }
              // console.log(details);
              return (
                <>
                  {Object.entries(details).map(([key, value]) => {
                    if (previous == value.oldValue) {
                      return (
                        <>
                          <tr>
                            <td>{event}</td>
                            <td>{item.created_by}</td>
                            <td>
                              {moment(item.timestamp).format(
                                "YYYY-MM-DD hh:mm A"
                              )}
                            </td>
                            <td>{key}</td>
                            <td style={{ backgroundColor: "orange" }}>
                              {value.oldValue}
                            </td>
                            <td style={{ backgroundColor: "orange" }}>
                              {value.newValue}
                            </td>
                          </tr>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <tr>
                            <td>{event}</td>
                            <td>{item.created_by}</td>
                            <td>
                              {moment(item.timestamp).format(
                                "YYYY-MM-DD hh:mm A"
                              )}
                            </td>
                            <td>{key}</td>
                            <td>{value.oldValue}</td>
                            <td> {value.newValue}</td>
                          </tr>
                        </>
                      );
                    }
                    previous = value.oldValue;
                  })}
                </>
              );
            })}
          </table>
        )}
        <Pagination
          // showSizeChanger
          // onShowSizeChange={onShowSizeChange}
          defaultPageSize={page_size.current}
          current={pageno.current}
          onChange={onChange}
          total={data?.count}
        />
      </>
    );
  }
};

export default connect(null, {
  getlog,
})(List);
