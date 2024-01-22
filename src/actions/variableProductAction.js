import * as types from "../redux/types";

import backend from "../api/api";
import { store } from "../redux/store";
import { createProduct, updateProduct } from "./productDetails";
import { message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const getConfig = () => {
  const token = store.getState().auth.token;

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return config;
};

export const createVariableProduct = (formValues) => async (dispatch) => {
  formValues["data"] = "";

  try {
    const response = await backend.post(
      "api/product/singpleproduct/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_SINGLE_PRODUCT,
        payload: { ...response.data },
      });
      formValues["ProductDetails"] = response.data.id;
      message.success(
        formValues["title"] + " Has been added to your contact list"
      );

      if (formValues.Variations) {
        for (let i = 0; i < formValues.Variations.length; i++) {
          dispatch(
            createVariation(
              formValues,
              formValues.Variations[i].Color,
              formValues.Variations[i].Size,
              parseFloat(formValues.Variations[i].selling_price).toFixed(2),
              parseFloat(formValues.Variations[i].purchase_price).toFixed(2),
              formValues.Variations[i].quantity,
              formValues.Variations[i].Warehouse,
              formValues.Variations[i].Attributes
            )
          );
        }
        // return "/product/image/" + response.data.id;
      }
      setTimeout(
        function () {
          //Start the timer
          // this.props.setnewimage(true); //After 1 second, set render to true
          // return "/product/image/" + response.data.id;
          window.location.href = "/product/image/" + response.data.id;
          // return response.data;
        }.bind(this),
        3000
      );
    }
  } catch (error) {
    alert(error);
  }
};

export const createVariableProductonly = (formValues) => async (dispatch) => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/product/singpleproduct/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_SINGLE_PRODUCT,
        payload: { ...response.data },
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return [];
    // alert(error);
  }
};

export const createVariation =
  (
    formValues,
    color = null,
    size = null,
    selling = 0,
    purchase = 0,
    quantity = 0,
    Warehouse = null,
    Attributes = []
  ) =>
  async (dispatch) => {
    var formData = new FormData();
    formData.append("ProductDetails", formValues.ProductDetails);
    if (color) {
      // console.log(color);
      formData.append("Color", color);
    } else {
      formData.append("Color", "");
    }
    if (size) {
      // console.log(size);
      formData.append("Size", size);
    } else {
      formData.append("Size", "");
    }

    formData.append("selling_price", selling);
    formData.append("purchase_price", purchase);
    formData.append("Warehouse", Warehouse);
    formData.append("quantity", quantity);
    formData.append("Attribute", Attributes);
    formData.append("ref_type", "S");
    formData.append("data", "");
    // console.log(formData);
    try {
      const response = await backend.post(
        "api/product/DetailsUpdate/",
        formData,
        getConfig()
      );
      if (response.status === 201) {
        dispatch({
          type: types.CREATE_SINGLE_PRODUCT,
          payload: { ...response.data },
        });
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };

export const createVariationfromEdit =
  (productdetails, formValues) => async (dispatch) => {
    // var formData = new FormData();
    formValues["ProductDetails"] = productdetails;
    formValues["data"] = "";
    console.log(formValues);
    try {
      const response = await backend.post(
        "api/product/DetailsUpdate/",
        formValues,
        getConfig()
      );
      if (response.status === 201) {
        dispatch({
          type: types.CREATE_SINGLE_PRODUCT,
          payload: { ...response.data },
        });
        message.success("Successfully added new variation");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

export const uploadProduct = (formValues) => async (dispatch) => {
  console.log(formValues);
  try {
    const response = await backend.post(
      "api/product/product/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_SINGLE_PRODUCT,
        payload: { ...response.data },
      });
      // message.success("Successfully added new Product");
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const createNewProduct = (formValues) => async (dispatch) => {
  console.log(formValues);
  try {
    const response = await backend.post(
      "api/product/DetailsUpdate/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_SINGLE_PRODUCT,
        payload: { ...response.data },
      });
      message.success("Successfully added new Product");
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getSingleProduct = () => async (dispatch) => {
  try {
    const response = await backend.get(
      "api/product/singpleproduct/",
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_SINGLE_PRODUCT,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getspecificproductvariation = (id) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/product/getvariations/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.GET_SPECIFIC_PRODUCT_DETAILS,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// export const deleteAttribute = (id) => async (dispatch) => {
//   try {
//     const response = await backend.delete(
//       `product/attribute/${id}/`,
//       getConfig()
//     );
//     if (response.status === 204) {
//       dispatch({ type: types.DELETE_ATTRIBUTE, payload: id });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateVariation = (id, formValues) => async (dispatch) => {
  console.log(formValues);
  formValues["data"] = "";

  try {
    const response = await backend.patch(
      `api/product/DetailsUpdate/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.UPDATE_PRODUCT_DETAILS,
        payload: { ...response.data },
      });
      message.success("Successfully updated a variation");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateVariationCustom = (id, formValues) => async (dispatch) => {
  console.log(formValues);
  formValues["data"] = "";

  try {
    const response = await backend.patch(
      `api/product/DetailsUpdateCustom/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.UPDATE_PRODUCT_DETAILS,
        payload: { ...response.data },
      });
      message.success("Successfully updated a variation");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateVariationfromSrock =
  (id, formValues, amount) => async (dispatch) => {
    formValues["quantity"] = amount;
    formValues["data"] = "";
    try {
      const response = await backend.patch(
        `api/product/DetailsUpdate/${id}/`,
        formValues,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.UPDATE_PRODUCT_DETAILS,
          payload: { ...response.data },
        });

        // message.success("Successfully Trasnfered");
        // window.location.reload();
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

// export const createAttributeTerm =
//   (formValues, attributeid) => async (dispatch) => {
//     formValues.Attribute = attributeid;
//     try {
//       const response = await backend.post(
//         "product/term/",
//         { ...formValues },
//         getConfig()
//       );
//       if (response.status === 201) {
//         dispatch({
//           type: types.CREATE_ATTRIBUTE_TERM,
//           payload: { ...response.data },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
export const deleteVariation = (id) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/product/Details/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_PRODUCT_DETAILS, payload: id });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateSingleProduct =
  (location_id, id, formValues) => async (dispatch) => {
    let barcode = "0";
    if (formValues.Category <= 9) {
      barcode = `0${formValues.Category}0000`;
    } else {
      barcode = `${formValues.Category}0000`;
    }
    formValues["slug"] =
      formValues.title.split(" ").join("_") + "_" + formValues.Category;
    formValues["barcode_code"] = barcode;
    try {
      const response = await backend.patch(
        `product/singpleproduct/${id}/`,
        formValues,
        getConfig()
      );
      if (response.status === 200) {
        dispatch({
          type: types.UPDATE_SINGLE_PRODUCT,
          payload: { ...response.data },
        });
        console.log(location_id);
        dispatch(updateProduct(location_id, formValues));
      }
    } catch (error) {
      console.log(error.response);
    }
  };
