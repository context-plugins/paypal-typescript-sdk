import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { addressSchema, type Address } from "./address.js";
import { nameSchema, type Name } from "./name.js";
import { phoneNumberSchema, type PhoneNumber } from "./phone-number.js";
import { returnFlowSchema, type ReturnFlow } from "./return-flow.js";
import {
  venmoWalletAttributesResponseSchema,
  type VenmoWalletAttributesResponse,
} from "./venmo-wallet-attributes-response.js";

export type VenmoWalletResponse = {
  emailAddress?: string;
  accountId?: string;
  userName?: string;
  name?: Name;
  phoneNumber?: PhoneNumber;
  address?: Address;
  returnFlow?: ReturnFlow;
  attributes?: VenmoWalletAttributesResponse;
};

export const venmoWalletResponseSchema: Schema<VenmoWalletResponse> = s.object<VenmoWalletResponse>({
  emailAddress: s.optional(s.string()),
  accountId: s.optional(s.string()),
  userName: s.optional(s.string()),
  name: s.optional(s.lazy(() => nameSchema)),
  phoneNumber: s.optional(s.lazy(() => phoneNumberSchema)),
  address: s.optional(s.lazy(() => addressSchema)),
  returnFlow: s.optional(s.lazy(() => returnFlowSchema)),
  attributes: s.optional(s.lazy(() => venmoWalletAttributesResponseSchema)),
  _keysMap: {
    emailAddress: "email_address",
    accountId: "account_id",
    userName: "user_name",
    phoneNumber: "phone_number",
    returnFlow: "return_flow",
  },
});
