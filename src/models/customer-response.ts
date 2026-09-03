import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type CustomerResponse = {
  id?: string;
  merchantCustomerId?: string;
};

export const customerResponseSchema: Schema<CustomerResponse> = s.object<CustomerResponse>({
  id: s.optional(s.string()),
  merchantCustomerId: s.optional(s.string()),
  _keysMap: {
    merchantCustomerId: "merchant_customer_id",
  },
});
