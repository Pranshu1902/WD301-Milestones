import React from "react";
import logo from "../logo.svg";

export default function Home(props: { openFormCB: () => void }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex">
        <img className="h-48" src={logo} />
        <div className="flex-1 flex justify-center items-center">
          <p>Welcome to Home Page</p>
        </div>
      </div>
      <button
        className="px-16 py-2 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
        onClick={props.openFormCB}
      >
        Open Form
      </button>
    </div>
  );
}
