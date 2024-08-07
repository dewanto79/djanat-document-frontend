/**
 * Helper for localstorage
 * -
 * Since set up and get value from it needs some extra action
 * This mixins might come in handy
 */
const localStorageMixins = {
  get: (key: any) =>
    typeof window !== "undefined" ? window?.localStorage?.getItem(key) : null,
  remove: (key: any) =>
    typeof window !== "undefined"
      ? window?.localStorage?.removeItem(key)
      : null,
  set: (key: any, value: any) =>
    typeof window !== "undefined"
      ? window?.localStorage?.setItem(key, JSON.stringify(value))
      : null,
};

export { localStorageMixins };
