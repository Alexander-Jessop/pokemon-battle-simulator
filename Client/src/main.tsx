import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { SelectedTeamProvider } from "./context/SelectedTeamContext.tsx";

import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SelectedTeamProvider>
          <App />
        </SelectedTeamProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
