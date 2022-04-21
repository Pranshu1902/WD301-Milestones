import React, { useReducer, useEffect, useState } from "react";
import { Link, useQueryParams } from "raviger";
import open from "../images/open.png";
import deleteIcon from "../images/delete.png";
import previewIcon from "../images/eye.png";
import { getLocalForms, saveLocalForms } from "../Data";
import { formType, formItem, Form, APIForm } from "../types/formType";
import Modal from "./common/Modal";
import CreateForm from "./CreateForm";
import { deleteForm, listForms } from "../utils/apiUtils";
import { Pagination } from "../types/common";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

const fetchForms = async (setFormCB: (value: formItem[]) => void) => {
  fetch("https://tsapi.coronasafe.live/api/mock_test/").then((response) =>
    response.json().then((data) => {
      setFormCB(data);
    })
  );

  try {
    const data: Pagination<formItem> = await listForms({ offset: 0, limit: 2 });
    setFormCB(data.results);
  } catch (error) {
    console.log(error);
  }
};

export default function Home() {
  const [{ search }, setQuery] = useQueryParams();
  const [newForm, setNewForm] = useState(false);

  // formState useReducer
  type searchFormStateAction = { type: "filter"; value: string };
  type updateFormStateAction = { type: "update"; newState: formType[] };

  const initialState: formType[] = getLocalForms();

  const formStateReducer = (
    state: formType[],
    action: updateFormStateAction | searchFormStateAction
  ) => {
    switch (action.type) {
      case "filter": {
        return state.filter((form) => form.title.includes(action.value));
      }
      case "update": {
        return action.newState;
      }
    }
  };

  const [state, stateDispatcher] = useReducer(formStateReducer, initialState);

  type searchAction = { type: "update"; value: string };

  const searchReducer = (state: string, action: searchAction) => {
    switch (action.type) {
      case "update": {
        stateDispatcher({ type: "filter", value: action.value });
        return action.value;
      }
    }
  };
  const [searchString, searchStringDispatcher] = useReducer(searchReducer, "");

  /*const deleteForm = (id: number) => {
    saveLocalForms(getLocalForms().filter((form) => form.id !== id));

    stateDispatcher({ type: "update", newState: getLocalForms() });
  };*/

  useEffect(() => {
    fetchForms(() =>
      stateDispatcher({ type: "update", newState: getLocalForms() })
    );
  }, []);

  const updateOrder = (result: any) => {
    const formTitle = result.draggableId;
    const formIndex = result.destination.index;
    const fromIndex = state.findIndex((form) => form.title === formTitle);
    const formToBeMoved = state.filter((form) => form.title === formTitle)[0];

    let updateState = state;

    updateState.splice(fromIndex, 1);

    updateState.splice(formIndex, 0, formToBeMoved);

    stateDispatcher({ type: "update", newState: updateState });
    saveLocalForms(updateState);
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
      <DragDropContext onDragEnd={updateOrder}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {state
                .filter((form) =>
                  form.title.toLowerCase().includes(search?.toLowerCase() || "")
                )
                .map((form, index) => (
                  <Draggable
                    key={form.id}
                    draggableId={form.title}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={form.id}
                        className="shadow-lg rounded-lg p-6 border-1 pb-12"
                        tabIndex={index}
                      >
                        <div className="float-left pt-1 pr-4">
                          {form.title} <br />{" "}
                          <p className="text-gray-500 font-thin">
                            {/* {form.fields.length}{" "} */}
                            {/* {form.fields.length === 1 ? "question" : "questions"} */}
                          </p>
                        </div>
                        <button
                          className="ml-2 bg-red-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-red-700 float-right"
                          onClick={() => {
                            console.log("delete");
                          }} //deleteForm(form.id)}
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
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {state.length === 0 ? (
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
