// import { createClient } from "@supabase/supabase-js";
// import { redirect } from "next/navigation";

// export const supabase = createClient(
//     // env.NEXT_PUBLIC_SUPABASE_URL,
//     // env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export const signOut = async () => {
//     await supabase.auth.signOut();
//     redirect("/");
// };

// export const fetchSession = async () => {
//     const {
//         data: { session },
//         error,
//     } = await supabase.auth.getSession();
//     if (!session) {
//         return null;
//     } else {
//         return session;
//     }
// };

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
