"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/users";
import { UsersTemplate } from "@/templates/users.template";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const Users: React.FC = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({ queryKey: ["users"], queryFn: getUsers });

  const handleAddUser = () => {
    window.location.href = "/users/new";
  };

  const handleEditUser = (id: string) => {
    window.location.href = `/users/${id}/edit`;
  };

  const handleDeleteUser = (id: string) => {
    window.location.href = `/users/${id}/delete`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center mt-5">
        <p className="text-red-500">Erro ao carregar usuários</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <UsersTemplate
        data={users ?? []}
        isLoading={isLoading}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser}
        onAddUser={handleAddUser}
      />
    </ProtectedRoute>
  );
};

export default Users;
