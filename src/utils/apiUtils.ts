import { PaginationParams } from "../types/common";
import { APIFormFields } from "../types/fieldTypes";
import { FieldsType, Form } from "../types/formType";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type submissionsForm = {
  label: string;
  description: string;
  is_public: boolean;
};

export type answers = { form_field: string; value: string };

export type submissions = {
  id: number;
  form: submissionsForm;
  answers: answers[];
  created_date: string;
};

export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: any = {}
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  // Basic Authentication
  // const auth = "Basic " + window.btoa("pranshu1902:ULX28qn2WvhsG3v");

  // Token Authentication
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + localStorage.getItem("token") : "";

  try {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json", Authorization: auth },
      body: method !== "GET" ? payload : null,
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      const errorJson = await response.json();
      throw Error(errorJson);
    }
  } catch (error) {
    return error;
  }
};

export const createForm = async (form: Form) => {
  return request("forms/", "POST", form);
};

export const login = async (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};

export const me = async () => {
  return request("users/me/", "GET", {});
};

export const listForms = async (pageParams: PaginationParams) => {
  return request("forms/", "GET", pageParams);
};

export async function getFormData(formId: number) {
  return request(`forms/${formId}/`);
}

export async function patchFormData(formId: number, form: Form) {
  return request(`forms/${formId}/`, "PUT", form);
}

export async function patchFormFieldsOrder(
  formId: number,
  fieldId: number,
  form: FieldsType
) {
  return request(`forms/${formId}/fields/${fieldId}`, "PUT", form);
}

export async function putAllFormData(updatedForms: Form[]) {
  return request(`forms/`, "POST", { updatedForms });
}

export async function saveSubmissions(formId: number, answers: submissions) {
  return request(`forms/${formId}`, "POST", { answers });
}

export async function deleteForm(formId: number) {
  return request(`forms/${formId}/`, "DELETE");
}

export async function deleteFormField(
  formId: number,
  fieldId: number,
  newState: Form
) {
  return request(`forms/${formId}/fields/${fieldId}/`, "DELETE", newState);
}

export async function getFormFields(formId: number) {
  return request(`forms/${formId}/fields/`);
}

export function addField(formId: number, field: FieldsType) {
  const newField = {
    label: field.label,
    kind: field.kind,
    options: field.options,
    value: field.value,
    meta: {
      fieldType: field.meta.fieldType,
    },
  };
  return request(`forms/${formId}/fields/`, "POST", newField);
}

export async function updateFieldAPI(
  formId: number,
  fieldId: number,
  field: FieldsType
) {
  const payload = {
    label: field.label,
    kind: field.kind,
    options: field.kind !== "text" ? field.options : null,
    value: field.value,
    meta: {
      fieldType: field.meta.fieldType,
    },
  };
  return request(`forms/${formId}/fields/${fieldId}/`, "PUT", payload);
}

export async function updateFormTitle(formId: number, option: any) {
  return request(`forms/${formId}/`, "PUT", option);
}

export async function removeField(formId: number, fieldId: number) {
  return request(`forms/${formId}/fields/${fieldId}/`, "DELETE");
}

export async function getOptions(formId: string, fieldId: string) {
  return request(`forms/${formId}/fields/${fieldId}/options/`, "GET");
}

export async function updateField(
  formId: number,
  fieldId: number,
  option: any
) {
  return request(`forms/${formId}/fields/${fieldId}/`, "PUT", option);
}

export async function removeOption(
  formId: number,
  fieldId: number,
  newFields: FieldsType
) {
  return request(`forms/${formId}/fields/${fieldId}/`, "DELETE", { newFields });
}
