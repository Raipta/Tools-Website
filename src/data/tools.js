import {
  FileStack, Scissors, FileArchive, FileImage, Stamp,
  ImageDown, Crop, RefreshCcw, Eraser,
  Type, CaseSensitive, GitCompareArrows, Wand2,
  QrCode, UserRound, Receipt, KeyRound,
} from 'lucide-react'

export const categories = [
  {
    id: 'pdf',
    name: 'PDF Tools',
    description: 'Merge, split, compress and convert PDFs in your browser.',
    color: 'from-rose-500 to-orange-400',
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Compress, resize and convert images without uploading them.',
    color: 'from-sky-500 to-cyan-400',
  },
  {
    id: 'text',
    name: 'Text Tools',
    description: 'Count, transform and compare text instantly.',
    color: 'from-emerald-500 to-lime-400',
  },
  {
    id: 'generator',
    name: 'Generators',
    description: 'Create QR codes, resumes, invoices and secure passwords.',
    color: 'from-violet-500 to-fuchsia-500',
  },
]

export const tools = [
  // PDF
  { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDFs into one document.', category: 'pdf', icon: FileStack, path: '/tools/merge-pdf', status: 'ready' },
  { id: 'split-pdf', name: 'Split PDF', description: 'Separate pages into individual PDF files.', category: 'pdf', icon: Scissors, path: '/tools/split-pdf', status: 'soon' },
  { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size while keeping quality.', category: 'pdf', icon: FileArchive, path: '/tools/compress-pdf', status: 'soon' },
  { id: 'pdf-to-image', name: 'PDF to Image', description: 'Convert PDF pages into PNG or JPG images.', category: 'pdf', icon: FileImage, path: '/tools/pdf-to-image', status: 'soon' },
  { id: 'pdf-watermark', name: 'Add Watermark', description: 'Stamp text watermarks onto your PDF pages.', category: 'pdf', icon: Stamp, path: '/tools/pdf-watermark', status: 'soon' },

  // Image
  { id: 'image-compressor', name: 'Image Compressor', description: 'Shrink image file size with before/after comparison.', category: 'image', icon: ImageDown, path: '/tools/image-compressor', status: 'soon' },
  { id: 'image-resizer', name: 'Image Resizer', description: 'Resize images to custom dimensions.', category: 'image', icon: Crop, path: '/tools/image-resizer', status: 'soon' },
  { id: 'format-converter', name: 'Format Converter', description: 'Convert between PNG, JPG and WebP.', category: 'image', icon: RefreshCcw, path: '/tools/format-converter', status: 'soon' },
  { id: 'bg-remover', name: 'Background Remover', description: 'Remove image backgrounds automatically.', category: 'image', icon: Eraser, path: '/tools/bg-remover', status: 'soon' },

  // Text
  { id: 'word-counter', name: 'Word & Character Counter', description: 'Real-time word, character and sentence counts.', category: 'text', icon: Type, path: '/tools/word-counter', status: 'soon' },
  { id: 'case-converter', name: 'Case Converter', description: 'Switch between upper, lower and title case.', category: 'text', icon: CaseSensitive, path: '/tools/case-converter', status: 'soon' },
  { id: 'text-compare', name: 'Text Comparison', description: 'Compare two texts and highlight differences.', category: 'text', icon: GitCompareArrows, path: '/tools/text-compare', status: 'soon' },
  { id: 'paraphraser', name: 'Text Paraphraser', description: 'Rewrite text with synonym-based paraphrasing.', category: 'text', icon: Wand2, path: '/tools/paraphraser', status: 'soon' },

  // Generators
  { id: 'qr-generator', name: 'QR Code Generator', description: 'Turn text or URLs into a downloadable QR code.', category: 'generator', icon: QrCode, path: '/tools/qr-generator', status: 'soon' },
  { id: 'resume-builder', name: 'Resume Builder', description: 'Build a resume with live preview, export as PDF.', category: 'generator', icon: UserRound, path: '/tools/resume-builder', status: 'soon' },
  { id: 'invoice-generator', name: 'Invoice Generator', description: 'Create invoices with auto-calculated totals.', category: 'generator', icon: Receipt, path: '/tools/invoice-generator', status: 'soon' },
  { id: 'password-generator', name: 'Password Generator', description: 'Generate strong, customizable passwords.', category: 'generator', icon: KeyRound, path: '/tools/password-generator', status: 'soon' },
]
