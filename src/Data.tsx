import React from "react";
import { formTemplate, form } from "./components/Home";

export const saveLocalForms = (localForms: form[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

/*const saveFormData = (currentState: form) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentState.id ? currentState : form
  );
  saveLocalForms(updatedLocalForms);
};*/

export const getLocalForms: () => form[] = () => {
  const savedFormsJSON = localStorage.getItem("formData");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};
