"use client";
import React from "react";
import { Container, Typography } from "@mui/material";
import { UserList } from "@/components/UserList";

const Users: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Usuários
      </Typography>
      <UserList />
    </Container>
  );
};

export default Users;
