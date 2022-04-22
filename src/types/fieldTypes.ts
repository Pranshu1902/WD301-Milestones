type fieldType =
  | "text"
  | "email"
  | "number"
  | "date"
  | "radio"
  | "checkbox"
  | "dropdown"
  | "textarea"
  | "multidropdown";

type textType = {
  kind: "text";
  id: string;
  label: string;
  value?: string;
  fieldType: fieldType;
};

type radioType = {
  id: string;
  value?: string;
  kind: "radio";
  fieldType: fieldType;
  label: string;
  options: string[];
};

type multiSelectType = {
  id: string;
  value?: string;
  kind: "dropdown";
  fieldType: fieldType;
  label: string;
  options: string[];
};

export type APIFormFields = textType | radioType | multiSelectType;
