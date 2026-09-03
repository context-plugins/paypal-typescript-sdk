import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { nameSchema, type Name } from "./name.js";
import { phoneWithTypeSchema, type PhoneWithType } from "./phone-with-type.js";

export type PayPalWalletCustomerRequest = {
  id?: string;
  emailAddress?: string;
  phone?: PhoneWithType;
  name?: Name;
  merchantCustomerId?: string;
};

export const payPalWalletCustomerRequestSchema: Schema<PayPalWalletCustomerRequest> =
  s.object<PayPalWalletCustomerRequest>({
    id: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
    name: s.optional(s.lazy(() => nameSchema)),
    merchantCustomerId: s.optional(s.string()),
    _keysMap: {
      emailAddress: "email_address",
      merchantCustomerId: "merchant_customer_id",
    },
  });
