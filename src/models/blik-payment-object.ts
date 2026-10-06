import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  blikOneClickPaymentObjectSchema,
  type BlikOneClickPaymentObject,
} from "./blik-one-click-payment-object.js";

/** Information used to pay using BLIK. */
export type BlikPaymentObject = {
  /** The full name representation like Mr J Smith. */
  name?: string;
  /**
   * The [two-character ISO 3166-1 code](/api/rest/reference/country-codes/) that identifies the
   * country or region. Note: The country code for Great Britain is GB and not UK as used in the
   * top-level domain names for that country. Use the `C2` country code for China worldwide for
   * comparable uncontrolled price (CUP) method, bank card, and cross-border transactions.
   */
  countryCode?: string;
  /**
   * The internationalized email address. Note: Up to 64 characters are allowed before and 255
   * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
   * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
   */
  email?: string;
  /** Information used to pay using BLIK one-click flow. */
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
