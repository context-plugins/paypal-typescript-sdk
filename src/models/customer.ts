import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type Customer = {
  id?: string;
  merchantCustomerId?: string;
};

export const customerSchema: Schema<Customer> = s.object<Customer>({
  id: s.optional(s.string()),
  merchantCustomerId: s.optional(s.string()),
  _keysMap: {
    merchantCustomerId: "merchant_customer_id",
  },
});
