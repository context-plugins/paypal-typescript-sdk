import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { itemDetailsSchema, type ItemDetails } from "./item-details.js";

export type CartInformation = {
  itemDetails?: ItemDetails[];
  taxInclusive?: boolean;
  paypalInvoiceId?: string;
};

export const cartInformationSchema: Schema<CartInformation> = s.object<CartInformation>({
  itemDetails: s.optional(s.array(s.lazy(() => itemDetailsSchema))),
  taxInclusive: s.optional(s.boolean()),
  paypalInvoiceId: s.optional(s.string()),
  _keysMap: {
    itemDetails: "item_details",
    taxInclusive: "tax_inclusive",
    paypalInvoiceId: "paypal_invoice_id",
  },
});
