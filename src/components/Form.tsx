import React, { useState, useEffect, useRef } from "react";
import LabelledInput from "../LabelledInput";

interface formData {
  id: number;
  title: string;
  formFields: formField[];
}

// declaring a type for the form state
interface formField {
  id: number;
  label: string;
  type: string;
  value: string;
}

// error: it remembers which field were left but doesn't save their value

const formTemplate: formField = { id: 1, type: "text", label: "", value: "" };

const formFields: formField[] = [
  { id: 1, type: "text", label: "First Name", value: "" },
  { id: 2, type: "text", label: "Last Name", value: "" },
  { id: 3, type: "email", label: "Email", value: "" },
  { id: 4, type: "date", label: "Date of Birth", value: "" },
  { id: 5, type: "tel", label: "Phone", value: "" },
];

const saveLocalForms = (localForms: formData[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

const saveFormData = (currentState: formField) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
  );
  saveLocalForms(updatedLocalForms);
};

const getLocalForms: () => formData[] = () => {
  const savedFormsJSON = localStorage.getItem("formData");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

const initialState: () => formData = () => {
  const localForms = getLocalForms();
  if (localForms.length > 0) {
    return localForms[0];
  }
  const newForm = {
    id: Number(new Date()),
    title: "Untitled Form",
    formFields: formFields,
  };
  return newForm;
};

export default function Form(props: { closeFormCB: () => void }) {
  const [state, setState] = useState(initialState());
  const [newField, setNewField] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("useEffect");
    const title = document.title;
    document.title = "Pranshu";
    titleRef.current?.focus();

    return () => {
      document.title = "React App";
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(state.formFields);
      console.log("State saved to localstorage");
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  const addField = () => {
    setState({
      ...state,
      formFields: [
        ...state.formFields,
        {
          ...formTemplate,
          id: Number(new Date()),
          label: newField,
        },
      ],
    });
    setNewField("");
  };

  const removeField = (id: number) => {
    setState({
      ...state,
      formFields: state.formFields.filter((field) => field.id !== id),
    });
  };

  const clearForm = () => {
    //setState();
  };

  return (
    <div className="w-full divide-y-2 divide-dotted flex flex-col gap-2">
      <input
        type="text"
        className="border-2 border-gray-200 rounded-lg p-2 my-4 flex-1"
        value={state.title}
        onChange={(e) => {
          setState({ ...state, title: e.target.value });
        }}
        ref={titleRef}
      />
      <div>
        {state.formFields.map((field) => (
          <LabelledInput
            key={field.id}
            id={field.id}
            label={field.label}
            fieldType={field.type}
            value={field.value}
            removeFieldCB={removeField}
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
          className="px-12 m-4 py-1 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
          onClick={addField}
        >
          Add Field
        </button>
      </div>

      <div className="flex gap-4 w-full">
        <button
          onClick={(_) => saveFormData(state.formFields)}
          type="submit"
          className="mt-4 shadow-xl px-12 py-2 text-white bg-blue-500 hover:bg-blue-800 rounded-lg font-bold"
        >
          Save
        </button>
        <button
          className="px-12 mt-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
          onClick={props.closeFormCB}
        >
          Close Form
        </button>
        <button
          className="px-12 mt-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
          onClick={clearForm}
        >
          Clear Form
        </button>
      </div>
    </div>
  );
}
