"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "./language-context";
import { Loader2 } from "lucide-react";
import { sendGTMEvent } from "@next/third-parties/google";

interface AuthContextType {
  is_authenticated: boolean;
  is_loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [is_authenticated, set_is_authenticated] = useState(false);
  const [is_loading, set_is_loading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { translate } = useLanguage();

  const handle_login_callback = useCallback(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");
    if (token) {
      localStorage.setItem("auth_token", token);
      set_is_authenticated(true);
      router.push(translate("routes.admin") as string);
    }
  }, [router, translate]);

  useEffect(() => {
    set_is_loading(true);
    const token = localStorage.getItem("auth_token");
    if (token) {
      set_is_authenticated(true);
    } else {
      handle_login_callback();
    }
    set_is_loading(false);
  }, [pathname, handle_login_callback]);

  const login = () => {
    sendGTMEvent({
      event: "buttonGoogleSignInClicked",
      value: "google_sign_in",
    });
    window.location.href = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api/auth/google`;
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    set_is_authenticated(false);
    router.push(translate("routes.login") as string);
  };

  if (is_loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ is_authenticated, is_loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
