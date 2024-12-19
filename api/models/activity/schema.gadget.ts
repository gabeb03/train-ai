import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "activity" model, go to https://ai-trainer.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "XjiGAjJKCbUp",
  fields: {
    activityName: { type: "string", storageKey: "XMaFGt5F93qo" },
    day: {
      type: "enum",
      default: [],
      acceptMultipleSelections: true,
      acceptUnlistedOptions: false,
      options: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      storageKey: "MGeBOqBe1cE6",
    },
    percentComplete: {
      type: "number",
      decimals: 2,
      storageKey: "bIp04b9c53Ar",
    },
    reps: { type: "number", decimals: 0, storageKey: "AvFDhI-u2d3J" },
    sets: { type: "number", decimals: 0, storageKey: "os-kBfhg4Q9N" },
  },
};
