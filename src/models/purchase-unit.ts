import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { amountWithBreakdownSchema, type AmountWithBreakdown } from "./amount-with-breakdown.js";
import { itemSchema, type Item } from "./item.js";
import { payeeBaseSchema, type PayeeBase } from "./payee-base.js";
import { paymentCollectionSchema, type PaymentCollection } from "./payment-collection.js";
import { paymentInstructionSchema, type PaymentInstruction } from "./payment-instruction.js";
import {
  shippingWithTrackingDetailsSchema,
  type ShippingWithTrackingDetails,
} from "./shipping-with-tracking-details.js";
import { supplementaryDataSchema, type SupplementaryData } from "./supplementary-data.js";

/** The purchase unit details. Used to capture required information for the payment contract. */
export type PurchaseUnit = {
  /**
   * The API caller-provided external ID for the purchase unit. Required for multiple purchase units
   * when you must update the order through `PATCH`. If you omit this value and the order contains
   * only one purchase unit, PayPal sets this value to `default`. Note: If there are multiple
   * purchase units, reference_id is required for each purchase unit.
   */
  referenceId?: string;
  /**
   * The total order amount with an optional breakdown that provides details, such as the total item
   * amount, total tax amount, shipping, handling, insurance, and discounts, if any. If you specify
   * `amount.breakdown`, the amount equals `item_total` plus `tax_total` plus `shipping` plus
   * `handling` plus `insurance` minus `shipping_discount` minus discount. The amount must be a
   * positive number. For listed of supported currencies and decimal precision, see the PayPal REST
   * APIs Currency Codes.
   */
  amount?: AmountWithBreakdown;
  /**
   * The merchant who receives the funds and fulfills the order. The merchant is also known as the
   * payee.
   */
  payee?: PayeeBase;
  /**
   * Any additional payment instructions to be consider during payment processing. This processing
   * instruction is applicable for Capturing an order or Authorizing an Order.
   */
  paymentInstruction?: PaymentInstruction;
  /** The purchase description. */
  description?: string;
  /**
   * The API caller-provided external ID. Used to reconcile API caller-initiated transactions with
   * PayPal transactions. Appears in transaction and settlement reports.
   */
  customId?: string;
  /** The API caller-provided external invoice ID for this order. */
  invoiceId?: string;
  /**
   * The PayPal-generated ID for the purchase unit. This ID appears in both the payer's transaction
   * history and the emails that the payer receives. In addition, this ID is available in
   * transaction and settlement reports that merchants and API callers can use to reconcile
   * transactions. This ID is only available when an order is saved by calling
   * v2/checkout/orders/id/save.
   */
  id?: string;
  /**
   * The payment descriptor on account transactions on the customer's credit card statement, that
   * PayPal sends to processors. The maximum length of the soft descriptor information that you can
   * pass in the API field is 22 characters, in the following format:22 - len(PAYPAL * (8)) -
   * len(Descriptor in Payment Receiving Preferences of Merchant account + 1)The PAYPAL prefix uses
   * 8 characters. The soft descriptor supports the following ASCII characters: Alphanumeric
   * characters Dashes Asterisks Periods (.) Spaces For Wallet payments marketplace integrations:
   * The merchant descriptor in the Payment Receiving Preferences must be the marketplace name. You
   * can't use the remaining space to show the customer service number. The remaining spaces can be
   * a combination of seller name and country. For unbranded payments (Direct Card) marketplace
   * integrations, use a combination of the seller name and phone number.
   */
  softDescriptor?: string;
  /** An array of items that the customer purchases from the merchant. */
  items?: Item[];
  /** The order shipping details. */
  shipping?: ShippingWithTrackingDetails;
  /**
   * Supplementary data about a payment. This object passes information that can be used to improve
   * risk assessments and processing costs, for example, by providing Level 2 and Level 3 payment
   * data.
   */
  supplementaryData?: SupplementaryData;
  /**
   * The collection of payments, or transactions, for a purchase unit in an order. For example,
   * authorized payments, captured payments, and refunds.
   */
  payments?: PaymentCollection;
  /**
   * The error reason code and description that are the reason for the most recent order decline.
   */
  mostRecentErrors?: Record<string, unknown>[];
};

export const purchaseUnitSchema: Schema<PurchaseUnit> = s.object<PurchaseUnit>({
  referenceId: s.optional(s.string()),
  amount: s.optional(s.lazy(() => amountWithBreakdownSchema)),
  payee: s.optional(s.lazy(() => payeeBaseSchema)),
  paymentInstruction: s.optional(s.lazy(() => paymentInstructionSchema)),
  description: s.optional(s.string()),
  customId: s.optional(s.string()),
  invoiceId: s.optional(s.string()),
  id: s.optional(s.string()),
  softDescriptor: s.optional(s.string()),
  items: s.optional(s.array(s.lazy(() => itemSchema))),
  shipping: s.optional(s.lazy(() => shippingWithTrackingDetailsSchema)),
  supplementaryData: s.optional(s.lazy(() => supplementaryDataSchema)),
  payments: s.optional(s.lazy(() => paymentCollectionSchema)),
  mostRecentErrors: s.optional(s.array(s.record(s.string(), s.unknown()))),
  _keysMap: {
    referenceId: "reference_id",
    paymentInstruction: "payment_instruction",
    customId: "custom_id",
    invoiceId: "invoice_id",
    softDescriptor: "soft_descriptor",
    supplementaryData: "supplementary_data",
    mostRecentErrors: "most_recent_errors",
  },
});
