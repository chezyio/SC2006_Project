"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useDebounce } from "use-debounce";

const Search = () => {
    const router = useRouter();
    const [text, setText] = useState("");
    const [query] = useDebounce(text, 500);

    useEffect(() => {
        console.log(text);
        if (!query) {
            router.push("/");
        } else {
            router.push(`/?search=${query}`);
        }
    }, [query, router]);

    return (
        <div>
            <IoMdSearch />
            <input
                type="text"
                value={text}
                placeholder="search hawker"
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
};

export default Search;
