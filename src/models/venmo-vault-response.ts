import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { customerInformationSchema, type CustomerInformation } from "./customer-information.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import {
  venmoVaultResponseStatusSchema,
  type VenmoVaultResponseStatus,
} from "./venmo-vault-response-status.js";

/** The details about a saved venmo payment source. */
export type VenmoVaultResponse = {
  /** The PayPal-generated ID for the saved payment source. */
  id?: string;
  /**
   * The vault status.
   *
   * @deprecated
   */
  status?: VenmoVaultResponseStatus;
  /** An array of request-related HATEOAS links. */
  links?: LinkDescription[];
  /**
   * This object represents a merchant’s customer, allowing them to store contact details, and track
   * all payments associated with the same customer.
   */
  customer?: CustomerInformation;
};

export const venmoVaultResponseSchema: Schema<VenmoVaultResponse> = s.object<VenmoVaultResponse>({
  id: s.optional(s.string()),
  status: s.optional(s.lazy(() => venmoVaultResponseStatusSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  customer: s.optional(s.lazy(() => customerInformationSchema)),
});
