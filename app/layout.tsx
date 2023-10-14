"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
                    rel="stylesheet"
                />
            </head>

            <body>
                <Header />
                <main className="container max-w-screen min-h-screen mx-auto p-6">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
