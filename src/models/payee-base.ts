import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type PayeeBase = {
  emailAddress?: string;
  merchantId?: string;
};

export const payeeBaseSchema: Schema<PayeeBase> = s.object<PayeeBase>({
  emailAddress: s.optional(s.string()),
  merchantId: s.optional(s.string()),
  _keysMap: {
    emailAddress: "email_address",
    merchantId: "merchant_id",
  },
});
