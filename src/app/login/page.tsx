import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page for the admin dashboard.",
};

export default function LoginPage() {
  return <LoginForm />;
}
