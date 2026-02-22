import { describe, it, expect } from 'vitest'
import { codeToHtml } from 'shiki'
import { transformerFilename } from '../src/index'

describe('transformerFilename', () => {
  it('outputs figcaption when title meta is present', async () => {
    const html = await codeToHtml("console.log('hi')", {
      lang: 'ts',
      theme: 'github-dark',
      meta: { __raw: 'title="sample.ts"' },
      transformers: [transformerFilename()],
    })
    expect(html).toContain('<figure class="shiki-filename">')
    expect(html).toContain('<figcaption class="shiki-filename-title">sample.ts</figcaption>')
  })

  it('does not output figure when title meta is absent', async () => {
    const html = await codeToHtml("console.log('hi')", {
      lang: 'ts',
      theme: 'github-dark',
      transformers: [transformerFilename()],
    })
    expect(html).not.toContain('<figure')
    expect(html).not.toContain('<figcaption')
  })

  it('accepts custom class names', async () => {
    const html = await codeToHtml('const x = 1', {
      lang: 'ts',
      theme: 'github-dark',
      meta: { __raw: 'title="app.ts"' },
      transformers: [
        transformerFilename({ filenameClass: 'my-caption', blockClass: 'my-block' }),
      ],
    })
    expect(html).toContain('class="my-block"')
    expect(html).toContain('class="my-caption"')
  })
})
