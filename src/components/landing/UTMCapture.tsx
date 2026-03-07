"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function getStoredUTM(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem("hh_utm");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function UTMCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params: Record<string, string> = {};
    let hasAny = false;

    for (const key of UTM_KEYS) {
      const value = searchParams.get(key);
      if (value) {
        params[key] = value;
        hasAny = true;
      }
    }

    if (hasAny) {
      sessionStorage.setItem("hh_utm", JSON.stringify(params));
    }
  }, [searchParams]);

  return null;
}
