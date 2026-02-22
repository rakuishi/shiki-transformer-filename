import type { ShikiTransformer } from 'shiki'
import type { Element, Root } from 'hast'

export interface TransformerFilenameOptions {
  /** Class name for the figcaption element (default: 'shiki-filename-title') */
  filenameClass?: string
  /** Class name for the figure wrapper element (default: 'shiki-filename') */
  blockClass?: string
}

export function transformerFilename(
  options: TransformerFilenameOptions = {},
): ShikiTransformer {
  const {
    filenameClass = 'shiki-filename-title',
    blockClass = 'shiki-filename',
  } = options

  return {
    name: 'shiki-transformer-filename',
    root(hast: Root) {
      const raw = (this.options.meta as { __raw?: string })?.__raw ?? ''
      const match = raw.match(/title="([^"]+)"/)
      if (!match) return

      const filename = match[1]

      const pre = hast.children.find(
        (node): node is Element =>
          node.type === 'element' && (node as Element).tagName === 'pre',
      )
      if (!pre) return

      const figcaption: Element = {
        type: 'element',
        tagName: 'figcaption',
        properties: { class: filenameClass },
        children: [{ type: 'text', value: filename }],
      }

      const figure: Element = {
        type: 'element',
        tagName: 'figure',
        properties: { class: blockClass },
        children: [figcaption, pre],
      }

      const idx = hast.children.indexOf(pre)
      hast.children.splice(idx, 1, figure)
    },
  }
}
