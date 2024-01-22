import * as types from "../redux/types";
import backend from "../api/api";
import { store } from "../redux/store";

const getConfig = () => {
  const token = store.getState().auth.token;

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return config;
};

export const createProduct = (formValues) => async (dispatch) => {
  console.log(formValues);
  try {
    const response = await backend.post(
      "api/product/Details/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_PRODUCT_DETAILS,
        payload: { ...response.data },
      });
      return response.data;
      // history.push("/product/attribute");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = () => async (dispatch) => {
  try {
    const response = await backend.get("api/product/Details/", getConfig());
    if (response.status === 200) {
      dispatch({
        type: types.GET_ALL_PRODUCT_DETAILS,
        payload: response.data,
      });
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

export const updateProduct = (id, formValues) => async (dispatch) => {
  try {
    const response = await backend.patch(
      `api/product/Details/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 200) {
      dispatch({
        type: types.UPDATE_PRODUCT_DETAILS,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const getallProductSearchResult =
  (keyward, location, page = 1, page_size = 10) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/product/Details/?keyward=${keyward}&Warehouse=${location}&page=${page}&page_size${page_size}`,
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
      alert(error);
    }
  };

export const getProductSearchResult =
  (keyward, location, page = 1, page_size = 10, is_active = true) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/product/Details/?keyward=${keyward}&Warehouse=${location}&page=${page}&page_size${page_size}&is_active=${is_active}`,
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
      alert(error);
    }
  };

export const getProductSearchResultforsales =
  (keyward, location, page = 1, page_size = 10, parentCategory = "") =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/product/Details/?keyward=${keyward}&Warehouse=${location}&page=${page}&page_size=${page_size}&quantity=0&is_active=true&parentCategory=${parentCategory}`,
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
      alert(error);
    }
  };

export const getProductSearchResultforpackaging =
  (keyward, location, page = 1, page_size = 10, parentCategory = 52) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/product/Details/?keyward=${keyward}&Warehouse=${location}&page=${page}&page_size=${page_size}&quantity=0&is_active=true&parentCategory=${parentCategory}`,
        getConfig()
      );

      if (response.status === 200) {
        // let allitem = response.data.results.filter(
        //   (item) => item.parent_category == "PACKAGING"
        // );
        // response.data.results = allitem;
        // response.data.count = allitem.length;
        dispatch({
          type: types.GET_SPECIFIC_PRODUCT_DETAILS,
          payload: response.data,
        });
        // console.log(
        //   response.data.results.filter(
        //     (item) => item.parent_category == "PACKAGING"
        //   )
        // );
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };

export const getProductSearchResultformaterial =
  (keyward, location, page = 1, page_size = 10, parentCategory = 52) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/product/Details/?keyward=${keyward}&Warehouse=${location}&page=${page}&page_size=${page_size}&is_active=true&parentCategory=${parentCategory}`,
        getConfig()
      );

      if (response.status === 200) {
        // let allitem = response.data.results.filter(
        //   (item) => item.parent_category == "PACKAGING"
        // );
        // response.data.results = allitem;
        // response.data.count = allitem.length;
        dispatch({
          type: types.GET_SPECIFIC_PRODUCT_DETAILS,
          payload: response.data,
        });
        // console.log(
        //   response.data.results.filter(
        //     (item) => item.parent_category == "PACKAGING"
        //   )
        // );
        return response.data;
      }
    } catch (error) {
      alert(error);
    }
  };

export const getProductSearchResultbywarehouse =
  (keyward, location, page = 1, page_size = 100) =>
  async (dispatch) => {
    try {
      const response = await backend.get(
        `api/product/Details/?keyward=${keyward}&Warehouse=${location}&is_outlet=False&page=${page}&page_size=${page_size}`,
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
      alert(error);
    }
  };

export const getProductSearchResultResponse = (data) => async (dispatch) => {
  try {
    const response = await backend.get(
      `api/product/getvariations/${data}/`,
      getConfig()
    );

    if (response.status === 200) {
      dispatch({
        type: types.GET_SPECIFIC_PRODUCT_DETAILS_FROM_STOCK,
        payload: response.data,
      });
      return response.data;
    }
  } catch (error) {
    alert(error);
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
// export const deleteAttributeTerm = (id) => async (dispatch) => {
//   try {
//     const response = await backend.delete(`product/term/${id}/`, getConfig());
//     if (response.status === 204) {
//       dispatch({ type: types.DELETE_ATTRIBUTE_TERM, payload: id });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateAttributeTerm = (id, formValues) => async (dispatch) => {
//   try {
//     const response = await backend.patch(
//       `product/term/${id}/`,
//       formValues,
//       getConfig()
//     );
//     if (response.status === 200) {
//       dispatch({
//         type: types.UPDATE_ATTRIBUTE_TERM,
//         payload: { ...response.data },
//       });
//     }
//   } catch (error) {
//     console.log(error.response);
//   }
// };

export const uploadProductImage = (formData, porductid) => async (dispatch) => {
  try {
    const response = await backend.post(
      "api/product/image/",
      formData,
      getConfig()
    );
    if (response.status === 201) {
      dispatch({
        type: types.CREATE_PRODUCT_DETAILS,
        payload: { ...response.data },
      });
      // history.push("/product/image/" + porductid);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductImage = (id, porductid) => async (dispatch) => {
  try {
    const response = await backend.delete(
      `api/product/image/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      dispatch({ type: types.DELETE_PRODUCT_DETAILS, payload: id });
    }
  } catch (error) {
    console.log(error);
  }
};
