import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { lineItemSchema, type LineItem } from "./line-item.js";
import { moneySchema, type Money } from "./money.js";

export type Level3CardProcessingData = {
  shippingAmount?: Money;
  dutyAmount?: Money;
  discountAmount?: Money;
  shippingAddress?: Address;
  shipsFromPostalCode?: string;
  lineItems?: LineItem[];
};

export const level3CardProcessingDataSchema: Schema<Level3CardProcessingData> =
  s.object<Level3CardProcessingData>({
    shippingAmount: s.optional(s.lazy(() => moneySchema)),
    dutyAmount: s.optional(s.lazy(() => moneySchema)),
    discountAmount: s.optional(s.lazy(() => moneySchema)),
    shippingAddress: s.optional(s.lazy(() => addressSchema)),
    shipsFromPostalCode: s.optional(s.string()),
    lineItems: s.optional(s.array(s.lazy(() => lineItemSchema))),
    _keysMap: {
      shippingAmount: "shipping_amount",
      dutyAmount: "duty_amount",
      discountAmount: "discount_amount",
      shippingAddress: "shipping_address",
      shipsFromPostalCode: "ships_from_postal_code",
      lineItems: "line_items",
    },
  });
