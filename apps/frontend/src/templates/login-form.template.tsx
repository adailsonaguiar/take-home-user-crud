import React, { useState } from "react";
import { MainTemplate } from ".";
import { TextField } from "@/components/TextField";
import { ErrorCallout } from "@/components/ErrorCallout";
import { Button } from "@/components/Button";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormTemplateProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  formError?: string;
  setFormError?: React.Dispatch<React.SetStateAction<string>>;
}

export const LoginFormTemplate: React.FC<LoginFormTemplateProps> = ({
  onSubmit,
  isLoading = false,
  formError,
  setFormError,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError?.("");
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <MainTemplate>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            type="email"
            name="email"
            label="Email"
            value={formData.email}
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
          />

          {formError && <ErrorCallout message={formError} />}

          <div className="flex flex-col space-y-4">
            <Button isLoading={isLoading} label="Entrar" />

            <div className="text-center">
              <a
                href="/users/new"
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                Cadastre-se
              </a>
            </div>
          </div>
        </form>
      </div>
    </MainTemplate>
  );
};
