import React, { useState, useEffect } from "react";
import LabelledInput from "../LabelledInput";
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
        Preview Page
      </div>
      <div className="flex gap-6">
        <img width={30} height={20} src={leftArrow} alt="" />
        <img width={30} height={20} src={rightArrow} alt="" />
      </div>
    </div>
  );
}
