import React, { useState } from "react";
import { Link, useQueryParams } from "raviger";
import open from "../images/open.png";
import deleteIcon from "../images/delete.png";
import previewIcon from "../images/eye.png";
import { getLocalForms, saveLocalForms } from "../Data";
import { formType } from "../types/formType";

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

export default function Home() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");

  const [state, setState] = useState(() => getLocalForms());

  const deleteForm = (id: number) => {
    saveLocalForms(getLocalForms().filter((form) => form.id !== id));
    setState(getLocalForms());
  };

  const generateNewForm = () => {
    const newform: formType = {
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <label className="text-red-500">Search</label>
        <input
          type="text"
          name="search"
          className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full flex-1"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </form>
      {state
        .filter((form) =>
          form.title.toLowerCase().includes(search?.toLowerCase() || "")
        )
        .map((form) => (
          <div key={form.id} className="shadow-lg rounded-lg p-2 border-1">
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
            <Link
              className="ml-2 bg-blue-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-blue-700 float-right"
              href={`/forms/${form.id}`}
            >
              Open
              <img
                className="float-right pt-0.5"
                src={open}
                alt="open"
                width={20}
                height={20}
              />
            </Link>
            <Link
              className="bg-green-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-green-700 float-right"
              href={`/preview/${form.id}`}
            >
              Preview
              <img
                className="float-right pt-0.5"
                src={previewIcon}
                alt="open"
                width={20}
                height={20}
              />
            </Link>
          </div>
        ))}
      {state.length === 0 ? (
        <div className="text-red-500 justify-center text-xl flex">
          No Forms created
        </div>
      ) : null}{" "}
      &nbsp;
      <Link
        className="justify-center flex py-2 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
        href={`/forms/0`}
      >
        New Form
      </Link>
    </div>
  );
}
