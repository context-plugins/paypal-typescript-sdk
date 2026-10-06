import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { itemDetailsSchema, type ItemDetails } from "./item-details.js";

/** The cart information. */
export type CartInformation = {
  /** An array of item details. */
  itemDetails?: ItemDetails[];
  /**
   * Indicates whether the item amount or the shipping amount already includes tax.
   *
   * @default false
   */
  taxInclusive?: boolean;
  /** The ID of the invoice. Appears for only PayPal-generated invoices. */
  paypalInvoiceId?: string;
};

export const cartInformationSchema: Schema<CartInformation> = s.object<CartInformation>({
  itemDetails: s.optional(s.array(s.lazy(() => itemDetailsSchema))),
  taxInclusive: s.defaulted(s.boolean(), false),
  paypalInvoiceId: s.optional(s.string()),
  _keysMap: {
    itemDetails: "item_details",
    taxInclusive: "tax_inclusive",
    paypalInvoiceId: "paypal_invoice_id",
  },
});
