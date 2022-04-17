import { navigate } from "raviger";
import React, { useState } from "react";
import { Error, Form, validateForm } from "../types/formType";
import { createForm } from "../utils/apiUtils";

export default function CreateForm() {
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    is_public: false,
  });

  const [errors, setErrors] = useState<Error<Form>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

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
      <p className="text-xl">Title</p>
      <input className="py-2 border-2 rounded-lg p-2" type="text" />
      <p className="text-xl">Description</p>
      <input className="py-2 border-2 rounded-lg p-2" type="text" />
      <div className="flex">
        <input className="mt-2 mr-2" type="checkbox" value={"Is Public"} />
        <p>Is Public</p>
      </div>
      <button
        type="submit"
        className="text-white font-bold bg-blue-500 hover:bg-blue-800 rounded-lg py-2"
      >
        Submit
      </button>
    </div>
  );
}
