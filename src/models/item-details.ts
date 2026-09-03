import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { checkoutOptionSchema, type CheckoutOption } from "./checkout-option.js";
import { moneySchema, type Money } from "./money.js";
import { taxAmountSchema, type TaxAmount } from "./tax-amount.js";

export type ItemDetails = {
  itemCode?: string;
  itemName?: string;
  itemDescription?: string;
  itemOptions?: string;
  itemQuantity?: string;
  itemUnitPrice?: Money;
  itemAmount?: Money;
  discountAmount?: Money;
  adjustmentAmount?: Money;
  giftWrapAmount?: Money;
  taxPercentage?: string;
  taxAmounts?: TaxAmount[];
  basicShippingAmount?: Money;
  extraShippingAmount?: Money;
  handlingAmount?: Money;
  insuranceAmount?: Money;
  totalItemAmount?: Money;
  invoiceNumber?: string;
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
