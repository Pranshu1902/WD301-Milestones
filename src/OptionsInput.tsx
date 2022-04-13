import React, { useState } from "react";

export default function OptionsInput(props: {
  id: number;
  label: string;
  fieldType: string;
  value: string;
  type: string;
  options: string[];
  option: string;
  // onChangeCB: (e: any) => void;
  updateField: (e: any, id: number) => void;
  updateOptions: (e: any, id: number) => void;
  updateFieldType: (e: any, id: number) => void;
  addNewOption: (id: number) => void;
  removeField: (id: number) => void;
}) {
  return (
    <div key={props.id}>
      <div className="flex gap-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full"
          type={"text"}
          onChange={(e) => {
            props.updateField(e, props.id);
          }}
          value={props.label}
        />
        <select
          name="type"
          id="field"
          className="p-2 my-2 border-2 rounded-lg flex"
          onChange={(e) => {
            props.updateFieldType(e, props.id);
          }}
          value={props.type}
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

        <div>
          <div className="flex">
            <input
              type={"text"}
              className="border-2 border-gray-200 rounded-lg p-2 my-2 flex"
              value={props.option}
              id={props.id.toString()}
              onChange={(e) => {
                props.updateOptions(e.target.value, props.id);
              }}
            />
            &nbsp;
            <button
              className="mt-2 ml-6 px-12 py-1 shadow-lg bg-red-500 hover:bg-red-700 rounded-lg font-bold text-white"
              onClick={() => props.addNewOption(props.id)}
            >
              Add Option
            </button>
          </div>
          <select
            name="options"
            id="options"
            className="p-2 my-2 border-2 rounded-lg"
            onChange={(e) => {
              props.updateFieldType(e, props.id);
            }}
            value={props.type}
          >
            <option value="">Select an option</option>
            {props.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={(_) => props.removeField(props.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded-lg"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
