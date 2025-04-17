"use client";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserFormTemplate } from "@/templates/user-form.template";
import { getUser, updateUser, UserFormData } from "@/services/users";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";

interface EditUserProps {
  params: {
    id: string;
  };
}

const EditUser: React.FC<EditUserProps> = ({ params }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", params.id],
    queryFn: () => getUser(params.id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserFormData) => updateUser(params.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.push("/");
    },
  });

  if (isLoadingUser) {
    return (
      <div className="flex justify-center mt-5">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <UserFormTemplate
        initialData={user}
        isEdit
        onSubmit={mutate}
        isLoading={isPending}
      />
    </ProtectedRoute>
  );
};

export default EditUser;
