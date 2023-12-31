"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database.types";

export default function AuthForm() {
    const supabase = createClientComponentClient<Database>();
    return (
        <Auth
            supabaseClient={supabase}
            view="magic_link"
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: "rgb(96 165 250)",
                            brandAccent: "rgb(96 165 250)",
                        },
                    },
                },
            }}
            theme="light"
            showLinks={false}
            providers={[]}
            redirectTo="http://localhost:3000/auth/callback"
        />
    );
}
