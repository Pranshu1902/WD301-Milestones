import { formTemplate } from "../components/NewForm";

type normalForm = {
  id: number;
  title: string;
  fields: formTemplate[];
};

// new interface to store options
interface optionFields extends formTemplate {
  option: string[];
}

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

export type Form = {
  id?: number;
  title: string;
  description?: string;
  is_public?: boolean;
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
