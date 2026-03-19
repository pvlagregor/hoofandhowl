'use client'

import { sendGTMEvent } from '@next/third-parties/google'

type TrackPayload = Record<string, unknown>

export function generateEventId(): string {
  return crypto.randomUUID()
}

export function trackEvent(event: string, payload: TrackPayload = {}) {
  sendGTMEvent({
    event,
    ...payload,
  })
}
