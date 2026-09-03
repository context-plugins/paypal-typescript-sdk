import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { phoneWithTypeSchema, type PhoneWithType } from "./phone-with-type.js";

export type SubscriptionCustomerInformation = {
  id?: string;
  emailAddress?: string;
  phone?: PhoneWithType;
};

export const subscriptionCustomerInformationSchema: Schema<SubscriptionCustomerInformation> =
  s.object<SubscriptionCustomerInformation>({
    id: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    phone: s.optional(s.lazy(() => phoneWithTypeSchema)),
    _keysMap: {
      emailAddress: "email_address",
    },
  });
