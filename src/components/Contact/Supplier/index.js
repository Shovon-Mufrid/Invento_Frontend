import React, { useState } from "react";
import { connect } from "react-redux";
import ContactList from "./ContactList";
import CreateNewContact from "./CreateNewContact";

import { Breadcrumb } from "antd";

const Contact = ({ auth}) => {
  const [updatelist, setUpdatelist] = useState(true);
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Contact</Breadcrumb.Item>
        <Breadcrumb.Item>Supplier</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background main-frame">
        {auth.permissions.includes("Contacts.Supplier_is_create") ? (
          <CreateNewContact
            setUpdatelist={setUpdatelist}
            updatelist={updatelist}
          />
        ) : (
          ""
        )}
        <ContactList updatelist={updatelist} setUpdatelist={setUpdatelist} />
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
