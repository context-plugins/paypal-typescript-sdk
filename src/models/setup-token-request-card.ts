import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";
import {
  vaultCardExperienceContextSchema,
  type VaultCardExperienceContext,
} from "./vault-card-experience-context.js";
import {
  vaultCardVerificationMethodSchema,
  type VaultCardVerificationMethod,
} from "./vault-card-verification-method.js";

/** A Resource representing a request to vault a Card. */
export type SetupTokenRequestCard = {
  /** The card holder's name as it appears on the card. */
  name?: string;
  /** The primary account number (PAN) for the payment card. */
  number?: string;
  /**
   * The year and month, in ISO-8601 `YYYY-MM` date format. See [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6).
   */
  expiry?: string;
  /**
   * The three- or four-digit security code of the card. Also known as the CVV, CVC, CVN, CVE, or
   * CID. This parameter cannot be present in the request when `payment_initiator=MERCHANT`.
   */
  securityCode?: string;
  /** The card network or brand. Applies to credit, debit, gift, and payment cards. */
  brand?: CardBrand;
  /**
   * The portable international postal address. Maps to
   * [AddressValidationMetadata](https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata)
   * and HTML 5.1 [Autofilling form controls: the autocomplete
   * attribute](https://www.w3.org/TR/html51/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute).
   */
  billingAddress?: Address;
  /** The verification method of the card. */
  verificationMethod?: VaultCardVerificationMethod;
  /** A resource representing an experience context of vault a card. */
  experienceContext?: VaultCardExperienceContext;
};

export const setupTokenRequestCardSchema: Schema<SetupTokenRequestCard> = s.object<SetupTokenRequestCard>({
  name: s.optional(s.string()),
  number: s.optional(s.string()),
  expiry: s.optional(s.string()),
  securityCode: s.optional(s.string()),
  brand: s.optional(s.lazy(() => cardBrandSchema)),
  billingAddress: s.optional(s.lazy(() => addressSchema)),
  verificationMethod: s.optional(s.lazy(() => vaultCardVerificationMethodSchema)),
  experienceContext: s.optional(s.lazy(() => vaultCardExperienceContextSchema)),
  _keysMap: {
    securityCode: "security_code",
    billingAddress: "billing_address",
    verificationMethod: "verification_method",
    experienceContext: "experience_context",
  },
});
