// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Movie-TV_Finder/", // <-- your repo name, with leading and trailing slash
});
