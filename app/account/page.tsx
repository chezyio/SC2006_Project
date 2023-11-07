import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";
import AccountForm from "./account-form";
import AuthForm from "../auth-form";

export default async function Account() {
    const supabase = createServerComponentClient<Database>({ cookies });

    try {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        const { data, error } = await supabase.from("favourites").select(`*`);
        // console.log("User Favourites", data);

        return session ? (
            <div>
                <AccountForm session={session} />
            </div>
        ) : (
            // <AccountForm session={} />

            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Login into your account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to continue
                        </p>
                    </div>
                    <AuthForm />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching session:", error);
    }
}
