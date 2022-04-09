import React, { useState } from "react";
import open from "../images/open.png";
import deleteIcon from "../images/delete.png";
import { getLocalForms, saveLocalForms } from "../Data";

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

// const formTemplate = { type: "text", label: "", value: "" };

const sampleForm: form = {
  id: Number(new Date()),
  title: "Form 1",
  fields: [{ id: Number(new Date()), type: "text", label: "Name", value: "" }],
};

export default function Home(props: { openFormCB: (id: number) => void }) {
  const [state, setState] = useState(() => getLocalForms());

  const deleteForm = (id: number) => {
    saveLocalForms(getLocalForms().filter((form) => form.id !== id));
    setState(getLocalForms());
  };

  const generateNewForm = () => {
    const newform: form = {
      id: Number(new Date()),
      title: "New Form",
      fields: [],
    };

    console.log("New form generated with id: ", newform.id);

    saveLocalForms([...state, newform]);
    setState([...state, newform]);
  };

  return (
    <div className="flex flex-col justify-center gap-y-4">
      {state.map((form) => (
        <div key={form.id}>
          <div className="float-left pt-1 pr-4">{form.title}</div>
          <button
            className="ml-2 bg-red-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-red-700 float-right"
            onClick={() => deleteForm(form.id)}
          >
            Delete
            <img
              className="float-right pt-0.5"
              src={deleteIcon}
              alt="delete"
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
              alt="open"
              width={20}
              height={20}
            />
          </button>
        </div>
      ))}
      {state.length === 0 ? (
        <div className="text-red-500 justify-center text-xl flex">
          No Forms created
        </div>
      ) : null}{" "}
      &nbsp;
      <button
        className="px-16 py-2 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
        onClick={generateNewForm}
      >
        New Form
      </button>
    </div>
  );
}
