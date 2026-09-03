import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { nameSchema, type Name } from "./name.js";

export type VaultCustomer = {
  id?: string;
  name?: Name;
};

export const vaultCustomerSchema: Schema<VaultCustomer> = s.object<VaultCustomer>({
  id: s.optional(s.string()),
  name: s.optional(s.lazy(() => nameSchema)),
});
