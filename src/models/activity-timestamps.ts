import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type ActivityTimestamps = {
  createTime?: string;
  updateTime?: string;
};

export const activityTimestampsSchema: Schema<ActivityTimestamps> = s.object<ActivityTimestamps>({
  createTime: s.optional(s.string()),
  updateTime: s.optional(s.string()),
  _keysMap: {
    createTime: "create_time",
    updateTime: "update_time",
  },
});
