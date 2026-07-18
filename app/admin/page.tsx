import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  return <AdminDashboard />;
}