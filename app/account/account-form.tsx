"use client";
import { useCallback, useEffect, useState } from "react";
import Avatar from "./avatar";
import { Database } from "../database.types";
import {
    Session,
    createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import FavouriteCard from "../components/card/FavouriteCard";
import HawkerCard from "../components/card/HawkerCard";

export default function AccountForm({ session }: { session: Session | null }) {
    const supabase = createClientComponentClient<Database>();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [website, setWebsite] = useState<string | null>(null);
    const [favourites, setFavourites] = useState([]);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const user = session?.user;

    const getProfile = async () => {
        try {
            if (user) {
                let { data, error, status } = await supabase
                    .from("profiles")
                    .select(`full_name, username, website, avatar_url`)
                    .eq("id", user.id)
                    .single();

                const fav = await supabase
                    .from("favourites")
                    .select("*")
                    .eq("user_id", user?.id);
                if (error && status !== 406) {
                    throw error;
                }

                if (data) {
                    setFullname(data.full_name);
                    setUsername(data.username);
                    setWebsite(data.website);
                    setAvatarUrl(data.avatar_url);
                    setFavourites(fav.data);
                }
            }
        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProfile();
    }, [user]);
    // }, [user, getProfile]);

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string | null;
        fullname: string | null;
        website: string | null;
        avatar_url: string | null;
    }) {
        try {
            setLoading(true);

            let { error } = await supabase.from("profiles").upsert({
                id: user?.id as string,
                full_name: fullname,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            });
            if (error) throw error;
            alert("Profile updated!");
        } catch (error) {
            alert("Error updating the data!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="form-widget">
            <p className="text-4xl font-bold my-12">Profile</p>

            <Avatar
                uid={user!.id}
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                    setAvatarUrl(url);
                    updateProfile({
                        fullname,
                        username,
                        website,
                        avatar_url: url,
                    });
                }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-24">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        value={session?.user.email}
                        disabled
                    />
                </div>
                <div>
                    <Label htmlFor="email">Full Name</Label>
                    <Input
                        type="text"
                        id="fullName"
                        value={fullname || ""}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                        type="url"
                        id="website"
                        value={website || ""}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <Button
                    onClick={() =>
                        updateProfile({
                            fullname,
                            username,
                            website,
                            avatar_url,
                        })
                    }
                    disabled={loading}
                >
                    {loading ? "Loading ..." : "Update"}
                </Button>

                <form action="/auth/signout" method="post">
                    <Button type="submit">Sign Out</Button>
                </form>
            </div>

            <div>
                <p className="text-4xl font-bold my-12">Favourites</p>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-4">
                    {favourites.map((favourite, id) => {
                        return <FavouriteCard key={id} favourite={favourite} />;
                        // return (
                        //     <HawkerCard
                        //         key={id}
                        //         hawker={favourite}
                        //         userId={user ? user.id : null} // Check if user exists
                        //     />
                        // );
                    })}
                </div>
            </div>
        </div>
    );
}
