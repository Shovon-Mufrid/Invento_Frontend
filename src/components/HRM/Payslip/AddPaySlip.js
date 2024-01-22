import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ReactToPrint from "react-to-print";

import {
  Form,
  Input,
  DatePicker,
  Col,
  Row,
  Select,
  Button,
  Checkbox,
  TreeSelect,
  InputNumber,
} from "antd";
import { getSpecificUserEmployeeLeave } from "../../../actions/employeeLeaveActions";
import { getSpecificEmployeeAttendence } from "../../../actions/AttendenceAction";
import { getSpecificUserEmployeeSalary } from "../../../actions/employeeSalaryActions";
import {
  getSpecificUserEmployeeLoan,
  updateEmployeeLoan,
} from "../../../actions/loanManagementAction";
import { createEmployeeLoanPayment } from "../../../actions/loanPaymentManagementAction";
import { createEmployeeSalaryPayment } from "../../../actions/SalaryPaymentAction";
import {
  createEmployeePaySlip,
  getSpecificUserEmployeeSalaryPayslip,
} from "../../../actions/PaySlipAction";
import { getAllEmployee } from "../../../actions/employeeAction";
import { getAllAccount } from "../../../actions/accountsAction";

const { Option } = Select;

const CreateNewPaySlip = ({
  getAllAccount,
  accountList,
  setUpdatelist,
  getAllEmployee,
  updatelist,
  employeeList,
  employeeSalary,
  employeeAttendancedetails,
  getSpecificUserEmployeeLeave,
  getSpecificEmployeeAttendence,
  getSpecificUserEmployeeSalary,
  getSpecificUserEmployeeLoan,
  updateEmployeeLoan,
  createEmployeeLoanPayment,
  createEmployeeSalaryPayment,
  createEmployeePaySlip,
  employeeLeave,
  employeeLoanlist,
  businessprofile,
  getSpecificUserEmployeeSalaryPayslip,
}) => {
  const [employee, setEmployee] = useState();
  const [employeeName, setEmployeeName] = useState();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState(30);
  const [holiday, setHoliday] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [attendanceDayShift, setAttendanceDayShift] = useState(0);
  const [attendanceNightShift, setAttendanceNightShift] = useState(0);
  const [overTimeDayShift, setOverTimeDayShift] = useState(0);
  const [overTimeNightShift, setOverTimeNightShift] = useState(0);
  const [defaultShift, setDefaultShift] = useState("day");
  const [defaultEntryTime, setDefaultEntryTime] = useState();
  const [defaultExitTime, setDefaultExitTime] = useState();
  const [leave, setLeave] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [late, setLate] = useState(0);
  const [nightHour, setNightHour] = useState(0);
  const [nightOverTimeBill, setNightOverTimeBill] = useState(0);
  const [dayOverTimeBill, setDayOverTimeBill] = useState(0);
  const [salary, setSalary] = useState(0);
  const [loan, setLoan] = useState(0);
  const [loanPaid, setLoanPaid] = useState(0);
  const [loanDue, setLoanDue] = useState(0);
  const [loanAdjustment, setLoanAdjustment] = useState(0);
  const [loanAdvance, setLoanAdvance] = useState(0);
  const [dailyAllowance, setdailyAllowance] = useState(0);
  const [dailyAllowanceTotal, setdailyAllowanceTotal] = useState(0);
  const [wageDay, setWageDay] = useState(0);
  const [wageHour, setWageHour] = useState(0);
  const [wageNight, setWageNight] = useState(0);
  const [incentive, setIncentive] = useState(0);
  const [inTotal, setInTotal] = useState(0);
  const [inTotalIncome, setInTotalIncome] = useState(0);
  const [inTotalDeduction, setInTotalDeduction] = useState(0);
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [ignoreLoan, setIgnoreLoan] = useState(false);
  const [calculateUpdate, setCalculateUpdate] = useState(0);
  const [fine, setFine] = useState(0);
  const [payment, setPayment] = useState(0);
  const [due, setDue] = useState(0);
  const payment2Limit = useRef(0);
  const [form] = Form.useForm();
  const format24 = "HH:mm";
  const componentRef = useRef();
  const [already_paid, setAlreadyPaid] = useState(false);

  const bill = useRef({
    PaymentMethod1: "Cash",
    AccountNumber1: "",
    amount1: 0,
    PaymentMethod2: "Cash",
    AccountNumber2: "",
    amount2: 0,
  });
  useEffect(() => {
    getAllEmployee();
    getAllAccount();
    setUpdatelist(true);
  }, [updatelist]);

  const onFinish = (values) => {
    //console.log(values);
    //console.log(employeeSalary[0]['employee']);
    values["salaryMonth"] = month;
    values["salaryYear"] = year;
    values["employee"] = employee;
    values["employee_id"] = employee;
    values["salary"] = employeeSalary[0]["id"];
    values["publicHoliday"] = holiday;
    values["dayOverTime"] = dayOverTimeBill;
    values["dayOverTime"] = dayOverTimeBill;
    values["nightOverTime"] = nightOverTimeBill;
    values["overtimeTotal"] = nightOverTimeBill + dayOverTimeBill;
    values["incentiveTotal"] = incentive;
    values["dailyAllowanceTotal"] = dailyAllowanceTotal;
    values["fine"] = fine;
    values["loan_adjustment"] = loanAdjustment;
    values["advance_adjustment"] = loanAdvance;
    values["net_salary"] = inTotal;
    values["paidAmount"] = inTotal;

    values["leave"] = leave;
    values["present"] = attendance;
    values["absent"] = absent;
    values["late"] = late;
    values["payment"] = payment;
    values["due"] = due;

    values["paymentDate"] = new Date().toISOString();
    let promises = [];
    promises.push(createEmployeeSalaryPayment(values));
    if (ignoreLoan == false) {
      employeeLoanlist.forEach((element) => {
        const value = {
          ...values,
          loan: element["id"],
          paidAmount: element["loanPayableAmount"],
          loanPaymentStatus: "ongoing",
        };
        promises.push(createEmployeeLoanPayment(value));
      });
    } else {
      employeeLoanlist.forEach((element) => {
        if (element["loanType"] == "advance") {
          const value = {
            ...values,
            loan: element["id"],
            paidAmount: element["loanPayableAmount"],
            loanPaymentStatus: "ongoing",
          };
          promises.push(createEmployeeLoanPayment(value));
        }
      });
    }

    promises.push(createEmployeePaySlip(values));
    Promise.all(promises).then((values) => {
      setUpdatelist(true);
    });
  };
  const onHolidayChange = (value) => {
    if (value == null || value == undefined) value = 0;
    setHoliday(parseInt(value));
  };
  const onEmployeeChange = (value) => {
    setEmployee(value);
  };
  var days = function (month, year) {
    return new Date(year, month, 0).getDate();
  };
  const onMonthChange = (value, dateString) => {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    const myArr = dateString.split("-");
    let year = myArr[0];
    let mnth = myArr[1];
    setYear(year);
    setMonth(mnth);
    setDaysInMonth(days(mnth, year));
  };

  useEffect(() => {
    if (
      employee == null ||
      employee == undefined ||
      month == null ||
      month == undefined ||
      year == null ||
      year == undefined
    )
      return;
    getSpecificUserEmployeeSalaryPayslip(employee, month, year).then(function (
      payslips
    ) {
      // console.log(payslips);
      // console.log(payslips.length);
      setAlreadyPaid(payslips.length == 0 ? false : true);
      setUpdatelist(!updatelist);
    });
    setLoan(0);
    setLoanPaid(0);
    setLoanDue(0);
    setLoanAdjustment(0);
    setLoanAdvance(0);
    setDaysInMonth(days(month, year));
    getSpecificUserEmployeeLeave(employee, "approved", month, year);
    getSpecificEmployeeAttendence(employee, month, year);
    getSpecificUserEmployeeSalary(employee);
    getSpecificUserEmployeeLoan(employee, "paid", "ongoing");
  }, [employee, month]);

  useEffect(() => {
    if (employee == undefined) return;
    let totalLeave = 0;
    employeeLeave.forEach((element) => {
      // console.log(element['leaveStart']);
      // console.log(element['leaveEnd']);
      let dates = [];
      let currDate = moment.utc(new Date(element["leaveStart"])).startOf("day");
      let lastDate = moment.utc(new Date(element["leaveEnd"])).startOf("day");
      do {
        if (
          moment(currDate.clone().toDate()).isSame(year + "-" + month, "month")
        ) {
          dates.push(currDate.clone().toDate());
        }
        // console.log(currDate.clone().toDate());
      } while (currDate.add(1, "days").diff(lastDate) <= 0);

      // console.log(dates);
      let len = dates.length;

      //console.log(len);
      totalLeave = totalLeave + len;

      //  form.setFieldsValue({
      //   NoOfLeaveTaken: leave
      // });
    });
    //console.log("Total Leave: "+ totalLeave);
    setLeave(parseInt(totalLeave));
  }, [employeeLeave]);

  useEffect(() => {
    if (employee == undefined) return;
    if (employeeSalary.length != 0) {
      setEmployeeName(employeeSalary[0]["employee"]["name"]);
      setSalary(employeeSalary[0]["monthlySalary"]);
      setdailyAllowance(employeeSalary[0]["dailyAllowance"]);
      setWageDay(employeeSalary[0]["dailyWage"]);
      setWageHour(employeeSalary[0]["perHourWageDay"]);
      setWageNight(employeeSalary[0]["perHourWageNight"]);
      setIncentive(employeeSalary[0]["incentive"]);
      setDesignation(employeeSalary[0]["employeeRole"]);
      setPhone(employeeSalary[0]["employeePhone"]);
      setAddress(employeeSalary[0]["employeeAddress"]);
      setDefaultShift(employeeSalary[0]["defaultShift"]);
      setDefaultEntryTime(employeeSalary[0]["defaultEntryTime"]);
      setDefaultExitTime(employeeSalary[0]["defaultExitTime"]);
    }
  }, [employeeSalary]);

  useEffect(() => {
    if (employee == undefined) return;
    //console.log(employeeLoanlist);
    if (employeeLoanlist.length != 0) {
      let totalLoan = 0;
      let totalLoanPaid = 0;
      let totalLoanDue = 0;
      let adjustment = 0;
      let advance = 0;

      employeeLoanlist.forEach((element) => {
        //console.log(element);

        if (element["loanType"] === "emi") {
          totalLoan = totalLoan + element["loanAmount"];
          totalLoanPaid = totalLoanPaid + element["total_paid"];
          totalLoanDue = totalLoanDue + element["total_due_payment"];
          let loanPayableMonths = element["loanPayableMonths"];
          let loanPayableAmount = element["loanPayableAmount"];
          let total_payment_count = element["total_payment_count"];
          if (loanPayableMonths > total_payment_count) {
            adjustment = adjustment + loanPayableAmount;
          } else {
            totalLoan = totalLoan - element["loanAmount"];
            totalLoanPaid = totalLoanPaid - element["total_paid"];
            totalLoanDue = totalLoanDue - element["total_due_payment"];
          }
        } else if (element["loanType"] === "advance") {
          if (element["total_paid"] != element["loanAmount"]) {
            advance = advance + element["loanAmount"];
          }
        }
      });
      setLoan(totalLoan);
      setLoanPaid(totalLoanPaid);
      setLoanDue(totalLoanDue);
      if (ignoreLoan) {
        //console.log("ignoring")
        adjustment = 0;
        // advance = 0;
      }
      setLoanAdjustment(adjustment);
      setLoanAdvance(advance);
    }
  }, [employeeLoanlist, ignoreLoan]);

  useEffect(() => {
    if (employee == undefined) return;
    let len = employeeAttendancedetails.length;
    //console.log("attendance");
    //console.log(len);

    let lateCount = 0;
    let nightHourCount = 0;
    let dayAttend = 0;
    let nightAttend = 0;
    let dayOverTime = 0;
    let nightOverTime = 0;
    employeeAttendancedetails.forEach((element) => {
      if (element["isLate"]) {
        lateCount = lateCount + 1;
      }

      if (element["isAttended"] === true && element["shift"] === "day") {
        dayAttend = dayAttend + 1;
        dayOverTime = dayOverTime + element["overTime"];
      }
      if (element["isAttended"] === true && element["shift"] === "night") {
        nightAttend = nightAttend + 1;
        nightOverTime = nightOverTime + element["overTime"];
      }
    });
    let totalAttendance = dayAttend + nightAttend;
    setAttendance(parseInt(totalAttendance));
    setAttendanceDayShift(dayAttend);
    setAttendanceNightShift(nightAttend);
    // not calculating over time hour automatically for now, so setting default to 0

    // setOverTimeDayShift(dayOverTime);
    // setOverTimeNightShift(nightOverTime);
    setOverTimeDayShift(0);
    setOverTimeNightShift(0);
    setLate(parseInt(lateCount));

    setdailyAllowanceTotal(dailyAllowance * totalAttendance);
  }, [employeeSalary, employeeAttendancedetails]);

  useEffect(() => {
    if (employee == undefined) return;
    // console.log(leave);
    // console.log(attendance);
    // console.log(holiday);
    let absence = daysInMonth - (leave + attendance + holiday);
    //console.log(leave + " " + attendance + " " + holiday);
    //console.log(absence);
    setAbsent(parseInt(absence));
    let latefine = parseInt(late / 3) * wageDay;
    let absencefine = absence * wageDay;
    //console.log("fine calculation");
    //console.log(late)
    //console.log(latefine);
    //console.log(absencefine);
    let fine = Math.round(latefine + absencefine);
    //console.log(fine);
    setFine(fine);
    // not calculating hourly wage for now,
    // calculating wage per day with 1.5x for night over time input from admin

    // let nightOverTime = overTimeNightShift * wageNight;
    // let dayOverTime = overTimeDayShift * wageHour;
    let nightOverTime = overTimeNightShift * wageNight * 5;
    let dayOverTime = overTimeDayShift * wageDay;
    //console.log('overtime');
    //console.log(overTimeNightShift);
    //console.log(wageNight);
    //console.log(nightOverTime);
    //console.log(dayOverTime);
    setNightOverTimeBill(Math.round(nightOverTime));
    setDayOverTimeBill(Math.round(dayOverTime));

    let inTotalIncome =
      salary + dailyAllowanceTotal + incentive + nightOverTime + dayOverTime;
    //console.log("total");
    //console.log(salary + " " + dailyAllowanceTotal + " " + incentive + " " + nightOverTime + " "+ dayOverTime);
    setInTotalIncome(Math.round(inTotalIncome));
    //console.log("in total income: " +inTotalIncome);
    let inTotalDeduction = fine + loanAdjustment + loanAdvance;
    //console.log("in total deduction: " +inTotalDeduction);
    setInTotalDeduction(Math.round(inTotalDeduction));

    let inTotalSalary = Math.round(inTotalIncome - inTotalDeduction);
    setInTotal(inTotalSalary);
  }, [
    salary,
    employeeSalary,
    employeeAttendancedetails,
    overTimeDayShift,
    overTimeNightShift,
    holiday,
    loanAdjustment,
    loanAdvance,
    late,
    incentive,
    dailyAllowanceTotal,
  ]);

  useEffect(() => {
    let due = inTotal - payment;
    //console.log(due);
    setDue(due);
  }, [payment]);

  const OverTimeNightChange = (value) => {
    //console.log(value);
    if (value == null || value == undefined) value = 0;

    setOverTimeNightShift(value);
  };
  const OverTimeDayChange = (value) => {
    //console.log(value);
    if (value == null || value == undefined) value = 0;

    setOverTimeDayShift(value);
  };
  const IncentiveChange = (value) => {
    //console.log(value);
    if (value == null || value == undefined) value = 0;

    setIncentive(value);
  };
  const DailyAllowanceChange = (value) => {
    //console.log(value);
    if (value == null || value == undefined) value = 0;

    setdailyAllowanceTotal(value);
  };
  const amount1Change = (value) => {
    //console.log(value);
    if (value == null || value == undefined) value = 0;
    bill.current.amount1 = value;
    let payment = bill.current.amount1 + bill.current.amount2;
    payment2Limit.current = inTotal - value;
    setPayment(payment);
  };
  const amount2Change = (value) => {
    //console.log(value);
    if (value == null || value == undefined) value = 0;
    bill.current.amount2 = value;
    let payment = bill.current.amount1 + bill.current.amount2;
    setPayment(payment);
  };
  const checkBoxChange = (e) => {
    //console.log(e.target);
    //console.log('check box clicked');
    //console.log(e.target.checked);
    setIgnoreLoan(e.target.checked);
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //console.log(accountList);
  return (
    <>
      <Form
        layout="horizontal"
        onFinish={onFinish}
        form={form}
        initialValues={{ discount_type: "%" }}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="employee"
              label="Employee"
              rules={[
                {
                  required: true,
                  message: "Please select A Employee",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Please choose an Employee"
                style={{ fontWeight: "400" }}
                optionFilterProp="children"
                onChange={(value) => onEmployeeChange(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {employeeList.map((employee) => {
                  return <Option value={employee.id}>{employee.name}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}></Col>

          <Col span={8}>
            <Form.Item name="month" label="Month">
              <DatePicker
                picker="month"
                defaultValue={moment()}
                onChange={onMonthChange}
                bordered={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <div
          className="payslip_print_fontSize"
          ref={componentRef}
          style={{ padding: "40px" }}
        >
          <Row gutter={24}>
            <Col span={4}>
              <img
                src={businessprofile.logo}
                style={{ height: "60px", zIndex: "-1" }}
              />
            </Col>
            <Col span={4}></Col>
            <Col span={6}></Col>
            <Col span={10}>
              <Row gutter={24}>
                <Col span={24} style={{ fontSize: "28px", textAlign: "right" }}>
                  MEHER
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24} style={{ fontSize: "10px", textAlign: "right" }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: businessprofile.address,
                    }}
                  ></div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={4}></Col>
            <Col span={4}></Col>
            <Col span={8} align="center" style={{ fontSize: "22px" }}>
              SALARY PAYSLIP
            </Col>
            <Col span={4}></Col>
            <Col span={4}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={4}></Col>
            <Col span={4}></Col>
            <Col span={8} align="center" style={{ fontSize: "14px" }}>
              {monthNames[month - 1]}, {year}
            </Col>
            <Col span={4}></Col>
            <Col span={4}></Col>
          </Row>
          <Row gutter={24}>
            <Col span={4}>Name</Col>
            <Col span={6} style={{ fontWeight: "bold" }}>
              {employeeName}
            </Col>
            <Col span={4}></Col>
            <Col span={6} style={{ textAlign: "right" }}>
              Issue Date
            </Col>
            <Col span={4} style={{ textAlign: "right" }}>
              {moment().format("DD-MM-YYYY")}
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={4}>ID</Col>
            <Col span={6}>{1000 + employee}</Col>
            <Col span={4}></Col>
            <Col span={6} style={{ textAlign: "right" }}>
              Basic Salary
            </Col>
            <Col span={4} style={{ textAlign: "right" }}>
              {salary}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={4}>Public Holiday</Col>
            <Col span={6}>
              <InputNumber
                placeholder="No of Public and Official Holidays"
                onChange={onHolidayChange}
                defaultValue={0}
              />
            </Col>
            <Col span={4}></Col>

            <Col span={6} style={{ textAlign: "right" }}>
              Daily Allowance
            </Col>
            <Col span={4} style={{ textAlign: "right" }}>
              {dailyAllowance}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={4}>Designation</Col>
            <Col span={6}>{designation}</Col>
            <Col span={4}></Col>

            <Col span={6} style={{ textAlign: "right" }}>
              Day Wage/Day
            </Col>
            <Col span={4} style={{ textAlign: "right" }}>
              {wageDay}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={4}>Phone</Col>
            <Col span={6}>{phone}</Col>
            <Col span={4}></Col>
            <Col span={6} style={{ textAlign: "right" }}>
              Day Wage/Hour
            </Col>
            <Col span={4} style={{ textAlign: "right" }}>
              {wageHour}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={4}>Address</Col>
            <Col span={6}>{address}</Col>
            <Col span={4}></Col>
            <Col span={6} style={{ textAlign: "right" }}>
              Night Wage/Day ( 5 * 1.5 * Daily Wage )
            </Col>
            <Col span={4} style={{ textAlign: "right" }}>
              {parseInt(wageNight * 5)}
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={4}></Col>
            <Col span={6}></Col>
            <Col span={4}></Col>
            <Col span={6} style={{ textAlign: "right" }}>
              Night Wage/Hour ( 1.5 * Hourly Wage )
            </Col>
            <Col span={4} style={{ textAlign: "right" }}>
              {wageNight}
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col span={24}>
              <table className="payslip_table">
                <thead>
                  <tr>
                    <th colspan="2" style={{ background: "lime" }}>
                      Earnings
                    </th>
                    <th colspan="2" style={{ background: "lightsalmon" }}>
                      Deductions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Basic Salary:</td>
                    <td>{salary}</td>
                    <td>Loan Amount:</td>
                    <td>{loanDue}</td>
                  </tr>
                  <tr>
                    <td>Overtime - Night</td>
                    <td>
                      <InputNumber
                        placeholder="Over Time-Night Shift/hr"
                        onChange={OverTimeNightChange}
                        value={overTimeNightShift}
                      />
                    </td>
                    <td>Adjustment</td>
                    <td>
                      {loanAdjustment}, Rest Loan: {loanDue - loanAdjustment}
                    </td>
                  </tr>
                  <tr>
                    <td>Overtime- Day</td>
                    <td>
                      <InputNumber
                        placeholder="Over Time-Day Shift/hr"
                        onChange={OverTimeDayChange}
                        value={overTimeDayShift}
                      />
                    </td>
                    <td>Fine</td>
                    <td>
                      {fine} (Late: {late}, Absent: {absent}, Attendance:{" "}
                      {attendance}, Leave: {leave})
                    </td>
                  </tr>
                  <tr>
                    <td>Total Overtime Bill</td>
                    <td>{nightOverTimeBill + dayOverTimeBill}</td>
                    <td>Advance</td>
                    <td>{loanAdvance}</td>
                  </tr>
                  <tr>
                    <td>Incentive</td>
                    <td>
                      <InputNumber
                        style={{ textAlign: "center", color: "red" }}
                        placeholder="Incentive"
                        onChange={IncentiveChange}
                        value={incentive}
                      />
                    </td>
                    <td>Ignore Emi</td>
                    <td>
                      <input
                        type="checkbox"
                        defaultChecked={ignoreLoan}
                        onChange={checkBoxChange}
                      />
                      (Check to ignore)
                    </td>
                  </tr>
                  <tr>
                    <td>Total Daily Allowances</td>
                    <td>
                      <InputNumber
                        style={{ textAlign: "center", color: "red" }}
                        placeholder="Daily Allowance"
                        onChange={DailyAllowanceChange}
                        value={dailyAllowanceTotal}
                      />
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>{inTotalIncome}</td>
                    <td>Total Deduction</td>
                    <td>{inTotalDeduction}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6} style={{ fontWeight: "bold", textAlign: "right" }}>
              Net Salary =
            </Col>
            <Col span={6} style={{ fontWeight: "bold", textAlign: "center" }}>
              {inTotal} BDT
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <br />
          <Row gutter={24}>
            <Col span={6}>
              <Row gutter={24}>
                <Col span={24}>------------------------------</Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>(Received Signature)</Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>Date:</Col>
              </Row>
            </Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}>
              <Row gutter={24}>
                <Col span={24}>------------------------------</Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>(Accountant Signature)</Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>Date:</Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              name="payment_method_1_type"
              label="Payment 1"
              rules={[{ required: true, message: "Please Update Type" }]}
            >
              <Select
                placeholder="Select Payment Type"
                style={{ width: "100%" }}
                onChange={(e) => {
                  bill.current.PaymentMethod1 = e;
                  bill.current.AccountNumber1 = "";
                  setUpdatelist(!updatelist);
                }}
              >
                <Option value="Cash">Cash</Option>
                <Option value="Bank">Bank</Option>
                <Option value="Mobile banking">Mobile banking</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="payment_method_1"
              label="Account"
              rules={[{ required: true, message: "Please Update Type" }]}
            >
              <Select placeholder="select a Account" style={{ width: "100%" }}>
                {accountList.map((account) => {
                  if (account.type == bill.current.PaymentMethod1) {
                    return <Option value={account.id}>{account.name}</Option>;
                  }
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="amount_1"
              label="Amount"
              rules={[
                {
                  required: true,
                  message: "Please enter a Amount",
                },
              ]}
            >
              <InputNumber
                min={0}
                max={inTotal}
                placeholder="Please enter Amount"
                onChange={amount1Change}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="payment_method_info_1" label="Ref No">
              <Input placeholder="Please enter Ref No" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name="payment_method_2_type" label="Payment 2">
              <Select
                placeholder="Select Payment Type"
                style={{ width: "100%" }}
                onChange={(e) => {
                  bill.current.PaymentMethod2 = e;
                  bill.current.AccountNumber2 = "";
                  setUpdatelist(!updatelist);
                }}
              >
                <Option value="Cash">Cash</Option>
                <Option value="Bank">Bank</Option>
                <Option value="Mobile banking">Mobile banking</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="payment_method_2" label="Account">
              <Select placeholder="select a Account" style={{ width: "100%" }}>
                {accountList.map((account) => {
                  if (account.type == bill.current.PaymentMethod2) {
                    return <Option value={account.id}>{account.name}</Option>;
                  }
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="amount_2" label="Amount">
              <InputNumber
                min={0}
                max={payment2Limit.current}
                placeholder="Please enter Amount"
                onChange={amount2Change}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="payment_method_info_2" label="Ref No">
              <Input placeholder="Please enter Ref No" />
            </Form.Item>
          </Col>
        </Row>
        <ReactToPrint
          trigger={() => <Button type="primary">Print this out!</Button>}
          content={() => componentRef.current}
        />
        <br />
        <Form.Item>
          <br />
          {already_paid ? (
            "Already Paid, Check Salary Report"
          ) : (
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    employeeList: state.employee.employeelist,
    employeeLeave: state.employeeLeave.employeeLeavedetails,
    employeeAttendancedetails:
      state.employeeAttendance.employeeAttendancedetails,
    employeeSalary: state.employeeSalary.employeeSalarydetails,
    employeeLoanlist: state.employeeLoan.employeeLoandetails,
    businessprofile: state.settings.businessprofile,
    accountList: state.accounts.accountlist,
  };
};

export default connect(mapStateToProps, {
  getAllAccount,
  getAllEmployee,
  getSpecificUserEmployeeLeave,
  getSpecificEmployeeAttendence,
  getSpecificUserEmployeeSalary,
  getSpecificUserEmployeeLoan,
  updateEmployeeLoan,
  createEmployeeLoanPayment,
  createEmployeeSalaryPayment,
  createEmployeePaySlip,
  getSpecificUserEmployeeSalaryPayslip,
})(CreateNewPaySlip);
