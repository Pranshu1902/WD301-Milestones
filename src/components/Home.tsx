import React from "react";
import logo from "../logo.svg";
import open from "../images/open.png";
import deleteIcon from "../images/delete.png";

export interface formTemplate {
  id: number;
  type: string;
  label: string;
  value: string;
}

let formField = [{ id: 1, type: "text", label: "First Name", value: "" }];

export default function Home(props: { openFormCB: () => void }) {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="float-left pt-1">
          {formField.map((field) => field.label)}
        </div>
        <button className="ml-2 bg-red-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-red-700 float-right">
          Delete
          <img
            className="float-right pt-0.5"
            src={deleteIcon}
            alt=""
            width={20}
            height={20}
          />
        </button>
        <button className="bg-blue-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-blue-700 float-right">
          Open
          <img
            className="float-right pt-0.5"
            src={open}
            alt=""
            width={20}
            height={20}
          />
        </button>
      </div>
      &nbsp;
      <button
        className="px-16 py-2 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
        onClick={props.openFormCB}
      >
        New Form
      </button>
    </div>
  );
}
