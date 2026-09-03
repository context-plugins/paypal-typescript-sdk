import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { googlePayCardResponseSchema, type GooglePayCardResponse } from "./google-pay-card-response.js";
import {
  phoneNumberWithCountryCodeSchema,
  type PhoneNumberWithCountryCode,
} from "./phone-number-with-country-code.js";

export type GooglePayWalletResponse = {
  name?: string;
  emailAddress?: string;
  phoneNumber?: PhoneNumberWithCountryCode;
  card?: GooglePayCardResponse;
};

export const googlePayWalletResponseSchema: Schema<GooglePayWalletResponse> =
  s.object<GooglePayWalletResponse>({
    name: s.optional(s.string()),
    emailAddress: s.optional(s.string()),
    phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeSchema)),
    card: s.optional(s.lazy(() => googlePayCardResponseSchema)),
    _keysMap: {
      emailAddress: "email_address",
      phoneNumber: "phone_number",
    },
  });
