import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";
import AccountForm from "./account-form";
import AuthForm from "../auth-form";

export default async function Account() {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return session ? (
        <AccountForm session={session} />
    ) : (
        // <AccountForm session={} />
        <div className="row">
            <div className="col-6">
                <h1 className="header">Supabase Auth + Storage</h1>
            </div>
            <div className="col-6 auth-widget">
                <AuthForm />
            </div>
        </div>
    );
}
