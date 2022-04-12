import React from "react";

export default function OptionsInput(props: {
  id: number;
  label: string;
  fieldType: string;
  value: string;
  type: string;
  options: string[];
  onChangeCB: (e: any) => void;
  updateOptions: (e: any) => void;
  updateFieldType: (e: any) => void;
  appOption: () => void;
}) {
  return (
    <>
      <div className="flex">
        <input
          type={"text"}
          className="border-2 border-gray-200 rounded-lg p-2 my-2 flex"
          value={props.value}
          onChange={(e) => {
            props.updateOptions(e.target.value);
          }}
        />
        &nbsp;
        <button
          className="mt-2 ml-6 px-12 py-1 shadow-lg bg-red-500 hover:bg-red-700 rounded-lg font-bold text-white"
          // onClick={props.addOption}
        >
          Add Option
        </button>
      </div>
      <select
        name="options"
        id="options"
        className="p-2 my-2 border-2 rounded-lg"
        onChange={(e) => {
          props.updateFieldType(e);
        }}
        value={props.type}
      >
        <option value="">Select an option</option>
        {props.options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </>
  );
}
