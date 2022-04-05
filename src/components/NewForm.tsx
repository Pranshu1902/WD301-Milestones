import React, { useState } from "react";
import LabelledInput from "../LabelledInput";
import closeIcon from "../images/close.png";

export interface formTemplate {
  id: number;
  type: string;
  label: string;
  value: string;
}

const formTemplate = { type: "text", label: "", value: "" };

const formFields: formTemplate[] = [
  { id: 1, type: "text", label: "City", value: "" },
];

export default function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(formFields);
  const [newField, setNewField] = useState("");

  const addField = () => {
    if (newField != "") {
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
    }
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
        <button
          className="float-right px-3 py-1 mt-4 font-bold text-white rounded-xl"
          onClick={props.closeFormCB}
        >
          <img
            className="hover:scale-125"
            src={closeIcon}
            alt="close"
            width={20}
            height={20}
          />
        </button>
      </div>
      <div>
        {state.map((field) => (
          <LabelledInput
            id={field.id}
            label={field.label}
            key={field.id}
            fieldType={field.type}
            removeFieldCB={removeField}
            value={field.value}
            onChangeCB={(e) => {
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
          type="submit"
          className="mt-4 shadow-xl px-12 py-2 text-white bg-green-500 hover:bg-green-800 rounded-lg font-bold"
        >
          Submit (Save)
        </button>
      </div>
    </div>
  );
}