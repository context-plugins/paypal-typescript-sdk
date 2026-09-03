import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { experienceContextSchema, type ExperienceContext } from "./experience-context.js";

export type MyBankPaymentRequest = {
  name: string;
  countryCode: string;
  experienceContext?: ExperienceContext;
};

export const myBankPaymentRequestSchema: Schema<MyBankPaymentRequest> = s.object<MyBankPaymentRequest>({
  name: s.string(),
  countryCode: s.string(),
  experienceContext: s.optional(s.lazy(() => experienceContextSchema)),
  _keysMap: {
    countryCode: "country_code",
    experienceContext: "experience_context",
  },
});
