import React, { useState } from "react";
import open from "../images/open.png";
import deleteIcon from "../images/delete.png";

export interface formTemplate {
  id: number;
  type: string;
  label: string;
  value: string;
}

export interface form {
  id: number;
  title: string;
  fields: formTemplate[];
}

const formTemplate = { type: "text", label: "", value: "" };

const sampleForm: form = {
  id: 1,
  title: "Form 1",
  fields: [{ id: 1, type: "text", label: "Name", value: "" }],
};

const sampleForm2: form = {
  id: 2,
  title: "Form 2",
  fields: [{ id: 2, type: "text", label: "Country", value: "" }],
};

let allForms: form[] = [sampleForm, sampleForm2];

export default function Home(props: { openFormCB: (id: number) => void }) {
  const [state, setState] = useState(allForms);

  return (
    <div className="flex flex-col justify-center gap-y-4">
      {state.map((form) => (
        <div>
          <div className="float-left pt-1">{form.title}</div>
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
          <button
            className="bg-blue-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-blue-700 float-right"
            onClick={() => props.openFormCB(form.id)}
          >
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
      ))}
      &nbsp;
      <button
        className="px-16 py-2 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
        onClick={() => props.openFormCB(2)}
      >
        New Form
      </button>
    </div>
  );
}
