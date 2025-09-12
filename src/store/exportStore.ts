// exportStore.ts
let exportHandler: (() => void) | null = null;

export function setExportHandler(fn: () => void) {
  exportHandler = fn;
}

export function getExportHandler() {
  return exportHandler;
}
