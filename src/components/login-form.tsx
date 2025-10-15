"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";

export function LoginForm() {
  const { translate } = useLanguage();
  const { login } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center -mt-16">
      <div className="max-w-md w-full p-8 space-y-8">
        <h1 className="text-3xl font-bold">
          {translate("login.title") as string}
        </h1>
        <p className="text-muted-foreground">
          {translate("login.description") as string}
        </p>
        <Button onClick={login} size="lg" className="w-full">
          {translate("login.button") as string}
        </Button>
      </div>
    </div>
  );
}
