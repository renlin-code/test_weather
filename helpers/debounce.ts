const debounceTimeout: Ref<NodeJS.Timeout | null> = ref(null);

export const debounce = (callback: () => void, debounceTime?: number) => {
  if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
  debounceTimeout.value = setTimeout(() => {
    callback();
  }, debounceTime ?? 500);
};
