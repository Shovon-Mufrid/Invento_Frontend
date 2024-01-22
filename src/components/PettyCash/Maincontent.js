import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ContactList from "./ContactList";
import CreateNewContct from "./CreateNewContct";
import { getSpecificLocation } from "../../actions/warehouseAction";

const Maincontent = ({auth, getSpecificLocation}) => {
  const [updatelist, setUpdatelist] = useState(true);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getSpecificLocation(auth.profile.branch.id). then((res) => {
      setLocation(res);
      setIsLoading(true);
    });
  }, [updatelist]);
  return (
    <>
      <div className="site-layout-background main-frame">

        {
          isLoading ? (
            <Row gutter={24}>
              <Col span={8}>
                Cash On Hand: <span>{location.cash} Tk</span>
              </Col>
              <Col span={8}>
                Petty Cash: <span>{location.petty_cash} Tk</span>
              </Col>
            </Row>
          ) : (
          "" )
        }
        
        <CreateNewContct
            setUpdatelist={setUpdatelist}
            updatelist={updatelist}
          />
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

export default connect(mapStateToProps, {
  getSpecificLocation,
})(Maincontent);
