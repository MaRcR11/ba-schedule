import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./styles/index.css";
import "bulma/css/bulma.min.css";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "ORg4AjUWIQA/Gnt2VVhkQlFacl1JXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkRjXn5ccHRXRGBaVEM="
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
