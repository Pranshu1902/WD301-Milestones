import React, { useEffect, useReducer, useState } from "react";
import LabelledInput from "../LabelledInput";
import closeIcon from "../images/close.png";
import FormTitle from "../FormTitle";
import { getLocalForms, saveLocalForms } from "../Data";
import { Link, navigate } from "raviger";
import previewIcon from "../images/eye.png";
import { FieldsType, Form, formType } from "../types/formType";
import OptionsInput from "../OptionsInput";
import {
  addField,
  getFormData,
  getFormFields,
  listForms,
  patchFormData,
  removeOption,
  updateFieldAPI,
  updateFormTitle,
} from "../utils/apiUtils";

export interface formTemplate {
  id: number;
  type: string;
  label: string;
  value: string;
  options: string[];
}

const formTemplate = { id: 1, type: "text", label: "", value: "", options: [] };

export default function NewForm(props: { id: number }) {
  const defaultField = {
    id: 0,
    title: "",
    label: "",
    kind: "",
    options: [],
    value: "",
    meta: { fieldType: "" },
  };

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

  listForms({
    offset: 0,
    limit: 5,
  }).then((data) => {
    const forms: Form[] = data.results;
    let initialState: Form = forms.filter((form) => form.id === props.id)[0];
    setState(initialState);
  });

  getFormFields(props.id).then((data) => {
    let newState = state;
    newState.fields = data.results; //data.results ? (newState.fields = data.results) : (newState.fields = []);
    setState(newState);
  });

  const [newField, setNewField] = useState({ label: "", type: "" });

  const [option, setOption] = useState("");

  const updateField = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>,
    id: number
  ) => {
    let newFields = state.fields.map((field) => {
      if (field.id === id) {
        console.log(field);
        return {
          ...field,
          label: e.currentTarget.value,
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

  const updateFieldType = (
    e: React.FormEvent<HTMLSelectElement>,
    id: number
  ) => {
    let newFields = state.fields.map((field) => {
      if (field.id === id) {
        return {
          ...field,
          type: e.currentTarget.value,
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

  const updateTitle = (value: string) => {
    const newState = { ...state, title: value };
    setState(newState);

    updateFormTitle(props.id, newState);
  };

  const removeThisOption = (id: number, option: string) => {
    let newFields = state.fields.map((field) => {
      if (field.id === id) {
        return {
          ...field,
          options: field.options.filter((opt) => opt !== option),
        };
      } else {
        return field;
      }
    });

    let newState = {
      ...state,
      fields: newFields,
    };

    let APIFields = state.fields.filter((field) => field.id === id)[0];
    APIFields.options.filter((opt) => opt !== option);
    removeOption(props.id, id, APIFields);

    setState(newState);
  };

  const addNewField = () => {
    if (newField.label !== "" && newField.type !== "") {
      const Field: FieldsType = {
        ...defaultField,
        id: Number(new Date()),
        label: newField.label,
        kind: newField.type,
      };

      const updatedState = state;
      updatedState.fields
        ? updatedState.fields.push(Field)
        : (updatedState.fields = [Field]);
      setState(updatedState);
      addField(props.id, Field);
    }
  };

  const updateThisField = (id: number) => {
    let updatedFields = state.fields.map((field) => {
      if (field.id === id) {
        return {
          ...field,
          label: newField.label,
          kind: newField.type,
        };
      } else {
        return field;
      }
    });

    let newState = {
      ...state,
      fields: updatedFields,
    };

    const updatedField: FieldsType = {
      ...state.fields.filter((field) => field.id === id)[0],
      label: newField.label,
      kind: newField.type,
    };

    setState(newState);
    updateFieldAPI(props.id, id, updatedField);
  };

  useEffect(() => {
    patchFormData(props.id, state);
  }, []);

  const addThisOption = (id: number) => {
    if (option !== "") {
      state.fields.filter((field) => field.id === id)[0].options.push(option);
    }
    setOption("");
    patchFormData(props.id, state);
  };

  return (
    <div className="w-full divide-y-2 divide-dotted flex flex-col gap-2">
      <div className="flex gap-24 justify-center">
        <div className="pt-2">
          <Link
            href={`/preview/${state.id}`}
            className="font-bold text-white float-left shadow-xl flex rounded-lg p-2 bg-green-400 hover:bg-green-700"
          >
            Preview &nbsp;
            <img
              className="flex items-center pt-1"
              width={20}
              height={20}
              src={previewIcon}
              alt="preview"
            />
          </Link>
        </div>
        <div>
          <FormTitle
            id={state?.id}
            label="Form Title"
            fieldType="text"
            value={state?.title}
            onChangeCB={(e) => {
              updateTitle(e.currentTarget.value);
            }}
          />
        </div>
        <div>
          <Link
            className="float-right px-3 py-1 mt-4 font-bold text-white rounded-xl"
            href="/"
          >
            <img
              className="hover:scale-125"
              src={closeIcon}
              alt="close"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>

      <div>
        {state.fields
          ? state.fields.map((field) =>
              field.kind === "TEXT" ? (
                <LabelledInput
                  onTypeChangeCB={(e) => {
                    updateFieldType(e, field.id);
                  }}
                  id={field.id}
                  label={field.label}
                  key={field.id}
                  fieldType={field.kind}
                  removeFieldCB={() =>
                    setNewField({
                      type: "remove_field",
                      label: "",
                    })
                  }
                  value={field.value}
                  optionValue={option}
                  onChangeCB={(e) => {
                    updateThisField(field.id);
                  }}
                  options={field.options}
                />
              ) : (
                <OptionsInput
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  fieldType={field.kind}
                  value={field.value}
                  type={field.kind}
                  options={field.options}
                  option={option}
                  updateField={(e) => {
                    updateThisField(field.id);
                  }}
                  updateOptions={(e) => {
                    setOption(e);
                  }}
                  updateFieldType={updateFieldType}
                  addNewOption={() => {
                    addThisOption(field.id);
                  }}
                  removeField={() => {
                    console.log("remove field");
                  }}
                  removeOption={removeThisOption}
                />
              )
            )
          : null}
      </div>

      <div className="gap-2">
        <div className="float-left">
          <div>
            <label>Name:</label>
            &nbsp;
            <input
              type="text"
              className="border-2 border-gray-200 rounded-lg p-2 my-4 flex-1"
              value={newField.label}
              onChange={(e) => {
                setNewField({ label: e.target.value, type: newField.type });
              }}
            />
          </div>
          <div className="flex items-center">
            <label>Type:</label>
            &nbsp;
            <select
              value={newField.type}
              name="type"
              id="field"
              className="py-2 border-2 rounded-lg"
              onChange={(e) => {
                setNewField({ ...newField, type: e.target.value });
              }}
            >
              <option value="">Select an option</option>
              <option value="TEXT">Text</option>
              <option value="DROPDOWN">Dropdown</option>
              <option value="RADIO">Radio Buttons</option>
            </select>
          </div>
        </div>
        <div className="flex items-bottom">
          <button
            className="px-6 m-4 py-1 shadow-lg font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
            onClick={(e) => {
              addNewField();
              setNewField({ label: "", type: "" });

              // recheck
              /*newFieldDispachter({
                type: "add_field",
                label: newField.label,
                labelType: newField.type,
                resetValues: () => {
                  newFieldDispachter({ type: "reset_values" });
                },
              });*/
            }}
          >
            Add Field
          </button>
        </div>
      </div>

      <div className="flex gap-4 w-full justify-center">
        <Link
          href="/"
          type="submit"
          className="mt-4 shadow-xl px-12 py-2 text-white bg-green-500 hover:bg-green-800 rounded-lg font-bold"
        >
          Done
        </Link>
      </div>
    </div>
  );
}
