// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "../utils/supabase";

// export default function login() {
//     const [email, setEmail] = useState("");
//     const [submitted, setSubmitted] = useState(false);
//     const [loading, setLoading] = useState(false);

//     //TODO: Change this regex to NTU email
//     const regex = new RegExp("[a-z0-9]+@e.ntu.edu.sg"); //('[a-z0-9]+@e.ntu.edu.sg');

//     async function signInWithEmail() {
//         setLoading(true);

//         const { error } = await supabase.auth.signInWithOtp({
//             email: email,
//         });

//         if (error || !regex.test(email)) {
//             setLoading(false);
//             alert("Email address not supported");
//         } else {
//             setLoading(false);
//             setSubmitted(true);
//         }
//     }

//     if (submitted) {
//         return (
//             <div>
//                 <h1>Check email to sign in</h1>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <h1>Sign in</h1>

//             <div>
//                 RateMyHall is made by students, for students. In order to
//                 maintain the quality of reviews, we require users to sign in
//                 with their .edu email address. Reviews submitted by verified
//                 students will be marked with the "Student" badge.
//             </div>

//             <span className="inline-flex items-center bg-blue-50 px-2 py-1 text-xs font-medium text-blue-500 my-2 rounded-xl gap-1 h-full">
//                 <svg
//                     className="w-3 h-3"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill=""
//                     viewBox="0 0 20 20"
//                 >
//                     <path
//                         fill="currentColor"
//                         d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
//                     />
//                     <path
//                         fill="#fff"
//                         d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
//                     />
//                 </svg>
//                 <p>Student</p>
//             </span>

//             <input
//                 type="text"
//                 className="input input-bordered"
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <button
//                 type="button"
//                 onClick={signInWithEmail}
//                 className="btn btn-primary"
//             >
//                 Sign in
//             </button>
//             {loading && <div>Loading...</div>}
//         </div>
//     );
// }

import React from "react";

const page = () => {
    return <div>testing </div>;
};

export default page;
