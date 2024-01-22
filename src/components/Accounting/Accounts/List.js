import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Skeleton, Tree, Row, Col, Divider, Collapse } from "antd";
import { getAllAccount } from "../../../actions/accountsAction";
import { getAllLocation } from "../../../actions/warehouseAction";
import { getaccountsparent } from "../../../actions/settings";
import EditCategory from "./EditCategory";
import CreateNewChart from "./CreateNewChart";
import Rendertable from "./Rendertable";
import History from "./History";

const { Panel } = Collapse;

const List = ({
  getAllAccount,
  reload,
  setreload,
  getAllLocation,
  getaccountsparent,
}) => {
  var formatter = new Intl.NumberFormat("en-IN");
  const [data, setdata] = useState();
  const [location, setlocation] = useState();
  const [loading, setloading] = useState(true);
  const [accounts, setaccounts] = useState();
  const cash = useRef(0);
  const bank = useRef(0);
  const mobile = useRef(0);
  const cashonhand = useRef(0);
  const pettycash = useRef(0);

  const callback = (key) => {
    console.log(key);
  };

  useEffect(() => {
    setloading(true);
    getaccountsparent().then((rs) => {
      setaccounts(rs);
      getAllLocation().then((result) => {
        for (let i = 0; i < result.length; i++) {
          cashonhand.current =
            parseFloat(cashonhand.current) + parseFloat(result[i].cash);
          pettycash.current =
            parseFloat(pettycash.current) + parseFloat(result[i].petty_cash);
        }
        setlocation(result);
      });
      getAllAccount().then((result) => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].type == "Cash") {
            console.log(result[i]);
            cash.current =
              parseFloat(cash.current) + parseFloat(result[i].cash);
          } else if (result[i].type == "Bank") {
            bank.current =
              parseFloat(bank.current) + parseFloat(result[i].cash);
          } else {
            mobile.current =
              parseFloat(mobile.current) + parseFloat(result[i].cash);
          }
        }
        // cash.current = cash.current + cashonhand.current + pettycash.current;
        cash.current = cash.current + cashonhand.current;
        setdata(result);
        setloading(false);
        // setreload(false);
      });
    });
  }, [reload]);

  const renderdata = (source) => {
    if (!loading) {
      return accounts.map((account) => {
        if (account.Type == source) {
          let parent = account.name;
          let count = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].accountparent == account.id) {
              count += parseFloat(data[i].cash);
            }
          }
          return (
            <>
              <Row style={{ padding: "10px" }}>
                <Col span={14}>
                  <b>{account.name}</b>
                </Col>
                <Col span={4}>
                  <b>Total : {formatter.format(count)}</b>
                </Col>
              </Row>

              {data.map((d) => {
                if (d.accountparent == account.id) {
                  return (
                    <Row style={{ padding: "10px" }}>
                      <Col span={5}>{d.name}</Col>
                      <Col span={5}>{d.account_no}</Col>
                      <Col span={5}>{d.address}</Col>
                      <Col span={5}>{formatter.format(d.cash)}</Col>
                      <Col span={4}>
                        <EditCategory
                          id={d.id}
                          reload={reload}
                          setreload={setreload}
                        />
                        {/* <History module={39} id={d.id} design={2} /> */}
                      </Col>
                    </Row>
                  );
                }
              })}
            </>
          );
        }
      });
    }
  };

  if (loading) {
    return <Skeleton active />;
  } else {
    return (
      <>
        <Row>
          <Col span={24}>
            <CreateNewChart setreload={setreload} reload={reload} />
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <h3>
              <u>Account Name</u>
            </h3>
          </Col>
          <Col span={5}>
            <h3>
              <u>Account Number</u>
            </h3>
          </Col>

          <Col span={5}>
            <h3>
              <u>Location</u>
            </h3>
          </Col>
          <Col span={5}>
            <h3>
              <u>Cash</u>
            </h3>
          </Col>
          <Col span={4}>
            <h3>
              <u>Action</u>
            </h3>
          </Col>
        </Row>
        <Collapse defaultActiveKey={["1"]} onChange={callback} ghost>
          <Panel
            header={
              <Row>
                <Col span={14}>
                  <h1>Cash</h1>
                </Col>
                <Col span={4}>Total : {formatter.format(cash.current)}</Col>
              </Row>
            }
            key="1"
          >
            {data.map((account) => {
              if (account.type == "Cash") {
                return (
                  <Row style={{ padding: "10px" }}>
                    <Col span={5}>{account.name} (Central)</Col>
                    <Col span={5}>{account.account_no}</Col>
                    <Col span={5}>
                      <div
                        className="d-div"
                        dangerouslySetInnerHTML={{ __html: account.address }}
                      ></div>
                    </Col>
                    <Col span={5}>
                      {formatter.format(cash.current - cashonhand.current)}
                    </Col>
                    <Col span={4}>
                      <EditCategory
                        id={account.id}
                        reload={reload}
                        setreload={setreload}
                      />
                      {/* <History module={39} id={account.id} design={2} /> */}
                    </Col>
                  </Row>
                );
              }
            })}
            <Row style={{ padding: "10px" }}>
              <Col span={5}>Cash on hand (Outlet)</Col>
              <Col span={5}></Col>
              <Col span={5}></Col>
              <Col span={5} style={{ marginBottom: "10px" }}>
                {formatter.format(cashonhand.current)}
              </Col>
              <Col span={4}></Col>
            </Row>
            {/* <Row style={{ padding: "10px" }}>
              <Col span={5}>Petty cash</Col>
              <Col span={5}></Col>
              <Col span={5}></Col>
              <Col span={5} style={{ marginBottom: "10px" }}>
                {pettycash.current}
              </Col>
              <Col span={4}></Col>
            </Row> */}
            {/* {location.map((loc) => {
              return (
                <Row style={{ padding: "10px" }}>
                  <Col span={5}>{loc.name}</Col>
                  <Col span={5}>{loc.account_no}</Col>
                  <Col span={5}></Col>
                  <Col span={5}>{loc.cash}</Col>
                  <Col span={4}></Col>
                </Row>
              );
            })} */}
          </Panel>

          <Panel
            header={
              <Row>
                <Col span={14}>
                  <h1>Bank</h1>
                </Col>
                <Col span={4}>Total : {formatter.format(bank.current)}</Col>
              </Row>
            }
            key="2"
          >
            {renderdata("Bank")}
          </Panel>
          <Panel
            header={
              <Row>
                <Col span={14}>
                  <h1>Mobile banking</h1>
                </Col>
                <Col span={4}>Total : {formatter.format(mobile.current)}</Col>
              </Row>
            }
            key="3"
          >
            {renderdata("Mobile Banking")}
          </Panel>
        </Collapse>

        {/* <Rendertable List={data} setreload={setreload} /> */}
      </>
    );
  }

  // return (
  //   <>{/* <Tree onSelect={onSelect} onCheck={onCheck} treeData={List} /> */}</>
  // );
};

export default connect(null, {
  getAllAccount,
  getAllLocation,
  getaccountsparent,
})(List);
