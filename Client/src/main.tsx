import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { SelectedTeamProvider } from "./context/SelectedTeamContext.tsx";
import { GameStateProvider } from "./context/GameStateContext.tsx";

import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SelectedTeamProvider>
          <GameStateProvider>
            <App />
          </GameStateProvider>
        </SelectedTeamProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
