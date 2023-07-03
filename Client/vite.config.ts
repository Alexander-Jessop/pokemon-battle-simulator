import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/": "https://pokemon-battle-simulator-lake.vercel.app",
      },
    },
    define: {},
  };
});
