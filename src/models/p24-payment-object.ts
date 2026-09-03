import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type P24PaymentObject = {
  name?: string;
  email?: string;
  countryCode?: string;
  paymentDescriptor?: string;
  methodId?: string;
  methodDescription?: string;
};

export const p24PaymentObjectSchema: Schema<P24PaymentObject> = s.object<P24PaymentObject>({
  name: s.optional(s.string()),
  email: s.optional(s.string()),
  countryCode: s.optional(s.string()),
  paymentDescriptor: s.optional(s.string()),
  methodId: s.optional(s.string()),
  methodDescription: s.optional(s.string()),
  _keysMap: {
    countryCode: "country_code",
    paymentDescriptor: "payment_descriptor",
    methodId: "method_id",
    methodDescription: "method_description",
  },
});
