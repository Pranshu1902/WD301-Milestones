import { link } from "fs";
import { ActiveLink } from "raviger";
import React from "react";
import logo from "./logo.svg";
import { User } from "./types/userTypes";

export default function Header(props: { title: string; currentUser: User }) {
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
          ...(props.currentUser
            ? [
                {
                  page: "Logout",
                  onclick: () => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  },
                },
              ]
            : [{ page: "Login", url: "/login" }]),
        ].map((link) =>
          link.url ? (
            <ActiveLink
              key={link.page}
              href={link.url}
              className="uppercase p-2 hover:text-blue-700"
              exactActiveClass="text-blue-500"
            >
              {link.page}
            </ActiveLink>
          ) : (
            <button
              key={link.page}
              onClick={link.onclick}
              className="uppercase p-2 hover:text-blue-700"
            >
              {link.page}
            </button>
          )
        )}
      </div>
    </div>
  );
}
