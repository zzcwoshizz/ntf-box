/**
 * 对象转为URL search
 * @param obj 对象
 */
export const serialize = (obj: Record<string, any>) => {
  if (!obj) {
    return ''
  }

  const keyArr: string[] = []

  Object.keys(obj).map((key) => {
    if (obj[key] !== undefined) {
      keyArr.push(key)
    }
  })

  keyArr.sort((l, r) => (l > r ? 1 : -1))
  return keyArr.map((key) => key + '=' + obj[key]).join('&')
}

export const shortenAddress = (address?: string) => {
  if (!address) return ''
  if (address.length < 10) return address
  return address.slice(0, 6) + '...' + address.slice(-4)
}
