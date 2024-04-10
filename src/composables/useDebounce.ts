export function useDebounce() {
  let timeout: ReturnType<typeof setTimeout>;

  return function (fnc: () => void, delayMs: number) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fnc();
    }, delayMs || 500);
  };
}
