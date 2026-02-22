import { ShikiTransformer } from 'shiki';

interface TransformerFilenameOptions {
    /** Class name for the figcaption element (default: 'shiki-filename-title') */
    filenameClass?: string;
    /** Class name for the figure wrapper element (default: 'shiki-filename') */
    blockClass?: string;
}
declare function transformerFilename(options?: TransformerFilenameOptions): ShikiTransformer;

export { type TransformerFilenameOptions, transformerFilename };
