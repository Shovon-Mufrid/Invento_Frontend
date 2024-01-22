import backend from "../api/api";
import { message } from "antd";
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

// ####################### DRAFT COST SHEET Start #######################

// CREATE
export const createDraftCostSheet = (formValues) => async () => {
  formValues["data"] = "";
  try {
    const response = await backend.post(
      "api/order/draftcostsheets/",
      { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      message.success("Draft cost sheet created successfully");
      const draftCostSheet = response.data;
      return draftCostSheet;
    } else {
      throw new Error("Error creating draft cost sheet");
    }
  } catch (error) {
    console.log(error);
  }
};

// READ
export const getDraftCostSheet =(id)=> async () => {
  console.log(id)
  try {
    const response = await backend.get(
      `api/order/draftcostsheets/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching draft cost sheet:", error);
    throw error;
  }
};

export const getAllDraftCostSheet = () => async () => {
  try {
    const response = await backend.get(
      `api/order/draftcostsheets/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching draft cost sheet:", error);
    throw error;
  }
};

// UPDATE
export const updateDraftCostSheet = (id, formValues) => async () => {
  try {
    const response = await backend.patch(
      `api/order/draftcostsheets/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      message.success("Draft cost sheet created successfully");
      const draftCostSheet = response.data;
      return draftCostSheet;
    } else {
      throw new Error("Error creating draft cost sheet");
    }
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteDraftCostSheet = (id) => async () => {
  try {
    const response = await backend.delete(
      `api/order/draftcostsheets/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Draft cost sheet deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting draft cost sheet:", error);
    throw error;
  }
};

// ####################### Draft Cost Sheet End #######################


// ####################### Draft Order Start #######################

// CREATE
export const createDraftOrder = (formValues, cost_sheet_id) => async () => {
  // formValues["data"] = "";
  formValues.cost_sheet = cost_sheet_id;
  // console.log(formValues);
  try {
    const response = await backend.post(
      "api/order/draftorders/",
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      message.success("Draft Order created successfully");
      const draftOrder = response.data;
      return draftOrder;
    } else {
      throw new Error("Error creating draft order");
    }
  } catch (error) {
    console.log(error);
  }
};

// READ
export const getDraftOrder = async (id) => {
  try {
    const response = await backend.get(
      `api/order/draftorders/${id}/`,
      getConfig()
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching draft order:", error);
    throw error;
  }
};

export const getAllDraftOrder = () => async () => {
  try {
    const response = await backend.get(`api/order/draftorders/`, getConfig());
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching draft Order:", error);
    throw error;
  }
};

// UPDATE
export const updateDraftOrder = (id, formValues) => async () => {
  try {
    const response = await backend.patch(
      `api/order/draftorders/${id}/`,
      formValues,
      getConfig()
    );
    if (response.status === 201) {
      message.success("Draft Order created successfully");
      const draftCostSheet = response.data;
      return draftCostSheet;
    } else {
      throw new Error("Error creating draft order");
    }
  } catch (error) {
    console.log(error);
  }
};

// DELETE
export const deleteDraftOrder = (id) => async () => {
  try {
    const response = await backend.delete(
      `api/order/draftorders/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success("Draft cost sheet deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting draft order:", error);
    throw error;
  }
};
// ####################### Draft Order End #######################


// ####################### Draft Image Start #######################

export const uploadDraftImage = (formData ,cost_sheet_id) => async () => {
  formData.cost_sheet = cost_sheet_id;
  try {
    const response = await backend.post(
      "api/order/draftimages/", formData,
      // { ...formValues },
      getConfig()
    );
    if (response.status === 201) {
      message.success('Draft Image created successfully');      
      const draftImage = response.data;
      return draftImage;
    } else {
      throw new Error('Error creating draft order');
    }
  } catch (error) {
    console.log(error);
  }
};


export const deleteDraftImage = (id) => async () => {
  try {
    const response = await backend.delete(
      `api/order/draftimages/${id}/`,
      getConfig()
    );
    if (response.status === 204) {
      message.success('Draft Image deleted successfully');
    }
  } catch (error) {
    console.error('Error deleting Draft Image:', error);
    throw error;
  }
};


// ####################### Draft Image End #######################

