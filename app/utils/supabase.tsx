import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const signOut = async () => {
    await supabase.auth.signOut();
    redirect("/");
};

// export const fetchSession = async () => {
//     const supabase = createServerComponentClient<Database>({ cookies });

//     const {
//         data: { session },
//     } = await supabase.auth.getSession();

//     console.log("Session Details", session);
//     if (!session) {
//         return null;
//     } else {
//         return session;
//     }
// };
