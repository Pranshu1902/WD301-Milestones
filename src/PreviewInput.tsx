import React from "react";

export default function PreviewInput(props: {
  id: number;
  label: string;
  fieldType: string;
  value: string;
  //onChangeCB: (e: any) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <label className="text-xl">{props.label}</label>
        <input
          className="border-2 border-gray-200 rounded-lg p-2 w-full flex-1"
          type={props.fieldType}
          //onChange={props.onChangeCB}
          value={props.value}
        />
      </div>
    </>
  );
}
