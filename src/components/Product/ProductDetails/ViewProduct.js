import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getspecificSingleProduct } from "../../../actions/singleProductAction";
import PicturesWall from "./PictureWall";
import ShowImage from "./ShowImage";
import { getspecificproductvariation } from "../../../actions/variableProductAction";

import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Divider,
  Button,
  Affix,
  Skeleton,
} from "antd";
import { RightOutlined } from "@ant-design/icons";
const { Content } = Layout;

const ViewProductDetails = ({
  getspecificSingleProduct,
  details,
  getspecificproductvariation,
  Variations,
}) => {
  const { id } = useParams();
  const [newimage, setnewimage] = useState(false);
  const [loading, setloading] = useState(true);
  const colors = new Set();
  const color_ids = new Set();
  const variations = useRef();
  const variations_id = useRef();

  useEffect(() => {
    getspecificproductvariation(id).then((r) => {
      for (let i = 0; i < r.length; i++) {
        if (typeof r[i].color != "undefined") {
          colors.add(r[i].color);
          color_ids.add(r[i].Color);
        }
      }
      variations.current = Array.from(colors);
      variations_id.current = Array.from(color_ids);
      getspecificSingleProduct(id).then((e) => {
        setloading(false);
        setnewimage(false);
      });
    });
  }, [newimage]);

  if (loading) {
    return <Skeleton active />;
  } else {
    return (
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
          <Breadcrumb.Item>{details.title}</Breadcrumb.Item>
          <Breadcrumb.Item>Images</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background main-frame">
          <Affix offsetTop={20}>
            <Link aria-current="page" to="/product" style={{ float: "right" }}>
              <Button
                type="primary"
                style={{ backgroundColor: "#F0F2F5", color: "black" }}
              >
                Go to the Product list <RightOutlined />
              </Button>
            </Link>
          </Affix>
          <h3>Cover Photo</h3>
          <Row>
            <Col span={4} style={{ borderRight: "1px solid lightgray" }}>
              <PicturesWall
                limit={1}
                porductid={id}
                variationid={null}
                Color={null}
                cover={null}
                setnewimage={setnewimage}
              />
            </Col>
            <Col span={20}>
              <Row>
                {details.image.map((detail) => {
                  if (detail.Color == null) {
                    return (
                      <ShowImage details={detail} setnewimage={setnewimage} />
                    );
                  }
                })}
              </Row>
            </Col>
          </Row>
          <Divider />
          {/* {variations.current.map((variation) => {
                  return variation;
                })} */}

          {variations.current.map((variation, index) => {
            // console.log(variations.current);
            return (
              <>
                <h3>{variation}</h3>
                <Row>
                  <Col span={4} style={{ borderRight: "1px solid lightgray" }}>
                    <PicturesWall
                      limit={1}
                      porductid={id}
                      variationid={null}
                      Color={variations_id.current[index]}
                      cover={null}
                      setnewimage={setnewimage}
                    />
                  </Col>
                  <Col span={20}>
                    <Row>
                      {details.image.map((detail) => {
                        if (detail.Color == variations_id.current[index]) {
                          return (
                            <ShowImage
                              details={detail}
                              setnewimage={setnewimage}
                            />
                          );
                        }
                      })}
                    </Row>
                  </Col>
                </Row>
                <Divider />
              </>
            );
          })}
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    details: state.singleProduct.singleproduct,
    Variations: state.ProductDetails.productdetails,
  };
};

export default connect(mapStateToProps, {
  getspecificSingleProduct,
  getspecificproductvariation,
})(ViewProductDetails);
