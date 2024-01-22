import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import { getPurchase } from "../../actions/purchase";
import { getSpecificLocation } from "../../actions/warehouseAction";

import {
  Form,
  Input,
  InputNumber,
  Checkbox,
  Button,
  Col,
  Row,
  Select,
  message,
  TreeSelect,
  Space,
  Divider,
  Drawer,
  Image,
  Skeleton,
} from "antd";

const { Option } = Select;

const Quickview = ({
  details,
  getPurchase,
  businessprofile,
  getSpecificLocation,
}) => {
  var formatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  });
  const componentRef = useRef();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [branch, setbranch] = useState([]);
  const [data, setdata] = useState([]);
  const serialcount = useRef(0);
  const count = useRef(0);

  const showDrawer = () => {
    getSpecificLocation(details.location).then((result) => {
      setbranch(result);
    });
    getPurchase(details.id).then((service) => {
      console.log(service);
      count.current = service.length;
      if (count.current < 10) count.current = 10 - count.current;
      else {
        count.current = 0;
      }
      setdata(service);
      setloading(false);
    });
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const renderImage = (details) => {
    if (details.image[0])
      return (
        <>
          <Image
            style={{
              width: "100%",
              right: "0",
            }}
            src={`http://127.0.0.1:8000${details.image[0].photo}`}
          />
        </>
      );
    else {
      return (
        <>
          <Image
            width={70}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEXr6+uvr6/u7u7p6emsrKyysrK8vLy/v7+pqani4uLf39/a2trV1dXGxsbm5ubw8PC2trbMzMzQ0NBer4FEAAALKElEQVR4nO1di5akKAxVCAooD/3/j92Eh48q67FdPVM6J/ec7elGRC4JIUBgm4bBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwG40rwXj6G99+u3scQFjQ8hgYrvl3Fz4AEAdrHwKfXpkgEn/DLHK9MEQm2Lxm2F6b4SkUvr6hvqOi1FXWnooeG9OKKulFRUF1/hE7Bwv96FHcqOgRxhDBcWFG3KqoHIQ8zSTHoqyrqVkXb4XHVxdBeU1H3Kvo06zUVda+izbN6i+b8inrfxcSwqig8lyBhgK2i3hV33IW/ijBshkEbXue3m4HxLv/XCQo5uNthTq0M4+E4eIu4dkV1+8w91/I/j7HV73lmPwXodvwmwUm/njx8yBA5Tl/jJ0bd/mGCqXw9fkdRZePfmRz9AkcA/xWLI5tZv67er0DP37GpovsbEiRA9x01FV2tAECM6h7xpp606obJ+O+NAVZ3b7d7/f86Q3e86jnu+LXdZA0pmzR27vYM7jyfUZ+JIUwCu8ndYu/qcZL4utELqiY9wFeFHzckAcz+/WbcC/nbMjy0AnXuRzygN/feWzA9tEUboTVyW4o4F8N4OME1SycDNYoDWyiRBz7LBKHdKfrJGHZHD+ViZnQvxZEHLcmr7XWRM6gtxZMx7I9mUK70MoCdzyWbG7LTkk/J1cc+GUP8PK0r7Z7ZamX0/Hz+FBa3QW904WQM45xhNs9iEY2eNnUTwQ+Yb/BhmzgVimhv18RzMSzLvVv/uAoG+pqGqmmdyhttWjm7KqvoK5uV4tkYlvqtDKUqabHSkMJ05KdTxYGapDOLBa5GCdP7WvTJGS7103bJO6V5SNLd/Aus+ls7LbTa3ZRwUoalFwK4xcr099MQXQXWBLd6Ny4NnedmKAXKJDNchrgeVHsD2FD0Kx89UaucnCGtbSSGiwidbu/myrDqJI2eNVWl4eVkDEsogl4YFsuh6/CxLvqSrcHsrc7zJ13nFOuCIpY2BynPxbDzJqHqZNW5mAcEKZblRbKl/Wy89HaKlFZc2qVRMkVsqpMxzN7W4ozVSUV110a9rvE7HO2Tl4okFMoyrxQKdN426gvDybT09vMuD3plqJDN4hi0N0vaaGDrGL/f8Qd7rhnw7eeLj6KLVFdDqfwmp5dpkMx9VTZbRqjM0350ORdDEYvAsuKKxbUGu51XSE8OWzZPmLpdeE326MwM1T65jgT3swxacXViV9YDnIthUwRRne7qWKv7EqSYy8ur+30JhnnpZZFOmeJOB7WUvrTDOuZfhqFuFxnmfqjNfQmIMqSgDJ9RPBnDvLgEt/p3XElTy7qSDLN/ArEYlil74fG4ksW4hnghhlkcAKrIMLk48LSSSFNdSUuz0QBdxCPTX218tiIl/fN9upMxnIvXVkKh0vwWRfp0zW3ju16A4VCGhzJcNCbL9NiWJsjm+WBxNoay1iv/1YQ0EsD8uJZSPqJ2SoZS1plxDWjz6c/4pKjxxW7yyRiKUt9153agmcOTreqXu8nnYuil1MWaLhufY5oumEcUh1cBAediKOXqbIeSIiiyiLaXDimG+Cpm5VwMmzRjz3o6LQvbvkOK0RxsJHoxveB3QobrjoZd0waS1NSE29zCviR4PoaNrQzXrV2UnZk6nDbeRiX4N8KqzsewqRukNEaseilEuNkgletG3KUYShz1625LfH7+zsd3Yv/Ox3ATLgLKiN2jXcyFUfBOcNzpGBKm4ksjAfTX5EGkgkzrcG9Fjp2RIQ2KSxBC5+9HCeTn3w6MOyPDhkxI0VMc7Xt/E8oghO/hTQmelmHTbfqYjrNfoklEY+b4f0I3T8pQ7O2khthP8ziO89RH+H+hqSdliGPGMtblaX89pLf8fRWGjwN4ZffWYHBhhg2Zy3+B4UNsFfXCDOPTMHP5G9Hg345UeH6o5TcU9dsMYTw+BZvQhGWb+7IMybt+enLrsgybfq3Ck8s94Besaf+6Mn8Cb6yvLA3wGcHD3dW/Af/XTgV96xYb4f4ORe2+I0IaBP/KyacUOvy107JO/2kx6iWC8TsQZuoOznT9HrrJfMnKJEhai/jTSF9hMBgMBoPB+Axl1+hnboX80CHxaTvuflOnFv4L7o6oBX7gHP68EumoMDmG95Wq5X7M0A8DhYhIMzwJS3sMiQXYDyqBn6cidlv/dqmKpKcfQoxa9xQxosoc5l5jloRDbRazhsP3dkU8fDponN7PWoc1WwCsSn7B6uXUyo+BDHNkU/zZLE02s4o/qUPpYEMLXsygN5GbYT1utDD8ABSiRsfIK0PRbE8p468hbwoK/JUOxAiRd0JFqD9Dzo/5Qk0XYfm1lJkKKQnpYcDSUthGCNhIiWHNRgzxcVgZ1o/+mKGmyKbEUNpOa3BVHgPEoUzBnXa9htBMWuvONF61FKbn2tjMraLbAzFfHGhbeGrkSIFEoWtdPuI1Ab40SdFDpBk16YyNmBRNuunME0ORs5H0BMDkcmmZoelA4+d+zhCwAJ8ZUohhBKhHQyjeTkXqFhTIhhmDwx9KtzL0tLYi6az6rNt0U0nEF22YdEfhpnoWDZR4KWzDToEeS30nUMK3WnVAhLEfGtJSQWfaKdvQBLowMyqint7wSqu4huv+gKE2AH1IDBXWO9jleC82cN8EbFvbOKy0Nx5gCJhrolsFjSAzQQzpdKELwUGkdI9qhtZrgHJhyBSnICKdsFFUTZSyGGJswkzxVCTD1A+li3MQ1AUFhRsHj7okiKFwOoowwvH1I+8xJNUbO+2wxoCWX7gqxCHFU/oWZqw9qijZTW+NQ2FSv8VErDbJ0KKIrB1BU38ejW5Vi22SWl1K7G92TmeIZgBUUoqWFsGPPUlpoHj4xBA7pMUMjrQUWzi3FzFE8VlrtH59ud9Dhh5FoLDGpLGSjiph44rMUNNYqfSE31MhrYHT8VcNVFsl0vlJYohNoxMMNk8/U581qlbJd/hSYohabacUdjtHWsLLDEs/ND0dxm2RYVoBJ61NDINuc9lPgqxfMZSp/4FLWidJLVcZYsfximSIqpIYGmxPQxc8asCWaJqNDDGdjEPsYJi0Q7XKehXRXsmOGKKtcVEPJHeYzAg7hkp3A+bNMhRJkzJDNDyWCv/hsniSIZk50g80AC4IqaDPUaMD6Qvxtpkh1cdgf3NDPguUlqqTpaFmD3OPbR/o+KS0KI5yLAo71NAIlf4cSEqoJZ3uAjZkuzIM+IYRTeqHqm1Rjan0pKUddopg3fQBQ0nHBFtqPTSV/RyXY/Z0xaWbaElaZIYyQju57CLQBZ+myJBedGiRctu3UaAcytl2KdFmDjjSpFZLhpmOJuhx3mkpNURv0ao7GVQLcerSoEK2FJulnyI8i5N/LUO6YiV9moY7reoto8gQ00EZOguaGPqYekQytVFHHK3pbD42kaP+mfb7UeSTQCnp+gksQrfYq3xy8bDK0nvqWhONINVro9ECdHRomAWa7TZ/JY8vVIB+EQH5BGgb07/G+uToD+N6iyoZOj8mg+FLNwgWPfWkw9JbT+6jMVSA8MNY1q4pQTZ2ceRFKiL1I8pdisbc3qT/yNEg82rGIQjqysaiBzHSV6QxZPqo7NeXiD7ETZT6NnwyORwlgzjMvrxU3myWS4bE/nF+RD83mZc895OnXTznh9d/LleslKkD/T8pSlJSoZLu1+x1fipLZe+m0AulpeSc18tmV9w2gHr7b2lmSbpCP35jHnwIYfve/+M7Cuhn/NMMk75e/3+iwmAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwG4w7/AV7fdGrLtuDOAAAAAElFTkSuQmCC"
          />
        </>
      );
    }
  };
  const renderitems = () => {
    if (loading) {
      return <Skeleton active />;
    } else {
      return data.map((item, index) => {
        // console.log(item);
        serialcount.current = index + 1;
        return (
          <>
            <tr>
              <td>{index + 1}</td>

              <td> {item.Details}</td>
              {/* {item.details ? (
                <td></td>
              ) : (
                <td>{formatter.format(item.price)}</td>
              )} */}
              <td style={{ textAlign: "center", margin: "auto" }}>
                {item.quantity}
              </td>
              {/* <td style={{ textAlign: "center", margin: "auto" }}>
                {formatter.format(item.price * item.quantity)}
              </td> */}
            </tr>
          </>
        );
      });
    }
  };

  const renderblanktables = () => {
    if (loading) {
      return "";
    } else {
      let indexcount = 0;
      return Array.apply(null, Array(count.current)).map(() => {
        indexcount = indexcount + 1;
        return (
          <tr>
            <td>{serialcount.current + indexcount}</td>
            {/* <td></td> */}
            <td></td>
            <td></td>
          </tr>
        );
      });
    }
  };

  return (
    <>
      <>
        <a href="#" onClick={showDrawer} style={{ margin: 4 }}>
          List
        </a>
        <Drawer
          width="850"
          onClose={onClose}
          visible={visible}
          // bodyStyle={{ paddingBottom: 80 }}
        >
          <ReactToPrint
            trigger={() => <button>Print this out!</button>}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            <div
              ref={componentRef}
              style={{ padding: "10px" }}
              className="invoice_print_fontSize"
            >
              <Row
                style={{
                  borderBottom: "2px solid lightgray",
                  paddingBottom: "5px",
                  marginBottom: "20px",
                }}
              >
                <Col span={15} style={{ textAlign: "left" }}>
                  <small>
                    <div
                      className="d-div"
                      dangerouslySetInnerHTML={{
                        __html: branch.address,
                      }}
                    ></div>
                  </small>
                </Col>

                <Col span={9} style={{ textAlign: "right" }}>
                  <img
                    src={branch.logo}
                    style={{
                      maxHeight: "60px",
                      // right: "0",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={13}>
                  {details.contact ? (
                    <>
                      {details.Contact[0].name ? (
                        <h4>{details.Contact[0].name}</h4>
                      ) : (
                        ""
                      )}
                      {details.Contact[0].address
                        ? details.Contact[0].address
                        : ""}

                      {details.Contact[0].phone
                        ? "Phone : " + details.Contact[0].phone
                        : ""}
                      <br></br>
                      <br></br>
                    </>
                  ) : (
                    ""
                  )}
                  {details.shipping_address ? (
                    <>
                      {" "}
                      <h3>Shipping Address : </h3>
                      {details.shipping_address}
                    </>
                  ) : (
                    ""
                  )}
                </Col>
                <Col span={11}>
                  {/* <h1 style={{ textAlign: "right" }}>{details.status}</h1> */}
                  <Row style={{ margin: "auto", textAlign: "right" }}>
                    <Col span={13}>
                      <h3>PO No.</h3>
                    </Col>
                    <Col span={10} offset={1} style={{ textAlign: "right" }}>
                      {details.purchase_number}
                    </Col>
                  </Row>
                  <Row style={{ margin: "auto", textAlign: "right" }}>
                    <Col span={13}>
                      <h3>Issue Date</h3>
                    </Col>
                    <Col span={10} offset={1} style={{ textAlign: "right" }}>
                      {details.issue_date}
                    </Col>
                  </Row>
                  <Row style={{ margin: "auto" }}>
                    <Col span={13} style={{ textAlign: "right" }}>
                      <h3>Reference</h3>
                    </Col>
                    <Col span={10} offset={1} style={{ textAlign: "right" }}>
                      {details.reference ? details.reference : ""}
                    </Col>
                  </Row>
                </Col>
              </Row>

              <table className="product_table invoice_print_fontSize">
                <tbody>
                  <tr style={{ fontWeight: "500" }}>
                    <td>NO</td>
                    <td>PRODUCT DETAILS</td>
                    {/* <td>DESIGN CODE</td> */}
                    {/* <td>RATE</td> */}
                    <td>QTY</td>
                    {/* <td>AMOUNT</td> */}
                  </tr>
                  {renderitems()}
                  {renderblanktables()}
                  <tr style={{ fontWeight: "500" }}>
                    <td></td>
                    <td>TOTAL</td>
                    {/* <td>DESIGN CODE</td> */}
                    {/* <td>RATE</td> */}
                    <td>{details.quantity}</td>
                    {/* <td>AMOUNT</td> */}
                  </tr>
                </tbody>
              </table>
              <Divider />
              <Row style={{ minHeight: "20px" }}>
                <Col span={24} style={{ textAlign: "left" }}>
                  {details.remarks ? (
                    <>
                      {" "}
                      <h3>Note : </h3>
                      <div
                        dangerouslySetInnerHTML={{ __html: details.remarks }}
                      ></div>
                    </>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ textAlign: "left" }}>
                  {/* <h3
                style={{
                  borderTop: "2px solid black",
                  display: "inline-block",
                }}
              >
                ACCOUNT SIGNATURE
              </h3> */}
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <h3
                    style={{
                      marginBottom: "0px",
                      marginTop: "10px",
                      padding: "0px",
                      borderTop: "2px solid black",
                      // width: "50%",
                      display: "inline-block",
                    }}
                  >
                    RECEIVER SIGNATURE
                  </h3>
                  <br></br>
                  <small>(WITH DATE)</small>
                </Col>
              </Row>
            </div>
          </div>
          <Row
            style={{
              borderBottom: "2px solid lightgray",
              paddingBottom: "5px",
              marginBottom: "20px",
            }}
          >
            <Col span={15} style={{ paddingTop: "10px" }}>
              <small>
                <div
                  className="d-div"
                  dangerouslySetInnerHTML={{
                    __html: branch.address,
                  }}
                ></div>
              </small>
            </Col>

            <Col span={9} style={{ textAlign: "right" }}>
              <img
                src={branch.logo}
                style={{
                  maxHeight: "60px",
                  // right: "0",
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={13}>
              {/* <h3>Supplier details</h3> */}
              {details.contact ? (
                <>
                  {details.Contact[0].name ? (
                    <h4>{details.Contact[0].name}</h4>
                  ) : (
                    ""
                  )}
                  {details.Contact[0].address ? details.Contact[0].address : ""}

                  {details.Contact[0].phone
                    ? "Phone : " + details.Contact[0].phone
                    : ""}
                  <br></br>
                  <br></br>
                </>
              ) : (
                ""
              )}
              {details.shipping_address ? (
                <>
                  {" "}
                  <h3>Shipping Address : </h3>
                  {details.shipping_address}
                </>
              ) : (
                ""
              )}
            </Col>
            <Col span={11}>
              <Row style={{ margin: "auto", textAlign: "right" }}>
                <Col span={13}>
                  <h3>PO No.</h3>
                </Col>
                <Col span={10} offset={1} style={{ textAlign: "right" }}>
                  {details.purchase_number ? (
                    <h4>{details.purchase_number}</h4>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>

              <Row style={{ margin: "auto", textAlign: "right" }}>
                <Col span={13}>
                  <h3>Issue Date</h3>
                </Col>
                <Col span={10} offset={1} style={{ textAlign: "right" }}>
                  {details.issue_date}
                </Col>
              </Row>
              <Row style={{ margin: "auto" }}>
                <Col span={13} style={{ textAlign: "right" }}>
                  <h3>Reference</h3>
                </Col>
                <Col span={10} offset={1} style={{ textAlign: "right" }}>
                  {details.reference ? details.reference : ""}
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <table className="product_table">
            <tbody>
              <tr style={{ fontWeight: "500" }}>
                <td>NO</td>
                <td>PRODUCT DETAILS</td>
                {/* <td>DESIGN CODE</td> */}
                {/* <td>RATE</td> */}
                <td>QTY</td>
                {/* <td>AMOUNT</td> */}
              </tr>
              {renderitems()}
              {renderblanktables()}
              <tr style={{ fontWeight: "500" }}>
                <td></td>
                <td>TOTAL</td>
                {/* <td>DESIGN CODE</td> */}
                {/* <td>RATE</td> */}
                <td>{details.quantity}</td>
                {/* <td>AMOUNT</td> */}
              </tr>
            </tbody>
          </table>

          <Row>
            <Col span={14}>
              <br style={{ minHeight: "40vh" }}></br>
              {details.remarks ? (
                <>
                  {" "}
                  <h3>Note : </h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: details.remarks }}
                  ></div>
                </>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row style={{ minHeight: "80px" }}>
            <Col span={12} style={{ textAlign: "left" }}>
              {/* <img
                src={businessprofile.signature}
                style={{
                  maxHeight: "80px",
                  left: "0",
                }}
              /> */}
            </Col>
            <Col span={12} style={{ textAlign: "center" }}></Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: "left" }}></Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <h3
                style={{
                  marginBottom: "-10px",
                  padding: "0px",
                  borderTop: "2px solid black",
                  // width: "50%",
                  display: "inline-block",
                }}
              >
                RECEIVER SIGNATURE
              </h3>
              <br></br>
              <small>(WITH DATE)</small>
            </Col>
          </Row>
        </Drawer>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    businessprofile: state.settings.businessprofile,
  };
};

export default connect(mapStateToProps, { getPurchase, getSpecificLocation })(
  Quickview
);
