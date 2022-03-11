import React, { useState } from "react";
import LabelledInput from "../LabelledInput";

const formTemplate = { type: "text", label: "" };

const formFields = [
  { id: 1, type: "text", label: "First Name" },
  { id: 2, type: "text", label: "Last Name" },
  { id: 3, type: "email", label: "Email" },
  { id: 4, type: "date", label: "Date of Birth" },
  { id: 5, type: "tel", label: "Phone" },
];

export default function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);
  const [newField, setNewField] = useState("");

  const addField = () => {
    setState([
      ...state,
      {
        ...formTemplate,
        id: Number(new Date()),
        label: newField,
      },
    ]);
    setNewField("");
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  const clearForm = () => {
    setState([]);
  };

  return (
    <div className="w-full divide-y-2 divide-dotted flex flex-col gap-2">
      <div>
        {state.map((field) => (
          <LabelledInput
            key={field.id}
            id={field.id}
            label={field.label}
            fieldType={field.type}
            removeFieldCB={removeField}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="border-2 border-gray-200 rounded-lg p-2 my-4 flex-1"
          value={newField}
          onChange={(e) => {
            setNewField(e.target.value);
          }}
        />
        <button
          className="px-12 m-4 py-1 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
          onClick={addField}
        >
          Add Field
        </button>
      </div>

      <div className="flex gap-4 w-full">
        <button
          type="submit"
          className="mt-4 shadow-xl px-12 py-2 text-white bg-blue-500 hover:bg-blue-800 rounded-lg font-bold"
        >
          Submit
        </button>
        <button
          className="px-12 mt-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
        <button
          className="px-12 mt-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
          onClick={clearForm}
        >
          Clear Form
        </button>
      </div>
    </div>
  );
}
