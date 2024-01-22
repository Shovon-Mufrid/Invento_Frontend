import React, { useRef } from "react";
import {
  Table,
  Input,
  TimePicker,
  InputNumber,
  Checkbox,
  Button,
  Space,
  message,
  Select,
  Typography,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const { TextArea } = Input;
const { Text } = Typography;
var formatter = new Intl.NumberFormat("en-IN");
class Rendertable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8, marginTop: -140 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const employeeAttendanceList = [...this.props.List];
    const { Option } = Select;

    const format = "h:mm a";
    const format24 = "HH:mm";
    const dateFormat = "YYYY-MM-DD";

    // employeeAttendanceList.forEach(attendance => {
    //   attendance['entryTime'] = moment(attendance['entryTime'], format);
    //   attendance['exitTime'] = moment(attendance['exitTime'], format);

    // });
    // console.log("report render table");
    // console.log(employeeAttendanceList);

    const onConfirm = () => {
      employeeAttendanceList.forEach((data) => {
        // console.log(data["entryTime"]);
        // console.log(data["exitTime"]);
        const value = {
          ...data,
          entryTime: data["entryTime"].format(format24),
          exitTime: data["exitTime"].format(format24),
        };
        // console.log(value['attendanceDate']);
        // console.log(value['id']);
        // console.log(value['name']);
        // console.log(value['isAttended']);
        // console.log(value["entryTime"]);
        // console.log(value["exitTime"]);

        this.props.create(value);
      });
      message.success("Attendance Updated");
    };

    const checkBoxChange = (key, index, value) => (e) => {
      employeeAttendanceList[index][key] = e.target.checked;
      this.setState({ checked: e.target.checked });
    };
    function onChange(date, dateString) {
      console.log(date, dateString);
    }
    const ShiftChage = (key, index, value) => {
      // console.log(value);
      employeeAttendanceList[index][key] = value;
    };
    const timeChange = (key, index, value) => {
      if (value == null || value == undefined) return;
      let time = value.format(format24);
      employeeAttendanceList[index][key] = time;
      this.setState({ value });
    };
    const overTimeChange = (key, index, value) => {
      employeeAttendanceList[index][key] = value;
    };
    const LateTimeChange = (key, index, value) => {
      // console.log("late time change");
      employeeAttendanceList[index][key] = value;
      this.setState({ value });
    };
    const NoteChange = (key, index) => (e) => {
      // console.log(e.target.value);
      employeeAttendanceList[index][key] = e.target.value;
    };
    const dataUpdate = (index) => {
      employeeAttendanceList[index]["id"] =
        employeeAttendanceList[index]["employeeId"];
      this.props.create(employeeAttendanceList[index]).then((e) => {
        this.props.setUpdatelist(false);
      });
      // history.push("/attendance-report");
    };

    const columns = [
      // {
      //   title: 'SL.',
      //   key: 'index',
      //   render :(text, record, index) => index+1,
      // },
      {
        title: "Id",
        key: "employeeId",
        // width: "20%",
        // ...this.getColumnSearchProps("employeeId"),
        render: (text, record, index) => 1000 + text["employeeId"],
      },
      {
        title: "Name",
        dataIndex: "employeeName",
        key: "employeeName",
        // width: "20%",
        ...this.getColumnSearchProps("employeeName"),
      },
      {
        title: "Date",
        dataIndex: "attendanceDate",
        key: "attendanceDate",
        // width: "20%",
        ...this.getColumnSearchProps("attendanceDate"),
      },
      {
        title: "Shift",
        dataIndex: "shift",
        key: "shift",
        render: (text, record, index) => (
          <Select
            value={employeeAttendanceList[index]["shift"]}
            placeholder="Please choose Shift"
            onChange={(value) => ShiftChage("shift", index, value)}
          >
            <Option value="day">Day</Option>
            <Option value="night">Night</Option>
          </Select>
        ),
      },
      {
        title: "Present",
        dataIndex: "isAttended",
        key: "isAttended",
        render: (text, record, index) => (
          <Checkbox
            onChange={checkBoxChange("isAttended", index)}
            checked={employeeAttendanceList[index]["isAttended"]}
          />
        ),
      },
      {
        title: "Entry Time",
        dataIndex: "entryTime",
        key: "entryTime",
        width: "16%",
        render: (text, record, index) => (
          <TimePicker
            disabled={!employeeAttendanceList[index]["isAttended"]}
            use12Hours
            onChange={(time) => timeChange("entryTime", index, time)}
            value={moment(employeeAttendanceList[index]["entryTime"], format)}
            format={format}
          />
        ),
      },
      {
        title: "Exit Time",
        dataIndex: "exitTime",
        key: "exitTime",
        width: "16%",
        render: (text, record, index) => (
          <TimePicker
            disabled={!employeeAttendanceList[index]["isAttended"]}
            use12Hours
            onChange={(time) => timeChange("exitTime", index, time)}
            value={moment(employeeAttendanceList[index]["exitTime"], format)}
            format={format}
          />
        ),
      },
      {
        title: "Over Time",
        dataIndex: "overTime",
        key: "overTime",
        width: "3%",
        // render: (text, record, index) => (
        //   <InputNumber
        //     disabled={true}
        //     defaultValue="0.00"
        //     min="0"
        //     max="24"
        //     step="0.01"
        //     placeholder="overTime"
        //     onChange={(value) => overTimeChange("overTime", index, value)}
        //     defaultValue={employeeAttendanceList[index]["overTime"]}
        //   />
        // ),
        render: (text, record, index) => (
          <>
            {parseFloat(employeeAttendanceList[index]["overTime"]).toFixed(2)}
          </>
        ),
      },
      {
        title: "Late / Early Leave",
        dataIndex: "lateTime",
        key: "lateTime",
        width: "3%",
        // render: (text, record, index) => (
        //   <InputNumber
        //     disabled={true}
        //     defaultValue="0.00"
        //     min="0"
        //     max="24"
        //     step="0.01"
        //     placeholder="lateTime"
        //     onChange={(value) => LateTimeChange("lateTime", index, value)}
        //     value={employeeAttendanceList[index]["lateTime"]}
        //     defaultValue={employeeAttendanceList[index]["lateTime"]}
        //   />
        // ),
        render: (text, record, index) => (
          <>
            {parseFloat(employeeAttendanceList[index]["lateTime"]).toFixed(2)}
          </>
        ),
      },
      {
        title: "Note",
        dataIndex: "note",
        key: "note",
        render: (text, record, index) => (
          <TextArea
            disabled={!employeeAttendanceList[index]["isAttended"]}
            placeholder="Note"
            onChange={NoteChange("note", index)}
            defaultValue={employeeAttendanceList[index]["note"]}
            maxLength={255}
          />
        ),
      },
      {
        title: "Update",
        key: "key",
        dataIndex: "key",
        render: (text, record, index) => (
          <Button type="primary" size="small" onClick={() => dataUpdate(index)}>
            Update
          </Button>
        ),
      },
    ];

    return (
      <div style={{ padding: 20 }}>
        <Table
          columns={columns}
          dataSource={employeeAttendanceList}
          pagination={false}
          size="small"
          summary={(pageData) => {
            let TotaloverTime = 0;
            let TotallateTime = 0;
            let overTimeMin = 0;
            let lateTimeMin = 0;
            pageData.forEach(({ isAttended, lateTime, overTime }) => {
              if (isAttended) {
                let hr = parseInt(overTime);
                let min = parseFloat(overTime - hr) * 100;
                overTimeMin += hr * 60 + min;
                let hr1 = parseInt(lateTime);
                let min1 = parseFloat(lateTime - hr1) * 100;
                lateTimeMin += hr1 * 60 + min1;
              }
            });
            // console.log(overTimeMin);
            // console.log(lateTimeMin);
            let TotaloverTimeHr = Math.floor(overTimeMin / 60);
            TotaloverTime = parseFloat(
              TotaloverTimeHr + (overTimeMin - TotaloverTimeHr * 60) / 100
            );
            let TotallateTimeHr = Math.floor(lateTimeMin / 60);
            TotallateTime = parseFloat(
              TotallateTimeHr + (lateTimeMin - TotallateTimeHr * 60) / 100
            );
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={7}>
                    <b>Total</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell className="ant_right">
                    <Text>
                      <b>{formatter.format(TotaloverTime) + " Hr"}</b>
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell className="ant_right">
                    <Text>
                      <b>{formatter.format(TotallateTime) + " Hr"}</b>
                    </Text>
                  </Table.Summary.Cell>

                  <Table.Summary.Cell colSpan={5}></Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
        {/* <div className="action-btn">
          <Button type="primary" onClick={onConfirm}>
            Update
          </Button>
        </div> */}
      </div>
    );
  }
}

export default Rendertable;
