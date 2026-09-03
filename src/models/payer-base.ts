import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type PayerBase = {
  emailAddress?: string;
  payerId?: string;
};

export const payerBaseSchema: Schema<PayerBase> = s.object<PayerBase>({
  emailAddress: s.optional(s.string()),
  payerId: s.optional(s.string()),
  _keysMap: {
    emailAddress: "email_address",
    payerId: "payer_id",
  },
});
