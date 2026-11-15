import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";

// Plugin order matters: Tailwind, then TanStack Start (routing/SSR), then the Nitro server
// build, then React. Nitro only runs for `vite build`; with no preset it auto-detects the
// host (Vercel, Netlify, Cloudflare…) and falls back to a Node server locally.
export default defineConfig(({ command }) => ({
  server: { port: 5180 },
  resolve: {
    tsconfigPaths: true,
    alias: { "@": `${process.cwd()}/src` },
    dedupe: ["react", "react-dom", "@tanstack/react-query", "@tanstack/query-core"],
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      // Redirect TanStack Start's server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    ...(command === "build" ? [nitro()] : []),
    viteReact(),
  ],
}));
