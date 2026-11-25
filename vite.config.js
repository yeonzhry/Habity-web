import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" → 빌드한 dist 폴더를 인터넷 없이 index.html 더블클릭으로도 열 수 있게
export default defineConfig({
  plugins: [react()],
  base: "./",
});
