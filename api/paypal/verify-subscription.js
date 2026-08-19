
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
      const subscriptionID = body?.subscriptionID;

      if (!subscriptionID) {
        return Response.json(
          { error: "subscriptionID is required." },
          { status: 400 }
        );
      }

      const subscription = await getSubscription(subscriptionID);
      const verification = verifySubscriptionData(subscription);

      return Response.json(verification, {
        status: verification.verified ? 200 : 403
      });
    } catch (error) {
      return Response.json(
        { error: error.message || "Subscription verification failed." },
        { status: 400 }
      );
    }
  }
};
