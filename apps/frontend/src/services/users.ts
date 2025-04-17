import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};
