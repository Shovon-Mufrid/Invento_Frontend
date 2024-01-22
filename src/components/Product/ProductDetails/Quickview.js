import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import { getspecificproductvariation } from "../../../actions/variableProductAction";
import BarcodePrinter from "./BarcodePrinter";
import ReactToPrint from "react-to-print";

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
  Divider,
  Drawer,
  Image,
} from "antd";

const { Option } = Select;

const Quickview = ({ details, Variations, getspecificproductvariation }) => {
  const [visible, setVisible] = useState(false);
  const componentRef = useRef();
  const wrapper_ref = React.useRef();
  const showDrawer = () => {
    getspecificproductvariation(details.id).then((res) => {
      console.log(res);
      setVisible(true);
    });
  };

  const printt = () => {
    const opt = {
      scale: 4,
    };
    const elem = wrapper_ref.current;
    html2canvas(elem, opt).then((canvas) => {
      const iframe = document.createElement("iframe");
      iframe.name = "printf";
      iframe.id = "printf";
      iframe.height = 0;
      iframe.width = 0;
      document.body.appendChild(iframe);

      const imgUrl = canvas.toDataURL({
        format: "jpeg",
        quality: "1.0",
      });

      let url = `<tr>`;
      url += `<td style="padding: 10px;text-align:center;">
        <h5 style="margin-bottom: 1px;">${details.title}</h5>
        <img style="margin-bottom: 1px;" width="100%" src="${imgUrl}"/>
        <h4 style="margin-top: 1px;margin-bottom: 1px;">ANJARA FASHION</h4>
        <h3 style="margin-top: 1px;margin-bottom: 1px;">BDT ${details.id}</h3>
        <h5 style="margin-top: 1px;margin-bottom: 1px;">(VAT inclusive)</h3>
        </td>`;
      url += `</tr>`;
      let page = "";
      var newWin = window.frames["printf"];
      newWin.document.write(
        `<body onload="window.print()"><table>${page}<table></body>`
      );
      newWin.document.close();
    });
  };

  const onClose = () => {
    setVisible(false);
  };

  const renderImage = (details) => {
    if (details.image[0])
      return (
        <>
          <Image
            width={70}
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

  return (
    <>
      <>
        <a href="#" onClick={showDrawer} style={{ margin: 4 }}>
          Quick View
        </a>
        <Drawer
          title={details.title}
          width="800"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          {visible ? (
            <>
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
                  <Row gutter={16}>
                    <Col span={8}>Product name:</Col>
                    <Col span={16}>{details.title}</Col>

                    <Col span={8}>Slug:</Col>
                    <Col span={16}>{details.slug}</Col>

                    <Col span={8}>Product code:</Col>
                    <Col span={16}>{details.product_code}</Col>

                    <Col span={8}>Category:</Col>
                    <Col span={16}>{details.main_category}</Col>

                    <Col span={8}>Sub category</Col>
                    <Col span={16}>{details.category_name}</Col>

                    <Col span={8}>Short Description:</Col>
                    <Col span={16}>{details.Short_description}</Col>
                    <Col span={8}>Discount:</Col>
                    <Col span={16}>
                      {details.discount ? details.discount : ""}
                      {details.discount_type == "%" ? " %" : " BDT"}
                    </Col>
                    <Col span={8}>Stock Alert:</Col>
                    <Col span={16}>{details.stock_alart_amount}</Col>
                  </Row>
                  <Divider></Divider>
                  {Variations.map((Variation) => {
                    // console.log(Variation);
                    return (
                      <>
                        <Row>
                          {/* <Col span={8}>{renderImage(Variation)}</Col> */}
                          <Col span={16}>
                            <Row>
                              <Col span={8}>Variation:</Col>
                              <Col span={16}>{Variation.description}</Col>
                            </Row>

                            <Row>
                              <Col span={8}>Warehouse:</Col>
                              <Col span={16}>{Variation.Warehouse_name}</Col>
                            </Row>
                            <Row>
                              <Col span={8}>Price:</Col>
                              <Col span={16}>{Variation.selling_price}</Col>
                            </Row>
                            <Row>
                              <Col span={8}>Quantity:</Col>
                              <Col span={16}>{Variation.quantity}</Col>
                            </Row>
                          </Col>
                          <Col
                            span={8}
                            style={{ textAlign: "center", marginTop: "-15px" }}
                          >
                            <Barcode value={Variation.barcode} width="2" />
                          </Col>
                        </Row>
                        <Divider></Divider>
                      </>
                    );
                  })}
                </div>
              </div>
              <Row gutter={16}>
                <Col span={8}>Product name:</Col>
                <Col span={16}>{details.title}</Col>

                <Col span={8}>Slug:</Col>
                <Col span={16}>{details.slug}</Col>

                <Col span={8}>Product code:</Col>
                <Col span={16}>{details.product_code}</Col>

                <Col span={8}>Category:</Col>
                <Col span={16}>{details.main_category}</Col>

                <Col span={8}>Sub category</Col>
                <Col span={16}>{details.category_name}</Col>

                <Col span={8}>Short Description:</Col>
                <Col span={16}>{details.Short_description}</Col>
                <Col span={8}>Discount:</Col>
                <Col span={16}>
                  {details.discount ? details.discount : ""}
                  {details.discount_type ? details.discount_type : ""}
                </Col>
                <Col span={8}>Stock Alert:</Col>
                <Col span={16}>{details.stock_alart_amount}</Col>
              </Row>
              <Divider></Divider>
              {Variations.map((Variation) => {
                return (
                  <>
                    <Row>
                      {/* <Col span={8}>{renderImage(Variation)}</Col> */}
                      <Col span={16}>
                        <Row>
                          <Col span={8}>Variation:</Col>
                          <Col span={16}>{Variation.Attribute_details}</Col>
                        </Row>
                        <Row>
                          <Col span={8}>Size:</Col>
                          <Col span={16}>{Variation.size}</Col>
                        </Row>
                        <Row>
                          <Col span={8}>Location:</Col>
                          <Col span={16}>{Variation.Warehouse_name}</Col>
                        </Row>
                        <Row>
                          <Col span={8}>Price:</Col>
                          <Col span={16}>{Variation.selling_price}</Col>
                        </Row>
                        <Row>
                          <Col span={8}>Quantity:</Col>
                          <Col span={16}>{Variation.quantity}</Col>
                        </Row>
                      </Col>
                      <Col span={8} style={{ textAlign: "center" }}>
                        <BarcodePrinter
                          details={details}
                          variation={Variation}
                        />
                      </Col>
                    </Row>
                    <Divider></Divider>
                  </>
                );
              })}
            </>
          ) : (
            ""
          )}
        </Drawer>
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    Variations: state.ProductDetails.productdetails,
  };
};

export default connect(mapStateToProps, { getspecificproductvariation })(
  Quickview
);
