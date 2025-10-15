"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BlogDataTable } from "@/components/admin/blog-data-table";
import { useLanguage } from "@/context/language-context";
import { useAuth } from "@/context/auth-context";

export function AdminDashboard() {
  const router = useRouter();
  const { translate } = useLanguage();
  const { is_authenticated, is_loading } = useAuth();

  useEffect(() => {
    if (!is_loading && !is_authenticated) {
      router.push(translate("routes.login") as string);
    }
  }, [is_authenticated, is_loading, router, translate]);

  if (is_loading || !is_authenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <BlogDataTable />
    </div>
  );
}
