import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { DatePicker, Select, TreeSelect, Col, Space, Row, Spin } from "antd";
import EmployeeList from "./EmployeeList";
import CreateNewEmployee from "./CreateNewEmployee";
import Excelldownload from "./Excelldownload";
import { getAllLocation } from "../../../actions/warehouseAction";

const { Option } = Select;

const Maincontent = ({ auth, getAllLocation, locationList }) => {
  const [updatelist, setUpdatelist] = useState(true);
  const [location, setlocation] = useState(auth.profile.Office);
  const [data, setData] = useState([]);
  const loading = useRef(true);
  useEffect(() => {
    getAllLocation();
  }, []);

  return (
    <>
      <div className="site-layout-background main-frame">
        <Row wrap={false}>
          <Col flex="auto">
            <Excelldownload data={data} data1={data} />
          </Col>
          {auth.superuser ? (
            <Col flex="auto" style={{ display: 'flex', marginBottom: '20px' }}>
              {/* Locations :{" "} */}
              <span style={{ marginRight: '10px',  }}> <b style={{fontSize:'16px'}}>Location :</b></span>
              <TreeSelect
                style={{ flex: 1 }}
                treeData={locationList}
                defaultValue={location}
                onChange={(value) => {
                  setlocation(value);
                  setUpdatelist(!updatelist);
                }}
              />
            </Col>
          ) : (
            ""
          )}
          {auth.permissions.includes("HRM.Employee_is_create") ? (
            <Col flex="auto">
              <CreateNewEmployee
                setUpdatelist={setUpdatelist}
                updatelist={updatelist}
              />
            </Col>
          ) : (
            ""
          )}
        </Row>

        <Spin spinning={loading.current}>
          <EmployeeList
            loading={loading}
            location={location}
            updatelist={updatelist}
            setUpdatelist={setUpdatelist}
            setData={setData}
          />
        </Spin>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    locationList: state.warehouse.locationlist,
  };
};

export default connect(mapStateToProps, { getAllLocation })(Maincontent);
