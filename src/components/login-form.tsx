"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { sendGTMEvent } from "@next/third-parties/google";
import { set } from "date-fns";

export function LoginForm() {
  // const { user, isUserLoading } = useUser();
  const { translate } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();
  const [is_token_validated, set_is_token_validated] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (window.location.search) {
      setIsUserLoading(true);
      const token = window.location.search.split("token=")[1];
      window.localStorage.setItem("auth_token", token);
      setIsUserLoading(false);
      set_is_token_validated(true);

      return;
    }

    setIsUserLoading(false);
  }, []);

  useEffect(() => {
    if (!isUserLoading && is_token_validated) {
      router.push(translate("routes.admin") as string);
    }
  }, [isUserLoading, router, translate, is_token_validated]);

  const handleGoogleSignIn = async () => {
    try {
      sendGTMEvent({
        event: "buttonGoogleSignInClicked",
        value: "google_sign_in",
      });

      window.location.href = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/auth/google`;

      toast({
        title: translate("login.toast.success.title") as string,
        description: translate("login.toast.success.description") as string,
      });

      set_is_token_validated(true);
    } catch (error) {
      console.error("Error signing in with Google", error);
      toast({
        variant: "destructive",
        title: translate("login.toast.error.title") as string,
        description: translate("login.toast.error.description") as string,
      });
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center -mt-16">
      <div className="max-w-md w-full p-8 space-y-8">
        <h1 className="text-3xl font-bold">
          {translate("login.title") as string}
        </h1>
        <p className="text-muted-foreground">
          {translate("login.description") as string}
        </p>
        <Button onClick={handleGoogleSignIn} size="lg" className="w-full">
          {translate("login.button") as string}
        </Button>
      </div>
    </div>
  );
}
