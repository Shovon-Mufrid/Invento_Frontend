import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
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
} from "@ant-design/icons";
import { activelink } from "../../actions/authAction";
import { getBusinessProfile } from "../../actions/settings";
import { Link, NavLink, useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ auth, businessprofile, activelink, getBusinessProfile }) => {
  const [collapsed, setCollapsed] = useState(false);
  // let collapseWidth = useRef(20);
  // let isCollapsed = useRef(false);
  useEffect(() => {
    getBusinessProfile();
  }, []);

  return (
    <div class="sidebar">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        // style={{ height: "100vh" }}
        // onClick={() => {
        //   if (isCollapsed.current) {
        //     collapseWidth.current = 20;
        //   } else {
        //     collapseWidth.current = 0;
        //   }
        //   isCollapsed.current = !isCollapsed.current;
        // }}
        // collapsedWidth={collapseWidth.current}
      >
        <div
          className="logo"
          style={{
            backgroundColor: "transparent",
            height: "37px",
            zIndex: "-99",
          }}
        >
          {!auth.activelink ? (
            <img
              src={businessprofile.logo}
              style={{ height: "40px", zIndex: "-1" }}
            />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}` + `/AutoLogic2.png`}
              style={{ height: "40px", zIndex: "-1" }}
            />
          )}
          {/* <img
            src="http://127.0.0.1:8000/media/business/outlet/logo/WhatsApp_Image_2023-01-09_at_13.58.18.jpeg"
            style={{ height: "40px", zIndex: "-1" }}
          /> */}

          {/* <span style={{ color: "white", marginLeft: "1.5rem" }}>
            <bold>ANZARA</bold>
          </span> */}
        </div>

        {/* <Menu   onClick={onClick} items={items} />; */}
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={selectedkey.current}
          // defaultOpenKeys={openkey.current}
          id="sidebar-nav"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <NavLink aria-current="page" to="/dashboard">
              Dashboard
            </NavLink>
          </Menu.Item>
          {/* -------------------------Contact----------------------- */}
          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            // defaultSelectedKeys={["10"]}
            title="Contacts"
          >
            <Menu.Item key="11">
              <NavLink aria-current="page" to="/customer">
                Customer
              </NavLink>
            </Menu.Item>

            <Menu.Item key="12">
              <NavLink aria-current="page" to="/supplier">
                Supplier
              </NavLink>
            </Menu.Item>
            <Menu.Item key="13">
              <NavLink aria-current="page" to="/contact/options">
                Import/Export
              </NavLink>
            </Menu.Item>
          </SubMenu>
          {/* -------------------------HRM----------------------- */}
          <SubMenu
            key="sub2"
            icon={<TeamOutlined />}
            defaultSelectedKeys={["20"]}
            title="HRM"
          >
            <Menu.Item key="20">
              <NavLink aria-current="page" to="/department">
                Departments
              </NavLink>
            </Menu.Item>

            <Menu.Item key="21">
              <NavLink aria-current="page" to="/user-role">
                Designation
              </NavLink>
            </Menu.Item>

            <Menu.Item key="22">
              <NavLink aria-current="page" to="/employee">
                Employee
              </NavLink>
            </Menu.Item>

            <Menu.Item key="27">
              <NavLink aria-current="page" to="/salary">
                Salary Setup
              </NavLink>
            </Menu.Item>

            <Menu.Item key="23">
              <NavLink aria-current="page" to="/leave-type">
                LeaveType
              </NavLink>
            </Menu.Item>

            <Menu.Item key="24">
              <NavLink aria-current="page" to="/employee-leave">
                Employee Leave
              </NavLink>
            </Menu.Item>

            <Menu.Item key="25">
              <NavLink aria-current="page" to="/attendance">
                Attendance
              </NavLink>
            </Menu.Item>

            <Menu.Item key="26">
              <NavLink aria-current="page" to="/attendance-report">
                Attendance List
              </NavLink>
            </Menu.Item>

            <Menu.Item key="261">
              <NavLink aria-current="page" to="/attendance-report-short">
                Attendance Report
              </NavLink>
            </Menu.Item>

            <Menu.Item key="28">
              <NavLink aria-current="page" to="/loan-management">
                Loan Management
              </NavLink>
            </Menu.Item>

            <Menu.Item key="29">
              <NavLink aria-current="page" to="/pay-slip">
                Pay-Slip
              </NavLink>
            </Menu.Item>

            <Menu.Item key="291">
              <NavLink aria-current="page" to="/salary-report">
                Salary Report
              </NavLink>
            </Menu.Item>
          </SubMenu>
          {/* -------------------------Accounting----------------------- */}
          <SubMenu
            key="sub10"
            icon={<DollarCircleOutlined />}
            defaultSelectedKeys={["100"]}
            title="Accounting"
          >
            <Menu.Item key="102">
              <NavLink aria-current="page" to="/accounting/chartofaccounts">
                Chart of accounts
              </NavLink>
            </Menu.Item>

            <Menu.Item key="101">
              <NavLink aria-current="page" to="/accounting/accounts">
                Account settings
              </NavLink>
            </Menu.Item>

            <Menu.Item key="103">
              <NavLink aria-current="page" to="/accounting/journals">
                All entries
              </NavLink>
            </Menu.Item>

            <Menu.Item key="107">
              <NavLink aria-current="page" to="/accounting/paymentvoucher">
                Payment voucher
              </NavLink>
            </Menu.Item>

            <Menu.Item key="108">
              <NavLink aria-current="page" to="/accounting/receivevoucher">
                Receive voucher
              </NavLink>
            </Menu.Item>

            <Menu.Item key="105">
              <NavLink aria-current="page" to="/accounting/journalvoucher">
                Journal entry voucher
              </NavLink>
            </Menu.Item>

            <Menu.Item key="106">
              <NavLink aria-current="page" to="/accounting/contravoucher">
                Contra voucher
              </NavLink>
            </Menu.Item>

            <Menu.Item key="1050">
              <NavLink aria-current="page" to="/accounting/branchsales">
                Sales & petty cash
              </NavLink>
            </Menu.Item>

            <Menu.Item key="109">
              <NavLink aria-current="page" to="/accounting/ledger">
                Ledger
              </NavLink>
            </Menu.Item>

            <Menu.Item key="1091">
              <NavLink aria-current="page" to="/accounting/CashBankBook">
                Cash & Bank Ledger
              </NavLink>
            </Menu.Item>

            <Menu.Item key="1092">
              <NavLink
                aria-current="page"
                to="/accounting/PayableAndReceivable"
              >
                Payable & Receivable
              </NavLink>
            </Menu.Item>

            <Menu.Item key="1010">
              <NavLink aria-current="page" to="/accounting/trailbalance">
                Trail balance
              </NavLink>
            </Menu.Item>

            <Menu.Item key="1030">
              <NavLink aria-current="page" to="/accounting/incomestatement">
                Profit & Loss
              </NavLink>
            </Menu.Item>

            <Menu.Item key="1040">
              <NavLink aria-current="page" to="/accounting/balancesheet">
                Balance sheet
              </NavLink>
            </Menu.Item>
          </SubMenu>
          {/* -------------------------Products----------------------- */}
          <SubMenu
            key="sub3"
            icon={<SkinOutlined />}
            // defaultSelectedKeys={["30"]}
            title="Products"
          >
            <Menu.Item key="34">
              <NavLink aria-current="page" to="/product/attribute">
                Attribute
              </NavLink>
            </Menu.Item>

            <Menu.Item key="33">
              <NavLink aria-current="page" to="/product/category">
                Category
              </NavLink>
            </Menu.Item>

            <Menu.Item key="32">
              <NavLink aria-current="page" to="/product/add">
                Add new product
              </NavLink>
            </Menu.Item>

            <Menu.Item key="31">
              <NavLink aria-current="page" to="/product">
                All products
              </NavLink>
            </Menu.Item>

            <Menu.Item key="35">
              <NavLink aria-current="page" to="/product/import">
                Import product
              </NavLink>
            </Menu.Item>
          </SubMenu>
          {/* -------------------------Inventory Purchase----------------------- */}
          <SubMenu
            key="sub4"
            icon={<SelectOutlined />}
            defaultSelectedKeys={["40"]}
            title="Inventory Purchase"
          >
            <Menu.Item key="42">
              <NavLink aria-current="page" to="/Purchase/add">
                Add new purchase
              </NavLink>
            </Menu.Item>

            <Menu.Item key="41">
              <NavLink aria-current="page" to="/Purchase">
                All purchase
              </NavLink>
            </Menu.Item>
          </SubMenu>
          {/* -------------------------Stock----------------------- */}
          <SubMenu
            key="sub5"
            icon={<DatabaseOutlined />}
            defaultSelectedKeys={["50"]}
            title="Stock"
          >
            <Menu.Item key="51">
              <NavLink aria-current="page" to="/stock">
                Current Stock
              </NavLink>
            </Menu.Item>

            <Menu.Item key="56">
              <NavLink aria-current="page" to="/stock/packaging">
                Packaging Stock
              </NavLink>
            </Menu.Item>

            <Menu.Item key="57">
              <NavLink aria-current="page" to="/stock/material">
                Material Stock
              </NavLink>
            </Menu.Item>

            <Menu.Item key="52">
              <NavLink aria-current="page" to="/stock/alert">
                Stock Alert
              </NavLink>
            </Menu.Item>

            <Menu.Item key="53">
              <NavLink aria-current="page" to="/stock/transfer">
                Stock Transfer
              </NavLink>
            </Menu.Item>

            <Menu.Item key="54">
              <NavLink aria-current="page" to="/stock/transfer/history">
                Transfer History
              </NavLink>
            </Menu.Item>
          </SubMenu>
          {/* -------------------------Sales----------------------- */}
          <SubMenu
            key="sub6"
            icon={<ShoppingCartOutlined />}
            defaultSelectedKeys={["60"]}
            title="Sales"
          >
            <Menu.Item key="61">
              <NavLink aria-current="page" to="/order/add">
                Add new order
              </NavLink>
            </Menu.Item>

            <Menu.Item key="62">
              <NavLink aria-current="page" to="/order">
                All orders
              </NavLink>
            </Menu.Item>

            <Menu.Item key="63">
              <NavLink aria-current="page" to="/service">
                All Services
              </NavLink>
            </Menu.Item>

            {/* <Menu.Item key="64">
              <NavLink aria-current="page" to="/cupons">
                Coupons
              </NavLink>
            </Menu.Item> */}
          </SubMenu>

          <Menu.Item key="110" icon={<PieChartOutlined />}>
            <NavLink aria-current="page" to="/pettycash">
              Petty Cash
            </NavLink>
          </Menu.Item>
          {/* -------------------------Sponsorship----------------------- */}
          <SubMenu
            key="sub7"
            icon={<ApartmentOutlined />}
            defaultSelectedKeys={["70"]}
            title="Sponsorship"
          >
            <Menu.Item key="71">
              <NavLink aria-current="page" to="/wordrobe">
                All sponsorship
              </NavLink>
            </Menu.Item>

            <Menu.Item key="72">
              <NavLink aria-current="page" to="/wordrobe/add">
                Add new sponsor
              </NavLink>
            </Menu.Item>

            <Menu.Item key="73">
              <NavLink aria-current="page" to="/wordrobe/stock">
                S. floating stock
              </NavLink>
            </Menu.Item>
          </SubMenu>
          {/* -------------------------Report----------------------- */}
          <SubMenu
            key="sub8"
            icon={<BarChartOutlined />}
            defaultSelectedKeys={["80"]}
            title="Report"
          >
            <Menu.Item key="81">
              <NavLink aria-current="page" to="/report/sales">
                Sales report
              </NavLink>
            </Menu.Item>

            <Menu.Item key="82">
              <NavLink aria-current="page" to="/report/delivery">
                Delivery report
              </NavLink>
            </Menu.Item>

            <Menu.Item key="83">
              <NavLink aria-current="page" to="/report/service">
                Service report
              </NavLink>
            </Menu.Item>

            <Menu.Item key="811">
              <NavLink aria-current="page" to="/report/vat">
                VAT report
              </NavLink>
            </Menu.Item>

            <Menu.Item key="87">
              <NavLink aria-current="page" to="/report/currentstock">
                Stock report
              </NavLink>
            </Menu.Item>

            <Menu.Item key="812">
              <NavLink aria-current="page" to="/report/StockValuation">
                Stock Valuation
              </NavLink>
            </Menu.Item>

            <Menu.Item key="88">
              <NavLink aria-current="page" to="/report/alert">
                Stock alert report
              </NavLink>
            </Menu.Item>

            <Menu.Item key="89">
              <NavLink aria-current="page" to="/report/WordrobeStock">
                S. floating stock report
              </NavLink>
            </Menu.Item>

            <Menu.Item key="810">
              <NavLink aria-current="page" to="/report/purchase">
                Purchase report
              </NavLink>
            </Menu.Item>
            <Menu.Item key="810">
              <NavLink aria-current="page" to="/report/userlog">
                User Log
              </NavLink>
            </Menu.Item>
          </SubMenu>
          {/* -------------------------Settings----------------------- */}
          <SubMenu
            key="sub9"
            icon={<SettingOutlined />}
            // defaultSelectedKeys={["90"]}
            title="Settings"
          >
            <Menu.Item key="910">
              <NavLink aria-current="page" to="/GroupOfCompany">
                Group Of Company
              </NavLink>
            </Menu.Item>
            <Menu.Item key="911">
              <NavLink aria-current="page" to="/Company">
                Company
              </NavLink>
            </Menu.Item>
            <Menu.Item key="912">
              <NavLink aria-current="page" to="/OfficeType">
                Office Type
              </NavLink>
            </Menu.Item>
            <Menu.Item key="913">
              <NavLink aria-current="page" to="/OfficeLocation">
                Office Location
              </NavLink>
            </Menu.Item>

            <Menu.Item key="97">
              <NavLink aria-current="page" to="/office">
                Office
              </NavLink>
            </Menu.Item>

            {/* <Menu.Item key="91">
              <NavLink aria-current="page" to="/warehouse">
                Warehouse
              </NavLink>
            </Menu.Item>

            <Menu.Item key="93">
              <NavLink aria-current="page" to="/outlet">
                Outlet
              </NavLink>
            </Menu.Item> */}

            <Menu.Item key="94">
              <NavLink aria-current="page" to="/businessprofile">
                Business Profile
              </NavLink>
            </Menu.Item>

            <Menu.Item key="95">
              <NavLink aria-current="page" to="/contactgroup">
                Contact Groups
              </NavLink>
            </Menu.Item>

            <Menu.Item key="96">
              <NavLink aria-current="page" to="/deliverygroup">
                Delivery Methods
              </NavLink>
            </Menu.Item>

            <Menu.Item key="98">
              <NavLink aria-current="page" to="/accountgroup">
                Account Groups
              </NavLink>
            </Menu.Item>

            <Menu.Item key="99">
              <NavLink aria-current="page" to="/permissions">
                Permissions
              </NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, { activelink, getBusinessProfile })(
  Sidebar
);
