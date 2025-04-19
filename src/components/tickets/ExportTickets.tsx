import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Download, FileText, Table, FileSpreadsheet } from 'lucide-react';

interface ExportTicketsProps {
  tickets: any[];
  onClose?: () => void;
}

type ExportFormat = 'csv' | 'json' | 'excel';

export function ExportTickets({ tickets, onClose }: ExportTicketsProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('csv');

  const handleExport = () => {
    try {
      let content: string;
      let filename: string;
      let mimeType: string;

      switch (selectedFormat) {
        case 'csv':
          content = convertToCSV(tickets);
          filename = `tickets_export_${new Date().toISOString().split('T')[0]}.csv`;
          mimeType = 'text/csv';
          break;
        case 'json':
          content = JSON.stringify(tickets, null, 2);
          filename = `tickets_export_${new Date().toISOString().split('T')[0]}.json`;
          mimeType = 'application/json';
          break;
        case 'excel':
          content = convertToExcel(tickets);
          filename = `tickets_export_${new Date().toISOString().split('T')[0]}.xlsx`;
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          break;
        default:
          throw new Error('Unsupported format');
      }

      // Create blob and download
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Tickets exported as ${selectedFormat.toUpperCase()}`,
      });
      onClose?.();
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting the tickets",
        variant: "destructive",
      });
    }
  };

  const convertToCSV = (data: any[]): string => {
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ];
    return csvRows.join('\n');
  };

  const convertToExcel = (data: any[]): string => {
    // This is a simplified version. In a real application, you would use a library like xlsx
    // For now, we'll just return a CSV format that Excel can open
    return convertToCSV(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Tickets</CardTitle>
        <CardDescription>
          Choose a format to export your tickets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <Select value={selectedFormat} onValueChange={(value: ExportFormat) => setSelectedFormat(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>CSV</span>
                  </div>
                </SelectItem>
                <SelectItem value="json">
                  <div className="flex items-center gap-2">
                    <Table className="h-4 w-4" />
                    <span>JSON</span>
                  </div>
                </SelectItem>
                <SelectItem value="excel">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Excel</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleExport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </CardFooter>
    </Card>
  );
} 