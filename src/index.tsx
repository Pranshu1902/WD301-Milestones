import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./router/AppRouter";

/*
const heading = React.createElement('div', { className: 'text-5xl font-bold text-center' }, 'Hello World');

const divContainer = React.createElement('div', { className: 'bg-red-500' }, heading);
*/
// The above code is raw react

// This is JSX
//const divContainer = <div className="text-blue-500 text-5xl font-bold text-center">Hello World</div>;

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
