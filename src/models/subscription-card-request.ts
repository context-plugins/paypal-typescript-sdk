import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { cardTypeSchema, type CardType } from "./card-type.js";
import {
  subscriptionsCardAttributesSchema,
  type SubscriptionsCardAttributes,
} from "./subscriptions-card-attributes.js";
import { subscriptionsCardBrandSchema, type SubscriptionsCardBrand } from "./subscriptions-card-brand.js";

/** The payment card to use to fund a payment. Can be a credit or debit card. */
export type SubscriptionCardRequest = {
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
  /** Type of card. i.e Credit, Debit and so on. */
  type?: CardType;
  /** The card network or brand. Applies to credit, debit, gift, and payment cards. */
  brand?: SubscriptionsCardBrand;
  /**
   * The portable international postal address. Maps to
   * [AddressValidationMetadata](https://github.com/googlei18n/libaddressinput/wiki/AddressValidationMetadata)
   * and HTML 5.1 [Autofilling form controls: the autocomplete
   * attribute](https://www.w3.org/TR/html51/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute).
   */
  billingAddress?: Address;
  /** Additional attributes associated with the use of this card. */
  attributes?: SubscriptionsCardAttributes;
};

export const subscriptionCardRequestSchema: Schema<SubscriptionCardRequest> =
  s.object<SubscriptionCardRequest>({
    name: s.optional(s.string()),
    number: s.optional(s.string()),
    expiry: s.optional(s.string()),
    securityCode: s.optional(s.string()),
    type: s.optional(s.lazy(() => cardTypeSchema)),
    brand: s.optional(s.lazy(() => subscriptionsCardBrandSchema)),
    billingAddress: s.optional(s.lazy(() => addressSchema)),
    attributes: s.optional(s.lazy(() => subscriptionsCardAttributesSchema)),
    _keysMap: {
      securityCode: "security_code",
      billingAddress: "billing_address",
    },
  });
