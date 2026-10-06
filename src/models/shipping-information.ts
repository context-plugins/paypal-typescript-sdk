import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import {
  simplePostalAddressCoarseGrainedSchema,
  type SimplePostalAddressCoarseGrained,
} from "./simple-postal-address-coarse-grained.js";

/** The shipping information. */
export type ShippingInformation = {
  /** The recipient's name. */
  name?: string;
  /** The shipping method that is associated with this order. */
  method?: string;
  /**
   * A simple postal address with coarse-grained fields. Do not use for an international address.
   * Use for backward compatibility only. Does not contain phone.
   */
  address?: SimplePostalAddressCoarseGrained;
  /**
   * A simple postal address with coarse-grained fields. Do not use for an international address.
   * Use for backward compatibility only. Does not contain phone.
   */
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
