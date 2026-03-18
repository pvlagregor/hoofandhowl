import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schema";

export default defineConfig({
  name: "hoofandhowl",
  title: "Hoof & Howl",
  projectId: "h4aceliz",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schema.types,
  },
});
