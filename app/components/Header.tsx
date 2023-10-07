import React from "react";
import Link from "next/link";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import Image from "next/image";

const Header = () => {
    return (
        <header>
            <div className="flex flex-col lg:flex-row container max-w-screen-xl justify-between mx-auto p-2">
                <Link href="/" className="font-semibold">
                    {/* <Image src={Logo} height={24} width={24} alt="logo" /> */}
                    {/* <Image src={Logo_white} height={24} width={24} /> */}
                    HawkerHub
                </Link>
                <div className="mt-4 lg:mt-0">
                    <Link
                        href="#about"
                        className="text-sm font-semibold hover:bg-neutral-100 focus:bg-neutral-100 -ml-2 p-2 rounded-md dark:hover:bg-neutral-800 dark:text-white"
                    >
                        About
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
