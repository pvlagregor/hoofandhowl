import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2025-01-01",
      useCdn: true,
    })
  : null;

export function getClient() {
  if (!client) {
    throw new Error(
      "Sanity client not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local"
    );
  }
  return client;
}
