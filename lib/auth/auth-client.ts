 "use client"
 import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
const { data, error } = await authClient.signUp.email({
  name: "Admin",
  email: "test@gmail.com",
  password: "password123",
});
console.log("DATA:", data);
console.log("ERROR:", error);