/** Download de arquivos no browser (demo / exportações). */

function escapeCsvCell(value: string) {
  const v = value.replace(/"/g, '""')
  if (/[;\n\r"]/.test(v)) return `"${v}"`
  return v
}

export function downloadTextFile(content: string, filename: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function downloadCsv(
  filename: string,
  columns: { key: string; header: string }[],
  rows: Record<string, string | number | boolean | undefined>[],
) {
  const sep = ';'
  const header = columns.map((c) => escapeCsvCell(c.header)).join(sep)
  const lines = rows.map((row) =>
    columns.map((c) => escapeCsvCell(String(row[c.key] ?? ''))).join(sep),
  )
  const content = [header, ...lines].join('\r\n')
  downloadTextFile(content, filename.endsWith('.csv') ? filename : `${filename}.csv`, 'text/csv;charset=utf-8')
}
