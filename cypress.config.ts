import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    specPattern: './packages/ui/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
