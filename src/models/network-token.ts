import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { eciFlagSchema, type EciFlag } from "./eci-flag.js";

export type NetworkToken = {
  number: string;
  expiry: string;
  cryptogram?: string;
  eciFlag?: EciFlag;
  tokenRequestorId?: string;
};

export const networkTokenSchema: Schema<NetworkToken> = s.object<NetworkToken>({
  number: s.string(),
  expiry: s.string(),
  cryptogram: s.optional(s.string()),
  eciFlag: s.optional(s.lazy(() => eciFlagSchema)),
  tokenRequestorId: s.optional(s.string()),
  _keysMap: {
    eciFlag: "eci_flag",
    tokenRequestorId: "token_requestor_id",
  },
});
