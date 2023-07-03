import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        "api/": "https://pokemon-battle-simulator-lake.vercel.app/",
      },
    },
    define: {},
  };
});
