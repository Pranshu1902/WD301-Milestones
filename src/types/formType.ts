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
