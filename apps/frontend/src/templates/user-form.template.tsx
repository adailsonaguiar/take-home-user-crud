import React, { useState } from "react";
import { MainTemplate } from ".";
import { TextField } from "@/components/TextField";
import { ErrorCallout } from "@/components/ErrorCallout";
import { Button } from "@/components/Button";
import Link from "next/link";

interface UserFormData {
  name: string;
  email: string;
  birthDate: string;
  password: string;
  rePassword: string;
}

interface UserFormTemplateProps {
  initialData?: {
    id: string;
    name: string;
    email: string;
    birthDate: string;
  };
  isEdit?: boolean;
  onSubmit: (data: UserFormData) => void;
  isLoading?: boolean;
  formError?: string;
  setFormError?: React.Dispatch<React.SetStateAction<string>>;
}

export const UserFormTemplate: React.FC<UserFormTemplateProps> = ({
  initialData,
  isEdit = false,
  onSubmit,
  isLoading = false,
  formError,
  setFormError,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: initialData?.name ?? "",
    email: initialData?.email ?? "",
    birthDate: initialData?.birthDate ?? "",
    password: "",
    rePassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError?.("");
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword)
      return alert("Senhas não conferem");

    onSubmit(formData);
  };

  return (
    <MainTemplate>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEdit ? "Editar Usuário" : "Cadastrar Usuário"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          type="text"
          name="name"
          label="Nome"
          value={formData.name}
          onChange={handleChange}
          minLength={3}
          required
        />

        <TextField
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextField
          type="date"
          name="birthDate"
          label="Data de nascimento"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />

        <TextField
          type="password"
          name="password"
          label="Senha"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />

        <TextField
          type="password"
          name="rePassword"
          label="Redigite a senha"
          value={formData.rePassword}
          onChange={handleChange}
          required
          minLength={6}
          error={
            formData.password !== formData.rePassword
              ? "Senhas não conferem"
              : ""
          }
        />

        {formError && <ErrorCallout message={formError} />}

        <div className="flex space-x-4">
          <Button
            isLoading={isLoading}
            label={isEdit ? "Atualizar" : "Cadastrar"}
          />

          <Link
            href="/"
            className="flex-1 text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </MainTemplate>
  );
};
