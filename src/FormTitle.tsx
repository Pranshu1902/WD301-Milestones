import React from "react";

export default function FormTitle(props: {
  id?: number;
  label: string;
  fieldType: string;
  value?: string;
  onChangeCB: (e: any) => void;
}) {
  return (
    <>
      <div className="flex gap-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full flex-1"
          type={props.fieldType}
          onChange={props.onChangeCB}
          value={props.value}
        />
      </div>
    </>
  );
}
