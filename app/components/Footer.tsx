import React from "react";
import Image from "next/image";

const Footer = () => {
    return (
        <div className="bg-neutral-800">
            <div className="flex flex-col lg:flex-row lg:justify-between max-w-screen-xl mx-auto py-8 px-6">
                <p className="text-xs text-neutral-500">
                    © 2023 Chester Yee · Built in Singapore
                </p>
                <div className="flex text-white gap-2 mt-4 lg:m-0">xxx</div>
            </div>
        </div>
    );
};

export default Footer;
