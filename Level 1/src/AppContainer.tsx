import React from "react";

export default function AppContainer(props: {children: React.ReactNode}) {
    return (
        <div className="items-center h-screen bg-gray-100">
            <div className="flex bg-gray-100 items-center mx-auto">
                {props.children}
            </div>
        </div>
    );
}