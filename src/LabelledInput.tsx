import React, { useState } from "react";
import { getLocalForms, saveLocalForms } from "./Data";

export default function LabelledInput(props: {
  id: number;
  label: string;
  fieldType: string;
  value: string;
  optionValue: string;
  options: string[];
  removeFieldCB: (id: number) => void;
  onChangeCB: (e: any) => void;
  onTypeChangeCB: (e: any) => void;
}) {
  /*const [state, setState] = useState(
    getLocalForms().filter((form) => form.id === props.id)[0]
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

      /*state.fields.map((field) => {
        field.id === id ? field.options.push(option) : (field = field);
      });

      let newState = {
        ...state,
        fields: newFields,
      };

      setState(newState);
      setOption("");

      // updating the form
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
    }
  };*/

  return (
    <>
      <div className="flex gap-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full"
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
