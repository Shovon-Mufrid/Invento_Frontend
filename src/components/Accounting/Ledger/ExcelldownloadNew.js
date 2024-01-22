// import React, { useEffect, useState, useRef } from "react";
// import * as ReactDOM from "react-dom";
// import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
// import { ExcelExport } from "@progress/kendo-react-excel-export";

// const Excelldownload = (chart, journals) => {
//   let _exportGridOne;
//   let _exportGridTwo;

//   const exportFun = () => {
//     const optionsGridOne = _exportGridOne.workbookOptions();
//     const optionsGridTwo = _exportGridTwo.workbookOptions();
//     optionsGridOne.sheets[1] = optionsGridTwo.sheets[0];
//     optionsGridOne.sheets[0].title = "First Grid data";
//     optionsGridOne.sheets[1].title = "Second Grid data";
//     _exportGridOne.save(optionsGridOne);
//   };

//   return (
//     <div>
//       <ExcelExport
//         data={journals}
//         ref={(exporter) => {
//           _exportGridOne = exporter;
//         }}
//       >
//         <Grid data={journals} style={{ height: "490px" }}>
//           <GridToolbar>
//             <button
//               title="Export PDF"
//               className="k-button k-primary"
//               onClick={exportFun}
//             >
//               Export to Excel
//             </button>
//           </GridToolbar>
//           <GridColumn field="ProductID" title="Product ID" />
//           <GridColumn field="ProductName" title="Product Name" />
//           <GridColumn field="UnitsInStock" title="UnitsInStock" />
//         </Grid>
//       </ExcelExport>
//       <ExcelExport
//         data={journals}
//         ref={(exporter) => {
//           _exportGridTwo = exporter;
//         }}
//       >
//         <Grid data={journals} style={{ height: "490px" }}>
//           <GridToolbar>
//             <button
//               title="Export PDF"
//               className="k-button k-primary"
//               onClick={exportFun}
//             >
//               Export to Excel
//             </button>
//           </GridToolbar>
//           <GridColumn field="ProductID" title="Product ID" />
//           <GridColumn field="ProductName" title="Product Name" />
//           <GridColumn field="UnitsInStock" title="UnitsInStock" />
//         </Grid>
//       </ExcelExport>
//     </div>
//   );
// };

// // ReactDOM.render(<App />, document.querySelector("my-app"));
// export default Excelldownload;
