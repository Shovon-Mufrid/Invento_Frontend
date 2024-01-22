import React, { useState, useRef } from "react";
import { Button, Menu, Layout } from "antd";
import { Link } from "react-router-dom";
import {
  BarChartOutlined,
  TeamOutlined,
  DollarCircleOutlined,
  ApartmentOutlined,
  ShoppingCartOutlined,
  SelectOutlined,
  DatabaseOutlined,
  SkinOutlined,
  UserOutlined,
  SettingOutlined,
  PieChartOutlined,
  DotChartOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

const NewSidebar = ({ auth }) => {
  const [collapsed, setCollapsed] = useState(false);
  let collapseWidth = useRef(20);
  let isCollapsed = useRef(false);
  const { Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const PermissionsContain = (substring) => {
    if (auth.isSignedIn) {
      let flag = 0;
      auth.permissions.find((element) => {
        if (element.includes(substring)) {
          flag = 1;
        }
      });
      if (flag == 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  // console.log(auth);

  const items = auth.isSignedIn
    ? [
        getItem(
          <Link to="/dashboard">Dashboards</Link>,
          "1",
          <PieChartOutlined />
        ),
        // PermissionsContain("Contacts")
        //   ? getItem("Contacts", "sub1", <UserOutlined />, [
        //       auth.permissions.includes("Contacts.Customer_is_read")
        //         ? getItem(<Link to="/customer">Customer</Link>, "2")
        //         : "",
        //       auth.permissions.includes("Contacts.Supplier_is_read")
        //         ? getItem(<Link to="/supplier">Supplier</Link>, "3")
        //         : "",
        //       auth.permissions.includes("Contacts.Import/Export_is_read")
        //         ? getItem(<Link to="/contact/options">Import/Export</Link>, "4")
        //         : "",
        //     ])
        //   : "",

        // PermissionsContain("Manufacturing")
        //   ? getItem("Manufacturing", "sub12", <DotChartOutlined />, [
        //       auth.permissions.includes("Manufacturing.Workstation_is_read")
        //         ? getItem(
        //             <Link to="/manufacturing/Workstation">Workstation</Link>,
        //             "91"
        //           )
        //         : "",
        //       auth.permissions.includes("Manufacturing.Workorder_is_read")
        //         ? getItem(
        //             <Link to="/manufacturing/workorder">Workorder</Link>,
        //             "92"
        //           )
        //         : "",
        //       auth.permissions.includes("Manufacturing.Production Line_is_read")
        //         ? getItem(
        //             <Link to="/manufacturing/productionlines">
        //               Production Line
        //             </Link>,
        //             "93"
        //           )
        //         : "",

        //       auth.permissions.includes("Manufacturing.Work Process_is_read")
        //         ? getItem(
        //             <Link to="/manufacturing/Workprocess">Work Process</Link>,
        //             "94"
        //           )
        //         : "",
        //     ])
        //   : "",

        PermissionsContain("HRM")
          ? getItem("HRM", "sub2", <TeamOutlined />, [
              auth.permissions.includes("HRM.Departments_is_read")
                ? getItem(<Link to="/department">Departments</Link>, "5")
                : "",
              auth.permissions.includes("HRM.Designation_is_read")
                ? getItem(<Link to="/user-role">Designation</Link>, "6")
                : "",
              auth.permissions.includes("HRM.Employee_is_read")
                ? getItem(<Link to="/employee">Employee</Link>, "7")
                : "",
              auth.permissions.includes("HRM.Salary Setup_is_read")
                ? getItem(<Link to="/salary">Salary Setup</Link>, "8")
                : "",
              auth.permissions.includes("HRM.LeaveType_is_read")
                ? getItem(<Link to="/leave-type">LeaveType</Link>, "9")
                : "",
              auth.permissions.includes("HRM.Employee Leave_is_read")
                ? getItem(
                    <Link to="/employee-leave">Employee Leave</Link>,
                    "10"
                  )
                : "",
              auth.permissions.includes("HRM.Attendance_is_read")
                ? getItem(<Link to="/attendance">Attendance</Link>, "11")
                : "",
              // auth.permissions.includes("HRM.Attendance List_is_read")
              //   ? getItem(
              //       <Link to="/attendance-report">Attendance List</Link>,
              //       "12"
              //     )
              //   : "",
              auth.permissions.includes("HRM.Attendance Report_is_read")
                ? getItem(
                    <Link to="/attendance-report-short">
                      Attendance Report
                    </Link>,
                    "13"
                  )
                : "",
              auth.permissions.includes("HRM.Loan Management_is_read")
                ? getItem(
                    <Link to="/loan-management">Loan Management</Link>,
                    "14"
                  )
                : "",
              auth.permissions.includes("HRM.Pay-Slip_is_read")
                ? getItem(<Link to="/pay-slip">Pay-Slip</Link>, "15")
                : "",
              auth.permissions.includes("HRM.Salary Report_is_read")
                ? getItem(<Link to="/salary-report">Salary Report</Link>, "16")
                : "",
            ])
          : "",

        // PermissionsContain("Accounting")
        //   ? getItem("Accounting", "sub3", <DollarCircleOutlined />, [
        //       auth.permissions.includes("Accounting.Chart of accounts_is_read")
        //         ? getItem(
        //             <Link to="/accounting/chartofaccounts">
        //               Chart of accounts
        //             </Link>,
        //             "17"
        //           )
        //         : "",
        //       // auth.permissions.includes("Accounting.Account settings_is_read")
        //       //   ? getItem(
        //       //       <Link to="/accounting/accounts">Account settings</Link>,
        //       //       "18"
        //       //     )
        //       //   : "",
        //       auth.permissions.includes("Accounting.All entries_is_read")
        //         ? getItem(
        //             <Link to="/accounting/journals">All Entries</Link>,
        //             "19"
        //           )
        //         : "",
        //       auth.permissions.includes("Accounting.Account status_is_read")
        //         ? getItem(
        //             <Link to="/accounting/accountstatus">Account Status</Link>,
        //             "201"
        //           )
        //         : "",
        //       auth.permissions.includes("Accounting.Payment voucher_is_read")
        //         ? getItem(
        //             <Link to="/accounting/paymentvoucher">
        //               Payment Voucher
        //             </Link>,
        //             "20"
        //           )
        //         : "",
        //       auth.permissions.includes("Accounting.Receive voucher_is_read")
        //         ? getItem(
        //             <Link to="/accounting/receivevoucher">
        //               Receive Voucher
        //             </Link>,
        //             "21"
        //           )
        //         : "",
        //       auth.permissions.includes(
        //         "Accounting.Journal entry voucher_is_read"
        //       )
        //         ? getItem(
        //             <Link to="/accounting/journalvoucher">
        //               Journal Entry Voucher
        //             </Link>,
        //             "22"
        //           )
        //         : "",
        //       auth.permissions.includes("Accounting.Contra voucher_is_read")
        //         ? getItem(
        //             <Link to="/accounting/contravoucher">Contra Voucher</Link>,
        //             "23"
        //           )
        //         : "",
        //       auth.permissions.includes("Accounting.Sales & petty cash_is_read")
        //         ? getItem(
        //             <Link to="/accounting/branchsales">
        //               Sales & Petty Cash
        //             </Link>,
        //             "24"
        //           )
        //         : "",
        //       auth.permissions.includes("Accounting.Ledger_is_read")
        //         ? getItem(<Link to="/accounting/ledger">Ledger</Link>, "25")
        //         : "",

        //       auth.permissions.includes("Accounting.Cash & Bank Ledger_is_read")
        //         ? getItem(
        //             <Link to="/accounting/CashBankBook">
        //               Cash & Bank Ledger
        //             </Link>,
        //             "26"
        //           )
        //         : "",

        //       auth.permissions.includes("Accounting.Expense Report_is_read")
        //         ? getItem(
        //             <Link to="/accounting/expensereport">Expense Report</Link>,
        //             "202"
        //           )
        //         : "",

        //       auth.permissions.includes(
        //         "Accounting.Cash Receive Report_is_read"
        //       )
        //         ? getItem(
        //             <Link to="/accounting/cashreceivereport">
        //               Cash Receive Report
        //             </Link>,
        //             "203"
        //           )
        //         : "",
        //       auth.permissions.includes(
        //         "Accounting.Payable & Receivable_is_read"
        //       )
        //         ? getItem(
        //             <Link to="/accounting/PayableAndReceivable">
        //               Payable & Receivable
        //             </Link>,
        //             "27"
        //           )
        //         : "",
        //       auth.permissions.includes("Accounting.Trail balance_is_read")
        //         ? getItem(
        //             <Link to="/accounting/trailbalance">Trail balance</Link>,
        //             "28"
        //           )
        //         : "",
        //       auth.permissions.includes("Accounting.Profit & Loss_is_read")
        //         ? getItem(
        //             <Link to="/accounting/incomestatement">Profit & Loss</Link>,
        //             "29"
        //           )
        //         : "",
        //       auth.permissions.includes("Accounting.Balance sheet_is_read")
        //         ? getItem(
        //             <Link to="/accounting/balancesheet">Balance Sheet</Link>,
        //             "30"
        //           )
        //         : "",
        //     ])
        //   : "",

        // PermissionsContain("Products")
        //   ? getItem("Products", "sub4", <SkinOutlined />, [
        //       auth.permissions.includes("Products.Attribute_is_read")
        //         ? getItem(<Link to="/product/attribute">Attribute</Link>, "31")
        //         : "",
        //       auth.permissions.includes("Products.Category_is_read")
        //         ? getItem(<Link to="/product/category">Category</Link>, "32")
        //         : "",
        //       auth.permissions.includes("Products.Add new product_is_read")
        //         ? getItem(<Link to="/product/add">Add new product</Link>, "33")
        //         : "",
        //       auth.permissions.includes("Products.All products_is_read")
        //         ? getItem(<Link to="/product">All products</Link>, "34")
        //         : "",
        //       auth.permissions.includes("Products.Import product_is_read")
        //         ? getItem(
        //             <Link to="/product/import">Import product</Link>,
        //             "35"
        //           )
        //         : "",
        //     ])
        //   : "",
        // PermissionsContain("Inventory Purchase")
        //   ? getItem("Inventory Purchase", "sub5", <SelectOutlined />, [
        //       auth.permissions.includes(
        //         "Inventory Purchase.Add new purchase_is_read"
        //       )
        //         ? getItem(
        //             <Link to="/Purchase/add">Add new purchase</Link>,
        //             "36"
        //           )
        //         : "",
        //       auth.permissions.includes(
        //         "Inventory Purchase.All purchase_is_read"
        //       )
        //         ? getItem(<Link to="/Purchase">All purchase</Link>, "37")
        //         : "",
        //     ])
        //   : "",
        // PermissionsContain("Stock")
        //   ? getItem("Stock", "sub6", <DatabaseOutlined />, [
        //       auth.permissions.includes("Stock.Current Stock_is_read")
        //         ? getItem(<Link to="/stock">Current Stock</Link>, "36")
        //         : "",
        //       auth.permissions.includes("Stock.Packaging Stock_is_read")
        //         ? getItem(
        //             <Link to="/stock/packaging">Packaging Stock</Link>,
        //             "37"
        //           )
        //         : "",
        //       auth.permissions.includes("Stock.Material Stock_is_read")
        //         ? getItem(
        //             <Link to="/stock/material">Material Stock</Link>,
        //             "38"
        //           )
        //         : "",
        //       auth.permissions.includes("Stock.Stock Alert_is_read")
        //         ? getItem(<Link to="/stock/alert">Stock Alert</Link>, "39")
        //         : "",
        //       auth.permissions.includes("Stock.Stock Transfer_is_read")
        //         ? getItem(
        //             <Link to="/stock/transfer">Stock Transfer</Link>,
        //             "40"
        //           )
        //         : "",
        //       auth.permissions.includes("Stock.Transfer History_is_read")
        //         ? getItem(
        //             <Link to="/stock/transfer/history">Transfer History</Link>,
        //             "41"
        //           )
        //         : "",
        //     ])
        //   : "",
        // PermissionsContain("Sales")
        //   ? getItem("Sales", "sub7", <ShoppingCartOutlined />, [
        //       auth.permissions.includes("Sales.Add new order_is_read")
        //         ? getItem(<Link to="/order/add">Add new order</Link>, "42")
        //         : "",
        //       auth.permissions.includes("Sales.All orders_is_read")
        //         ? getItem(<Link to="/order">All orders</Link>, "43")
        //         : "",
        //       auth.permissions.includes("Sales.All Services_is_read")
        //         ? getItem(<Link to="/service">All Services</Link>, "44")
        //         : "",
        //       auth.permissions.includes("Sales.Draft Cost Sheet_is_read")
        //         ? getItem(
        //             <Link to="/draftcostsheet">Draft Cost Sheet</Link>,
        //             "81"
        //           )
        //         : "",
        //       auth.permissions.includes("Sales.Coupons_is_read")
        //         ? getItem(<Link to="/cupons">Coupons</Link>, "45")
        //         : "",

        //     ])
        //   : "",

        PermissionsContain("Petty Cash")
          ? getItem("Petty Cash", "sub11", <ShoppingCartOutlined />, [
              auth.permissions.includes("Petty Cash.Petty Cash_is_read")
                ? getItem(<Link to="/pettycash">Petty Cash</Link>, "46")
                : "",
            ])
          : "",
        PermissionsContain("Sponsorship")
          ? getItem("Sponsorship", "sub8", <ApartmentOutlined />, [
              auth.permissions.includes("Sponsorship.All sponsorship_is_read")
                ? getItem(<Link to="/wordrobe">All sponsorship</Link>, "47")
                : "",
              auth.permissions.includes("Sponsorship.Add new sponsor_is_read")
                ? getItem(<Link to="/wordrobe/add">Add new sponsor</Link>, "48")
                : "",
              auth.permissions.includes("Sponsorship.S. floating stock_is_read")
                ? getItem(
                    <Link to="/wordrobe/stock">S. floating stock</Link>,
                    "49"
                  )
                : "",
            ])
          : "",
        // PermissionsContain("Report")
        //   ? getItem("Report", "sub9", <BarChartOutlined />, [
        //       auth.permissions.includes("Report.Sales report_is_read")
        //         ? getItem(<Link to="/report/sales">Sales report</Link>, "50")
        //         : "",
        //       auth.permissions.includes("Report.Due collection_is_read")
        //         ? getItem(
        //             <Link to="/report/duecollection">Due collection</Link>,
        //             "71"
        //           )
        //         : "",

        //       auth.permissions.includes("Report.Delivery report_is_read")
        //         ? getItem(
        //             <Link to="/report/delivery">Delivery report</Link>,
        //             "51"
        //           )
        //         : "",
        //       auth.permissions.includes("Report.Service report_is_read")
        //         ? getItem(
        //             <Link to="/report/service">Service report</Link>,
        //             "52"
        //           )
        //         : "",
        //       auth.permissions.includes("Report.VAT report_is_read")
        //         ? getItem(<Link to="/report/vat">VAT report</Link>, "53")
        //         : "",
        //       auth.permissions.includes("Report.Stock report_is_read")
        //         ? getItem(
        //             <Link to="/report/currentstock">Stock report</Link>,
        //             "54"
        //           )
        //         : "",
        //       auth.permissions.includes("Report.Stock Valuation_is_read")
        //         ? getItem(
        //             <Link to="/report/StockValuation">Stock Valuation</Link>,
        //             "55"
        //           )
        //         : "",
        //       auth.permissions.includes("Report.Sold Products Report_is_read")
        //         ? getItem(
        //             <Link to="/report/soldporductreport">
        //               Sold Products Report
        //             </Link>,
        //             "72"
        //           )
        //         : "",
        //       auth.permissions.includes("Report.Stock alert report_is_read")
        //         ? getItem(
        //             <Link to="/report/alert">Stock alert report</Link>,
        //             "56"
        //           )
        //         : "",
        //       auth.permissions.includes(
        //         "Report.S. floating stock report_is_read"
        //       )
        //         ? getItem(
        //             <Link to="/report/WordrobeStock">
        //               S. floating stock report
        //             </Link>,
        //             "57"
        //           )
        //         : "",
        //       auth.permissions.includes("Report.Purchase report_is_read")
        //         ? getItem(
        //             <Link to="/report/purchase">Purchase report</Link>,
        //             "58"
        //           )
        //         : "",
        //       auth.permissions.includes("Report.Userlog_is_read")
        //         ? getItem(<Link to="/report/userlog">User Log</Link>, "72")
        //         : "",
        //     ])
        //   : "",
        PermissionsContain("Settings")
          ? getItem("Settings", "sub10", <SettingOutlined />, [
              auth.permissions.includes("Settings.Group Of Company_is_read")
                ? getItem(
                    <Link to="/GroupOfCompany">Group Of Company</Link>,
                    "59"
                  )
                : "",
              auth.permissions.includes("Settings.Company_is_read")
                ? getItem(<Link to="/Company">Company</Link>, "60")
                : "",
              auth.permissions.includes("Settings.Office Type_is_read")
                ? getItem(<Link to="/OfficeType">Office Type</Link>, "61")
                : "",
              auth.permissions.includes("Settings.Office Location_is_read")
                ? getItem(
                    <Link to="/OfficeLocation">Office Location</Link>,
                    "62"
                  )
                : "",
              auth.permissions.includes("Settings.Office_is_read")
                ? getItem(<Link to="/office">Office</Link>, "63")
                : "",
              // auth.permissions.includes("Settings.Warehouse_is_read")
              //  ? getItem(<Link to="/warehouse">Warehouse </Link>, "64")
              //   : "",
              // auth.permissions.includes("Settings.Outlet_is_read")
              //   ? getItem(<Link to="/outlet">Outlet </Link>, "65")
              //   : "",

              // auth.permissions.includes("Settings.Business Profile_is_read")
              //   ? getItem(
              //       <Link to="/businessprofile">Business Profile</Link>,
              //       "66"
              //     )
              //   : "",
              auth.permissions.includes("Settings.Contact Groups_is_read")
                ? getItem(<Link to="/contactgroup">Contact Groups</Link>, "67")
                : "",
              auth.permissions.includes("Settings.Delivery Methods_is_read")
                ? getItem(
                    <Link to="/deliverygroup">Delivery Methods</Link>,
                    "68"
                  )
                : "",
              auth.permissions.includes("Settings.Account Groups_is_read")
                ? getItem(<Link to="/accountgroup">Account Groups</Link>, "69")
                : "",
              auth.permissions.includes("Settings.Permissions_is_read")
                ? getItem(<Link to="/permissions">Permissions</Link>, "70")
                : "",
            ])
          : "",
      ]
    : "";
  return (
    <div className="sidebar">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        // style={{ height: "100vh" }}
        // onClick={() => {
        //   if (isCollapsed.current) {
        //     collapseWidth.current = 0;
        //     isCollapsed.current = !isCollapsed.current;
        //   } else {
        //     collapseWidth.current = 20;
        //     isCollapsed.current = !isCollapsed.current;
        //   }
        // }}
        // collapsedWidth={collapseWidth.current}
      >
        <div
          className="logo"
          style={{
            backgroundColor: "transparent",
            height: "60px",
            zIndex: "-99",
          }}
        >
          {!collapsed ? (
            <img
            // src={auth.profile.branch.logo}
            // src={`${process.env.PUBLIC_URL}` + `/AutoLogic2.png`}
            // style={{ height: "40px", zIndex: "-1" }}
            src={`${process.env.PUBLIC_URL}` + `/apple-touch-icon.png`}
            style={{ height: "50px", zIndex: "-1", marginLeft: "30px", marginTop: "20px", marginBottom: "30px"}}
            />
          ) : (
            <img
            // src={`${process.env.PUBLIC_URL}` + `/AutoLogic2.png`}
            // src={auth.profile.branch.logo}
            // style={{ height: "40px", zIndex: "-1" }}
            />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          id="sidebar-nav"
          items={items}
          style={{ "min-height": "80vh" }}
        />
      </Sider>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(NewSidebar);
// export default NewSidebar;
