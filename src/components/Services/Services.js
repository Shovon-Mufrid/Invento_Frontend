import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { getAllServices, getAllServicesP } from "../../actions/invoiceItem";
import { getAllEmployee } from "../../actions/employeeAction";
import RenderServiceTable from "./RenderServiceTablefromservice";

import {
  Divider,
  Row,
  Col,
  Affix,
  Button,
  message,
  Space,
  AutoComplete,
  DatePicker,
  Select,
} from "antd";

import { Layout, Breadcrumb } from "antd";
const { RangePicker } = DatePicker;
const { Content } = Layout;
const { Option } = Select;

const Index = ({
  getAllServices,
  getAllServicesP,
  getAllEmployee,
  employeeList,
}) => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [loadServicepage, setloadServicepage] = useState(false);
  const [type, setType] = useState("date");
  const start = useRef("");
  const end = useRef("");
  const keyward = useRef("");
  const employe = useRef("");
  const pageno = useRef(1);
  const page_size = useRef(10);

  useEffect(() => {
    getAllEmployee();
    getAllServicesP(
      start.current,
      end.current,
      keyward.current,
      pageno.current,
      page_size.current,
      employe.current
    ).then(function (result) {
      setData(result);
      setloading(false);
    });
  }, [loadServicepage]);

  const onChange = (event) => {
    if (event.keyCode == 13) {
      pageno.current = 1;
      keyward.current = event.target.value;
      setloadServicepage(!loadServicepage);
    }
  };

  const SwitchablePicker = () => {
    return (
      <Row>
        <Col span={20}>
          <Space>
            {/* <PickerWithType type={type} onChange={(value) => console.log(value)} /> */}
            Keyward :
            <AutoComplete
              placeholder="input search text"
              // onChange={onChange}
              onKeyUp={onChange}
              style={{ width: "200px" }}
            />
            Issue date :
            <RangePicker
              picker={type}
              onChange={(value) => {
                if (value) {
                  start.current = value[0].format("YYYY-MM-DD") + "T00:00:00";
                  end.current = value[1].format("YYYY-MM-DD") + "T23:59:59";
                  setloadServicepage(!loadServicepage);
                }
              }}
            />
            Employee :
            <Select
              showSearch
              placeholder="Please choose an assignee"
              style={{ fontWeight: "400", width: "200px" }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => {
                employe.current = value;
                setloadServicepage(!loadServicepage);
              }}
            >
              <Option value="">All</Option>;
              {employeeList.map((employee) => {
                if (employee.branchName == "Factory") {
                  return <Option value={employee.id}>{employee.name}</Option>;
                }
              })}
            </Select>
          </Space>
        </Col>
      </Row>
    );
  };
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>All Orders</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background main-frame">
        {SwitchablePicker()}
        <Divider />
        {loading ? (
          "loading"
        ) : (
          <RenderServiceTable
            List={data}
            setloadServicepage={setloadServicepage}
            pageno={pageno}
            page_size={page_size}
            loadServicepage={loadServicepage}
            setloading={setloading}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeList: state.employee.employeelist,
  };
};

export default connect(mapStateToProps, {
  getAllServices,
  getAllServicesP,
  getAllEmployee,
})(Index);
