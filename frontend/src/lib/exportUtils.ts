// @ts-ignore
import html2pdf from 'html2pdf.js';

import { createRoot } from 'react-dom/client';
import React from 'react';
import { ExecutiveReportTemplate, type ReportDataPayload } from '../components/reporting/ExecutiveReportTemplate';

// We keep this for backward compatibility if any legacy elements still need it,
// but all executive reports should use generateExecutiveReportPDF directly.
export function exportToPDF(elementId: string, filename: string, landscape = false) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    return;
  }
  
  const opt = {
    margin:       [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
    filename:     filename,
    image:        { type: 'jpeg' as const, quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false },
    jsPDF:        { 
      unit: 'in', 
      format: 'letter', 
      orientation: landscape ? ('landscape' as const) : ('portrait' as const) 
    },
    pagebreak:    { mode: ['css', 'legacy'] }
  };
  
  html2pdf().set(opt).from(element).save();
}

/**
 * Generates the McKinsey-grade Executive Consulting Report
 */
export async function generateExecutiveReportPDF(filename: string, data: ReportDataPayload) {
  // Create a hidden container to render the React tree
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '8.5in'; // Lock to letter width
  
  document.body.appendChild(container);
  
  const root = createRoot(container);
  
  // Render the template
  root.render(React.createElement(ExecutiveReportTemplate, { data }));
  
  // Wait for React to mount and render the DOM
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const opt = {
    margin:       0, // Margins handled by components (12 padding)
    filename:     filename,
    image:        { type: 'jpeg' as const, quality: 1.0 },
    html2canvas:  { scale: 2, useCORS: true, logging: false, windowWidth: 816 }, // 8.5in * 96dpi = 816px
    jsPDF:        { 
      unit: 'in', 
      format: 'letter', 
      orientation: 'portrait' as const
    },
    pagebreak:    { mode: ['css'] }
  };
  
  try {
    await html2pdf().set(opt).from(container).save();
  } catch (err) {
    console.error('Failed to generate PDF:', err);
  } finally {
    // Cleanup
    setTimeout(() => {
      root.unmount();
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }, 1000);
  }
}

/**
 * Converts an array of objects to a CSV blob and downloads it.
 */
export function exportToCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) {
    console.warn("No data to export to CSV");
    return;
  }

  // Extract headers
  const headers = Object.keys(rows[0]);
  
  // Format CSV content
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      headers.map(header => {
        let cell = row[header] === null || row[header] === undefined ? '' : row[header].toString();
        // Escape quotes and wrap in quotes if there's a comma
        if (cell.includes(',') || cell.includes('"')) {
          cell = `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',')
    )
  ].join('\n');

  // Create Blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
