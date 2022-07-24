#Lift

##Create Svelte project
`npm create vite@latest my-app -- --template svelte`

##Install Tailwind

Install packages
`npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`

Create config files
`npx tailwindcss init -p`

Tailwind.config.js
```
export default {
  plugins: [],
    theme: {
    extend: {},
  },
  content: ["./index.html",'./src/**/*.{svelte,js}'],
  variants: {
    extend: {},
  }
}
```

postcss.config.js
```
import tailwind from 'tailwindcss'
import tailwindConfig from './tailwind.config.cjs'
import autoprefixer from 'autoprefixer'

export default {
  plugins:[tailwind(tailwindConfig),autoprefixer]
}
```

vite.config.js
```
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcss from './postcss.config.cjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css:{
    postcss
  }
})
```

Create `Tailwind.svelte` file in `src` directory:
```
<style global>
@tailwind utilities;
@tailwind components;
@tailwind base;
</style>
```