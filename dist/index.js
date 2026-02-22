// src/index.ts
function transformerFilename(options = {}) {
  const {
    filenameClass = "shiki-filename-title",
    blockClass = "shiki-filename"
  } = options;
  return {
    name: "shiki-transformer-filename",
    root(hast) {
      const raw = this.options.meta?.__raw ?? "";
      const match = raw.match(/title="([^"]+)"/);
      if (!match) return;
      const filename = match[1];
      const pre = hast.children.find(
        (node) => node.type === "element" && node.tagName === "pre"
      );
      if (!pre) return;
      const figcaption = {
        type: "element",
        tagName: "figcaption",
        properties: { class: filenameClass },
        children: [{ type: "text", value: filename }]
      };
      const figure = {
        type: "element",
        tagName: "figure",
        properties: { class: blockClass },
        children: [figcaption, pre]
      };
      const idx = hast.children.indexOf(pre);
      hast.children.splice(idx, 1, figure);
    }
  };
}
export {
  transformerFilename
};
