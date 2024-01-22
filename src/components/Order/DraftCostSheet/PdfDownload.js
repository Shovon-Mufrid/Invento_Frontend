// import React from "react";
// import { Row, Col } from "antd";
// import { connect } from "react-redux";

// const pdfdownload = ({ data, details, componentRef, businessprofile }) => {
//   console.log(data);
//   return (
//     <>
//       <div style={{ display: "none" }}>
//         <div
//           className="salary_report_print_fontSize"
//           ref={componentRef}
//           style={{ padding: "10px" }}
//         >
//           <Row
//             style={{
//               borderBottom: "2px solid lightgray",
//               paddingBottom: "5px",
//               marginBottom: "20px",
//             }}
//           >
//             <Col span={17} style={{ paddingTop: "10px" }}>
//               <small>
//                 <div
//                   style={{ lineHeight: "2.5px" }}
//                   dangerouslySetInnerHTML={{
//                     __html: businessprofile.address,
//                   }}
//                 ></div>
//               </small>
//             </Col>

//             <Col span={7} style={{ textAlign: "right" }}>
//               <img
//                 src={businessprofile.logo}
//                 style={{
//                   maxHeight: "60px",
//                 }}
//               />
//             </Col>
//           </Row>

//           <h3 style={{ textAlign: "center" }}>Draft Order History</h3>
//           <Row>
//             <Col span={12} style={{ textAlign: "left" }}>
//               Name: {details.name}
//             </Col>
//             <Col span={12} style={{ textAlign: "left" }}>
//               Phone: {details.phone}
//             </Col>
//           </Row>
//           <Row>
//             <Col span={12} style={{ textAlign: "left" }}>
//               Email: {details.email}
//             </Col>
//             <Col span={12} style={{ textAlign: "left" }}>
//               Type: {details.Role}
//             </Col>
//           </Row>
//           <Row>
//             <Col span={12} style={{ textAlign: "left" }}>
//               Address: {details.address}
//             </Col>
//           </Row>
//           <br></br>
//           <table className="salary_table">
//             <thead>
//               <tr>
//                 <th>SL.</th>
//                 <th>Date</th>
//                 <th>Purchase/Invoice No.</th>
//                 <th>Total Qty</th>
//                 <th>Total Price</th>
//                 <th>Paid Amount</th>
//                 <th>Due Amount</th>
//               </tr>
//             </thead>

//             {data.map((item, index) => {
//               return (
//                 <>
//                   <tbody>
//                     <tr>
//                       <td>{index + 1}</td>
//                       {/* <td>{item.issue_date.id}</td> */}
//                       <td>{item.issue_date}</td>
//                       <td>{item.invoice_number}</td>
//                       <td>{item.quantity}</td>
//                       <td>{item.bill}</td>
//                       <td>{item.payment}</td>
//                       <td>{item.due}</td>
//                     </tr>
//                   </tbody>
//                 </>
//               );
//             })}
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     businessprofile: state.settings.businessprofile,
//   };
// };

// export default connect(mapStateToProps, {})(pdfdownload);
