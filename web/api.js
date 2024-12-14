import { Client } from "@gadget-client/gabes-chat-everywhere";

export const api = new Client({ environment: window.gadgetConfig.environment });
