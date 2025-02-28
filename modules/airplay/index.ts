// Reexport the native module. On web, it will be resolved to AirplayModule.web.ts
// and on native platforms to AirplayModule.ts
export { default } from './src/AirplayModule';
export { default as AirplayView } from './src/AirplayView';
export * from  './src/Airplay.types';
