import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/": "http://localhost:3000",
      },
    },
    define: {
      "process.env.VITE_POKEMON_LIST_API": JSON.stringify(
        process.env.VITE_POKEMON_LIST_API
      ),
      "process.env.VITE_BATTLE_POKEMON_API": JSON.stringify(
        process.env.VITE_BATTLE_POKEMON_API
      ),
    },
  };
});
