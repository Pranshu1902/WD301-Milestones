import React, { useState } from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
import Home from "./components/Home";
import Form from "./components/Form";
import NewForm from "./components/NewForm";
import CreateNewForm from "./components/CreateNewForm";

function App() {
  const [state, setState] = useState("HOME");
  const [formId, setFormId] = useState(0);

  const closeForm = () => {
    setState("HOME");
  };

  const openForm = (id: number) => {
    setFormId(id);
    setState("FORM");
  };

  /*const formFields = [
    { id: 1, type: "text", label: "First Name", value: "" },
    { id: 2, type: "text", label: "Last Name", value: "" },
    { id: 3, type: "email", label: "Email", value: "" },
    { id: 4, type: "date", label: "Date of Birth", value: "" },
    { id: 5, type: "tel", label: "Phone", value: "" },
  ];*/

  //const Forms = [{ title: "Sample Form", fields: formFields }];

  interface formTemplate {
    id: number;
    type: string;
    label: string;
    value: string;
  }

  return (
    <AppContainer>
      <div className="p-4 w-full justify-center bg-white shadow-lg rounded-xl items-center font-bold">
        <Header title={"Welcome to your Forms"} />
        {state === "HOME" ? (
          <Home openFormCB={openForm} />
        ) : (
          <NewForm id={formId} closeFormCB={closeForm} />
        )}
      </div>
    </AppContainer>
  );
}

export default App;
