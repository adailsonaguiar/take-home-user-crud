import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  birthDate: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>("/users");
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const createUser = async (data: UserFormData): Promise<User> => {
  const response = await api.post<User>("/users", data);
  return response.data;
};

export const updateUser = async (
  id: string,
  data: UserFormData
): Promise<User> => {
  const response = await api.put<User>(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
