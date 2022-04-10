import React from "react";
import { formTemplate, form } from "./components/Home";

export const saveLocalForms = (localForms: form[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export const getLocalForms: () => form[] = () => {
  const savedFormsJSON = localStorage.getItem("savedForms");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

export const getPreviewData: () => form[] = () => {
  const savedFormsJSON = localStorage.getItem("savedPreviewData");
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
};

export const savePreviewData = (previewForms: form[]) => {
  localStorage.setItem("savedPreviewData", JSON.stringify(previewForms));
};
