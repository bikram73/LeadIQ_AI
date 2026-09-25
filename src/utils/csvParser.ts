/**
 * RFC 4180 Compliant CSV Parser & Serializer with CSV Injection Defense
 */

export interface ParsedCsvResult {
  headers: string[];
  rows: Record<string, string>[];
  rawRows: string[][];
  errors: string[];
}

/**
 * Parses raw CSV text according to RFC 4180 specification:
 * - Handles fields enclosed in double quotes containing commas, newlines, and escaped quotes ("")
 * - Handles both CRLF (\r\n) and LF (\n)
 * - Safely skips empty or whitespace-only lines
 */
export function parseRfc4180Csv(csvText: string): ParsedCsvResult {
  const result: ParsedCsvResult = {
    headers: [],
    rows: [],
    rawRows: [],
    errors: [],
  };

  if (!csvText || !csvText.trim()) {
    result.errors.push('CSV content is empty.');
    return result;
  }

  const lines: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;
  let i = 0;
  const len = csvText.length;

  while (i < len) {
    const char = csvText[i];
    const nextChar = i + 1 < len ? csvText[i + 1] : '';

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote: "" -> "
          currentField += '"';
          i += 2;
          continue;
        } else {
          // Closing quote
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        currentField += char;
        i++;
        continue;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
        i++;
        continue;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
        i++;
        continue;
      } else if (char === '\r') {
        if (nextChar === '\n') {
          i++; // Skip \r in \r\n
        }
        currentRow.push(currentField.trim());
        currentField = '';
        if (currentRow.some((f) => f.length > 0)) {
          lines.push(currentRow);
        }
        currentRow = [];
        i++;
        continue;
      } else if (char === '\n') {
        currentRow.push(currentField.trim());
        currentField = '';
        if (currentRow.some((f) => f.length > 0)) {
          lines.push(currentRow);
        }
        currentRow = [];
        i++;
        continue;
      } else {
        currentField += char;
        i++;
        continue;
      }
    }
  }

  // Push last field & row if remaining
  if (currentField.length > 0 || inQuotes) {
    currentRow.push(currentField.trim());
  }
  if (currentRow.length > 0 && currentRow.some((f) => f.length > 0)) {
    lines.push(currentRow);
  }

  if (lines.length === 0) {
    result.errors.push('No valid rows found.');
    return result;
  }

  // Header row
  const rawHeaders = lines[0];
  result.headers = rawHeaders.map((h) => h.trim());
  result.rawRows = lines.slice(1);

  // Map into records
  for (let r = 0; r < result.rawRows.length; r++) {
    const rowValues = result.rawRows[r];
    const record: Record<string, string> = {};
    for (let h = 0; h < result.headers.length; h++) {
      const headerKey = result.headers[h];
      record[headerKey] = rowValues[h] !== undefined ? rowValues[h] : '';
    }
    result.rows.push(record);
  }

  return result;
}

/**
 * Sanitizes a CSV cell against Formula Injection (CWE-1236)
 * Prepends a single quote if the cell begins with dangerous characters (=, +, -, @, \t, \r)
 */
export function sanitizeCsvCellForExport(val: string | number | null | undefined): string {
  if (val === null || val === undefined) return '""';
  let str = String(val);

  // Check for formula injection triggers
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  // Escape internal double quotes by doubling them
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Formats a list of leads into an RFC-4180 safe CSV string with formula sanitization
 */
export function serializeLeadsToCsv(leads: Array<{
  rank?: number;
  fullName?: string;
  company?: string;
  jobTitle?: string;
  score?: number;
  tier?: string;
  fitScore?: string;
  intentScore?: string;
  budget?: string;
  requirements?: string;
  nextAction?: string;
  createdAt?: string;
}>): string {
  const headers = [
    'Rank',
    'Full Name',
    'Company',
    'Role / Title',
    'Score',
    'Tier',
    'Fit Score',
    'Intent',
    'Budget',
    'Requirement',
    'Recommended Action',
    'Qualified Date',
  ];

  const headerLine = headers.map((h) => sanitizeCsvCellForExport(h)).join(',');
  const rowLines = leads.map((lead) => {
    return [
      sanitizeCsvCellForExport(lead.rank ?? ''),
      sanitizeCsvCellForExport(lead.fullName ?? ''),
      sanitizeCsvCellForExport(lead.company ?? ''),
      sanitizeCsvCellForExport(lead.jobTitle ?? ''),
      sanitizeCsvCellForExport(lead.score ?? 0),
      sanitizeCsvCellForExport(lead.tier ?? ''),
      sanitizeCsvCellForExport(lead.fitScore ?? ''),
      sanitizeCsvCellForExport(lead.intentScore ?? ''),
      sanitizeCsvCellForExport(lead.budget ?? 'Not provided'),
      sanitizeCsvCellForExport(lead.requirements ?? ''),
      sanitizeCsvCellForExport(lead.nextAction ?? ''),
      sanitizeCsvCellForExport(lead.createdAt ?? new Date().toISOString().split('T')[0]),
    ].join(',');
  });

  return [headerLine, ...rowLines].join('\n');
}
