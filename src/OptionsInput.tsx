import React from "react";

export default function OptionsInput(props: {
  id: number;
  label: string;
  fieldType: string;
  value: string;
  type: string;
  options: string[];
  option: string;
  // onChangeCB: (e: ) => void;
  updateField: (e: string, id: number) => void;
  updateOptions: (e: string) => void;
  updateFieldType: (e: string, id: number) => void;
  addNewOption: () => void;
  removeField: (id: number) => void;
  removeOption: (id: number, option: string) => void;
}) {
  return (
    <div key={props.id}>
      <div className="flex gap-4">
        <input
          className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full"
          type={"text"}
          onChange={(e) => {
            props.updateField(e.target.value, props.id);
          }}
          value={props.label}
        />
        <select
          name="type"
          id="field"
          className="p-2 my-2 border-2 rounded-lg flex"
          onChange={(e) => {
            props.updateFieldType(e.target.value, props.id);
          }}
          value={props.fieldType}
        >
          <option value="">Select an option</option>
          <option value="TEXT">Text</option>
          <option value="DROPDOWN">Dropdown</option>
          <option value="RADIO">Radio Buttons</option>
        </select>

        <div>
          <div className="flex">
            <input
              type={"text"}
              className="border-2 border-gray-200 rounded-lg p-2 my-2 flex"
              value={props.option}
              id={props.id.toString()}
              onChange={(e) => {
                props.updateOptions(e.target.value);
              }}
            />
            &nbsp;
            <button
              className="mt-2 ml-6 px-12 py-1 shadow-lg bg-red-500 hover:bg-red-700 rounded-lg font-bold text-white"
              onClick={() => props.addNewOption()}
            >
              Add Option
            </button>
          </div>
          <div
            //name="options"
            id="options"
            className="p-2 my-2 border-2 rounded-lg"
            //onChange={(e) => {props.updateFieldType(e, props.id);}}
            //value={props.type}
          >
            {props.options.map((option) => (
              <div className="flex" key={option}>
                <button onClick={(_) => props.removeOption(props.id, option)}>
                  ⛔
                </button>
                <option value={option}>{option}</option>
              </div>
            ))}
          </div>
          {props.options.length === 0 ? (
            <div className="bg-red-300 text-red-600 rounded-lg p-2">
              Warning: Please add atleast 1 option
            </div>
          ) : (
            <div></div>
          )}
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
