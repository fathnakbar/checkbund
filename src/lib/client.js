import { createClient } from "@supabase/supabase-js";
import { goto } from "$app/navigation";
import { Preferences } from "@capacitor/preferences";

const supabaseUrl = "https://oqqhpyblhwtewhcloioy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcWhweWJsaHd0ZXdoY2xvaW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY0NDUwMzMsImV4cCI6MjAwMjAyMTAzM30.uf8EYFjn68hCfxvuUMJSCO3eLWDPIgHAPnIixLG1bgI";
export const supabase = createClient(supabaseUrl, supabaseKey);

export const PREFERENCE_KEYS = {
  HAS_SIGNUP: "has_signup",
  SESSION: "session",
};

export async function signUp({ email, password, ...data }) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://ebb39d82.checkbund.pages.dev/",
    },
  });
}

export async function signIn(data) {
  const keys = Object.keys(data);
  if (keys.includes("password") && keys.includes("email")) {
    console.log(data)
    return await supabase.auth.signInWithPassword(data);
  }

  if (keys.includes("provider")) {
    return await supabase.auth.signInWithOAuth({
      ...data,
      options: { redirectTo: "com.checkbund.app://localhost/" },
    });
  }
}

export async function getSession() {
  // Get session from localStorage
  const {
    data: { session: _session },
    _error,
  } = await supabase.auth.getSession();
  if (!_error && _session) {
    return _session;
  }

  // Get session from Preferences API provided by capacitor.js
  let { value: session } = await Preferences.get({
    key: PREFERENCE_KEYS.SESSION,
  });

  if (session) {
    session = JSON.parse(session);
  }

  return session && await setSession(session);
}

export async function setSession(_session) {
  // Set the supabase client session (this method validate session keys and set client session)
  const {
    data: { session },
    error,
  } = await supabase.auth.setSession({
    ..._session,
  });

  if (error || !session) {
    return null;
  }

  await Preferences.set({
    key: PREFERENCE_KEYS.SESSION,
    value: JSON.stringify(session),
  });

  return session;
}

export async function getUserData() {
  let {id} = (await getSession()).user;
  let {data, error} = await supabase.from("user_data").select("*").eq("id", id);
  return data && data.length > 0 && !error ? {data: data[0], error} : {data, error};
}

export async function checkClinicOwnership() {
  let {data: {clinic}} = await getUserData()
  return clinic
}

async function clearSession(){
  localStorage.clear();
  await Preferences.remove({
    key: PREFERENCE_KEYS.SESSION
  })
}

export async function logout() {
  await supabase.auth.signOut();
  await clearSession();
}

export async function refreshSession(){
  const {data: {session}, error} = await supabase.auth.refreshSession(await getSession());

  if (error || !session) {
    await clearSession()
    return
  }

  return await setSession(session)
}

export async function guardian(){
  const path = new URL(window.location).pathname;

  const unprotected_path = /(\/login|\/register|\/landing|\/confirmed|\/wait_confirm)/g;
  const isLoggedIn = await getSession();

  // console.log(isLoggedIn && path.match(unprotected_path), path)


  if (isLoggedIn && path.match(unprotected_path)) {
      console.log("User have session", isLoggedIn)
      goto("/app")

    return false
  }

  if (!isLoggedIn && !path.match(unprotected_path)) {

    console.log("User doesn't have session")

    // Check if the user has signup
    let {value: signup} = await Preferences.get({key: PREFERENCE_KEYS.HAS_SIGNUP})
    signup = JSON.parse(signup);
    
    if (signup) {
      if (signup.confirmed) {
        goto("/confirmed")
      } else {
        goto("/wait_confirm")
      }
    } else {
      goto("/landing")
    }

    return false
  }

  return true
}

