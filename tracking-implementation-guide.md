# Claude Code Tracking Implementation Guide

## Goal

Implement a clean tracking foundation for a **Next.js site on Vercel** for a **local service business** using:

- Google Tag Manager
- GA4
- Google Ads conversion tracking
- Meta Pixel

Primary business objective:

- track and optimize for **qualified leads**

Primary conversion:

- successful contact / quote / consultation form submission

Secondary conversions:

- phone number click
- appointment booked
- chat/contact click if applicable

---

## Architecture

### Use this setup

- Install **one GTM container sitewide** in `app/layout.tsx`
- Send events from the app using `sendGTMEvent`
- In GTM, create:
  - Google tag / GA4 base setup
  - GA4 event tags
  - Google Ads conversion tags
  - Meta Pixel base + Meta event tags

### Do not do this

- do **not** install separate `gtag.js` directly in the app for GA4 or Google Ads if GTM is already installed
- do **not** duplicate Meta Pixel in both code and GTM
- do **not** count a submit-button click as a lead unless the submission actually succeeds

---

## Environment variables

Add:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Keep GTM sitewide.

---

## Event schema

Implement these browser-side dataLayer events.

### 1) Primary lead event

Event name:

```ts
generate_lead
```

Fire only when:
- contact form submission succeeds
- quote request succeeds
- consultation request succeeds
- thank-you state/page is confirmed

Recommended payload:

```json
{
  "event": "generate_lead",
  "lead_type": "quote_request",
  "form_name": "contact_form",
  "service": "general",
  "page_path": "/contact",
  "page_title": "Contact",
  "lead_source_ui": "main_form"
}
```

This should map to:
- GA4 event: `generate_lead`
- Google Ads conversion: primary lead
- Meta event: `Lead`

### 2) Phone click

Event name:

```ts
phone_click
```

Fire when:
- user clicks a `tel:` link

Payload:

```json
{
  "event": "phone_click",
  "contact_method": "phone",
  "placement": "header",
  "page_path": "/",
  "page_title": "Home"
}
```

This should map to:
- GA4 event: `phone_click`
- Google Ads conversion: secondary conversion
- Meta event: `Contact`

### 3) Appointment booked

Event name:

```ts
appointment_booked
```

Fire when:
- a scheduler confirmation is actually reached
- or booking API response confirms success

Payload:

```json
{
  "event": "appointment_booked",
  "booking_type": "consultation",
  "page_path": "/book",
  "page_title": "Book Now"
}
```

This should map to:
- GA4 custom event: `appointment_booked`
- Google Ads conversion: optional separate higher-value conversion
- Meta event: usually `Lead` unless you later choose a different event strategy

### 4) Form started

Event name:

```ts
lead_form_start
```

Fire when:
- user focuses the first meaningful form field
- only once per page load

Payload:

```json
{
  "event": "lead_form_start",
  "form_name": "contact_form",
  "page_path": "/contact"
}
```

This should map to:
- GA4 only

Use this for funnel diagnosis, not primary ad optimization.

---

## Required files / implementation

### 1) GTM in root layout

```tsx
// app/layout.tsx
import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
        {children}
      </body>
    </html>
  )
}
```

### 2) Event helper

Create a lightweight utility so components don’t repeat raw event code.

```tsx
// lib/tracking.ts
'use client'

import { sendGTMEvent } from '@next/third-parties/google'

type TrackPayload = Record<string, unknown>

export function trackEvent(event: string, payload: TrackPayload = {}) {
  sendGTMEvent({
    event,
    ...payload,
  })
}
```

### 3) Contact form success tracking

```tsx
// example component
'use client'

import { trackEvent } from '@/lib/tracking'

export function ContactForm() {
  let hasTrackedFormStart = false

  async function handleSubmit(formData: FormData) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      return
    }

    trackEvent('generate_lead', {
      lead_type: 'quote_request',
      form_name: 'contact_form',
      service: 'general',
      page_path: window.location.pathname,
      page_title: document.title,
      lead_source_ui: 'main_form',
    })
  }

  function handleFirstInteraction() {
    if (hasTrackedFormStart) return
    hasTrackedFormStart = true

    trackEvent('lead_form_start', {
      form_name: 'contact_form',
      page_path: window.location.pathname,
    })
  }

  return (
    <form action={handleSubmit}>
      <input name="name" onFocus={handleFirstInteraction} />
      <input name="email" type="email" />
      <input name="phone" type="tel" />
      <textarea name="message" />
      <button type="submit">Send</button>
    </form>
  )
}
```

### 4) Phone link tracking

```tsx
'use client'

import { trackEvent } from '@/lib/tracking'

export function PhoneLink({
  phone = '+17325551212',
  placement = 'header',
  children = 'Call Now',
}: {
  phone?: string
  placement?: string
  children?: React.ReactNode
}) {
  return (
    <a
      href={`tel:${phone}`}
      onClick={() =>
        trackEvent('phone_click', {
          contact_method: 'phone',
          placement,
          page_path: window.location.pathname,
          page_title: document.title,
        })
      }
    >
      {children}
    </a>
  )
}
```

### 5) Optional booking success tracking

```tsx
'use client'

import { trackEvent } from '@/lib/tracking'

export function trackBookingSuccess() {
  trackEvent('appointment_booked', {
    booking_type: 'consultation',
    page_path: window.location.pathname,
    page_title: document.title,
  })
}
```

---

## GTM build specification

### A) Tags to create

1. **Google tag**
   - destination: GA4 property
   - fire on: All Pages

2. **GA4 event tag — generate_lead**
   - event name: `generate_lead`
   - trigger: Custom Event = `generate_lead`

3. **GA4 event tag — phone_click**
   - event name: `phone_click`
   - trigger: Custom Event = `phone_click`

4. **GA4 event tag — appointment_booked**
   - event name: `appointment_booked`
   - trigger: Custom Event = `appointment_booked`

5. **GA4 event tag — lead_form_start**
   - event name: `lead_form_start`
   - trigger: Custom Event = `lead_form_start`

6. **Google Ads conversion tag — main lead**
   - conversion action: website lead
   - trigger: Custom Event = `generate_lead`

7. **Google Ads conversion tag — phone click**
   - conversion action: phone click
   - trigger: Custom Event = `phone_click`

8. **Meta Pixel base**
   - fire on: All Pages

9. **Meta event tag — Lead**
   - trigger: Custom Event = `generate_lead`

10. **Meta event tag — Contact**
    - trigger: Custom Event = `phone_click`

### B) Data Layer Variables to create

Create GTM variables for:

- `lead_type`
- `form_name`
- `service`
- `lead_source_ui`
- `contact_method`
- `placement`
- `booking_type`
- `page_path`
- `page_title`

Use these variables as event parameters where relevant.

### C) Trigger definitions

Create these GTM custom-event triggers:

- `CE - generate_lead`
- `CE - phone_click`
- `CE - appointment_booked`
- `CE - lead_form_start`

Each should fire when the Custom Event name exactly matches the event string.

---

## GA4 admin setup

In GA4:

1. confirm the web stream is receiving events
2. mark **`generate_lead`** as a **key event**
3. optionally mark `appointment_booked` as a key event if it is a stronger lead
4. keep `phone_click` as either a key event or a reporting-only event depending on business preference

---

## Google Ads setup

Create at least these conversion actions:

### Primary conversion
- **Lead Form Submitted**
- source: website
- fires from GTM on `generate_lead`

### Secondary conversion
- **Phone Click**
- source: website
- fires from GTM on `phone_click`

Do **not** rely only on imported GA4 key events if you want the option to add enhanced conversions later.

---

## Enhanced conversions plan for later

Do not block launch on this, but structure the code so it can be added later.

When ready:

1. enable enhanced conversions in Google Ads
2. configure the Google tag in GTM for user-provided data
3. collect user-provided data on the page where the conversion fires
4. prefer stable field IDs in the markup if selectors are needed

---

## Meta setup

In Meta Events Manager:

1. create / connect Pixel
2. verify PageView is firing
3. map `generate_lead` to **Lead**
4. map `phone_click` to **Contact**
5. test events before launch

### Future Meta CAPI note

If CAPI is added later, include a shared event ID so browser and server events can be deduplicated.

---

## QA / validation checklist

### In GTM
- use **Preview**
- connect Tag Assistant to the site
- verify each custom event appears in the event stream
- verify the correct tags fire on each custom event

### In GA4
- verify Realtime receives:
  - `generate_lead`
  - `phone_click`
  - `lead_form_start`
  - `appointment_booked` if applicable

### In Google Ads
- verify conversion actions are receiving hits
- confirm only one lead fires per successful submission
- confirm no duplicate conversions

### In Meta
- use Test Events
- verify:
  - PageView
  - Lead
  - Contact

---

## Guardrails

Claude Code should follow these rules:

1. **Never fire `generate_lead` on button click alone**
2. **Only fire `generate_lead` after confirmed success**
3. **Track `tel:` clicks from all phone links**
4. **Deduplicate form-start firing so it only happens once per page load**
5. **Do not install separate GA4 or Google Ads `gtag.js` snippets outside GTM**
6. **Do not install duplicate Meta Pixel code**
7. **Keep event names exactly as specified**

---

## Launch scope

Ship this first:

- GTM sitewide
- `generate_lead`
- `phone_click`
- `lead_form_start`
- GA4 events
- Google Ads primary + secondary conversions
- Meta Pixel + Lead + Contact
- QA in GTM Preview, GA4 Realtime, Google Ads, and Meta Test Events

Then add later only if needed:

- `appointment_booked`
- enhanced conversions for web
- Meta Conversions API

---

## One-line instruction for Claude Code

Implement GTM sitewide in the Next.js app using `@next/third-parties/google`, create a reusable tracking helper around `sendGTMEvent`, fire `generate_lead` only on true form success, fire `phone_click` on all `tel:` links, and prepare the codebase for GTM-managed GA4, Google Ads conversions, and Meta Pixel events.
