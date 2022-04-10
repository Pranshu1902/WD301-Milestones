import React, { useState, useEffect } from "react";
import PreviewInput from "../PreviewInput";
import closeIcon from "../images/close.png";
import FormTitle from "../FormTitle";
import { getLocalForms, saveLocalForms } from "../Data";
import { Link, navigate } from "raviger";
import leftArrow from "../images/left.png";
import rightArrow from "../images/right.png";

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

export default function Preview(props: { id: number }) {
  const [state, setState] = useState(
    getLocalForms().filter((form) => form.id === props.id).length !== 0
      ? getLocalForms().filter((form) => form.id === props.id)[0]
      : { id: Number(new Date()), title: "Untitled Form", fields: [] }
  );

  const [fieldId, setFieldId] = useState(
    state.fields.length ? state.fields[0].id : 0
  );

  const nextField = () => {
    let index = state.fields.findIndex((field) => field.id === fieldId);
    if (index < state.fields.length - 1) {
      setFieldId(state.fields[index + 1].id);
    }
  };

  const prevField = () => {
    let index = state.fields.findIndex((field) => field.id === fieldId);
    if (index > 0) {
      setFieldId(state.fields[index - 1].id);
    }
  };

  useEffect(() => {
    state.id !== props.id && navigate(`/forms/${state.id}`);
  }, [state.id, props.id]);

  const updateForms = (newForm: form) => {
    let newForms = getLocalForms();

    newForms.map((form) => {
      form.id === props.id ? (form.fields = newForm.fields) : (form = form);
    });

    saveLocalForms(newForms);
  };

  const updateField = (e: any, id: number) => {
    let newFields = state.fields.map((field) => {
      if (field.id === id) {
        console.log(field);
        return {
          ...field,
          label: e.target.value,
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

  return (
    <div>
      <div>
        <Link className="float-right" href={`/forms/${state.id}`}>
          <img
            className="hover:scale-125"
            src={closeIcon}
            width={20}
            height={20}
            alt=""
          />
        </Link>
      </div>
      <p className="text-3xl flex text-blue-500">{state.title}</p>
      <div>
        {state.fields.length === 0 ? (
          <div className="flex justify-center text-red-500 text-xl p-6">
            Form not completed yet
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div>
        {state.fields.map((field) =>
          field.id === fieldId ? (
            <PreviewInput
              id={field.id}
              label={field.label}
              fieldType={field.type}
              value={field.value}
            ></PreviewInput>
          ) : (
            <div></div>
          )
        )}
      </div>
      {/* <div className="gap-y-4 p-6"> */}
      {/* {state.fields.map((field) => (field.id === fieldId ? field.label : ""))} */}
      {/* <br /> */}
      {/* <input type="text" className="border-2 rounded-lg" /> */}
      {/* </div> */}
      <div className="flex gap-6 justify-center">
        <button onClick={prevField}>
          <img
            className="hover:scale-125"
            width={30}
            height={20}
            src={leftArrow}
            alt="left"
          />
        </button>
        <button onClick={nextField}>
          <img
            className="hover:scale-125"
            width={30}
            height={20}
            src={rightArrow}
            alt="right"
          />
        </button>
      </div>
      <div className="flex justify-center p-4">
        {fieldId === state.fields[state.fields.length - 1].id ? (
          <Link
            href="/"
            className="rounded-lg bg-green-500 hover:bg-green-700 text-white px-16 py-2"
          >
            Submit
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}