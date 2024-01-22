import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Skeleton, Tree, Row, Col, Divider, Timeline, Pagination } from "antd";
import { getinvoicelog } from "../../../../actions/userlogAction";
import dateFormat from "dateformat";
import moment from "moment";

const List = ({ getinvoicelog, invoiceID }) => {
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);
  const pageno = useRef(1);
  const page_size = useRef(100);

  useEffect(() => {
    getinvoicelog(pageno.current, page_size.current, 28, invoiceID).then(
      (result) => {
        setdata(result);
        setloading(false);
      }
    );
  }, []);

  const rendertable = (details) => {
    for (let key in details) {
      if (details.hasOwnProperty(key)) {
        console.log(key + ":");
        console.log("  Old Value: " + details[key].oldValue);
        console.log("  New Value: " + details[key].newValue);
      }
    }
  };

  if (loading) {
    return <Skeleton active />;
  } else {
    return (
      <>
        <h3>History</h3>
        <Timeline>
          {data.results.map((item) => {
            let event = item.action.split(" ")[0];
            let parts = item.action.split(/\(|\)/);
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
      </>
    );
  }
};

export default connect(null, {
  getinvoicelog,
})(List);
