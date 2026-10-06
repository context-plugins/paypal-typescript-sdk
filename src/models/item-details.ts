import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { checkoutOptionSchema, type CheckoutOption } from "./checkout-option.js";
import { moneySchema, type Money } from "./money.js";
import { taxAmountSchema, type TaxAmount } from "./tax-amount.js";

/** The item details. */
export type ItemDetails = {
  /** An item code that identifies a merchant's goods or service. */
  itemCode?: string;
  /** The item name. */
  itemName?: string;
  /** The item description. */
  itemDescription?: string;
  /** The item options. Describes option choices on the purchase of the item in some detail. */
  itemOptions?: string;
  /** The number of purchased units of goods or a service. */
  itemQuantity?: string;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  itemUnitPrice?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  itemAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  discountAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  adjustmentAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  giftWrapAmount?: Money;
  /**
   * The percentage, as a fixed-point, signed decimal number. For example, define a 19.99% interest
   * rate as `19.99`.
   */
  taxPercentage?: string;
  /** An array of tax amounts levied by a government on the purchase of goods or services. */
  taxAmounts?: TaxAmount[];
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  basicShippingAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  extraShippingAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  handlingAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  insuranceAmount?: Money;
  /** The currency and amount for a financial transaction, such as a balance or payment due. */
  totalItemAmount?: Money;
  /** The invoice number. An alphanumeric string that identifies a billing for a merchant. */
  invoiceNumber?: string;
  /** An array of checkout options. Each option has a name and value. */
  checkoutOptions?: CheckoutOption[];
};

export const itemDetailsSchema: Schema<ItemDetails> = s.object<ItemDetails>({
  itemCode: s.optional(s.string()),
  itemName: s.optional(s.string()),
  itemDescription: s.optional(s.string()),
  itemOptions: s.optional(s.string()),
  itemQuantity: s.optional(s.string()),
  itemUnitPrice: s.optional(s.lazy(() => moneySchema)),
  itemAmount: s.optional(s.lazy(() => moneySchema)),
  discountAmount: s.optional(s.lazy(() => moneySchema)),
  adjustmentAmount: s.optional(s.lazy(() => moneySchema)),
  giftWrapAmount: s.optional(s.lazy(() => moneySchema)),
  taxPercentage: s.optional(s.string()),
  taxAmounts: s.optional(s.array(s.lazy(() => taxAmountSchema))),
  basicShippingAmount: s.optional(s.lazy(() => moneySchema)),
  extraShippingAmount: s.optional(s.lazy(() => moneySchema)),
  handlingAmount: s.optional(s.lazy(() => moneySchema)),
  insuranceAmount: s.optional(s.lazy(() => moneySchema)),
  totalItemAmount: s.optional(s.lazy(() => moneySchema)),
  invoiceNumber: s.optional(s.string()),
  checkoutOptions: s.optional(s.array(s.lazy(() => checkoutOptionSchema))),
  _keysMap: {
    itemCode: "item_code",
    itemName: "item_name",
    itemDescription: "item_description",
    itemOptions: "item_options",
    itemQuantity: "item_quantity",
    itemUnitPrice: "item_unit_price",
    itemAmount: "item_amount",
    discountAmount: "discount_amount",
    adjustmentAmount: "adjustment_amount",
    giftWrapAmount: "gift_wrap_amount",
    taxPercentage: "tax_percentage",
    taxAmounts: "tax_amounts",
    basicShippingAmount: "basic_shipping_amount",
    extraShippingAmount: "extra_shipping_amount",
    handlingAmount: "handling_amount",
    insuranceAmount: "insurance_amount",
    totalItemAmount: "total_item_amount",
    invoiceNumber: "invoice_number",
    checkoutOptions: "checkout_options",
  },
});
