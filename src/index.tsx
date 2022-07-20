import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import App from "./shared/App";
import { store } from "./store";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
