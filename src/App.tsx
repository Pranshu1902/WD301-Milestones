import React, {useState} from 'react';
import AppContainer from './AppContainer';
import Header from './Header';
import Home from "./components/Home";
import Form from "./components/Form";
//import logo from './logo.svg';
//import './App.css';


// <React.Fragment> can be replaced with <>
// </React.Fragment> can be replaced with </>

function App() {

  const [state, setState] = useState("HOME");
  
  const closeForm = () => {setState("HOME")};

  const openForm = () => {setState("FORM")};
  
  return (
    <AppContainer>
      <div className="p-4 w-3/4 justify-center bg-white shadow-lg rounded-xl items-center">
      <Header 
        title={"Welcome to Lesson 5 of $react-typescript with #tailwindcss"} 
      />
      {
        state === "HOME" ? (
          <Home openFormCB={openForm} />
        ) : (
          <Form closeFormCB={closeForm} />)
      }
      </div>
    </AppContainer>
  );
}

export default App;
