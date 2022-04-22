import { APIFormFields } from "./fieldTypes";

export interface formTemplate {
  id: number;
  type: string;
  label: string;
  value: string;
  options: string[];
}

type normalForm = {
  id: number;
  title: string;
  fields: formTemplate[];
};

type dropdownForm = {
  id: number;
  title: string;
  fields: formTemplate[];
};

type radioForm = {
  id: number;
  title: string;
  fields: formTemplate[];
};

type multiSelectForm = {
  id: number;
  title: string;
  fields: formTemplate[];
};

type textAreaForm = {
  id: number;
  title: string;
  fields: formTemplate[];
};

export type formType =
  | normalForm
  | dropdownForm
  | radioForm
  | multiSelectForm
  | textAreaForm;

// API
export type formItem = Omit<formType, "fields">;

export type FieldsType = {
  id: number;
  label: string;
  kind: string;
  options: string[];
  value: string;
  meta: { fieldType: string };
};

export type Form = {
  id: number;
  title: string;
  description?: string;
  is_public?: boolean;
  created_by: number;
  created_date: string;
  modified_date: string;
  fields: FieldsType[];
};

export type APIForm = {
  id?: number;
  title: string;
  description?: string;
  is_public?: boolean;
  fields: APIFormFields[];
};

export type Error<T> = Partial<Record<keyof T, string>>;

export const validateForm = (form: Form) => {
  const errors: Error<Form> = {};
  if (form.title.length < 1) {
    errors.title = "Title is required";
  }
  if (form.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }
  return errors;
};
