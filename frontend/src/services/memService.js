import axiosInstance from "./axiosInstance";

export const createMem = async (data) => {
  try {
    const response = await axiosInstance.post('/mems/create', data);
    return response.data.mem;
  } catch (error) {
    console.error("Error while creating mem: ", error);
    throw error.response?.data || { message: "Failed to create mem" };
  }
};

export const updateMem = async (memId, data) => {
  try {
    const response = await axiosInstance.patch(`/mems/update/${memId}`, data);
    return response.data.mem;
  } catch (error) {
    console.error("Error while updating mem: ", error);
    throw error.response?.data || { message: "Failed to update mem" };
  }
};

export const deleteMem = async (memId) => {
  try {
    const response = await axiosInstance.delete(`/mems/delete/${memId}`);
    return response.data;
  } catch (error) {
    console.error("Error while deleting mem: ", error);
    throw error.response?.data || { message: "Failed to delete mem" };
  }
};

export const getMyMems = async () => {
  try {
    const response = await axiosInstance.get(`/mems/my-mems`);
    return response.data;
  } catch (error) {
    console.error("Error while getting mems: ", error);
    throw error.response?.data || { message: "Failed to fetch mems" };
  }
};

export const getMemFromLink = async (memId) => {
  try {
    const response = await axiosInstance.get(`/mems/mJHbAQfVWp`);
    // const response = await axiosInstance.get(`/mems/${memId}`);
    return response.data;
  } catch (error) {
    console.error("Error while getting mem: ", error);
    throw error.response?.data || { message: "Failed to fetch mem" };
  }
};