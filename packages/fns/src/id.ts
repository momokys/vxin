export const uuid = (() => {
  let id = 0
  return () => id++
})()

export const uniqueId = (prefix: string) => {
  return prefix + '-' + uuid()
}
