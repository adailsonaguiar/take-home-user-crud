"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormTemplate } from "@/templates/login-form.template";
import { login } from "@/services/auth";
import { setToken } from "@/utils/auth";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      setFormError("");
      const response = await login(data);
      setToken(response.access_token);
      router.push("/users");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFormError(
        error.response?.data?.message || "Erro ao fazer login. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginFormTemplate
      onSubmit={handleLogin}
      isLoading={isLoading}
      formError={formError}
      setFormError={setFormError}
    />
  );
};

export default LoginPage;
