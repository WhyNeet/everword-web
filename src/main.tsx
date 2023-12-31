import "@/index.css";
import "@fontsource-variable/inter";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
