import React, { useState, useEffect } from "react";
import LabelledInput from "../LabelledInput";
import closeIcon from "../images/close.png";
import FormTitle from "../FormTitle";
import { getLocalForms, saveLocalForms } from "../Data";

export interface formTemplate {
  id: number;
  type: string;
  label: string;
  value: string;
}

export interface form {
  id: number;
  title: string;
  fields: formTemplate[];
}

const formTemplate = { type: "text", label: "", value: "" };

export default function Form(props: { closeFormCB: () => void; id: number }) {
  const [state, setState] = useState(
    getLocalForms().filter((form) => form.id === props.id)[0]
  );
  const [newField, setNewField] = useState("");

  const updateForms = (newForm: form) => {
    let newForms = getLocalForms();

    newForms.map((form) => {
      form.id === props.id ? (form.fields = newForm.fields) : (form = form);
    });

    saveLocalForms(newForms);
  };

  const addField = () => {
    if (newField != "") {
      let newFields = [
        ...state.fields,
        { ...formTemplate, id: Number(new Date()), label: newField, value: "" },
      ];

      let finalform = { ...state, fields: newFields };

      let newState = {
        ...state,
        fields: newFields,
      };
      setState(newState);
      setNewField("");

      updateForms(finalform);
    }
  };

  const removeField = (id: number) => {
    let newFields = state.fields.filter((field) => field.id !== id);

    let newState = {
      ...state,
      fields: newFields,
    };
    setState(newState);

    updateForms(newState);
  };

  const updateField = (e: any, id: number) => {
    let newFields = state.fields.map((field) => {
      if (field.id === id) {
        return {
          ...field,
          value: e.target.value,
        };
      } else {
        return field;
      }
    });

    let newState = {
      ...state,
      fields: newFields,
    };

    setState(newState);

    updateForms(newState);
  };

  const clearForm = () => {
    let updatedFields = state.fields.map((field) => {
      return {
        ...field,
        value: "",
      };
    });

    let newState = {
      ...state,
      fields: updatedFields,
    };

    setState(newState);

    updateForms(newState);
  };

  const updateTitle = (value: string) => {
    let allForms = getLocalForms();

    setState((form) => ({
      ...form,
      title: value,
    }));

    allForms.map((form) => {
      form.id === props.id ? (form.title = value) : (form.title = form.title);
    });

    saveLocalForms(allForms);
  };

  return (
    <div className="w-full divide-y-2 divide-dotted flex flex-col gap-2">
      <div className="flex justify-center">
        <div>
          <FormTitle
            id={state?.id}
            label="Form Title"
            fieldType="text"
            value={state?.title}
            onChangeCB={(e) => {
              updateTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="float-right px-3 py-1 mt-4 font-bold text-white rounded-xl"
            onClick={props.closeFormCB}
          >
            <img
              className="hover:scale-125"
              src={closeIcon}
              alt="close"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      <div>
        {state?.fields.map((field) => (
          <LabelledInput
            id={field.id}
            label={field.label}
            key={field.id}
            fieldType={field.type}
            removeFieldCB={removeField}
            value={field.value}
            onChangeCB={(e) => {
              updateField(e, field.id);
            }}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="border-2 border-gray-200 rounded-lg p-2 my-4 flex-1"
          value={newField}
          onChange={(e) => {
            setNewField(e.target.value);
          }}
        />
        <button
          className="px-12 m-4 py-1 shadow-lg font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
          onClick={addField}
        >
          Add Field
        </button>
      </div>

      <div className="flex gap-4 w-full">
        <button
          className="px-12 mt-4 py-2 shadow-lg font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
          onClick={clearForm}
        >
          Clear Form
        </button>

        <button
          type="submit"
          className="mt-4 shadow-xl px-12 py-2 text-white bg-green-500 hover:bg-green-800 rounded-lg font-bold"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
