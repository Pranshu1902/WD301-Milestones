import { PaginationParams } from "../types/common";
import { APIFormFields } from "../types/fieldTypes";
import { FieldsType, Form } from "../types/formType";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

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

export async function getFormData(formId: string) {
  return request(`forms/${formId}/`);
}

export async function patchFormData(formId: string, form: Form) {
  return request(`forms/${formId}/`, "PATCH", form);
}

export async function deleteForm(formId: number) {
  return request(`forms/${formId}/`, "DELETE");
}

export async function getFormFields(formId: string) {
  return request(`forms/${formId}/fields/`);
}

export async function addField(formId: number, field: FieldsType) {
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

export async function removeField(formId: string, fieldId: string) {
  return request(`forms/${formId}/fields/${fieldId}/`, "DELETE");
}

export async function getOptions(formId: string, fieldId: string) {
  return request(`forms/${formId}/fields/${fieldId}/options/`, "GET");
}

export async function addOption(formId: string, fieldId: string, option: any) {
  return request(`forms/${formId}/fields/${fieldId}/options/`, "POST", option);
}

export async function updateOption(
  formId: string,
  fieldId: string,
  optionId: string,
  option: any
) {
  return request(
    `forms/${formId}/fields/${fieldId}/options/${optionId}/`,
    "PUT",
    option
  );
}

export async function removeOption(
  formId: string,
  fieldId: string,
  optionId: string
) {
  return request(
    `forms/${formId}/fields/${fieldId}/options/${optionId}/`,
    "DELETE"
  );
}
