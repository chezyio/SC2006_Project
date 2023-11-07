import Header from "./components/Header";
import Footer from "./components/Footer";

import "./globals.css";

import Login from "./login";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <html lang="en">
            <head>
                <link
                    href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
                    rel="stylesheet"
                />
            </head>

            <body>
                <Header session={session} />
                <main className="container max-w-screen min-h-screen mx-auto p-6">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
