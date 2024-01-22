import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import "./App.css";
import LoginForm from "./components/Templete/LoginForm";
import Frame from "./components/Layout/Frame";
import SignupForm from "./components/Templete/SignupForm";
import Authorization from "./components/Templete/Authorization";

//Contact
import Contact from "./components/Contact/Customer";
import Supplier from "./components/Contact/Supplier";
import ContactOptions from "./components/Contact/Options/index";

//purchase
import Purchase from "./components/Purchase";
import AddPurchaseOrder from "./components/Purchase/add";

// Manufacturing
import Workorder from "./components/Manufacturing/Workorder";
import Productionlines from "./components/Manufacturing/ProductionLine";
import Workstations from "./components/Manufacturing/Workstation";
import WorkstationItem from "./components/Manufacturing/WorkstationItem";

//product
import Attribute from "./components/Product/Attribute/index";
import Category from "./components/Product/Category";
import AddProduct from "./components/Product/AddProduct";
import ProductDetails from "./components/Product/ProductDetails";
import ViewProduct from "./components/Product/ProductDetails/ViewProduct";
import ProductImport from "./components/Product/Options/index";

//Stock
import Stock from "./components/Stock/Stock";
import AlertStock from "./components/Stock/AlertStock";
import Transfer from "./components/Transfer";
import TransferHistory from "./components/Transfer/TransferHistory";
import TransferStock from "./components/Stock/TransferStock/";
import StockValuation from "./components/Stock/StockValuation/";
import Packaging from "./components/Stock/Packaging/";
import Material from "./components/Stock/Material/";

//Order
import Order from "./components/Order";
import AddOrder from "./components/Order/neworder/add";
import CustomerAddOrder from "./components/Order/neworder/add";
import Customerprofile from "./components/Order/neworder";
import Cupon from "./components/Cupon";
import OrderReport from "./components/Order/Report/salesReport";
import Showinvoice from "./components/Order/Showinvoice";
import Services from "./components/Services/Services";
import Invoice from "./components/Order/CustomerInvoice";
import DraftCostSheet from "./components/Order/DraftCostSheet";
import PrintView from "./components/Order/DraftCostSheet/Report/PrintView";

// Tools
import Tools from "./components/Settings/Tools";
import Warehouse from "./components/Settings/Warehouse";
import Outlet from "./components/Settings/Outlet";
import Office from "./components/Settings/Office";
import BusinessProfile from "./components/Settings/BusinessProfile/Index";
import ContactGroup from "./components/Settings/ContactGroup/Index";
import DeliveryGroup from "./components/Settings/DeliveryGroup/Index";
import AccountGroup from "./components/Settings/AccountGroup/Index";
import Permissions from "./components/Settings/Permissions";
import GroupOfCompany from "./components/Settings/GroupOfCompany";
import Company from "./components/Settings/Company";
import OfficeLocation from "./components/Settings/OfficeLocation";
import OfficeType from "./components/Settings/OfficeType";

//petty cash
import PettyCash from "./components/PettyCash";

//Sponsorship
import Wordrobe from "./components/Wordrobe";
import AddWordrobeOrder from "./components/Wordrobe/add";
import WordrobeStock from "./components/Wordrobe/Stock";

// Accounting
import BranchSales from "./components/Accounting/BranchSales";
import Chartofaccounts from "./components/Accounting/Chartofaccounts";
import Accounts from "./components/Accounting/Accounts";
import AccountsStatus from "./components/Accounting/Ledger/AccountsStatus";
import Journals from "./components/Accounting/Journals";
import JournalVoucher from "./components/Accounting/JournalVoucher/";
import JournalVoucherCreate from "./components/Accounting/JournalVoucher/CreateNewChart";
import ReveiveVoucher from "./components/Accounting/ReveiveVoucher";
import ReveiveVoucherCreate from "./components/Accounting/ReveiveVoucher/CreateNewChart";
import PaymentVoucher from "./components/Accounting/PaymentVoucher";
import PaymentVoucherCreate from "./components/Accounting/PaymentVoucher/CreateNewChart";
import ContraVoucher from "./components/Accounting/ContraVoucher/";
import ContraVoucherCreate from "./components/Accounting/ContraVoucher/CreateNewChart";
import TrailBalance from "./components/Accounting/TrailBalance";
import Ledger from "./components/Accounting/Ledger";
import CashAndBankBookLedger from "./components/Accounting/Ledger/CashAndBankLedger";
import PayableAndReceivable from "./components/Accounting/Ledger/PayableAndReceivable";
import IncomeStatement from "./components/Accounting/IncomeStatement";
import BalanceSheet from "./components/Accounting/BalanceSheet";
import ExpenseReport from "./components/Accounting/Ledger/ExpenseReport";
import CashReceiveReport from "./components/Accounting/Ledger/CashReceiveReport";
// import IncomeAndExpense from "./Accounting/Ledger/IncomeAndExpense";

// HRM
import Department from "./components/HRM/Department";
import UserRole from "./components/HRM/UserRoles";
import Employee from "./components/HRM/Employee";
import LeaveType from "./components/HRM/LeaveType";
import EmployeeLeave from "./components/HRM/EmployeeLeave";
// import EmployeeAttedent from "./components/HRM/Attendence";
import EmployeeAttendanceReport from "./components/HRM/AttendenceReport";
import EmployeeSalary from "./components/HRM/Salary";
import LoanManagement from "./components/HRM/LoanManagement";
import PaySlip from "./components/HRM/Payslip";
import AttendanceImport from "./components/HRM/AttendenceOld/AttendanceExcelimport";
import EmployeeSalaryList from "./components/HRM/SalaryReport";
import AttendanceReportShort from "./components/HRM/AttendanceReportShort";
import Attendence from "./components/HRM/AttendenceOld";
// Report
import SalesReport from "./components/Report/Sales/salesReport";
import SoldProduct from "./components/Report/SoldProduct";
import DueCollection from "./components/Report/DueCollection";
import DeliveryReport from "./components/Report/Delivery/DeliveryReport";
import ServiceReport from "./components/Report/Service/serviceReport";
import CurrentStock from "./components/Report/CurrentStock";
import PurchaseReport from "./components/Report/Purchase";
import VatReport from "./components/Report/VAT/salesReport";
import Userlog from "./components/Report/Userlog";
import importlog from "./components/Report/Userlog/import";

// Session Out
// import SessionResetter from './actions/SessionResetter';


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Frame />}>
          {/* Manufacturing */}
          <Route
            exact
            path="manufacturing/workorder"
            element={
              <Authorization Module={"Manufacturing"} SubModule={"Workorder"}>
                <Workorder />
              </Authorization>
            }
          ></Route>
          <Route
            exact
            path="manufacturing/Productionlines"
            element={
              <Authorization
                Module={"Manufacturing"}
                SubModule={"Production Line"}
              >
                <Productionlines />
              </Authorization>
            }
          ></Route>
          <Route
            exact
            path="manufacturing/Workstation"
            element={
              <Authorization Module={"Manufacturing"} SubModule={"Workstation"}>
                <Workstations />
              </Authorization>
            }
          ></Route>
          <Route
            exact
            path="manufacturing/Workprocess"
            element={
              <Authorization
                Module={"Manufacturing"}
                SubModule={"Work Process"}
              >
                <WorkstationItem />
              </Authorization>
            }
          ></Route>

          <Route
            exact
            path="/"
            element={
              <Authorization Module={"pass"} SubModule={"pass"}>
                <Dashboard />
              </Authorization>
            }
          ></Route>
          {/* Customer */}
          <Route
            exact
            path="dashboard"
            element={
              <Authorization Module={"pass"} SubModule={"pass"}>
                <Dashboard />
              </Authorization>
            }
          ></Route>
          <Route
            exact
            path="customer"
            element={
              <Authorization Module={"Contacts"} SubModule={"Customer"}>
                <Contact />
              </Authorization>
            }
          ></Route>
          <Route
            exact
            path="supplier"
            element={
              <Authorization Module={"Contacts"} SubModule={"Supplier"}>
                <Supplier />
              </Authorization>
            }
          ></Route>
          <Route
            exact
            path="contact/options"
            element={
              <Authorization Module={"Contacts"} SubModule={"Import/Export"}>
                <ContactOptions />
              </Authorization>
            }
          ></Route>
          {/* Accounting */}
          <Route
            exact
            path="/accounting/chartofaccounts"
            element={
              <Authorization
                Module={"Accounting"}
                SubModule={"Chart of accounts"}
              >
                <Chartofaccounts />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/accountstatus"
            element={
              <Authorization Module={"Accounting"} SubModule={"Account status"}>
                <AccountsStatus />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/expensereport"
            element={
              <Authorization Module={"Accounting"} SubModule={"Expense Report"}>
                <ExpenseReport />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/cashreceivereport"
            element={
              <Authorization
                Module={"Accounting"}
                SubModule={"Cash Receive Report"}
              >
                <CashReceiveReport />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/accounts"
            element={
              <Authorization
                Module={"Accounting"}
                SubModule={"Account settings"}
              >
                <Accounts />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/branchsales"
            element={
              <Authorization
                Module={"Accounting"}
                SubModule={"Sales & petty cash"}
              >
                <BranchSales />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/journals"
            element={
              <Authorization Module={"Accounting"} SubModule={"All entries"}>
                <Journals />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/journalvoucher"
            element={
              <Authorization
                Module={"Accounting"}
                SubModule={"Journal entry voucher"}
              >
                <JournalVoucher />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/journalvoucher/create"
            element={
              <Authorization
                Module={"Accounting"}
                SubModule={"Journal entry voucher"}
              >
                <JournalVoucherCreate />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/receivevoucher"
            element={
              <Authorization
                Module={"Accounting"}
                SubModule={"Receive voucher"}
              >
                <ReveiveVoucher />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/receivevoucher/create"
            element={
              <Authorization
                Module={"Accounting"}
                SubModule={"Receive voucher"}
              >
                <ReveiveVoucherCreate />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/paymentvoucher"
            element={
              <Authorization
                Module={"Accounting"}
                SubModule={"Payment voucher"}
              >
                <PaymentVoucher />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/paymentvoucher/create"
            element={
              <Authorization
                Module={"Accounting"}
                SubModule={"Payment voucher"}
              >
                <PaymentVoucherCreate />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/contravoucher"
            element={
              <Authorization Module={"Accounting"} SubModule={"Contra voucher"}>
                <ContraVoucher />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/contravoucher/create"
            element={
              <Authorization Module={"Accounting"} SubModule={"Contra voucher"}>
                <ContraVoucherCreate />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/trailbalance"
            element={
              <Authorization Module={"Accounting"} SubModule={"Trail balance"}>
                <TrailBalance />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/ledger"
            element={
              <Authorization Module={"Accounting"} SubModule={"Ledger"}>
                <Ledger />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/CashBankBook"
            element={
              <Authorization
                Module={"Accounting"}
                SubModule={"Cash & Bank Ledger"}
              >
                <CashAndBankBookLedger />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/PayableAndReceivable"
            element={
              <Authorization
                Module={"Accounting"}
                SubModule={"Payable & Receivable"}
              >
                <PayableAndReceivable />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/incomestatement"
            element={
              <Authorization Module={"Accounting"} SubModule={"Profit & Loss"}>
                <IncomeStatement />
              </Authorization>
            }
          />
          <Route
            exact
            path="/accounting/balancesheet"
            element={
              <Authorization Module={"Accounting"} SubModule={"Balance sheet"}>
                <BalanceSheet />
              </Authorization>
            }
          />
          {/* <Route
          exact
          path="/accounting/IncomeAndExpense"
          component={IncomeAndExpense}
        /> */}
          {/* ---------------------------------------HRM---------------------------------------- */}
          <Route
            exact
            path="/department"
            element={
              <Authorization Module={"HRM"} SubModule={"Departments"}>
                <Department />
              </Authorization>
            }
          />
          <Route
            exact
            path="/user-role"
            element={
              <Authorization Module={"HRM"} SubModule={"Designation"}>
                <UserRole />
              </Authorization>
            }
          />
          <Route
            exact
            path="/employee"
            element={
              <Authorization Module={"HRM"} SubModule={"Employee"}>
                <Employee />
              </Authorization>
            }
          />
          <Route
            exact
            path="/leave-type"
            element={
              <Authorization Module={"HRM"} SubModule={"LeaveType"}>
                <LeaveType />
              </Authorization>
            }
          />
          <Route
            exact
            path="/employee-leave"
            element={
              <Authorization Module={"HRM"} SubModule={"Employee Leave"}>
                <EmployeeLeave />
              </Authorization>
            }
          />
          <Route
            exact
            path="/attendance"
            element={
              <Authorization Module={"HRM"} SubModule={"Attendance"}>
                <Attendence />
              </Authorization>
            }
          />
          <Route
            exact
            path="/attendance-report"
            element={
              <Authorization Module={"HRM"} SubModule={"Attendance List"}>
                <EmployeeAttendanceReport />
              </Authorization>
            }
          />
          <Route
            exact
            path="/salary"
            element={
              <Authorization Module={"HRM"} SubModule={"Salary Setup"}>
                <EmployeeSalary />
              </Authorization>
            }
          />
          <Route
            exact
            path="/loan-management"
            element={
              <Authorization Module={"HRM"} SubModule={"Loan Management"}>
                <LoanManagement />
              </Authorization>
            }
          />
          <Route
            exact
            path="/pay-slip"
            element={
              <Authorization Module={"HRM"} SubModule={"Pay-Slip"}>
                <PaySlip />
              </Authorization>
            }
          />
          <Route
            exact
            path="/import-attendance"
            element={
              <Authorization Module={"HRM"} SubModule={"Attendance"}>
                <AttendanceImport />
              </Authorization>
            }
          />
          <Route
            exact
            path="/salary-report"
            element={
              <Authorization Module={"HRM"} SubModule={"Salary Report"}>
                <EmployeeSalaryList />
              </Authorization>
            }
          />
          <Route
            exact
            path="/attendance-report-short"
            element={
              <Authorization Module={"HRM"} SubModule={"Attendance Report"}>
                <AttendanceReportShort />
              </Authorization>
            }
          />
          {/* Purchase  */}
          <Route
            exact
            path="/Purchase"
            element={
              <Authorization
                Module={"Inventory Purchase"}
                SubModule={"Add new purchase"}
              >
                <Purchase />
              </Authorization>
            }
          />
          <Route
            exact
            path="/Purchase/Add"
            element={
              <Authorization
                Module={"Inventory Purchase"}
                SubModule={"All purchase"}
              >
                <AddPurchaseOrder />
              </Authorization>
            }
          />
          {/* product */}
          <Route
            exact
            path="product"
            element={
              <Authorization Module={"Products"} SubModule={"All products"}>
                <ProductDetails />
              </Authorization>
            }
          />
          <Route
            exact
            path="product/image/:id"
            element={
              <Authorization Module={"Products"} SubModule={"Add new product"}>
                <ViewProduct />
              </Authorization>
            }
          />
          <Route
            exact
            path="product/Add"
            element={
              <Authorization Module={"Products"} SubModule={"Add new product"}>
                <AddProduct />
              </Authorization>
            }
          />
          <Route
            exact
            path="product/attribute"
            element={
              <Authorization Module={"Products"} SubModule={"Attribute"}>
                <Attribute />
              </Authorization>
            }
          />
          <Route
            exact
            path="product/category"
            element={
              <Authorization Module={"Products"} SubModule={"Category"}>
                <Category />
              </Authorization>
            }
          />
          <Route
            exact
            path="product/import"
            element={
              <Authorization Module={"Products"} SubModule={"Import product"}>
                <ProductImport />
              </Authorization>
            }
          />
          {/* Stock */}
          <Route
            exact
            path="/stock"
            element={
              <Authorization Module={"Stock"} SubModule={"Current Stock"}>
                <Stock />
              </Authorization>
            }
          />
          <Route
            exact
            path="/stock/packaging"
            element={
              <Authorization Module={"Stock"} SubModule={"Packaging Stock"}>
                <Packaging />
              </Authorization>
            }
          />
          <Route
            exact
            path="/stock/material"
            element={
              <Authorization Module={"Stock"} SubModule={"Material Stock"}>
                <Material />
              </Authorization>
            }
          />
          <Route
            exact
            path="/stock/alert"
            element={
              <Authorization Module={"Stock"} SubModule={"Stock Alert"}>
                <AlertStock />
              </Authorization>
            }
          />
          <Route
            exact
            path="/stock/transfer"
            element={
              <Authorization Module={"Stock"} SubModule={"Stock Transfer"}>
                <Transfer />
              </Authorization>
            }
          />
          <Route
            exact
            path="/stock/transfer/history"
            element={
              <Authorization Module={"Stock"} SubModule={"Transfer History"}>
                <TransferHistory />
              </Authorization>
            }
          />
          {/* Order */}
          <Route
            exact
            path="/order"
            element={
              <Authorization Module={"Sales"} SubModule={"All orders"}>
                <Order />
              </Authorization>
            }
          />
          <Route
            exact
            path="/order/Add"
            element={
              <Authorization Module={"Sales"} SubModule={"Add new order"}>
                <AddOrder />
              </Authorization>
            }
          />
          <Route
            exact
            path="/order/Add/:id"
            element={
              <Authorization Module={"Sales"} SubModule={"Add new order"}>
                <CustomerAddOrder />
              </Authorization>
            }
          />
          <Route
            exact
            path="/order/customerprofile"
            element={
              <Authorization Module={"Sales"} SubModule={"Add new order"}>
                <Customerprofile />
              </Authorization>
            }
          />
          <Route
            exact
            path="/order/report"
            element={
              <Authorization Module={"Sales"} SubModule={"Transfer History"}>
                <OrderReport />
              </Authorization>
            }
          />
          <Route
            exact
            path="/service"
            element={
              <Authorization Module={"Sales"} SubModule={"All Services"}>
                <Services />
              </Authorization>
            }
          />
          <Route
            exact
            path="/cupons"
            element={
              <Authorization Module={"Sales"} SubModule={"Coupons"}>
                <Cupon />
              </Authorization>
            }
          />
          <Route
            exact
            path="/draftcostsheet"
            element={
              <Authorization Module={"Sales"} SubModule={"Draft Cost Sheet"}>
                <DraftCostSheet />
              </Authorization>
            }
          />
          <Route
            exact
            path="/draftcostsheet/printview/:id"
            element={
              <Authorization Module={"Sales"} SubModule={"Draft Cost Sheet"}>
                <PrintView />
              </Authorization>
            }
          />
          <Route
            exact
            path="/invoice/:id"
            element={
              // <Authorization Module={"Sales"} SubModule={"Transfer History"}>
              <Invoice />
              // </Authorization>
            }
          />
          {/* Pettycash */}
          <Route
            exact
            path="/pettycash"
            element={
              <Authorization Module={"Petty Cash"} SubModule={"Petty Cash"}>
                <PettyCash />
              </Authorization>
            }
          />
          {/* Sponsorship */}
          <Route
            exact
            path="/wordrobe"
            element={
              <Authorization
                Module={"Sponsorship"}
                SubModule={"All sponsorship"}
              >
                <Wordrobe />
              </Authorization>
            }
          />
          <Route
            exact
            path="/wordrobe/Add"
            element={
              <Authorization
                Module={"Sponsorship"}
                SubModule={"Add new sponsor"}
              >
                <AddWordrobeOrder />
              </Authorization>
            }
          />
          <Route
            exact
            path="/wordrobe/stock"
            element={
              <Authorization
                Module={"Sponsorship"}
                SubModule={"S. floating stock"}
              >
                <WordrobeStock />
              </Authorization>
            }
          />
          {/* Report */}
          <Route
            exact
            path="/report/sales"
            element={
              <Authorization Module={"Report"} SubModule={"Sales report"}>
                <SalesReport />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/duecollection"
            element={
              <Authorization Module={"Report"} SubModule={"Due collection"}>
                <DueCollection />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/soldporductreport"
            element={
              <Authorization
                Module={"Report"}
                SubModule={"Sold Products Report"}
              >
                <SoldProduct />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/delivery"
            element={
              <Authorization Module={"Report"} SubModule={"Delivery report"}>
                <DeliveryReport />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/service"
            element={
              <Authorization Module={"Report"} SubModule={"Service report"}>
                <ServiceReport />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/currentstock"
            element={
              <Authorization Module={"Report"} SubModule={"Stock report"}>
                <CurrentStock />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/alert"
            element={
              <Authorization Module={"Report"} SubModule={"Stock alert report"}>
                <AlertStock />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/sponsorship"
            element={
              <Authorization Module={"Report"} SubModule={"Report"}>
                <AlertStock />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/WordrobeStock"
            element={
              <Authorization
                Module={"Report"}
                SubModule={"S. floating stock report"}
              >
                <WordrobeStock />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/purchase"
            element={
              <Authorization Module={"Report"} SubModule={"Purchase report"}>
                <PurchaseReport />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/vat"
            element={
              <Authorization Module={"Report"} SubModule={"VAT report"}>
                <VatReport />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/StockValuation"
            element={
              <Authorization Module={"Report"} SubModule={"Stock Valuation"}>
                <StockValuation />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/Userlog"
            element={
              <Authorization Module={"Report"} SubModule={"Userlog"}>
                <Userlog />
              </Authorization>
            }
          />
          <Route
            exact
            path="/report/importlog"
            element={
              <Authorization Module={"Report"} SubModule={"importlog"}>
                <importlog />
              </Authorization>
            }
          />
          {/* Tools */}
          <Route
            exact
            path="GroupOfCompany"
            element={
              <Authorization Module={"Settings"} SubModule={"Group Of Company"}>
                <GroupOfCompany />
              </Authorization>
            }
          />
          <Route
            exact
            path="Company"
            element={
              <Authorization Module={"Settings"} SubModule={"Company"}>
                <Company />
              </Authorization>
            }
          />
          <Route
            exact
            path="office"
            element={
              <Authorization Module={"Settings"} SubModule={"Office"}>
                <Office />
              </Authorization>
            }
          />
          <Route
            exact
            path="OfficeType"
            element={
              <Authorization Module={"Settings"} SubModule={"Office Type"}>
                <OfficeType />
              </Authorization>
            }
          />
          <Route
            exact
            path="OfficeLocation"
            element={
              <Authorization Module={"Settings"} SubModule={"Office Location"}>
                <OfficeLocation />
              </Authorization>
            }
          />
          <Route
            exact
            path="warehouse"
            element={
              <Authorization Module={"Settings"} SubModule={"Warehouse"}>
                <Warehouse />
              </Authorization>
            }
          />
          <Route
            exact
            path="outlet"
            element={
              <Authorization Module={"Settings"} SubModule={"Outlet"}>
                <Outlet />
              </Authorization>
            }
          />
          <Route
            exact
            path="businessprofile"
            element={
              <Authorization Module={"Settings"} SubModule={"Business Profile"}>
                <BusinessProfile />
              </Authorization>
            }
          />
          <Route
            exact
            path="contactgroup"
            element={
              <Authorization Module={"Settings"} SubModule={"Contact Groups"}>
                <ContactGroup />
              </Authorization>
            }
          />
          <Route
            exact
            path="deliverygroup"
            element={
              <Authorization Module={"Settings"} SubModule={"Delivery Methods"}>
                <DeliveryGroup />
              </Authorization>
            }
          />
          <Route
            exact
            path="accountgroup"
            element={
              <Authorization Module={"Settings"} SubModule={"Account Groups"}>
                <AccountGroup />
              </Authorization>
            }
          />
          <Route
            exact
            path="permissions"
            element={
              <Authorization Module={"Settings"} SubModule={"Permissions"}>
                <Permissions />
              </Authorization>
            }
          />
        </Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/signup" element={<SignupForm />}></Route>
      </Routes>

      {/* <div>
        <SessionResetter />
      </div> */}
    </>
  );
}

export default App;
