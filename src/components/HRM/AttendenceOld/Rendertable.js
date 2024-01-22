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
} from "antd";

import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const { TextArea } = Input;
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
    const employeeList = this.props.employees;
    const newData = [...this.props.List];

    // console.log("render table");
    // console.log(employeeList);
    const format = "h:mm a";
    const format24 = "HH:mm";
    const dateFormat = "YYYY-MM-DD";

    const date = moment({ ...this.props.date }).format(dateFormat);

    // console.log(employeeList);

    const onConfirm = () => {
      this.props.loading.current = true;
      let promises = [];
      employeeList.forEach((data) => {
        console.log(data);
        const value = {
          ...data,
          attendanceDate: date,
          shift: this.props.shift,
        };
        promises.push(this.props.create(value));
      });
      Promise.all(promises).then((values) => {
        message.success("Attendance Updated");
        this.props.setUpdatelist(true);
        // window.location.reload(true);
      });
    };

    const checkBoxChange = (key, index, value) => (e) => {
      employeeList[index][key] = e.target.checked;
      this.setState({ checked: e.target.checked });
    };

    const timeChange = (key, index, value) => {
      let time = value.format(format24);
      employeeList[index][key] = time;
      this.setState({ value });

      // let diffFormattedEntry = 0;
      // let diffFormattedExit = 0;
      // let overTime = 0;
      // let defaultEntryValue = moment(
      //   employeeList[index]["defaultEntryTime"],
      //   format24
      // );
      // let entryTime = moment(employeeList[index]["entryTime"], format24);
      // let entryDiff = entryTime.diff(defaultEntryValue, "minutes");
      // let entryLateHour = Math.floor(entryDiff / 60);
      // let entryLateMinute = (entryDiff - entryLateHour * 60) / 100;
      // diffFormattedEntry = parseFloat(entryLateHour + entryLateMinute);
      // diffFormattedEntry = diffFormattedEntry>0.15 ? diffFormattedEntry: 0;

      // let defaultExitValue = moment(
      //   employeeList[index]["defaultExitTime"],
      //   format24
      // );
      // let exitTime = moment(employeeList[index]["exitTime"], format24);
      // let exitDiff = exitTime.diff(defaultExitValue, "minutes");
      // if(exitDiff < 0)
      // {
      //   console.log("exitDiff < 0");
      //   console.log(exitDiff);
      //   exitDiff = exitDiff * -1;
      //   console.log(exitDiff);
      //   let exitLateHour = Math.floor(exitDiff / 60);
      //   console.log(exitLateHour);
      //   let exitLateMinute = (exitDiff - exitLateHour * 60) / 100;
      //   console.log(exitLateMinute);
      //   diffFormattedExit = parseFloat(exitLateHour + exitLateMinute);
      //   console.log(diffFormattedExit);
      //   diffFormattedExit = diffFormattedExit>0.15 ? diffFormattedExit : 0;
      //   console.log(diffFormattedExit);
      // }
      // else
      // {
      //   let exitLateHour = Math.floor(exitDiff / 60);
      //   let exitLateMinute = (exitDiff - exitLateHour * 60) / 100;
      //   diffFormattedExit = parseFloat(exitLateHour + exitLateMinute);
      //   overTime = diffFormattedExit;
      //   diffFormattedExit = 0;
      // }
      // let diffFormatted = diffFormattedEntry + diffFormattedExit;
      // LateTimeChange("lateTime", index, diffFormatted);
      // overTimeChange("overTime", index, overTime);
    };
    const overTimeChange = (key, index, value) => {
      // console.log("over time change");
      employeeList[index][key] = value;
      // console.log(employeeList[index][key]);
      this.setState({ value });
    };
    const LateTimeChange = (key, index, value) => {
      // console.log("late time change");
      employeeList[index][key] = value;
      this.setState({ value });
    };

    const NoteChange = (key, index) => (e) => {
      employeeList[index][key] = e.target.value;
    };

    const columns = [
      // {
      //   title: "SL.",
      //   key: "index",
      //   render: (text, record, index) => index + 1,
      // },
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        // width: "20%",
        ...this.getColumnSearchProps("id"),
        // render: (text, record, index) => 1000 + text["id"],
      },
      {
        title: "Employee",
        dataIndex: "title",
        key: "name",
        // width: "20%",
        ...this.getColumnSearchProps("title"),
      },
      {
        title: "Present",
        dataIndex: "isAttended",
        key: "isAttended",
        render: (text, record, index) => (
          <Checkbox
            onChange={checkBoxChange("isAttended", index)}
            checked={employeeList[index]["isAttended"]}
          />
        ),
      },
      {
        title: "Entry Time",
        dataIndex: "entryTime",
        key: "entryTime",
        width: "20%",
        render: (text, record, index) => (
          <TimePicker
            disabled={!employeeList[index]["isAttended"]}
            use12Hours
            onChange={(time) => timeChange("entryTime", index, time)}
            value={moment(employeeList[index]["entryTime"], format)}
            format={format}
          />
        ),
      },
      {
        title: "Exit Time",
        dataIndex: "exitTime",
        key: "exitTime",
        width: "20%",
        render: (text, record, index) => (
          <TimePicker
            disabled={!employeeList[index]["isAttended"]}
            use12Hours
            onChange={(time) => timeChange("exitTime", index, time)}
            value={moment(employeeList[index]["exitTime"], format)}
            format={format}
          />
        ),
      },
      // {
      //   title: "Over Time",
      //   dataIndex: "overTime",
      //   key: "overTime",
      //   width: "7%",
      //   // render: (text, record, index) => (
      //   //   <InputNumber
      //   //     disabled={true}
      //   //     defaultValue="0.00"
      //   //     min="0"
      //   //     max="10"
      //   //     step="0.01"
      //   //     placeholder="overTime"
      //   //     onChange={(value) => overTimeChange("overTime", index, value)}
      //   //     defaultValue={employeeList[index]["overTime"]}
      //   //   />
      //   // ),
      //   render: (text, record, index) => (
      //     <>{parseFloat(employeeList[index]["overTime"]).toFixed(2)}</>
      //   ),
      // },
      // {
      //   title: "Late / Early Leave",
      //   dataIndex: "lateTime",
      //   key: "lateTime",
      //   width: "10%",
      //   // render: (text, record, index) => (
      //   //   <InputNumber
      //   //     disabled={true}
      //   //     defaultValue="0.00"
      //   //     min="0"
      //   //     max="10"
      //   //     step="0.01"
      //   //     placeholder="lateTime"
      //   //     onChange={(value) => LateTimeChange("lateTime", index, value)}
      //   //     value={employeeList[index]["lateTime"]}
      //   //     defaultValue={employeeList[index]["lateTime"]}
      //   //   />
      //   // ),
      //   render: (text, record, index) => (
      //     <>{parseFloat(employeeList[index]["lateTime"]).toFixed(2)}</>
      //   ),
      // },

      {
        title: "Note",
        dataIndex: "note",
        key: "note",
        render: (text, record, index) => (
          <TextArea
            disabled={!employeeList[index]["isAttended"]}
            placeholder="Note"
            onChange={NoteChange("note", index)}
            defaultValue={employeeList[index]["note"]}
            maxLength={255}
          />
        ),
      },
    ];

    return (
      <div style={{ padding: 20 }}>
        <Table columns={columns} dataSource={employeeList} pagination={false} />
        <div className="action-btn">
          <Button type="primary" onClick={onConfirm}>
            Update
          </Button>
        </div>
      </div>
    );
  }
}

export default Rendertable;
