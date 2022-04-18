import React from "react";
import Header from "./Header";
import { User } from "./types/userTypes";

export default function AppContainer(props: {
  currentUser: User;
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-100 justify-center items-center flex">
      <div className="flex bg-gray-100 justify-center">{props.children}</div>
    </div>
  );
}
