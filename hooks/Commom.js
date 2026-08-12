export const getStorageData = (type) => {
  if (typeof window === 'undefined') return undefined;

  try {
    return localStorage.getItem(type) || undefined;
  } catch (error) {
    return undefined;
  }
};