import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "score" model, go to https://ai-trainer.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "toz3D4SjDK40",
  fields: {
    day: {
      type: "dateTime",
      includeTime: false,
      storageKey: "RfrT370aIS1h",
    },
    score: {
      type: "number",
      decimals: 0,
      validations: { numberRange: { min: 0, max: 100 } },
      storageKey: "rUqhLyBRJ3d7",
    },
  },
};
