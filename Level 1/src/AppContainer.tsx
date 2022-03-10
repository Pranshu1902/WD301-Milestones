import React from "react";

export default function AppContainer(props: {children: React.ReactNode}) {
    return (
        <div className="h-screen bg-gray-100 justify-center items-center flex">
            <div className="flex bg-gray-100 justify-center">
                {props.children}
            </div>
        </div>
    );
}