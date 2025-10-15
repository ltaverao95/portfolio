"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BlogDataTable } from "@/components/admin/blog-data-table";
import { useLanguage } from "@/context/language-context";

export function AdminDashboard() {
  const router = useRouter();
  const { translate } = useLanguage();

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      router.push(translate("routes.login") as string);
      return;
    }
  }, [router, translate]);

  if (!localStorage.getItem("auth_token")) {
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