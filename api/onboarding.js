
const MODE = process.env.PAYPAL_MODE === "live" ? "live" : "sandbox";
const PAYPAL_BASE =
  MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID || "";
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "";
const PLAN_ID = process.env.PAYPAL_PLAN_ID || "";

async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error("PayPal credentials are not configured.");
  }

  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const response = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error_description ||
      data.error ||
      "Unable to authenticate with PayPal."
    );
  }

  return data.access_token;
}

async function getSubscription(subscriptionID) {
  const token = await getAccessToken();

  const response = await fetch(
    `${PAYPAL_BASE}/v1/billing/subscriptions/${encodeURIComponent(subscriptionID)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to retrieve PayPal subscription.");
  }

  return data;
}

function verifySubscriptionData(subscription) {
  const planMatches = Boolean(PLAN_ID) && subscription.plan_id === PLAN_ID;
  const active = subscription.status === "ACTIVE";

  return {
    verified: active && planMatches,
    status: subscription.status,
    plan_id: subscription.plan_id,
    subscription_id: subscription.id,
    subscriber: subscription.subscriber || null
  };
}

const APPS_SCRIPT_WEB_APP_URL =
  process.env.APPS_SCRIPT_WEB_APP_URL || "";

async function sendToAppsScript(payload) {
  if (!APPS_SCRIPT_WEB_APP_URL) {
    throw new Error("Google Apps Script URL is not configured.");
  }

  const response = await fetch(APPS_SCRIPT_WEB_APP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    redirect: "follow"
  });

  const text = await response.text();
  let data = null;

  try {
    data = JSON.parse(text);
  } catch {}

  if (!response.ok) {
    throw new Error(
      `Apps Script HTTP ${response.status}: ${text.slice(0, 250)}`
    );
  }

  if (data && data.success === false) {
    throw new Error(data.error || "Apps Script rejected the onboarding.");
  }

  return data || { success: true };
}

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json(
        { error: "Method not allowed." },
        { status: 405 }
      );
    }

    try {
      const body = await request.json();

      if (!body?.subscriptionID) {
        return Response.json(
          { error: "Missing subscription ID." },
          { status: 400 }
        );
      }

      // Re-verify PayPal at the exact moment the form is submitted.
      const subscription = await getSubscription(body.subscriptionID);
      const verification = verifySubscriptionData(subscription);

      if (!verification.verified) {
        return Response.json(
          { error: "Subscription is not active or does not match this plan." },
          { status: 403 }
        );
      }

      // Protect the serverless function from very large uploads.
      if (body.logoData) {
        const match = String(body.logoData).match(
          /^data:(image\/(?:png|jpeg));base64,(.+)$/
        );

        if (!match) {
          return Response.json(
            { error: "Invalid logo format." },
            { status: 400 }
          );
        }

        const size = Buffer.from(match[2], "base64").length;

        if (size > 2 * 1024 * 1024) {
          return Response.json(
            { error: "Logo exceeds 2 MB." },
            { status: 400 }
          );
        }
      }

      const payload = {
        ...body,
        paypalStatus: verification.status,
        paypalPlanId: verification.plan_id,
        receivedAt: new Date().toISOString()
      };

      await sendToAppsScript(payload);

      return Response.json({
        ok: true,
        emailed: true,
        subscriptionID: body.subscriptionID
      });
    } catch (error) {
      console.error("Onboarding error:", error);

      return Response.json(
        { error: error.message || "Unable to process onboarding." },
        { status: 400 }
      );
    }
  }
};
