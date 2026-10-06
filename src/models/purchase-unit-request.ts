import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { amountWithBreakdownSchema, type AmountWithBreakdown } from "./amount-with-breakdown.js";
import { itemRequestSchema, type ItemRequest } from "./item-request.js";
import { payeeBaseSchema, type PayeeBase } from "./payee-base.js";
import { paymentInstructionSchema, type PaymentInstruction } from "./payment-instruction.js";
import { shippingDetailsSchema, type ShippingDetails } from "./shipping-details.js";
import { supplementaryDataSchema, type SupplementaryData } from "./supplementary-data.js";

/** The purchase unit request. Includes required information for the payment contract. */
export type PurchaseUnitRequest = {
  /**
   * The API caller-provided external ID for the purchase unit. Required for multiple purchase units
   * when you must update the order through `PATCH`. If you omit this value and the order contains
   * only one purchase unit, PayPal sets this value to `default`.
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
  amount: AmountWithBreakdown;
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
  /**
   * This field supports up to 3,000 characters, but any content beyond 127 characters (including
   * spaces) will be truncated. The 127 character limit is reflected in the response representation
   * of this field. The purchase description. The maximum length of the character is dependent on
   * the type of characters used. The character length is specified assuming a US ASCII character.
   * Depending on type of character; (e.g. accented character, Japanese characters) the number of
   * characters that that can be specified as input might not equal the permissible max length.
   */
  description?: string;
  /**
   * The API caller-provided external ID. Used to reconcile client transactions with PayPal
   * transactions. Appears in transaction and settlement reports but is not visible to the payer.
   */
  customId?: string;
  /**
   * The API caller-provided external invoice number for this order. Appears in both the payer's
   * transaction history and the emails that the payer receives. invoice_id values are required to
   * be unique within each merchant account by default. Although the uniqueness validation is
   * configurable, disabling this behavior will remove the account's ability to use invoice_id in
   * other APIs as an identifier. It is highly recommended to keep a unique invoice_id for each
   * Order.
   */
  invoiceId?: string;
  /**
   * This field supports up to 127 characters, but any content beyond 22 characters (including
   * spaces) will be truncated. The 22 character limit is reflected in the response representation
   * of this field. The soft descriptor is the dynamic text used to construct the statement
   * descriptor that appears on a payer's card statement. If an Order is paid using the "PayPal
   * Wallet", the statement descriptor will appear in following format on the payer's card
   * statement: PAYPAL_prefix+(space)+merchant_descriptor+(space)+ soft_descriptor Note: The
   * merchant descriptor is the descriptor of the merchant’s payment receiving preferences which can
   * be seen by logging into the merchant account
   * https://www.sandbox.paypal.com/businessprofile/settings/info/edit The PAYPAL prefix uses 8
   * characters. Only the first 22 characters will be displayed in the statement. For example, if:
   * The PayPal prefix toggle is PAYPAL *. The merchant descriptor in the profile is Janes Gift. The
   * soft descriptor is 800-123-1234. Then, the statement descriptor on the card is PAYPAL * Janes
   * Gift 80.
   */
  softDescriptor?: string;
  /** An array of items that the customer purchases from the merchant. */
  items?: ItemRequest[];
  /** The shipping details. */
  shipping?: ShippingDetails;
  /**
   * Supplementary data about a payment. This object passes information that can be used to improve
   * risk assessments and processing costs, for example, by providing Level 2 and Level 3 payment
   * data.
   */
  supplementaryData?: SupplementaryData;
};

export const purchaseUnitRequestSchema: Schema<PurchaseUnitRequest> = s.object<PurchaseUnitRequest>({
  referenceId: s.optional(s.string()),
  amount: amountWithBreakdownSchema,
  payee: s.optional(s.lazy(() => payeeBaseSchema)),
  paymentInstruction: s.optional(s.lazy(() => paymentInstructionSchema)),
  description: s.optional(s.string()),
  customId: s.optional(s.string()),
  invoiceId: s.optional(s.string()),
  softDescriptor: s.optional(s.string()),
  items: s.optional(s.array(s.lazy(() => itemRequestSchema))),
  shipping: s.optional(s.lazy(() => shippingDetailsSchema)),
  supplementaryData: s.optional(s.lazy(() => supplementaryDataSchema)),
  _keysMap: {
    referenceId: "reference_id",
    paymentInstruction: "payment_instruction",
    customId: "custom_id",
    invoiceId: "invoice_id",
    softDescriptor: "soft_descriptor",
    supplementaryData: "supplementary_data",
  },
});
