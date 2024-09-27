"use strict";

var PromisePolyfill = require("promise-polyfill");
Promise = PromisePolyfill.default;

var _mpVue = require("@52css/mp-vue3");
var _proxy = require("./proxy");
(0, _proxy.proxySetData)();
(0, _proxy.setReadyStart)();
(0, _mpVue.createApp)({});