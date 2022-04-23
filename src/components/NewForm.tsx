import { useEffect, useState } from "react";
import LabelledInput from "../LabelledInput";
import closeIcon from "../images/close.png";
import { Link, navigate } from "raviger";
import previewIcon from "../images/eye.png";
import { FieldsType, Form } from "../types/formType";
import OptionsInput from "../OptionsInput";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import dragIcon from "../images/drag.webp";
import {
  addField,
  getFormFields,
  listForms,
  patchFormData,
  patchFormFieldsOrder,
  removeField,
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

  const [newField, setNewField] = useState({ label: "", type: "" });

  const [option, setOption] = useState("");

  const updateTitle = (value: string) => {
    const newState = { ...state, title: value };
    setState(newState);

    updateFormTitle(props.id, newState);
  };

  const updateDescription = (value: string) => {
    const newState = { ...state, description: value };
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

  const updateThisField = (id: number, label: string) => {
    let updatedFields = state.fields.map((field) => {
      if (field.id === id) {
        return {
          ...field,
          label: label,
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
      label: label,
    };

    setState(newState);
    updateFieldAPI(props.id, id, updatedField);
  };

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
    // patchFormData(props.id, updatedFormState);

    newFields.map((field) => {
      patchFormFieldsOrder(props.id, field.id, field);
    });
  };

  const updateThisFieldType = (id: number, type: string) => {
    let updatedFields = state.fields.map((field) => {
      if (field.id === id) {
        return {
          ...field,
          kind: type,
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
      kind: type,
    };

    setState(newState);
    updateFieldAPI(props.id, id, updatedField);
  };

  const addNewFieldAPI = () => {
    addNewField();
    setNewField({ label: "", type: "" });

    patchFormData(props.id, state);
  };

  const removeFieldAPI = (id: number) => {
    let updatedFields = state.fields.filter((field) => field.id !== id);

    let newState = {
      ...state,
      fields: updatedFields,
    };

    setState(newState);
    removeField(props.id, id);
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
              placeholder={"Form Title"}
              onChange={(e) => updateTitle(e.target.value)}
            />
          </div>
          <div className="float-left">
            <input
              type="text"
              placeholder="Description"
              value={state.description}
              className="border-2 rounded-lg p-2 w-full"
              onChange={(e) => {
                updateDescription(e.target.value);
              }}
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
                                updateThisFieldType(field.id, e);
                              }}
                              id={field.id}
                              label={field.label}
                              key={field.id}
                              fieldType={field.kind}
                              removeFieldCB={(e) => {
                                removeFieldAPI(field.id);
                              }}
                              value={field.value}
                              optionValue={option}
                              onChangeCB={(e) => {
                                updateThisField(field.id, e);
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
                                  updateThisField(field.id, e)
                                }
                                updateOptions={(e) => {
                                  setOption(e);
                                }}
                                updateFieldType={(e) =>
                                  updateThisFieldType(field.id, e)
                                }
                                addNewOption={() => {
                                  addThisOption(field.id);
                                }}
                                removeField={() => {
                                  removeFieldAPI(field.id);
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
            navigate("/");
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
