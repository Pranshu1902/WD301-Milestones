import React, { useState } from "react";
import LabelledInput from "../LabelledInput";
import { getLocalForms, saveLocalForms } from "../Data";

const formTemplate = { type: "text", label: "", value: "" };

export interface formTemplate {
  id: number;
  type: string;
  label: string;
  value: string;
}

interface form {
  id: number;
  title: string;
  fields: formTemplate[];
}

const sampleForm: form[] = [
  {
    id: Number(new Date()),
    title: "Form 1",
    fields: [
      { id: Number(new Date()), type: "text", label: "Name", value: "" },
    ],
  },
];

let formField = [
  { id: Number(new Date()), type: "text", label: "First Name", value: "" },
];

export default function Form(props: { closeFormCB: () => void }) {
  //saveLocalForms(sampleForm);
  const [state, setState] = useState(formField);
  const [newField, setNewField] = useState("");

  const addField = () => {
    setState([
      ...state,
      {
        ...formTemplate,
        id: Number(new Date()),
        label: newField,
        value: "",
      },
    ]);
    setNewField("");
  };

  const removeField = (id: number) => {
    setState(state.filter((field) => field.id !== id));
  };

  const updateField = (e: any, id: number) => {
    setState(
      state.map((field) => {
        if (field.id === id) return { ...field, value: e.target.value };
        return field;
      })
    );
  };

  const clearForm = () => {
    setState(
      state.map((field) => {
        return { ...field, value: "" };
      })
    );
  };

  return (
    <div className="w-full divide-y-2 divide-dotted flex flex-col gap-2">
      <div>
        {state.map((field) => (
          <LabelledInput
            id={field.id}
            label={field.label}
            key={field.id}
            fieldType={field.type}
            removeFieldCB={removeField}
            // updating the value on change
            value={field.value}
            onChangeCB={(e) => {
              updateField(e, field.id);
            }}
            onTypeChangeCB={(e) => {
              updateField(e, field.id);
            }}
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
          className="px-12 m-4 py-1 shadow-lg font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
          onClick={addField}
        >
          Add Field
        </button>
      </div>

      <div className="flex gap-4 w-full">
        <button
          className="px-12 mt-4 py-2 shadow-lg font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
          onClick={clearForm}
        >
          Clear Form
        </button>
        <button
          className="px-12 mt-4 py-2 shadow-lg font-bold text-white bg-red-500 hover:bg-red-800 rounded-lg"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
        <button
          type="submit"
          className="mt-4 shadow-xl px-12 py-2 text-white bg-green-500 hover:bg-green-800 rounded-lg font-bold"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
