"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

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
export async function UpdateCustomerAction(prevState: any, formData: FormData) {
  const sp = await createClient();
  const team = await getTeamData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const website = formData.get("website") as string;
  const contact_person = formData.get("contact_person") as string;
  const address = formData.get("address") as string;
  const tax_id = formData.get("tax_id") as string;
  const customer_id = formData.get("customer_id") as string;
  const note = formData.get("note") as string;

  const { data, error } = await sp
    .from("customers")
    .update({
      name,
      email,
      phone,
      website,
      contact_person,
      address,
      tax_id,
      note,
      team_id: team.id,
    })
    .eq("id", customer_id);
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
export async function getUserTeamInfo() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data: teamMember, error } = await supabase
    .from("team_members")
    .select("id, team_id, role")
    .eq("email", user.email)
    .eq("user_id", user.id)
    .single();

  if (error || !teamMember) {
    return {
      userId: user.id,
      teamMemberId: null,
      teamId: null,
      role: null,
    };
  }

  return {
    userId: user.id,
    teamMemberId: teamMember.id,
    teamId: teamMember.team_id,
    role: teamMember.role,
  };
}
export async function getTeamIdByUserId(user_id: string) {
  const sp = await createClient();

  // const {
  //   data: { user },
  //   error: userError,
  // } = await sp.auth.getUser();

  const { data: team, error: teamError } = await sp
    .from("teams")
    .select("id")
    .eq("owner_id", user_id)
    .order("created_at", { ascending: false })
    // .limit(1)
    .single();
  // console.log(team.name);

  if (teamError) {
    console.error("Error fetching team:", teamError.message);
    return null;
  }

  return team.id;
}
export async function getTeamMemberDataById(id: string) {
  const sp = await createClient();

  // const {
  //   data: { user },
  //   error: userError,
  // } = await sp.auth.getUser();

  const { data: team, error: teamError } = await sp
    .from("team_members")
    .select("*")
    .eq("id", id);
  // .order("created_at", { ascending: false });
  // .limit(1)
  // .single();
  // console.log(team.name);

  if (teamError) {
    console.error("Error fetching team:", teamError.message);
    return null;
  }

  return team[0];
}
export async function createTeamMember(prev: any, formData: FormData) {
  const name = formData.get("full_name") as string;
  const phone = formData.get("phone") as string;
  const team_id = formData.get("team_id") as string;
  const email = formData.get("email") as string;
  const file = formData.get("avatar") as File | null;

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated.");
  }

  // Optional: Check if team_member already exists
  const { data: exists } = await supabase
    .from("team_members")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (exists) {
    throw new Error("You already have a team member profile.");
  }

  let avatar_url = "";

  if (file && file.size > 0) {
    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${user.id}/${uuidv4()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw new Error("Failed to upload avatar.");
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    avatar_url = urlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("team_members")
    .insert([
      {
        user_id: user.id,
        email: user.email,
        name,
        phone,
        avatar_url,
        team_id,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  revalidatePath("/dashboard");

  return data;
}
export async function updateTeamMember(prev: any, formData: FormData) {
  const name = formData.get("full_name") as string;
  const phone = formData.get("phone") as string;
  const team_id = formData.get("team_id") as string;
  const email = formData.get("email") as string;
  const team_member_id = formData.get("team_member_id") as string;
  const file = formData.get("avatar") as File | null;

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated.");
  }

  // Optional: Check if team_member already exists
  // const { data: exists } = await supabase
  //   .from("team_members")
  //   .select("id")
  //   .eq("user_id", user.id)
  //   .maybeSingle();

  // if (exists) {
  //   throw new Error("You already have a team member profile.");
  // }

  let avatar_url = "";

  if (file && file.size > 0) {
    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${user.id}/${uuidv4()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw new Error("Failed to upload avatar.");
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    avatar_url = urlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("team_members")
    .update([
      {
        user_id: user.id,
        email: user.email,
        name,
        phone,
        avatar_url,
        team_id,
      },
    ])
    .eq("id", team_member_id);

  if (error) throw error;

  revalidatePath("/dashboard");

  return data;
}
export async function getCurrentTeamForUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data, error } = await supabase
    .from("team_members")
    .select(" team_id(name,id)")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data?.team_id) return null;

  return data.team_id;
}
export async function getInvoiceFromByTeamId(team_id: string) {
  const sp = await createClient();
  const { data, error } = await sp
    .from("invoice_from_default")
    .select("*")
    .eq("team_id", team_id);

  if (error || !data) return null;

  return data;
}
export async function updateInvoiceFrom(formData: FormData) {
  const sp = await createClient();

  const team_id = formData.get("team_id") as string;
  const payload = {
    name: formData.get("name"),
    contact_person: formData.get("contact_person"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    tax_id: formData.get("tax_id"),
    address: formData.get("address"),
  };

  const { error: upsertError } = await sp.from("invoice_from_default").upsert(
    {
      ...payload,
      team_id,
    },
    {
      onConflict: "team_id",
    }
  );

  if (upsertError) throw new Error(upsertError.message);
}
