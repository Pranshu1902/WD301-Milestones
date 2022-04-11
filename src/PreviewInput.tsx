import React from "react";

export default function PreviewInput(props: {
  id: number;
  label: string;
  fieldType: string;
  value: string;
  options: string[];
  onChangeCB: (e: any) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <label className="text-xl">{props.label}</label>
        {props.fieldType === "textarea" ? (
          <textarea
            className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full flex-1"
            onChange={props.onChangeCB}
            value={props.value}
          ></textarea>
        ) : props.fieldType === "dropdown" ? (
          <select className="rounded-lg px-12 py-2 border-2">
            {props.options.map((option) => {
              <option value={option}>{option}</option>;
            })}
          </select>
        ) : props.fieldType === "radio" ? (
          <select className="rounded-lg px-12 py-2 border-2">
            {props.options.map((option) => {
              <input type={"radio"} value={option}>
                {option}
              </input>;
              <label>{option}</label>;
              <br />;
            })}
          </select>
        ) : props.fieldType === "multidropdown" ? (
          <select className="rounded-lg px-12 py-2 border-2" multiple>
            {props.options.map((option) => {
              <input type={"radio"} value={option}>
                {option}
              </input>;
              <label>{option}</label>;
              <br />;
            })}
          </select>
        ) : (
          <input
            className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full flex-1"
            type={props.fieldType}
            onChange={props.onChangeCB}
            value={props.value}
          />
        )}
      </div>
    </>
  );
}
