import React, { useReducer, useEffect, useState } from "react";
import { Link, useQueryParams } from "raviger";
import open from "../images/open.png";
import deleteIcon from "../images/delete.png";
import previewIcon from "../images/eye.png";
import { Form } from "../types/formType";
import Modal from "./common/Modal";
import CreateForm from "./CreateForm";
import { deleteForm, listForms } from "../utils/apiUtils";

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
  const [newForm, setNewForm] = useState(false);

  const [currentState, setState] = useState<Form[]>([]);

  useEffect(() => {
    listForms({
      offset: 0,
      limit: 5,
    }).then((data) => (data ? setState(data.results) : setState([])));
  }, []);

  type searchAction = { type: "update"; value: string };

  const searchReducer = (state: string, action: searchAction) => {
    switch (action.type) {
      case "update": {
        setState(
          currentState.filter((form) => form.title.includes(action.value))
        );
        return action.value;
      }
    }
  };
  const [searchString, searchStringDispatcher] = useReducer(searchReducer, "");

  const deleteThisForm = (id: number) => {
    deleteForm(id);
    setState(currentState.filter((form) => form.id !== id));
  };

  return (
    <div className="flex flex-col justify-center gap-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <label className="text-red-500" htmlFor="search">
          🔍Search
        </label>
        <input
          type="text"
          name="search"
          className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full flex-1"
          value={searchString}
          onChange={(e) =>
            searchStringDispatcher({ type: "update", value: e.target.value })
          }
        />
      </form>
      <ul>
        {currentState
          .filter((form) =>
            form.title.toLowerCase().includes(search?.toLowerCase() || "")
          )
          .map((form, index) => (
            <li
              key={form.id}
              className="shadow-lg rounded-lg p-6 border-1 pb-12"
              tabIndex={index}
            >
              <div className="float-left pt-1 pr-4">
                {form.title} <br /> <p className="text-gray-500 font-thin"></p>
              </div>
              <button
                className="ml-2 bg-red-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-red-700 float-right"
                onClick={() => {
                  deleteThisForm(form.id);
                }}
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
                  alt="preview"
                  width={20}
                  height={20}
                />
              </Link>
            </li>
          ))}
      </ul>
      {currentState.length === 0 ? (
        <div className="text-red-500 justify-center text-xl flex">
          No Forms created
        </div>
      ) : null}{" "}
      &nbsp;
      {localStorage.getItem("token") ? (
        <button
          className="justify-center flex py-2 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
          onClick={(_) => {
            setNewForm(true);
          }}
        >
          New Form
        </button>
      ) : (
        <Link
          className="justify-center flex py-2 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
          href="/login" // redirect to login page
        >
          New Form
        </Link>
      )}
      <Modal open={newForm} closeCB={() => setNewForm(false)}>
        <CreateForm />
      </Modal>
    </div>
  );
}
