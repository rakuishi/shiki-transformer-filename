# shiki-transformer-filename

A [Shiki](https://shiki.style) transformer that displays a filename above code blocks using the `title` meta attribute.

## Installation

```bash
npm install github:rakuishi/shiki-transformer-filename
```

## Usage

### Astro

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import { transformerFilename } from 'shiki-transformer-filename'

export default defineConfig({
  markdown: {
    shikiConfig: {
      transformers: [
        transformerFilename(),
      ],
    },
  },
})
```

### Markdown

~~~md
```ts title="hello.ts"
const msg = 'Hello World'
console.log(msg)
```
~~~

### Output

```html
<figure class="shiki-filename">
  <figcaption class="shiki-filename-title">hello.ts</figcaption>
  <pre class="shiki">
    <code>...</code>
  </pre>
</figure>
```

### CSS Example

```css
.shiki-filename {
  margin: 24px 0;
}

.shiki-filename .shiki-filename-title {
  display: inline-block;
  padding: 4px 12px;
  font-family: monospace;
  font-size: 80%;
  border-radius: 8px 8px 0 0;
}

.shiki-filename pre {
  margin: 0;
  border-top-left-radius: 0;
}
```

## Options

```ts
transformerFilename({
  // Class name for the figcaption element (default: 'shiki-filename-title')
  filenameClass: 'shiki-filename-title',

  // Class name for the figure wrapper element (default: 'shiki-filename')
  blockClass: 'shiki-filename',
})
```

## License

MIT
