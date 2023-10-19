// import React from "react";
// import Link from "next/link";

// import { Fragment } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

// import Image from "next/image";

// const Header = () => {
//     return (
//         <header>
//             <div className="flex flex-col lg:flex-row container max-w-screen-xl justify-between mx-auto p-2">
//                 <Link href="/" className="font-semibold">
//                     {/* <Image src={Logo} height={24} width={24} alt="logo" /> */}
//                     {/* <Image src={Logo_white} height={24} width={24} /> */}
//                     HawkerHub
//                 </Link>
//                 <div className="mt-4 lg:mt-0">
//                     <Link
//                         href="/hawkers"
//                         className="text-sm font-semibold hover:bg-neutral-100 focus:bg-neutral-100 -ml-2 p-2 rounded-md"
//                     >
//                         Hawkers
//                     </Link>
//                     <Link
//                         href="/account"
//                         className="text-sm font-semibold hover:bg-neutral-100 focus:bg-neutral-100 -ml-2 p-2 rounded-md"
//                     >
//                         Account
//                     </Link>
//                     <Link
//                         href="/login"
//                         className="text-sm font-semibold hover:bg-neutral-100 focus:bg-neutral-100 -ml-2 p-2 rounded-md"
//                     >
//                         Login
//                     </Link>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;

import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5 font-semibold">
                        <p>HawkerHub</p>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <a
                        href="/hawkers"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Hawkers
                    </a>
                    <a
                        href="/account"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Account
                    </a>
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a
                        href="/login"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5 font-semibold">
                            <p>HawkerHub</p>
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <a
                                    href="/hawkers"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Hawkers
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Account
                                </a>
                            </div>
                            <div className="py-6">
                                <a
                                    href="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
