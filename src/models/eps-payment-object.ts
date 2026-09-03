import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type EpsPaymentObject = {
  name?: string;
  countryCode?: string;
  bic?: string;
};

export const epsPaymentObjectSchema: Schema<EpsPaymentObject> = s.object<EpsPaymentObject>({
  name: s.optional(s.string()),
  countryCode: s.optional(s.string()),
  bic: s.optional(s.string()),
  _keysMap: {
    countryCode: "country_code",
  },
});
