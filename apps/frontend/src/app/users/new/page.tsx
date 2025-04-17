"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserFormTemplate } from "@/templates/user-form.template";
import { createUser } from "@/services/users";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewUser: React.FC = () => {
  const [formError, setFormError] = useState<string>("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.push("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Erro desconhecido";
        setFormError(message);
      } else {
        setFormError("Erro inesperado:");
      }
    },
  });

  return (
    <UserFormTemplate
      onSubmit={mutate}
      isLoading={isPending}
      formError={formError}
      setFormError={setFormError}
    />
  );
};

export default NewUser;
