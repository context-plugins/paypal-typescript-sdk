import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { assuranceDetailsSchema, type AssuranceDetails } from "./assurance-details.js";
import {
  googlePayDecryptedTokenDataSchema,
  type GooglePayDecryptedTokenData,
} from "./google-pay-decrypted-token-data.js";
import {
  googlePayExperienceContextSchema,
  type GooglePayExperienceContext,
} from "./google-pay-experience-context.js";
import { googlePayRequestCardSchema, type GooglePayRequestCard } from "./google-pay-request-card.js";
import {
  phoneNumberWithCountryCodeSchema,
  type PhoneNumberWithCountryCode,
} from "./phone-number-with-country-code.js";

export type GooglePayRequest = {
  name?: string;
  emailAddress?: string;
  phoneNumber?: PhoneNumberWithCountryCode;
  card?: GooglePayRequestCard;
  decryptedToken?: GooglePayDecryptedTokenData;
  assuranceDetails?: AssuranceDetails;
  experienceContext?: GooglePayExperienceContext;
};

export const googlePayRequestSchema: Schema<GooglePayRequest> = s.object<GooglePayRequest>({
  name: s.optional(s.string()),
  emailAddress: s.optional(s.string()),
  phoneNumber: s.optional(s.lazy(() => phoneNumberWithCountryCodeSchema)),
  card: s.optional(s.lazy(() => googlePayRequestCardSchema)),
  decryptedToken: s.optional(s.lazy(() => googlePayDecryptedTokenDataSchema)),
  assuranceDetails: s.optional(s.lazy(() => assuranceDetailsSchema)),
  experienceContext: s.optional(s.lazy(() => googlePayExperienceContextSchema)),
  _keysMap: {
    emailAddress: "email_address",
    phoneNumber: "phone_number",
    decryptedToken: "decrypted_token",
    assuranceDetails: "assurance_details",
    experienceContext: "experience_context",
  },
});
