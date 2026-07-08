export async function sendWebhook(url: string | undefined, payload: unknown): Promise<void> {
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Webhook failures must not block the primary flow
  }
}
