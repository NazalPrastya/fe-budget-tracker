import api from "@/api";

import { LoginData, RegisterData } from "@/interfaces/IAuth";
import { handleApiError } from "@/utils/handleApiError";

export const login = async (userDataLogin: LoginData) => {
  try {
    console.log(process.env.NEXT_APP_BASE_URL_V1);
    const response = await api.post("/auth/login", userDataLogin);
    return response.data;
  } catch (error) {
    handleApiError(error, "Error logging in, please try again later");
  }
};

export const register = async (data: RegisterData) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Error registering, please try again later");
  }
};
export const profile = async (token: string) => {
  try {
    const response = await api.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "Unauthorized");
  }
};

export const logout = () => localStorage.removeItem("token");
