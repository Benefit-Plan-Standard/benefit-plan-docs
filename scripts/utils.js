const fs = require('fs');
const path = require('path');

/**
 * Parses a CSV string into an array of objects or arrays.
 * Handles quoted fields containing commas or newlines.
 * @param {string} csvText - The raw CSV string.
 * @returns {Array<Array<string>>} - 2D array of strings.
 */
function parseCSV(csvText) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++;
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      // End of field
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      // End of row
      if (char === '\r' && nextChar === '\n') i++; // Handle CRLF
      currentRow.push(currentField.trim());
      rows.push(currentRow);
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // Push last field/row if exists
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    rows.push(currentRow);
  }

  return rows;
}

/**
 * Converts a 2D array of strings into an HTML table.
 * @param {Array<Array<string>>} data - The 2D array from parseCSV.
 * @returns {string} - The HTML table string.
 */
function generateHTMLTable(data) {
  if (!data || data.length === 0) return '';

  const header = data[0];
  const rows = data.slice(1);

  let html = '<table>\n';
  
  // Header
  html += '  <thead>\n    <tr>\n';
  header.forEach(h => {
    html += `      <th>${escapeHTML(h)}</th>\n`;
  });
  html += '    </tr>\n  </thead>\n';

  // Body
  html += '  <tbody>\n';
  rows.forEach(row => {
    // Skip empty rows
    if (row.length === 1 && row[0] === '') return;
    
    html += '    <tr>\n';
    row.forEach((cell, index) => {
        // Handle case where row might be shorter than header
        const cellContent = cell !== undefined ? cell : '';
        html += `      <td>${escapeHTML(cellContent)}</td>\n`;
    });
    html += '    </tr>\n';
  });
  html += '  </tbody>\n';
  html += '</table>';

  return html;
}

/**
 * Escapes HTML special characters.
 * @param {string} str 
 * @returns {string}
 */
function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Replaces content in a file between two markers.
 * @param {string} filePath - Path to the file.
 * @param {string} startMarker - The start marker.
 * @param {string} endMarker - The end marker.
 * @param {string} newContent - The content to insert.
 */
function replaceInFile(filePath, startMarker, endMarker, newContent) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Markers not found in ${filePath}`);
  }

  const before = content.substring(0, startIndex + startMarker.length);
  const after = content.substring(endIndex);
  
  const updatedContent = before + '\n' + newContent + '\n' + after;
  fs.writeFileSync(fullPath, updatedContent, 'utf8');
}

module.exports = {
  parseCSV,
  generateHTMLTable,
  replaceInFile
};
