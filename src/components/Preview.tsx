import React, { useEffect, useReducer, useState } from "react";
import PreviewInput from "../PreviewInput";
import closeIcon from "../images/close.png";
import { getLocalForms, saveLocalForms, savePreviewData } from "../Data";
import { Link, navigate } from "raviger";
import leftArrow from "../images/left.png";
import rightArrow from "../images/right.png";
import { Form, formType } from "../types/formType";
import { getFormFields, listForms } from "../utils/apiUtils";

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

// const formTemplate = { type: "text", label: "", value: "" };

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

  /*useEffect(() => {
    listForms({
      offset: 0,
      limit: 5,
    }).then((data) => {
      const forms: Form[] = data.results;
      let initialState: Form = forms.filter((form) => form.id === props.id)[0];
      setState(initialState);
    });
  }, []);

  useEffect(() => {
    getFormFields(props.id).then((data) => {
      setState({ ...state, fields: data.results });
    });
  }, []);*/

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

  const fieldIdReducer = (state: number, action: fieldIdAction) => {
    switch (action.type) {
      case "next": {
        let form = getLocalForms().filter((form) => form.id === props.id)[0];
        let index = form.fields.findIndex((field) => field.id === action.value);
        if (index < form.fields.length - 1) {
          return form.fields[index + 1].id;
        }
        return state;
      }
      case "prev": {
        let form = getLocalForms().filter((form) => form.id === props.id)[0];
        let index = form.fields.findIndex((field) => field.id === action.value);

        if (index > 0) {
          return form.fields[index - 1].id;
        }
        return state;
      }
    }
  };

  const [fieldId, fieldIdDispatcher] = useReducer(
    fieldIdReducer,
    state.fields && state.fields.length !== 0 ? state.fields[0].id : 0
  );

  const updateField = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
  ) => {
    let newFields = state.fields.map((field) => {
      if (field.id === fieldId) {
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
              {state.fields.map((field) =>
                field.id === fieldId ? (
                  <div key={field.id}>
                    <div>
                      <PreviewInput
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        fieldType={field.kind}
                        value={field.value}
                        onChangeCB={(e) => {
                          updateField(e);
                        }}
                        options={field.options ? field.options : []}
                      />
                      <div className="flex gap-6 justify-center">
                        <button
                          onClick={() =>
                            fieldIdDispatcher({
                              type: "prev",
                              value: fieldId,
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
                            fieldIdDispatcher({
                              type: "next",
                              value: fieldId,
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
                ) : (
                  <div key={field.id}></div>
                )
              )}
            </div>
          )
        ) : (
          <div>No Fields</div>
        )}
      </div>
    </div>
  );
}
