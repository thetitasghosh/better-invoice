"use server";
import { createClient } from "../utils/supabase/server";
import { getTeamData } from "../app/actions";
export async function getCustomers() {
  const sp = await createClient();
  const team = await getTeamData();
  const { data, error } = await sp
    .from("customers")
    .select("*")
    .eq("team_id", team.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching team:", error.message);
    return null;
  }

  return data;
}
export async function getInvoices() {
  const sp = await createClient();
  const team = await getTeamData();
  const { data, error } = await sp
    .from("invoices")
    .select("*")
    .eq("team_id", team.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching team:", error.message);
    return null;
  }

  return data;
}
