import { navigate } from "raviger";
import React, { useState } from "react";
import { Error, Form, validateForm } from "../types/formType";
import { createForm } from "../utils/apiUtils";

export default function CreateForm() {
  const [form, setForm] = useState<Form>({
    id: 0,
    title: "",
    description: "",
    is_public: false,
  });

  const [errors, setErrors] = useState<Error<Form>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Basic Auth Credentials
      try {
        const data = await createForm(form);
        navigate(`/form/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center gap-y-4">
      <p className="text-2xl font-bold">Create Form</p>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="flex-col m-2 gap-4 mb-2">
          <label className={"text-xl"}>Title</label>
          <br />
          <input
            className="py-2 border-2 rounded-lg p-2 w-full"
            name="title"
            id="title"
            value={form.title}
            type="text"
            onChange={(e) => {
              setForm({ ...form, title: e.target.value });
            }}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="flex-col m-2 gap-4 mt-6 mb-6">
          <label className="text-xl">Description</label>
          <br />
          <input
            className="py-2 border-2 rounded-lg p-2 w-full"
            name="description"
            id="description"
            value={form.description}
            type="text"
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
            }}
          />
        </div>
        <div className="flex-col m-2 gap-4">
          <label>Is Public</label>
          <input
            className="m-2"
            name="is_public"
            id="is_public"
            type="checkbox"
            value={form.is_public ? "true" : "false"}
            onChange={(e) => {
              setForm({ ...form, is_public: e.target.checked });
            }}
          />
          {errors.is_public && (
            <p className="text-red-500">{errors.is_public}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-2/5 text-white font-bold bg-blue-500 hover:bg-blue-800 rounded-lg py-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
