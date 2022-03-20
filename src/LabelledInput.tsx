import React from "react";

export default function LabelledInput(props: {
  id: number;
  label: string;
  fieldType: string;
  value: string;
  removeFieldCB: (id: number) => void;
}) {
  return (
    <>
      <label>{props.label}</label>
      <div className="flex gap-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full flex-1"
          type={props.fieldType}
        />
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
