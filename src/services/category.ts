import api from "@/api";
import getTokenHeader from "@/utils/getTokenHeader";

export const fetchAllCategories = async () => {
  try {
    const response = await api.get("/categories", {
      headers: getTokenHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategoryById = async (id: string) => {
  const response = await api.get(`/categories/${id}`, {
    headers: getTokenHeader(),
  });
  return response.data;
};
