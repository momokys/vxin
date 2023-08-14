export function findNode(instance: any) {
  let node = instance?.vnode?.el || (instance && (instance?.$el || instance))
  while (node && !node.tagName) {
    node = node.nextSibling
  }
  return node as HTMLElement
}
