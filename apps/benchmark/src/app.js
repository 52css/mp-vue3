import { createApp } from '@52css/mp-vue3';
import { proxySetData, setReadyStart } from './proxy';

proxySetData();

setReadyStart();

createApp({});
