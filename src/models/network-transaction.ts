import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { cardBrandSchema, type CardBrand } from "./card-brand.js";

/** Reference values used by the card network to identify a transaction. */
export type NetworkTransaction = {
  /**
   * Transaction reference id returned by the scheme. For Visa and Amex, this is the "Tran id" field
   * in response. For MasterCard, this is the "BankNet reference id" field in response. For
   * Discover, this is the "NRID" field in response. The pattern we expect for this field from
   * Visa/Amex/CB/Discover is numeric, Mastercard/BNPP is alphanumeric and Paysecure is alphanumeric
   * with special character -.
   */
  id?: string;
  /**
   * The date that the transaction was authorized by the scheme. This field may not be returned for
   * all networks. MasterCard refers to this field as "BankNet reference date". For some specific
   * networks, such as MasterCard and Discover, this date field is mandatory when the
   * `previous_network_transaction_reference_id` is passed.
   */
  date?: string;
  /** The card network or brand. Applies to credit, debit, gift, and payment cards. */
  network?: CardBrand;
  /**
   * Reference ID issued for the card transaction. This ID can be used to track the transaction
   * across processors, card brands and issuing banks.
   */
  acquirerReferenceNumber?: string;
};

export const networkTransactionSchema: Schema<NetworkTransaction> = s.object<NetworkTransaction>({
  id: s.optional(s.string()),
  date: s.optional(s.string()),
  network: s.optional(s.lazy(() => cardBrandSchema)),
  acquirerReferenceNumber: s.optional(s.string()),
  _keysMap: {
    acquirerReferenceNumber: "acquirer_reference_number",
  },
});
