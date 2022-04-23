import React, { useEffect, useReducer, useState } from "react";
import PreviewInput from "../PreviewInput";
import closeIcon from "../images/close.png";
import { getLocalForms, saveLocalForms, savePreviewData } from "../Data";
import { Link, navigate } from "raviger";
import leftArrow from "../images/left.png";
import rightArrow from "../images/right.png";
import { Form, formType } from "../types/formType";
import {
  answers,
  getFormFields,
  listForms,
  saveSubmissions,
  submissions,
  submissionsForm,
} from "../utils/apiUtils";

export interface formTemplate {
  id: number;
  type: string;
  label: string;
  value: string;
  options: string[];
}

export interface form {
  id: number;
  title: string;
  fields: formTemplate[];
}

export default function Preview(props: { id: number }) {
  const [state, setState] = useState<Form>({
    id: 0,
    title: "",
    description: "",
    is_public: true,
    created_by: 0,
    created_date: "",
    modified_date: "",
    fields: [],
  });

  useEffect(() => {
    listForms({
      offset: 0,
      limit: 5,
    }).then((data) => {
      let mainForm: Form = data.results.filter(
        (form: Form) => form.id === props.id
      )[0];
      getFormFields(props.id).then((data) => {
        setState({ ...mainForm, fields: data.results });
      });
    });
  }, []);

  // useReducer for fieldId
  type nextFieldAction = { type: "next"; value: number };
  type prevFieldAction = { type: "prev"; value: number };

  type fieldIdAction = nextFieldAction | prevFieldAction;

  const fieldIndexReducer = (states: number, action: fieldIdAction) => {
    switch (action.type) {
      case "next": {
        if (states < state.fields.length - 1) {
          return states + 1;
        }
        return states;
      }
      case "prev": {
        if (states > 0) {
          return states - 1;
        }
        return states;
      }
    }
  };

  const [fieldIndex, fieldIndexDispatcher] = useReducer(fieldIndexReducer, 0);

  const updateField = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    let newFields = state.fields.map((field, index) => {
      if (index === fieldIndex) {
        console.log(field);
        return {
          ...field,
          value: e.currentTarget.value,
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
  };

  const saveSubmissionAPI = () => {
    let submission: answers[] = [];
    state.fields.forEach((field) => {
      submission.push({ form_field: field.label, value: field.value });
    });
    let form: submissionsForm = {
      label: state.title,
      description: state.description ? state.description : "",
      is_public: state.is_public ? state.is_public : false,
    };
    const data: submissions = { form: form, answers: submission };
    saveSubmissions(props.id, data);
  };

  return (
    <div>
      <div>
        <Link className="float-right" href={"/"}>
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
        {state.fields ? (
          state.fields.length === 0 ||
          (state.fields.filter(
            (field) => field.kind === "RADIO" || field.kind === "DROPDOWN"
          ).length !== 0 &&
            state.fields
              .filter(
                (field) => field.kind === "RADIO" || field.kind === "DROPDOWN"
              )
              .filter((field) => field.options.length === 0).length !== 0) ? (
            <div className="justify-center p-6">
              <p className="flex text-red-500 text-xl">
                Form not completed yet
              </p>
              <br />
              <Link
                href="/"
                className="flex justify-center py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-700"
              >
                Home
              </Link>
            </div>
          ) : (
            <div>
              <div key={state.fields[fieldIndex].id}>
                <div>
                  <PreviewInput
                    key={state.fields[fieldIndex].id}
                    id={state.fields[fieldIndex].id}
                    label={state.fields[fieldIndex].label}
                    fieldType={state.fields[fieldIndex].kind}
                    value={state.fields[fieldIndex].value}
                    onChangeCB={(e) => {
                      updateField(e);
                    }}
                    options={
                      state.fields[fieldIndex].options
                        ? state.fields[fieldIndex].options
                        : []
                    }
                  />
                  <div className="flex gap-6 justify-center">
                    <button
                      onClick={() =>
                        fieldIndexDispatcher({
                          type: "prev",
                          value: fieldIndex,
                        })
                      }
                    >
                      <img
                        className="hover:scale-125"
                        width={30}
                        height={20}
                        src={leftArrow}
                        alt="left"
                      />
                    </button>
                    <button
                      onClick={() =>
                        fieldIndexDispatcher({
                          type: "next",
                          value: fieldIndex,
                        })
                      }
                    >
                      <img
                        className="hover:scale-125"
                        width={30}
                        height={20}
                        src={rightArrow}
                        alt="right"
                      />
                    </button>
                  </div>
                </div>
                <div className="flex justify-center p-4">
                  {fieldIndex === state.fields.length - 1 ? (
                    <Link
                      href="/"
                      className="rounded-lg bg-green-500 hover:bg-green-700 text-white px-16 py-2"
                      onClick={saveSubmissionAPI}
                    >
                      Submit
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          )
        ) : (
          <div>No Fields</div>
        )}
      </div>
    </div>
  );
}
