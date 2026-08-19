# Next Studio Invoice Premium V9 — PayPal Sandbox Ready

## What V9 adds
- Keeps the V8 premium landing.
- Keeps the V5 Invoice / Estimate / Policy generator and its separate `app-styles.css`.
- Adds a real PayPal Subscriptions integration shell.
- Pricing model:
  - $140 setup charged at signup
  - Month 1 service = $0 / included
  - $10 USD per month starting after the 1-month trial
  - recurring until canceled
- Uses PayPal's supported Subscriptions button flow.
- Buyer can use PayPal or an eligible debit/credit card option presented by PayPal.
- Server verifies the resulting subscription against PayPal before opening onboarding.
- Adds post-payment onboarding form for logo, colors and business information.

## Why the card fields are not ordinary HTML inputs
Do not collect raw card numbers/CVV yourself. PayPal owns the secure payment UI/flow.
The V9 premium checkout shell stays branded, while the real authorization is handled by PayPal.

## 1. Create `.env`
Duplicate:
`.env.example`

Rename the copy:
`.env`

Add your PayPal SANDBOX Client ID and Secret.

## 2. Create the Sandbox product + plan
From the V9 folder:

```bash
node setup-paypal.mjs
```

This creates:
- PayPal product
- PayPal plan with $140 setup fee
- 1 free month
- $10/month regular billing
- saves the Plan ID into `data/paypal-plan.json`

## 3. Start V9
```bash
node server.mjs
```

Then open:
`http://localhost:8083`

Live Demo:
`http://localhost:8083/app.html`

## 4. Test checkout
Use a PayPal Sandbox personal buyer account.

The page will:
1. Open the premium checkout.
2. Require the membership disclosure checkbox.
3. Render the PayPal subscription controls.
4. Create the subscription using the configured plan.
5. Ask the local server to verify the subscription.
6. If ACTIVE and on the correct plan, redirect to:
   `/onboarding.html?subscription_id=...`

## 5. Onboarding
The onboarding page verifies the subscription again before showing the form.
The sample saves onboarding JSON and the uploaded logo in:
`data/onboarding/`

This is local development storage only.

## Before LIVE production
Still required:
- Deploy over HTTPS.
- Move secrets to Vercel/server environment variables.
- Add a verified PayPal webhook listener.
- Store subscriptions/onboarding/history in Supabase instead of local files.
- Test cancellation, failed payment and suspended membership behavior.
- Switch `PAYPAL_MODE=live` only after sandbox testing passes.
- Do not commit `.env`.

## Webhook events recommended for production
- BILLING.SUBSCRIPTION.ACTIVATED
- BILLING.SUBSCRIPTION.CANCELLED
- BILLING.SUBSCRIPTION.SUSPENDED
- BILLING.SUBSCRIPTION.EXPIRED
- PAYMENT.SALE.COMPLETED
- PAYMENT.SALE.DENIED

The included webhook route logs unverified webhook bodies for development only.
Do not use them as authoritative until signature verification is implemented.
