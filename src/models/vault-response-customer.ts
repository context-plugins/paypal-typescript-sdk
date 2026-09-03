import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type VaultResponseCustomer = {
  id?: string;
  merchantCustomerId?: string;
  links?: Record<string, unknown>[];
};

export const vaultResponseCustomerSchema: Schema<VaultResponseCustomer> = s.object<VaultResponseCustomer>({
  id: s.optional(s.string()),
  merchantCustomerId: s.optional(s.string()),
  links: s.optional(s.array(s.record(s.string(), s.unknown()))),
  _keysMap: {
    merchantCustomerId: "merchant_customer_id",
  },
});
