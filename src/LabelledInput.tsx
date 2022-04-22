import React from "react";

export default function LabelledInput(props: {
  id: number;
  label: string;
  fieldType: string;
  value: string;
  optionValue: string;
  options: string[];
  removeFieldCB: (id: number) => void;
  onChangeCB: (e: React.FormEvent<HTMLInputElement>) => void;
  onTypeChangeCB: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
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
          <option value="TEXT">Text</option>
          <option value="DROPDOWN">Dropdown</option>
          <option value="RADIO">Radio Buttons</option>
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
