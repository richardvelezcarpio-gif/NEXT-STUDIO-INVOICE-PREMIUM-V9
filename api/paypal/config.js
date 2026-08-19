export default {
  async fetch() {
    const mode = process.env.PAYPAL_MODE === "live" ? "live" : "sandbox";
    const clientId = process.env.PAYPAL_CLIENT_ID || "";
    const planId = process.env.PAYPAL_PLAN_ID || "";

    if (!clientId || !planId) {
      return Response.json(
        { error: "PayPal configuration is incomplete." },
        { status: 500 }
      );
    }

    return Response.json({
      mode,
      clientId,
      planId
    });
  }
};
