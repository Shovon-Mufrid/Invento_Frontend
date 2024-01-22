import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Skeleton, Tree, Row, Col, Divider } from "antd";
import { getAllreceivevoucher } from "../../../actions/accounting/ReceiveVoucher";
import RenderTable from "./RenderTable";

const List = ({ getAllreceivevoucher, reload, setreload, showlist }) => {
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getAllreceivevoucher().then((result) => {
      setdata(result);
      setloading(false);
      setreload(false);
    });
  }, [reload]);

  const renderList = (type) => {
    return data.map((account) => {
      if (
        account.account_code > 10000 &&
        type == account.Group[0].account_name
      ) {
        return (
          <>
            <Row>
              <Col span={3}>
                {account.account_code}/ {account.id}
              </Col>
              <Col span={5}>
                {!account.Group ? (
                  <h4>{account.account_name}</h4>
                ) : (
                  account.account_name
                )}
              </Col>

              <Col span={4}>
                {account.Group ? account.Group[0].account_name : "-"}
              </Col>
              <Col span={5}>{account.Sub_group ? account.Sub_group : "-"}</Col>
              <Col span={3}>
                {account.Financial_statement
                  ? account.Financial_statement
                  : "-"}
              </Col>
              <Col span={2}>
                {account.normally_Debit == "Debit" ? "Debit" : "Credit"}
              </Col>
              <Col span={1}>
                {/* <EditCategory
                  id={account.id}
                  reload={reload}
                  setreload={setreload}
                /> */}
              </Col>
            </Row>
          </>
        );
      }
    });
  };

  if (loading) {
    return <Skeleton active />;
  } else {
    return (
      <>
        <RenderTable List={data} />
      </>
    );
  }
};

export default connect(null, {
  getAllreceivevoucher,
})(List);
