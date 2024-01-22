import React, { useState } from "react";
import { connect } from "react-redux";
import { Breadcrumb, Spin } from "antd";
import ContactList from "./ContactList";
import CreateNewContct from "./CreateNewContct";

const Contact = ({ auth }) => {
  const [reload, setreload] = useState(false);
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Contact</Breadcrumb.Item>
        <Breadcrumb.Item>Customer</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        {auth.permissions.includes("Contacts.Customer_is_create") ? (
          <CreateNewContct setreload={setreload} reload={reload} />
        ) : (
          ""
        )}
        <ContactList reload={reload} setreload={setreload} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Contact);
