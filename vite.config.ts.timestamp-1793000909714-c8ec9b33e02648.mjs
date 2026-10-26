// vite.config.ts
import { defineConfig } from "file:///home/ariola/GB-T-/node_modules/.pnpm/vite@5.4.21_@types+node@22.20.5/node_modules/vite/dist/node/index.js";
import react from "file:///home/ariola/GB-T-/node_modules/.pnpm/@vitejs+plugin-react-swc@3.11.0_vite@5.4.21_@types+node@22.20.5_/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///home/ariola/GB-T-/node_modules/.pnpm/lovable-tagger@1.3.5_vite@5.4.21_@types+node@22.20.5_/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "/home/ariola/GB-T-";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
    hmr: { overlay: false },
    allowedHosts: true,
    cors: true
  },
  preview: { host: "0.0.0.0", port: 8080 },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__vite_injected_original_dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query"]
  },
  optimizeDeps: { exclude: ["@vite/client", "@vite/env"] },
  root: ".",
  publicDir: "public",
  cacheDir: "node_modules/.vite",
  build: { outDir: "dist", emptyOutDir: true, sourcemap: mode === "development" }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9hcmlvbGEvR0ItVC1cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2FyaW9sYS9HQi1ULS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9hcmlvbGEvR0ItVC0vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgcG9ydDogODA4MCxcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgIGhtcjogeyBvdmVybGF5OiBmYWxzZSB9LFxuICAgIGFsbG93ZWRIb3N0czogdHJ1ZSxcbiAgICBjb3JzOiB0cnVlLFxuICB9LFxuICBwcmV2aWV3OiB7IGhvc3Q6IFwiMC4wLjAuMFwiLCBwb3J0OiA4MDgwIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBtb2RlID09PSBcImRldmVsb3BtZW50XCIgJiYgY29tcG9uZW50VGFnZ2VyKCldLmZpbHRlcihCb29sZWFuKSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7IFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpIH0sXG4gICAgZGVkdXBlOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiLCBcInJlYWN0L2pzeC1ydW50aW1lXCIsIFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIsIFwiQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5XCJdLFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHsgZXhjbHVkZTogW1wiQHZpdGUvY2xpZW50XCIsIFwiQHZpdGUvZW52XCJdIH0sXG4gIHJvb3Q6IFwiLlwiLFxuICBwdWJsaWNEaXI6IFwicHVibGljXCIsXG4gIGNhY2hlRGlyOiBcIm5vZGVfbW9kdWxlcy8udml0ZVwiLFxuICBidWlsZDogeyBvdXREaXI6IFwiZGlzdFwiLCBlbXB0eU91dERpcjogdHJ1ZSwgc291cmNlbWFwOiBtb2RlID09PSBcImRldmVsb3BtZW50XCIgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd08sU0FBUyxvQkFBb0I7QUFDclEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUhoQyxJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLEtBQUssRUFBRSxTQUFTLE1BQU07QUFBQSxJQUN0QixjQUFjO0FBQUEsSUFDZCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUyxFQUFFLE1BQU0sV0FBVyxNQUFNLEtBQUs7QUFBQSxFQUN2QyxTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsaUJBQWlCLGdCQUFnQixDQUFDLEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDOUUsU0FBUztBQUFBLElBQ1AsT0FBTyxFQUFFLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU8sRUFBRTtBQUFBLElBQy9DLFFBQVEsQ0FBQyxTQUFTLGFBQWEscUJBQXFCLHlCQUF5Qix1QkFBdUI7QUFBQSxFQUN0RztBQUFBLEVBQ0EsY0FBYyxFQUFFLFNBQVMsQ0FBQyxnQkFBZ0IsV0FBVyxFQUFFO0FBQUEsRUFDdkQsTUFBTTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsVUFBVTtBQUFBLEVBQ1YsT0FBTyxFQUFFLFFBQVEsUUFBUSxhQUFhLE1BQU0sV0FBVyxTQUFTLGNBQWM7QUFDaEYsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
