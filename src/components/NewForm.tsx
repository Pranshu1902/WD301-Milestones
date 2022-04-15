import React, { useState, useEffect, useReducer } from "react";
import LabelledInput from "../LabelledInput";
import closeIcon from "../images/close.png";
import FormTitle from "../FormTitle";
import { getLocalForms, saveLocalForms } from "../Data";
import { Link, navigate } from "raviger";
import previewIcon from "../images/eye.png";
import { formType } from "../types/formType";
import OptionsInput from "../OptionsInput";
import { form } from "../components/Home";

export interface formTemplate {
  id: number;
  type: string;
  label: string;
  value: string;
  options: string[];
}

const formTemplate = { id: 1, type: "text", label: "", value: "", options: [] };

const formTemplateAction = {
  id: 1,
  type: "text",
  label: "",
  value: "",
  options: [],
};

export default function Form(props: { id: number }) {
  const [state, setState] = useState(
    getLocalForms().filter((form) => form.id === props.id).length !== 0
      ? getLocalForms().filter((form) => form.id === props.id)[0]
      : { id: Number(new Date()), title: "Untitled Form", fields: [] }
  );
  /*const [newField, setNewField] = useState({
    label: "",
    type: "",
  });*/

  //
  // use reducer for newfield
  type addFieldAction = {
    type: "add_field";
    label: string;
    labelType: string;
    resetValues: () => void;
  };
  type removeFieldAction = { id: number; type: "remove_field" };
  type updateFieldAction = {
    type: "update_field";
    label: string;
    labelType: string;
  };
  type resetFieldAction = { type: "reset_values" };

  type newFieldType = {
    label: string;
    type: string;
    id: number;
    labelType: string;
  };

  type newFieldAction =
    | addFieldAction
    | removeFieldAction
    | updateFieldAction
    | resetFieldAction;

  // newField use reducer state types
  type newFieldAddState = { label: string; type: string; labelType: string };
  type newFieldUpdateState = {
    id: number;
    type: string;
  };
  type newFieldRemoveState = {
    id: number;
    label: string;
    type: string;
    fieldType: string;
  };

  type newFieldStateTry =
    | newFieldAddState
    | newFieldRemoveState
    | newFieldUpdateState;
  type newFieldState = { label: string; type: string };

  // new field reducer function
  const newFieldReducer = (state: newFieldState, action: newFieldAction) => {
    switch (action.type) {
      case "add_field": {
        if (action.label != "") {
          let form = getLocalForms().filter((form) => form.id === props.id)[0];
          let newFields = [
            ...form.fields,
            {
              ...formTemplate,
              type: action.labelType ? action.labelType : "text",
              id: Number(new Date()),
              label: action.label,
              value: "",
              options: [],
            },
          ];

          let newState = {
            ...form,
            fields: newFields,
          };
          setState(newState);
          //setNewField({ label: "", type: "" });
          // updateForms(newState);

          let output = {
            ...state,
            label: action.label,
            type: action.labelType,
          };

          action.resetValues();

          console.log(output);

          return output;
        } else {
          return state;
        }
      }
      case "remove_field": {
        return state;
      }
      case "update_field": {
        return { ...state, label: action.label, type: action.labelType };
      }
      case "reset_values": {
        /*let form = getLocalForms().filter((form) => form.id === props.id)[0];
        let newFields = [
          ...form.fields,
          {
            ...formTemplate,
            type: "Select an option",
            id: Number(new Date()),
            label: "",
            value: "",
            options: [],
          },
        ];

        let newState = {
          ...form,
          fields: newFields,
        };
        setState(newState);
        */
        return { ...state, label: "", type: "" };
      }
    }
  };

  const [newField, newFieldDispachter] = useReducer(newFieldReducer, {
    label: "",
    type: "",
  });
  // new field reducer end

  useEffect(() => {
    state.id !== props.id && navigate(`/forms/${state.id}`);
  }, [state.id, props.id]);

  useEffect(() => {
    getLocalForms().length === 0 ? saveLocalForms([state]) : console.log("");
  });

  const updateForms = (newForm: formType) => {
    let newForms = getLocalForms();

    {
      getLocalForms().filter((form) => form.id === state.id).length !== 0
        ? saveLocalForms([...getLocalForms(), state])
        : console.log("Form saved");
    }

    newForms.map((form) => {
      form.id === props.id ? (form.fields = newForm.fields) : (form = form);
    });

    saveLocalForms(newForms);
  };

  const [option, setOption] = useState("");

  /*
  const addField = () => {
    if (newField.label != "") {
      let newFields = [
        ...state.fields,
        {
          ...formTemplate,
          type: newField.type.length ? newField.type : "text",
          id: Number(new Date()),
          label: newField.label,
          value: "",
          options: [],
        },
      ];

      let finalform = { ...state, fields: newFields };

      let newState = {
        ...state,
        fields: newFields,
      };
      setState(newState);
      setNewField({ label: "", type: "" });

      updateForms(finalform);

      console.log(getLocalForms());
    }
  };*/

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

  const updateFieldType = (e: any, id: number) => {
    let newFields = state.fields.map((field) => {
      if (field.id === id) {
        return {
          ...field,
          type: e.target.value,
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

  // handling new field types
  const addOption = (id: number) => {
    if (
      option !== "" &&
      state.fields
        .filter((field) => field.id === id)[0]
        .options.includes(option) === false
    ) {
      let newFields = state.fields.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            options: [...field.options, option],
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
      setOption("");

      // updating the form
      updateForms(newState);
    }
  };

  // updating the options input
  const updateOptions = (e: string, id: number) => {
    let newFields = state.fields.map((field) => {
      if (field.id === id) {
        return {
          ...field,
          input: [...field.options, e],
        };
      } else {
        return field;
      }
    });

    let newState = {
      ...state,
      fields: newFields,
    };
    setOption(e);
    setState(newState);
    updateForms(newState);
  };

  const removeOption = (id: number, option: string) => {
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

    setState(newState);
    updateForms(newState);
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
              updateTitle(e.target.value);
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
        {state.fields.map((field) =>
          field.type === "text" ||
          field.type === "date" ||
          field.type === "email" ||
          field.type === "number" ? (
            <LabelledInput
              onTypeChangeCB={(e) => {
                updateFieldType(e, field.id);
              }}
              id={field.id}
              label={field.label}
              key={field.id}
              fieldType={field.type}
              removeFieldCB={removeField}
              value={field.value}
              optionValue={option}
              onChangeCB={(e) => {
                updateField(e, field.id);
              }}
              options={field.options}
            />
          ) : (
            <OptionsInput
              key={field.id}
              id={field.id}
              label={field.label}
              fieldType={field.type}
              value={field.value}
              type={field.type}
              options={field.options}
              option={option}
              updateField={updateField}
              updateOptions={updateOptions}
              updateFieldType={updateFieldType}
              addNewOption={addOption}
              removeField={removeField}
              removeOption={removeOption}
            />
          )
        )}
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
                newFieldDispachter({
                  type: "update_field",
                  label: e.target.value,
                  labelType: newField.type,
                });
                // setNewField({ label: e.target.value, type: newField.type });
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
                newFieldDispachter({
                  ...newField,
                  type: "update_field",
                  labelType: e.target.value,
                });
              }}
            >
              <option value="">Select an option</option>
              <option value="text">Text</option>
              <option value="date">Date</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="dropdown">Dropdown</option>
              <option value="radio">Radio Buttons</option>
              <option value="textarea">Text Area</option>
              <option value="multidropdown">Multi-select dropdown</option>
            </select>
          </div>
        </div>
        <div className="flex items-bottom">
          <button
            className="px-6 m-4 py-1 shadow-lg font-bold text-white bg-blue-500 hover:bg-blue-800 rounded-lg"
            onClick={(e) => {
              newFieldDispachter({
                type: "add_field",
                label: newField.label,
                labelType: newField.type,
                resetValues: () => {
                  newFieldDispachter({ type: "reset_values" });
                },
              });
            }}
          >
            Add Field
          </button>
        </div>
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
