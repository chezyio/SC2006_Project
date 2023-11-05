import React from "react";

const Footer = () => {
    return (
        <div className="bg-neutral-800">
            <div className="flex flex-col lg:flex-row lg:justify-between max-w-screen-xl mx-auto py-8 px-6">
                <p className="text-xs text-neutral-500">
                    © 2023 SDAC FireNinjas · Built in Singapore
                </p>
                <p className="text-xs text-neutral-500">
                    SC2006 Software Engineering
                </p>
            </div>
        </div>
    );
};

export default Footer;
