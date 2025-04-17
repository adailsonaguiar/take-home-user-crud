import api from "./api";
interface LoginResponse {
  access_token: string;
}
export const login = async (data: { email: string; password: string }) => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
};
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
