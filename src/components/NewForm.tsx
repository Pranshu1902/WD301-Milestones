import React, { useEffect, useState } from "react";
import LabelledInput from "../LabelledInput";
import closeIcon from "../images/close.png";
import FormTitle from "../FormTitle";
import { Link, navigate } from "raviger";
import previewIcon from "../images/eye.png";
import { FieldsType, Form } from "../types/formType";
import OptionsInput from "../OptionsInput";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import dragIcon from "../images/drag.webp";
import {
  addField,
  deleteFormField,
  getFormData,
  getFormFields,
  listForms,
  patchFormData,
  removeOption,
  updateField,
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

  const [currentTitle, setTitle] = useState("");

  useEffect(() => {
    listForms({
      offset: 0,
      limit: 5,
    }).then((data) => {
      const forms: Form[] = data.results;
      //let initialState: Form = forms.filter((form) => form.id === props.id)[0];
      setState(forms.filter((form) => form.id === props.id)[0]);
    });
  }, []);

  /*useEffect(() => {
    getFormFields(props.id).then((data) => {
      //let newState = state;
      //newState.fields = data.results; //data.results ? (newState.fields = data.results) : (newState.fields = []);
      setState({ ...state, fields: data.results });
    });
  }, []);*/

  getFormFields(props.id).then((data) => {
    //let newState = state;
    //newState.fields = data.results; //data.results ? (newState.fields = data.results) : (newState.fields = []);
    setState({ ...state, fields: data.results });
  });

  const [newField, setNewField] = useState({ label: "", type: "" });

  const [option, setOption] = useState("");

  /*const updateField = (
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
  };*/

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
    setTitle(value);
    setState({ ...state, title: value });
    updateFormTitle(props.id, { ...state, title: value });
    patchFormData(props.id, { ...state, title: value });
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

  const removeField = (id: number) => {
    const Field: FieldsType = {
      ...defaultField,
      id: Number(new Date()),
      label: newField.label,
      kind: newField.type,
    };

    const updatedState = state;
    updatedState.fields
      ? updatedState.fields.filter((field) => field.id !== id)
      : (updatedState.fields = [Field]);
    setState(updatedState);
    deleteFormField(props.id, id, updatedState);
    // addField(props.id, Field);
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

  /*useEffect(() => {
    patchFormData(props.id, state);
    console.log(state);
  }, []);*/

  const addThisOption = (id: number) => {
    if (option !== "") {
      state.fields.filter((field) => field.id === id)[0].options.push(option);
    }
    updateFieldAPI(
      props.id,
      id,
      state.fields.filter((field) => field.id === id)[0]
    );
    setOption("");
    patchFormData(props.id, state);
  };

  const updateOrder = (result: any) => {
    let newFields = state.fields;

    const fieldName = result.draggableId;
    const newIndex = result.destination.index;

    console.log(result);

    const fieldIndex = state.fields.findIndex(
      (form) => form.label === fieldName
    );
    const formToBeMoved = state.fields.filter(
      (form) => form.label === fieldName
    )[0];

    newFields.splice(fieldIndex, 1);
    newFields.splice(newIndex, 0, formToBeMoved);

    const updatedFormState = { ...state, fields: newFields };
    setState(updatedFormState);
    patchFormData(props.id, updatedFormState);
  };

  const removeThisField = (id: number) => {
    let newState = state;
    newState.fields = newState.fields.filter((field) => field.id !== id);

    setState({
      ...state,
      fields: state.fields.filter((field) => field.id !== id),
    });

    deleteFormField(props.id, id, {
      ...state,
      fields: state.fields.filter((field) => field.id !== id),
    });

    patchFormData(props.id, {
      ...state,
      fields: state.fields.filter((field) => field.id !== id),
    });
  };

  const addNewFieldAPI = () => {
    addNewField();
    setNewField({ label: "", type: "" });

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
          <div className="flex gap-4">
            <input
              className="border-2 border-gray-200 rounded-lg p-2 my-2 w-full flex-1"
              value={state.title}
              type={"text"}
              onChange={(e) => updateTitle(e.target.value)}
            />
          </div>
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
        <DragDropContext onDragEnd={updateOrder}>
          <Droppable droppableId="fields">
            {(provided) => (
              <ul
                className="fields"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {state.fields ? (
                  state.fields.map((field, index) =>
                    field.kind === "TEXT" ? (
                      <Draggable
                        key={field.id}
                        draggableId={field.label}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={field.id}
                            className="rounded-lg p-2 border-1 flex justify-center"
                            tabIndex={index}
                          >
                            <img src={dragIcon} width={60} height={10} />
                            <LabelledInput
                              onTypeChangeCB={(e) => {
                                updateFieldType(e, field.id);
                              }}
                              id={field.id}
                              label={field.label}
                              key={field.id}
                              fieldType={field.kind}
                              removeFieldCB={(e) => {
                                removeThisField(field.id);
                              }}
                              value={field.value}
                              optionValue={option}
                              onChangeCB={(e) => {
                                updateField(
                                  props.id,
                                  field.id,
                                  e.currentTarget.value
                                );
                              }}
                              options={field.options}
                            />
                          </li>
                        )}
                      </Draggable>
                    ) : (
                      <Draggable
                        key={field.id}
                        draggableId={field.label}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={field.id}
                            className="rounded-lg p-2 border-1"
                            tabIndex={index}
                          >
                            <img
                              className="float-left pt-10"
                              src={dragIcon}
                              width={60}
                              height={5}
                            />
                            <div className="float-left">
                              <OptionsInput
                                key={field.id}
                                id={field.id}
                                label={field.label}
                                fieldType={field.kind}
                                value={field.value}
                                type={field.kind}
                                options={field.options}
                                option={option}
                                updateField={(e) =>
                                  updateField(
                                    props.id,
                                    field.id,
                                    e.currentTarget.value
                                  )
                                }
                                updateOptions={(e) => {
                                  setOption(e);
                                }}
                                updateFieldType={updateFieldType}
                                addNewOption={() => {
                                  addThisOption(field.id);
                                }}
                                removeField={() => {
                                  removeThisField(field.id);
                                }}
                                removeOption={removeThisOption}
                              />
                            </div>
                          </li>
                        )}
                      </Draggable>
                    )
                  )
                ) : (
                  <div></div>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
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
            onClick={() => {
              addNewFieldAPI();
            }}
          >
            Add Field
          </button>
        </div>
      </div>

      <div className="flex gap-4 w-full justify-center">
        <button
          type="submit"
          className="mt-4 shadow-xl px-12 py-2 text-white bg-green-500 hover:bg-green-800 rounded-lg font-bold"
          onClick={() => {
            patchFormData(props.id, state);
            navigate("/");
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
