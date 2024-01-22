import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Skeleton, Tree, Row, Col, Divider } from "antd";
import { getAllChartofaccounts } from "../../../actions/chartofaccountsAction";
import EditCategory from "./EditCategory";
import CreateNewChart from "./CreateNewChart";
// import History from "./History";

const List = ({ getAllChartofaccounts, reload, setreload }) => {
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    console.log(reload);
    getAllChartofaccounts().then((result) => {
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
              <Col span={3}>{account.account_code}</Col>
              <Col span={4}>
                {!account.Group ? (
                  <h4>{account.account_name}</h4>
                ) : (
                  account.account_name
                )}
              </Col>

              <Col span={2}>
                {account.Group ? account.Group[0].account_name : "-"}
              </Col>
              <Col span={3}>{account.Sub_group ? account.Sub_group : "-"}</Col>
              <Col span={3}>
                {account.Financial_statement
                  ? account.Financial_statement
                  : "-"}
              </Col>
              <Col span={2}>
                {account.normally_Debit == "Debit" ? "Debit" : "Credit"}
              </Col>
              <Col span={2}>{account.amount}</Col>
              <Col span={2}>{account.status}</Col>
              <Col span={3}>
                <EditCategory
                  id={account.id}
                  reload={reload}
                  setreload={setreload}
                />
                {/* <History module={40} id={account.id} design={2} /> */}
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
        <Row>
          <Col span={24}>
            <CreateNewChart setreload={setreload} />
          </Col>
        </Row>

        <Row
          style={{ borderBottom: "2px solid lightgray", margin: "10px 0px" }}
        >
          <Col span={3}>
            <h3>Code</h3>
          </Col>
          <Col span={4}>
            {" "}
            <h3>Account Name</h3>
          </Col>
          <Col span={2}>
            {" "}
            <h3>Group</h3>
          </Col>
          <Col span={3}>
            {" "}
            <h3>Sub group</h3>
          </Col>
          <Col span={3}>
            {" "}
            <h3>Financial statement</h3>
          </Col>
          <Col span={2}>
            {" "}
            <h3>On increase</h3>
          </Col>
          <Col span={2}>
            {" "}
            <h3>Amount</h3>
          </Col>
          <Col span={2}>
            {" "}
            <h3>Status</h3>
          </Col>
          <Col span={3}>
            {" "}
            <h3>Action</h3>
          </Col>
        </Row>
        {/* <Divider /> */}
        <h4>Assets (1000)</h4>
        {renderList("Assets")}
        <Divider />
        <h4>Liabilities (2000)</h4>
        {renderList("Liabilities")}
        <Divider />
        <h4>Expenses (4000)</h4>
        {renderList("Expense")}
        <Divider />
        <h4>Revenue (5000)</h4>
        {renderList("Revenue")}
        <Divider />
        <h4>Owner's equity (3000)</h4>
        {renderList("Owner's equity")}
      </>
    );
  }

  // return (
  //   <>{/* <Tree onSelect={onSelect} onCheck={onCheck} treeData={List} /> */}</>
  // );
};

export default connect(null, {
  getAllChartofaccounts,
})(List);
