import { formTemplate } from "../components/NewForm";

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
