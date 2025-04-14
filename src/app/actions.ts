"user server";
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
    redirect("/");
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
    redirect("/");
  }
  revalidatePath("/", "layout");
  redirect("/teams/create");
}
export async function TeamsCreateAction(formData: FormData) {}
export async function TeamsInviteAction(formData: FormData) {}
