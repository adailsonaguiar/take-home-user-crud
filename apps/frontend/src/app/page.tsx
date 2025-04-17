"use client";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getUsers } from "@/services/users";
import { UsersTemplate } from "@/templates/users.template";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";

const Users: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({ queryKey: ["users"], queryFn: getUsers });

  const { mutateAsync: mutateRemoveUser, isPending } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.push("/");
    },
  });

  const handleAddUser = () => router.push("/users/new");

  const handleEditUser = (id: string) => router.push(`/users/${id}/edit`);

  const handleDeleteUser = (id: string) => mutateRemoveUser(id);

  if (isLoading || isPending) {
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
