"use client";

import { useAuth, useUser } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { validate_token } from "@/services/auth_service";

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { translate } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();
  const [is_token_validated, set_is_token_validated] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user && is_token_validated) {
      router.push(translate("routes.admin") as string);
    }
  }, [isUserLoading, user, router, translate, is_token_validated]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const credential = await signInWithPopup(auth, provider);
      const token = await credential.user.getIdToken();

      const isValidToken = await validate_token(token);
      if (!isValidToken) {
        await signOut(auth);
        toast({
          variant: "destructive",
          title: translate("login.toast.error.title") as string,
          description: translate(
            "login.toast.error.validation_failed"
          ) as string,
        });

        return;
      }

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

  if (isUserLoading || user) {
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
