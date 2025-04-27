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

export async function LogInAction(prevState: any, formData: FormData) {
  const sp = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { error } = await sp.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    // redirect("/auth/error");
    return {
      error: {
        message: error.message,
      },
    };
  }
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
export async function SignUpAction(prevState: any, formData: FormData) {
  const sp = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { error } = await sp.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    // redirect("/auth/error");
    return {
      error: {
        message: error.message,
      },
    };
  }
  revalidatePath("/", "layout");
  redirect("/teams/create");
}
export async function LogOutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
  }
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
export async function CreateCustomerAction(prevState: any, formData: FormData) {
  const sp = await createClient();
  const team = await getTeamData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const website = formData.get("website") as string;
  const contact_person = formData.get("contact_person") as string;
  const address = formData.get("address") as string;
  const tax_id = formData.get("tax_id") as string;
  const note = formData.get("note") as string;

  const { data, error } = await sp.from("customers").insert({
    name,
    email,
    phone,
    website,
    contact_person,
    address,
    tax_id,
    note,
    team_id: team.id,
  });
  if (error) {
    console.error("Error", error.message);
  }
  revalidatePath("/dashboard/customers", "page");
}
export async function CtreateInoiceAction(prevState: any, formData: FormData) {}

export async function DeleteData(table: string, id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) {
    console.error("Failed to delete data:", error.message);
  }

  revalidatePath("/dashboard", "layout");
}
export async function updateTeamCompanyInfo(formData: FormData) {
  const team_id = formData.get("team_id") as string;
  const name = formData.get("name") as string;
  const contact_person = formData.get("contact_person") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const tax_id = formData.get("tax_id") as string;
  const address = formData.get("address") as string;

  if (!team_id || !name) {
    console.log("Missing team_id or name");
    return;
  }

  const supabase = await createClient();

  const updateData = {
    team_company: [
      {
        name,
        contact_person,
        email,
        phone,
        tax_id,
        address,
      },
    ],
  };

  const { error } = await supabase
    .from("teams")
    .update(updateData)
    .eq("id", team_id);

  if (error) {
    console.log("Supabase update error:", error);
  } else {
    console.log("Company info updated successfully.");
    revalidatePath("/settings/team"); // Revalidate page if needed
  }
}
