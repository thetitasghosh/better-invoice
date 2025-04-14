"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getUserData() {
  const sp = await createClient();
  const {
    data: { user },
  } = await sp.auth.getUser();

  return user;
}

export async function LogInAction(formData: FormData) {
  const sp = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { error } = await sp.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    redirect("/auth/error");
  }
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
export async function SignUpAction(formData: FormData) {
  const sp = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { error } = await sp.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    console.log(error.message);

    redirect("/auth/error");
  }
  revalidatePath("/", "layout");
  redirect("/teams/create");
}
export async function TeamsCreateAction(formData: FormData) {
  const sp = await createClient();
  const teamName = formData.get("name") as string;

  const {
    data: { user },
    error: userError,
  } = await sp.auth.getUser();

  if (!user || userError) {
    redirect("/auth/error");
  }

  const { error } = await sp.from("teams").insert({
    name: teamName,
    owner_id: user.id,
  });

  if (error) {
    console.error("Team creation failed:", error.message);
    redirect("/teams/error");
  }

  revalidatePath("/", "layout");
  redirect("/teams/invite");
}
export async function TeamsInviteAction(formData: FormData) {}
export async function getTeamData() {
  const sp = await createClient();

  const {
    data: { user },
    error: userError,
  } = await sp.auth.getUser();

  if (!user || userError) {
    console.error("User not found or error:", userError?.message);
    return null;
  }

  const { data: team, error: teamError } = await sp
    .from("teams")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  // console.log(team.name);

  if (teamError) {
    console.error("Error fetching team:", teamError.message);
    return null;
  }

  return team;
}
