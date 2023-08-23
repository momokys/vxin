import { h } from 'vue'

export const ColorBlock = (color: string, index: number) => (
  <div style={{ backgroundColor: `var(v-color-${color}-${index})` }} />
)
