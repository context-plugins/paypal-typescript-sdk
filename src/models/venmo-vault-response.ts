import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { customerInformationSchema, type CustomerInformation } from "./customer-information.js";
import { linkDescriptionSchema, type LinkDescription } from "./link-description.js";
import {
  venmoVaultResponseStatusSchema,
  type VenmoVaultResponseStatus,
} from "./venmo-vault-response-status.js";

export type VenmoVaultResponse = {
  id?: string;
  status?: VenmoVaultResponseStatus;
  links?: LinkDescription[];
  customer?: CustomerInformation;
};

export const venmoVaultResponseSchema: Schema<VenmoVaultResponse> = s.object<VenmoVaultResponse>({
  id: s.optional(s.string()),
  status: s.optional(s.lazy(() => venmoVaultResponseStatusSchema)),
  links: s.optional(s.array(s.lazy(() => linkDescriptionSchema))),
  customer: s.optional(s.lazy(() => customerInformationSchema)),
});
