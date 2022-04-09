import { link } from "fs";
import { ActiveLink } from "raviger";
import React from "react";
import logo from "./logo.svg";

export default function Header(props: { title: string }) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <img
        src={logo}
        className="animate-spin h-16 w-16 items-center"
        alt="logo"
        style={{ animation: "spin 2s linear infinite" }}
      />
      <h1 className="text-center text-gray-600 text-xl flex-1 justify-center items-center">
        {props.title}
      </h1>
      <div>
        {[
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
        ].map((link) => (
          <ActiveLink
            key={link.url}
            href={link.url}
            className="uppercase p-2 hover:text-blue-700"
            exactActiveClass="text-blue-500"
          >
            {link.page}
          </ActiveLink>
        ))}
      </div>
    </div>
  );
}
