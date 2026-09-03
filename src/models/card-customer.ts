import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { phoneWithTypeSchema, type PhoneWithType } from "./phone-with-type.js";

export type CardCustomer = {
  id?: string;
  emailAddress?: string;
  phone?: PhoneWithType;
  merchantCustomerId?: string;
};

export const cardCustomerSchema: Schema<CardCustomer> = s.object<CardCustomer>({
  id: s.optional(s.string()),
  emailAddress: s.optional(s.string()),
  phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
  merchantCustomerId: s.optional(s.string()),
  _keysMap: {
    emailAddress: "email_address",
    merchantCustomerId: "merchant_customer_id",
  },
});
