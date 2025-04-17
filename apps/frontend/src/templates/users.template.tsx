"use client";
import React from "react";
import { User } from "@/services/users";
import { MainTemplate } from ".";

type Props = {
  isLoading: boolean;
  data: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddUser: () => void;
};

export const UsersTemplate = ({
  data,
  isLoading,
  onDelete,
  onEdit,
  onAddUser,
}: Props) => {
  const handleAction = (action: string, id: string) => {
    if (action === "edit") onEdit(id);
    if (action === "delete") onDelete(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <MainTemplate>
      <div className="flex flex-col justify-between items-center  mb-6 md:flex-row">
        <h1 className="text-2xl font-semibold text-gray-800">
          Lista de Usuários
        </h1>
        <button
          onClick={onAddUser}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          + Adicionar Usuário
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data?.map((user, idx) => (
              <tr
                key={user.id}
                className={`border-t ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAction(e.target.value, user.id);
                        e.target.value = "";
                      }
                    }}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Selecionar ação
                    </option>
                    <option value="edit">Editar</option>
                    <option value="delete">Excluir</option>
                  </select>
                </td>
              </tr>
            ))}
            {data?.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-gray-500 py-6 text-sm"
                >
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainTemplate>
  );
};
