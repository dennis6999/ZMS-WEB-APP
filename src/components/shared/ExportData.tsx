import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileText, Table, BarChart2 } from "lucide-react";
import { Card } from "@/components/ui/card";

type ExportFormat = 'csv' | 'json';
type ReportType = 'summary' | 'detailed';

interface ExportDataProps<T extends Record<string, unknown>> {
  title: string;
  data: T[];
  filename: string;
  availableFormats?: ExportFormat[];
  availableReports?: ReportType[];
}

export function ExportData<T extends Record<string, unknown>>({
  title,
  data,
  filename,
  availableFormats = ['csv', 'json'],
  availableReports = ['summary', 'detailed']
}: ExportDataProps<T>) {
  const [selectedFormat, setSelectedFormat] = React.useState<ExportFormat>(availableFormats[0] as ExportFormat);
  const [selectedReport, setSelectedReport] = React.useState<ReportType>(availableReports[0] as ReportType);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleExport = () => {
    console.log('Export started:', { selectedFormat, selectedReport, dataLength: data.length });
    
    if (!data || data.length === 0) {
      alert('No data available to export');
      return;
    }

    try {
      let content: string;
      let mimeType: string;
      let extension: string;

      // Filter data based on report type
      const filteredData = selectedReport === 'summary' 
        ? data.map(item => {
            const summary: Record<string, unknown> = {};
            // Include only key fields for summary
            Object.entries(item).forEach(([key, value]) => {
              if (['id', 'name', 'status', 'date'].includes(key)) {
                summary[key] = value;
              }
            });
            return summary;
          })
        : data;

      console.log('Filtered data:', filteredData);

      switch (selectedFormat) {
        case 'csv':
          content = convertToCSV(filteredData);
          mimeType = 'text/csv;charset=utf-8;';
          extension = 'csv';
          break;
        case 'json':
          content = JSON.stringify(filteredData, null, 2);
          mimeType = 'application/json';
          extension = 'json';
          break;
        default:
          throw new Error('Unsupported format');
      }

      console.log('Generated content:', { contentLength: content.length, mimeType, extension });

      // Create and trigger download
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${filename}_${selectedReport}.${extension}`);
      
      // Force the download to start
      document.body.appendChild(link);
      link.style.display = 'none';
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setIsOpen(false);
      }, 100);

      console.log('Download triggered');
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Failed to export data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const convertToCSV = (data: T[]): string => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    console.log('CSV Headers:', headers);
    
    const csvContent = [
      // Headers row
      headers.join(','),
      // Data rows
      ...data.map(row => 
        headers.map(header => {
          const value = row[header as keyof T];
          // Handle special characters and commas in values
          const stringValue = String(value ?? '');
          return stringValue.includes(',') 
            ? `"${stringValue.replace(/"/g, '""')}"` 
            : stringValue;
        }).join(',')
      )
    ].join('\n');

    // Add BOM for Excel to recognize UTF-8
    return '\ufeff' + csvContent;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Export Format</label>
                <Select
                  value={selectedFormat}
                  onValueChange={(value) => setSelectedFormat(value as ExportFormat)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableFormats.map((format) => (
                      <SelectItem key={format} value={format}>
                        {format.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select
                  value={selectedReport}
                  onValueChange={(value) => setSelectedReport(value as ReportType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableReports.map((report) => (
                      <SelectItem key={report} value={report}>
                        {report.charAt(0).toUpperCase() + report.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                {selectedFormat === 'csv' && <Table className="h-4 w-4" />}
                {selectedFormat === 'json' && <BarChart2 className="h-4 w-4" />}
                <span>
                  {selectedReport === 'summary' && 'Summary report with key metrics'}
                  {selectedReport === 'detailed' && 'Detailed report with all data'}
                </span>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 