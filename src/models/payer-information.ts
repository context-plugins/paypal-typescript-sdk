import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { payerNameSchema, type PayerName } from "./payer-name.js";
import { phoneSchema, type Phone } from "./phone.js";
import {
  simplePostalAddressCoarseGrainedSchema,
  type SimplePostalAddressCoarseGrained,
} from "./simple-postal-address-coarse-grained.js";

/** The payer information. */
export type PayerInformation = {
  /** The PayPal` customer account ID. */
  accountId?: string;
  /**
   * The internationalized email address. Note: Up to 64 characters are allowed before and 255
   * characters are allowed after the \@ sign. However, the generally accepted maximum length for an
   * email address is 254 characters. The pattern verifies that an unquoted \@ sign exists.
   */
  emailAddress?: string;
  /**
   * The phone number, in its canonical international [E.164 numbering plan
   * format](https://www.itu.int/rec/T-REC-E.164/en).
   */
  phoneNumber?: Phone;
  /** The address status of the payer. Value is either: Y. Verified. N. Not verified. */
  addressStatus?: string;
  /** The status of the payer. Value is `Y` or `N`. */
  payerStatus?: string;
  /** The name of the party. */
  payerName?: PayerName;
  /**
   * The [two-character ISO 3166-1 code](/docs/integration/direct/rest/country-codes/) that
   * identifies the country or region. Note: The country code for Great Britain is GB and not UK as
   * used in the top-level domain names for that country. Use the `C2` country code for China
   * worldwide for comparable uncontrolled price (CUP) method, bank card, and cross-border
   * transactions.
   */
  countryCode?: string;
  /**
   * A simple postal address with coarse-grained fields. Do not use for an international address.
   * Use for backward compatibility only. Does not contain phone.
   */
  address?: SimplePostalAddressCoarseGrained;
};

export const payerInformationSchema: Schema<PayerInformation> = s.object<PayerInformation>({
  accountId: s.optional(s.string()),
  emailAddress: s.optional(s.string()),
  phoneNumber: s.optional(s.lazy(() => phoneSchema)),
  addressStatus: s.optional(s.string()),
  payerStatus: s.optional(s.string()),
  payerName: s.optional(s.lazy(() => payerNameSchema)),
  countryCode: s.optional(s.string()),
  address: s.optional(s.lazy(() => simplePostalAddressCoarseGrainedSchema)),
  _keysMap: {
    accountId: "account_id",
    emailAddress: "email_address",
    phoneNumber: "phone_number",
    addressStatus: "address_status",
    payerStatus: "payer_status",
    payerName: "payer_name",
    countryCode: "country_code",
  },
});
