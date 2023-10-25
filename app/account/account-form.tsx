"use client";
import { useCallback, useEffect, useState } from "react";
import Avatar from "./avatar";
import { Database } from "../database.types";
import {
    Session,
    createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

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
            let { data, error, status } = await supabase
                .from("profiles")
                .select(`full_name, username, website, avatar_url`)
                .eq("id", user?.id)
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
        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

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
            console.log(favourites);
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
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={session?.user.email}
                    disabled
                />
            </div>
            <div>
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    value={fullname || ""}
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="url"
                    value={website || ""}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            <div>
                <button
                    className="button primary block"
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
                </button>
            </div>

            <div>
                <p>Favourite Hawkers</p>
                <div className="">
                    {favourites.map((favourite) => {
                        return (
                            <div className="p-4 bg-neutral-200 my-2">
                                <p>{favourite.hawker.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <form action="/auth/signout" method="post">
                    <button className="button block" type="submit">
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    );
}
