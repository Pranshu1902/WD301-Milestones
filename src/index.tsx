import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: "https://f398a8b12f134efb8962d45b6d8ce0ea@o1215845.ingest.sentry.io/6357665",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

/*
const heading = React.createElement('div', { className: 'text-5xl font-bold text-center' }, 'Hello World');

const divContainer = React.createElement('div', { className: 'bg-red-500' }, heading);
*/
// The above code is raw react

// This is JSX
//const divContainer = <div className="text-blue-500 text-5xl font-bold text-center">Hello World</div>;

//if (process.env.REACT_APP_SENTRY_DSN) {}

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorkerRegistration.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
