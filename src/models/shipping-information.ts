import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  simplePostalAddressCoarseGrainedSchema,
  type SimplePostalAddressCoarseGrained,
} from "./simple-postal-address-coarse-grained.js";

export type ShippingInformation = {
  name?: string;
  method?: string;
  address?: SimplePostalAddressCoarseGrained;
  secondaryShippingAddress?: SimplePostalAddressCoarseGrained;
};

export const shippingInformationSchema: Schema<ShippingInformation> = s.object<ShippingInformation>({
  name: s.optional(s.string()),
  method: s.optional(s.string()),
  address: s.optional(s.lazy(() => simplePostalAddressCoarseGrainedSchema)),
  secondaryShippingAddress: s.optional(s.lazy(() => simplePostalAddressCoarseGrainedSchema)),
  _keysMap: {
    secondaryShippingAddress: "secondary_shipping_address",
  },
});
