import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  blikOneClickPaymentObjectSchema,
  type BlikOneClickPaymentObject,
} from "./blik-one-click-payment-object.js";

export type BlikPaymentObject = {
  name?: string;
  countryCode?: string;
  email?: string;
  oneClick?: BlikOneClickPaymentObject;
};

export const blikPaymentObjectSchema: Schema<BlikPaymentObject> = s.object<BlikPaymentObject>({
  name: s.optional(s.string()),
  countryCode: s.optional(s.string()),
  email: s.optional(s.string()),
  oneClick: s.optional(s.lazy(() => blikOneClickPaymentObjectSchema)),
  _keysMap: {
    countryCode: "country_code",
    oneClick: "one_click",
  },
});
