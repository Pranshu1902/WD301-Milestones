import React, { useState } from "react";
import { getLocalForms, saveLocalForms } from "./Data";

export default function LabelledInput(props: {
  id: number;
  label: string;
  fieldType: string;
  value: string;
  optionValue: string;
  options: string[];
  setOptionCB: any;
  removeFieldCB: (id: number) => void;
  onChangeCB: (e: any) => void;
  onTypeChangeCB: (e: any) => void;
  addOptionCB: (id: number, e: string) => void;
}) {
  const [state, setState] = useState(
    getLocalForms().filter((form) => form.id === props.id).length !== 0
      ? getLocalForms().filter((form) => form.id === props.id)[0]
      : { id: Number(new Date()), title: "Untitled Form", fields: [] }
  );

  const [option, setOption] = useState("");

  const addOption = (id: number) => {
    if (option !== "") {
      let newFields = state.fields.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            options: [...field.options, option],
          };
        } else {
          return field;
        }
      });

      state.fields.map((field) => {
        field.id === id ? field.options.push(option) : (field = field);
      });

      let newState = {
        ...state,
        fields: newFields,
      };

      setState(newState);
      setOption("");

      let newForms = getLocalForms();
      {
        getLocalForms().filter((form) => form.id === state.id).length !== 0
          ? saveLocalForms([...getLocalForms(), state])
          : console.log("Form saved");
      }
      newForms.map((form) => {
        form.id === props.id ? (form.fields = newState.fields) : (form = form);
      });
      saveLocalForms(newForms);

      console.log("current status");
      console.log(state);

      state.fields.map((field) => {
        console.log(field.label);
      });
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full flex-1"
          type={"text"}
          onChange={props.onChangeCB}
          value={props.label}
        />
        <select
          name="type"
          id="field"
          className="p-2 my-2 border-2 rounded-lg flex"
          onChange={props.onTypeChangeCB}
          value={props.fieldType}
        >
          <option value="">Select an option</option>
          <option value="text">Text</option>
          <option value="date">Date</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="dropdown">Dropdown</option>
          <option value="radio">Radio Buttons</option>
          <option value="textarea">Text Area</option>
          <option value="multidropdown">Multi-select dropdown</option>
        </select>

        {/* Options */}
        {props.fieldType === "dropdown" ||
        props.fieldType === "radio" ||
        props.fieldType === "multidropdown" ? (
          <div>
            <div className="flex">
              <input
                type={"text"}
                className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full flex-1"
                value={option}
                onChange={(e) => setOption(e.target.value)}
              ></input>
              &nbsp;
              <button
                onClick={(_) => addOption(props.id)}
                className="ml-6 px-12 py-1 shadow-lg bg-red-500 hover:bg-red-700 rounded-lg font-bold text-white"
              >
                Add Option
              </button>
            </div>
            <select
              name="options"
              id="options"
              className="p-2 my-2 border-2 rounded-lg"
              onChange={props.onTypeChangeCB}
              value={props.fieldType}
            >
              {props.options.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>
          </div>
        ) : (
          <div></div>
        )}
        <button
          onClick={(_) => props.removeFieldCB(props.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded-lg"
        >
          Remove
        </button>
      </div>
    </>
  );
}
