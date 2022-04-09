import React, { useState } from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
import Home from "./components/Home";
//import Form from "./components/Form";
import NewForm from "./components/NewForm";

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
