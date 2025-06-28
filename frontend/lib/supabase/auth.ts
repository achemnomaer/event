import { createClient } from "./client";

export async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const supabase = createClient();

  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
      },
    },
  });
}

export async function signIn(email: string, password: string) {
  const supabase = createClient();

  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  const supabase = createClient();

  return await supabase.auth.signOut();
}

export async function resetPassword(email: string) {
  const supabase = createClient();

  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
}

export async function updatePassword(password: string) {
  const supabase = createClient();

  return await supabase.auth.updateUser({
    password,
  });
}

export async function updateProfile(data: {
  firstName: string;
  lastName: string;
}) {
  const supabase = createClient();

  return await supabase.auth.updateUser({
    data: {
      first_name: data.firstName,
      last_name: data.lastName,
      full_name: `${data.firstName} ${data.lastName}`,
    },
  });
}

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  const supabase = createClient();

  return await supabase.auth.updateUser({
    password: data.newPassword,
  });
}

export async function getCurrentUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getSession() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function resendVerification(email: string) {
  const supabase = createClient();

  return await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
    },
  });
}
