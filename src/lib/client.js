import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oqqhpyblhwtewhcloioy.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function signInWithGoogle() {
  const {
    data,
  } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: '/app'
      }
  });
}