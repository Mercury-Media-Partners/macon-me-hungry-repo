// src/pages/api/subscribe.ts
// Handles POST requests from LeadMagnet email capture.
// In production, replace the console.log with a ConvertKit / Mailchimp API call.

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ message: "Use POST" }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const email = (body?.email ?? '').trim().toLowerCase();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ── TODO: Replace with real integration ──────────────────────────
    // Example ConvertKit:
    // await fetch(`https://api.convertkit.com/v3/forms/{FORM_ID}/subscribe`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ api_key: import.meta.env.CONVERTKIT_API_KEY, email }),
    // });
    // ─────────────────────────────────────────────────────────────────

    console.log(`[Macon Me Hungry] New map subscriber: ${email} — ${new Date().toISOString()}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Welcome to Macon Me Hungry!',
        downloadUrl: '/map',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: 'Server error. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
