import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { nameSchema, type Name } from "./name.js";

export type SubscriptionPayer = {
  emailAddress?: string;
  payerId?: string;
  name?: Name;
};

export const subscriptionPayerSchema: Schema<SubscriptionPayer> = s.object<SubscriptionPayer>({
  emailAddress: s.optional(s.string()),
  payerId: s.optional(s.string()),
  name: s.optional(s.lazy(() => nameSchema)),
  _keysMap: {
    emailAddress: "email_address",
    payerId: "payer_id",
  },
});
