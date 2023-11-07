// // "use client";

// // import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// // import { useRouter } from "next/navigation";

// // export default function Login() {
// //   const router = useRouter();
// //   const supabase = createClientComponentClient<Database>();

// //   const handleSignUp = async () => {
// //     await supabase.auth.signUp({
// //       email: "jon@supabase.com",
// //       password: "sup3rs3cur3",
// //       options: {
// //         emailRedirectTo: `${location.origin}/auth/callback`,
// //       },
// //     });
// //     router.refresh();
// //   };

// //   const handleSignIn = async () => {
// //     await supabase.auth.signInWithPassword({
// //       email: "jon@supabase.com",
// //       password: "sup3rs3cur3",
// //     });
// //     router.refresh();
// //   };

// //   const handleSignOut = async () => {
// //     await supabase.auth.signOut();
// //     router.refresh();
// //   };

// //   return (
// //     <div className="flex gap-2">
// //       <button onClick={handleSignUp}>Sign up</button>
// //       <button onClick={handleSignIn}>Sign in</button>
// //       <button onClick={handleSignOut}>Sign out</button>
// //     </div>
// //   );
// // }

// "use client";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// import type { Session } from "@supabase/auth-helpers-nextjs";

// export default function LoginForm({ session }: { session: Session | null }) {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const router = useRouter();
//     const supabase = createClientComponentClient();

//     const handleSignUp = async () => {
//         await supabase.auth.signUp({
//             email,
//             password,
//             options: {
//                 emailRedirectTo: `${location.origin}/auth/callback`,
//             },
//         });
//         router.refresh();
//     };

//     const handleSignIn = async () => {
//         await supabase.auth.signInWithPassword({
//             email: "jon@supabase.com",
//             password: "sup3rs3cur3",
//         });
//         router.refresh();
//     };

//     const handleSignOut = async () => {
//         await supabase.auth.signOut();
//         router.refresh();
//     };

//     // for the `session` to be available on first SSR render, it must be
//     // fetched in a Server Component and passed down as a prop
//     return session ? (
//         <button onClick={handleSignOut}>Sign out</button>
//     ) : (
//         <>
//             <input
//                 name="email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//             />
//             <input
//                 type="password"
//                 name="password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//             />
//             <button onClick={handleSignUp}>Sign up</button>
//             <button onClick={handleSignIn}>Sign in</button>
//         </>
//     );
// }
