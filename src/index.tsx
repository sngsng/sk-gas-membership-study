import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./shared/App";
import { persistor, store } from "./store";
import GlobalModal from "./components/Modal/GlobalModal";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <App />
        <GlobalModal />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
  // {/* </React.StrictMode> */}
);
