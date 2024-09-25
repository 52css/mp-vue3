import { createApp } from "@52css/mp-vue3";
import { proxySetData, setReadyStart } from "./proxy.js";

proxySetData();

setReadyStart();

// app.ts
createApp({});
