import { createClient } from "./server";

export async function getServerUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getServerSession() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
