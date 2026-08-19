import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadLiveEnv() {
  const envPath = path.join(__dirname, ".env.live");

  if (!fs.existsSync(envPath)) {
    throw new Error("Missing .env.live file.");
  }

  for (const raw of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const line = raw.trim();

    if (!line || line.startsWith("#") || !line.includes("=")) {
      continue;
    }

    const i = line.indexOf("=");
    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim();

    process.env[key] = value;
  }
}

loadLiveEnv();

if (process.env.PAYPAL_MODE !== "live") {
  throw new Error(
    'PAYPAL_MODE must be "live" inside .env.live before running this script.'
  );
}

const PAYPAL_BASE = "https://api-m.paypal.com";

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID || "";
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || "";

if (
  !CLIENT_ID ||
  !CLIENT_SECRET ||
  CLIENT_ID.includes("TU_LIVE") ||
  CLIENT_SECRET.includes("TU_LIVE")
) {
  throw new Error(
    "Add your LIVE PayPal Client ID and Secret to .env.live first."
  );
}

async function getAccessToken() {
  const auth = Buffer.from(
    `${CLIENT_ID}:${CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(
    `${PAYPAL_BASE}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error_description ||
      data.error ||
      "Unable to get PayPal LIVE access token."
    );
  }

  return data.access_token;
}

async function paypalPost(
  accessToken,
  endpoint,
  body,
  requestPrefix
) {
  const response = await fetch(
    `${PAYPAL_BASE}${endpoint}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "PayPal-Request-Id":
          `${requestPrefix}-${crypto.randomUUID()}`
      },
      body: JSON.stringify(body)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      JSON.stringify(data, null, 2)
    );
  }

  return data;
}

async function main() {
  console.log("Connecting to PayPal LIVE...");

  const accessToken = await getAccessToken();

  console.log("Creating LIVE PayPal product...");

  const product = await paypalPost(
    accessToken,
    "/v1/catalogs/products",
    {
      name: "Next Studio Branded Document Generator",
      description:
        "Personalized Invoice, Estimate and Policy Generator",
      type: "SERVICE",
      category: "SOFTWARE"
    },
    "NS-LIVE-PRODUCT"
  );

  console.log(`Product ID: ${product.id}`);

  console.log(
    "Creating LIVE plan: $140 setup + 1 month free + $10/month..."
  );

  const plan = await paypalPost(
    accessToken,
    "/v1/billing/plans",
    {
      product_id: product.id,

      name: "Next Studio Generator Membership",

      description:
        "$140 setup, first month included, then $10 USD monthly until canceled.",

      billing_cycles: [
        {
          frequency: {
            interval_unit: "MONTH",
            interval_count: 1
          },

          tenure_type: "TRIAL",

          sequence: 1,

          total_cycles: 1,

          pricing_scheme: {
            fixed_price: {
              value: "0",
              currency_code: "USD"
            }
          }
        },

        {
          frequency: {
            interval_unit: "MONTH",
            interval_count: 1
          },

          tenure_type: "REGULAR",

          sequence: 2,

          total_cycles: 0,

          pricing_scheme: {
            fixed_price: {
              value: "10",
              currency_code: "USD"
            }
          }
        }
      ],

      payment_preferences: {
        auto_bill_outstanding: true,

        setup_fee: {
          value: "140",
          currency_code: "USD"
        },

        setup_fee_failure_action: "CANCEL",

        payment_failure_threshold: 3
      }
    },
    "NS-LIVE-PLAN"
  );

  console.log("\nSUCCESS — PAYPAL LIVE PLAN CREATED");

  console.log(`Product ID: ${product.id}`);
  console.log(`Plan ID: ${plan.id}`);

  const dataDir = path.join(
    __dirname,
    "data"
  );

  fs.mkdirSync(
    dataDir,
    {
      recursive: true
    }
  );

  const livePlanFile = path.join(
    dataDir,
    "paypal-plan-live.json"
  );

  fs.writeFileSync(
    livePlanFile,
    JSON.stringify(
      {
        mode: "live",
        product_id: product.id,
        plan_id: plan.id,
        created_at: new Date().toISOString()
      },
      null,
      2
    )
  );

  console.log(
    "Saved to data/paypal-plan-live.json"
  );

  console.log(
    "\nIMPORTANT: Do not run this script again unless you intentionally want another LIVE product and plan."
  );

  console.log(
    "\nNext step: copy the Plan ID into PAYPAL_PLAN_ID= inside .env.live"
  );
}

main().catch(error => {
  console.error("\nLIVE SETUP FAILED");
  console.error(error.message);
  process.exit(1);
});