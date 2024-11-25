import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // URL of your Next.js app
    experimentalStudio: true,
    viewportWidth: 1920, // Set your desired width
    viewportHeight: 1080, // Set your desired height
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
