/**
 * set localStorage
 */
export const setLocalStorage = (key: string, value: any) => {
  if (!key) return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * get localStorage
 */
export const getLocalStorage = (key: string) => {
  if (!key) return
  const result = window.localStorage.getItem?.(key)
  if (!result) return {}
  return JSON.parse(result)
}

/**
 * remove localStorage
 */
export const removeLocalStorage = (key: string) => {
  if (!key) return
  window.localStorage.removeItem(key)
}
