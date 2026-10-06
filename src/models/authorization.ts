import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  authorizationStatusDetailsSchema,
  type AuthorizationStatusDetails,
} from "./authorization-status-details.js";
import { authorizationStatusSchema, type AuthorizationStatus } from "./authorization-status.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import { moneySchema, type Money } from "./money.js";
import { networkTransactionSchema, type NetworkTransaction } from "./network-transaction.js";
import { sellerProtectionSchema, type SellerProtection } from "./seller-protection.js";

/** The authorized payment transaction. */
export type Authorization = {
  /** The status for the authorized payment. */
  status?: AuthorizationStatus;
  /** The details of the authorized payment status. */
  statusDetails?: AuthorizationStatusDetails;
  /** The PayPal-generated ID for the authorized payment. */
  id?: string;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  amount?: Money;
  /**
   * The API caller-provided external invoice number for this order. Appears in both the payer's
   * transaction history and the emails that the payer receives.
   */
  invoiceId?: string;
  /**
   * The API caller-provided external ID. Used to reconcile API caller-initiated transactions with
   * PayPal transactions. Appears in transaction and settlement reports.
   */
  customId?: string;
  /** Reference values used by the card network to identify a transaction. */
  networkTransactionReference?: NetworkTransaction;
  /**
   * The level of protection offered as defined by [PayPal Seller Protection for
   * Merchants](https://www.paypal.com/us/webapps/mpp/security/seller-protection).
   */
  sellerProtection?: SellerProtection;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  expirationTime?: string;
  /** An array of related [HATEOAS links](/docs/api/reference/api-responses/#hateoas-links). */
  links?: LinkDescription[];
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  createTime?: string;
  /**
   * The date and time, in [Internet date and time
   * format](https://tools.ietf.org/html/rfc3339#section-5.6). Seconds are required while fractional
   * seconds are optional. Note: The regular expression provides guidance but does not reject all
   * invalid dates.
   */
  updateTime?: string;
};

export const authorizationSchema: Schema<Authorization> = s.object<Authorization>({
  status: s.optional(s.lazy(() => authorizationStatusSchema)),
  statusDetails: s.optional(s.lazy(() => authorizationStatusDetailsSchema)),
  id: s.optional(s.string()),
  amount: s.optional(s.lazy(() => moneySchema)),
  invoiceId: s.optional(s.string()),
  customId: s.optional(s.string()),
  networkTransactionReference: s.optional(s.lazy(() => networkTransactionSchema)),
  sellerProtection: s.optional(s.lazy(() => sellerProtectionSchema)),
  expirationTime: s.optional(s.string()),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  createTime: s.optional(s.string()),
  updateTime: s.optional(s.string()),
  _keysMap: {
    statusDetails: "status_details",
    invoiceId: "invoice_id",
    customId: "custom_id",
    networkTransactionReference: "network_transaction_reference",
    sellerProtection: "seller_protection",
    expirationTime: "expiration_time",
    createTime: "create_time",
    updateTime: "update_time",
  },
});
