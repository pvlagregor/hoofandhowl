import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./schema";

export default defineConfig({
  name: "hoofandhowl",
  title: "Hoof & Howl",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schema.types,
  },
});
