export const uuid = (() => {
  let id = 0
  return () => id++
})()
