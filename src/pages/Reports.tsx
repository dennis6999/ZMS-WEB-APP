import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { 
  LineChart, Search, Filter, Download, Calendar, AreaChart, BarChart, PieChart, 
  RefreshCw, FilePlus, FileText, ArrowDownUp, Printer, ChevronDown, List, 
  BarChart2, Layers, User, Plus, X, Check, Clock, Settings, Share2, Trash2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

// Define report template interface
interface ReportTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  fields: string[];
  isDefault: boolean;
}

// Define report interface
interface Report {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  author: string;
  views: number;
  downloads: number;
  status: string;
  content?: string;
  metrics?: Record<string, number>;
  charts?: string[];
}

const Reports = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [reportTypeFilter, setReportTypeFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [showGenerateReportDialog, setShowGenerateReportDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showReportPreviewDialog, setShowReportPreviewDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    type: 'health',
    date: new Date().toISOString().split('T')[0],
    author: 'Current User',
    status: 'draft',
    includeCharts: true,
    includeMetrics: true,
    scheduleReport: false,
    scheduleFrequency: 'once',
    scheduleDate: new Date().toISOString().split('T')[0]
  });
  
  // Sample report templates
  const reportTemplates: ReportTemplate[] = [
    {
      id: 'template-1',
      name: 'Animal Health Report',
      type: 'health',
      description: 'Comprehensive report on animal health metrics and veterinary care',
      fields: ['Animal ID', 'Species', 'Health Status', 'Treatment History', 'Veterinarian Notes'],
      isDefault: true
    },
    {
      id: 'template-2',
      name: 'Visitor Analytics',
      type: 'visitors',
      description: 'Analysis of visitor demographics, preferences, and feedback',
      fields: ['Visitor Count', 'Demographics', 'Satisfaction Score', 'Popular Attractions', 'Revenue'],
      isDefault: true
    },
    {
      id: 'template-3',
      name: 'Conservation Status',
      type: 'conservation',
      description: 'Report on conservation efforts and environmental impact',
      fields: ['Species Count', 'Habitat Status', 'Conservation Projects', 'Environmental Impact', 'Future Plans'],
      isDefault: true
    },
    {
      id: 'template-4',
      name: 'Security Summary',
      type: 'security',
      description: 'Summary of security incidents and response actions',
      fields: ['Incident Type', 'Location', 'Severity', 'Response Time', 'Resolution', 'Preventive Measures'],
      isDefault: true
    },
    {
      id: 'template-5',
      name: 'Financial Overview',
      type: 'finance',
      description: 'Overview of financial performance and budget utilization',
      fields: ['Revenue', 'Expenses', 'Profit Margin', 'Budget Allocation', 'Financial Projections'],
      isDefault: true
    }
  ];
  
  // Sample reports data
  const reports: Report[] = [
    {
      id: 'RPT-2025-001',
      title: 'Monthly Health Report',
      description: 'Summary of animal health metrics for March 2025',
      type: 'health',
      date: '2025-04-01',
      author: 'Dr. Emily Carter',
      views: 125,
      downloads: 32,
      status: 'published'
    },
    {
      id: 'RPT-2025-002',
      title: 'Conservation Status Report',
      description: 'Detailed analysis of conservation efforts in Q1 2025',
      type: 'conservation',
      date: '2025-04-05',
      author: 'Dr. James Wilson',
      views: 98,
      downloads: 26,
      status: 'draft'
    },
    {
      id: 'RPT-2025-003',
      title: 'Visitor Analytics - March 2025',
      description: 'Report on visitor demographics and engagement for March',
      type: 'visitors',
      date: '2025-04-10',
      author: 'Sarah Johnson',
      views: 187,
      downloads: 54,
      status: 'published'
    },
    {
      id: 'RPT-2025-004',
      title: 'Wildlife Population Report',
      description: 'Analysis of wildlife population trends in Sector 7',
      type: 'wildlife',
      date: '2025-04-15',
      author: 'Ranger David Miller',
      views: 76,
      downloads: 19,
      status: 'published'
    },
    {
      id: 'RPT-2025-005',
      title: 'Security Incident Log - March 2025',
      description: 'Summary of security incidents and response actions',
      type: 'security',
      date: '2025-04-20',
      author: 'Officer Michael Brown',
      views: 63,
      downloads: 12,
      status: 'published'
    },
    {
      id: 'RPT-2025-006',
      title: 'Financial Performance - Q1 2025',
      description: 'Overview of financial performance and budget utilization',
      type: 'finance',
      date: '2025-04-25',
      author: 'Accountant Lisa Green',
      views: 112,
      downloads: 29,
      status: 'published'
    },
    {
      id: 'RPT-2025-007',
      title: 'Education Program Report',
      description: 'Evaluation of education program effectiveness',
      type: 'education',
      date: '2025-04-30',
      author: 'Educator John Taylor',
      views: 89,
      downloads: 21,
      status: 'published'
    },
    {
      id: 'RPT-2025-008',
      title: 'Staff Training Report',
      description: 'Summary of staff training activities and outcomes',
      type: 'staff',
      date: '2025-05-05',
      author: 'HR Manager Susan White',
      views: 54,
      downloads: 15,
      status: 'published'
    },
    {
      id: 'RPT-2025-009',
      title: 'Infrastructure Maintenance Report',
      description: 'Report on infrastructure maintenance and repairs',
      type: 'infrastructure',
      date: '2025-05-10',
      author: 'Engineer Robert Clark',
      views: 78,
      downloads: 18,
      status: 'published'
    }
  ];

  // Handle generating a new report
  const handleGenerateReport = () => {
    setShowGenerateReportDialog(true);
  };

  // Handle creating a report from a template
  const handleUseTemplate = (template: ReportTemplate) => {
    setSelectedTemplate(template);
    setNewReport({
      ...newReport,
      type: template.type,
      title: `New ${template.name}`,
      description: template.description
    });
    setShowTemplateDialog(true);
  };

  // Handle creating a new template
  const handleCreateTemplate = () => {
    toast({
      title: "Create Template",
      description: "Opening template creation form",
    });
  };

  // Handle creating a report
  const handleCreateReport = () => {
    // In a real app, this would create a new report in the database
    const newReportId = `RPT-${new Date().getFullYear()}-${String(reports.length + 1).padStart(3, '0')}`;
    
    toast({
      title: "Report Created",
      description: `New report "${newReport.title}" has been created successfully.`,
    });
    
    setShowGenerateReportDialog(false);
    setShowTemplateDialog(false);
    
    // Reset form
    setNewReport({
      title: '',
      description: '',
      type: 'health',
      date: new Date().toISOString().split('T')[0],
      author: 'Current User',
      status: 'draft',
      includeCharts: true,
      includeMetrics: true,
      scheduleReport: false,
      scheduleFrequency: 'once',
      scheduleDate: new Date().toISOString().split('T')[0]
    });
  };

  // Handle viewing a report
  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setShowReportPreviewDialog(true);
  };

  // Handle report actions
  const handleReportAction = (action: string, reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;
    
    switch (action) {
      case 'view':
        handleViewReport(report);
        break;
      case 'download':
    toast({
          title: "Downloading Report",
          description: `Downloading report "${report.title}"...`,
    });
        break;
      case 'print':
    toast({
          title: "Printing Report",
          description: `Printing report "${report.title}"...`,
    });
        window.print();
        break;
      case 'regenerate':
    toast({
          title: "Regenerating Report",
          description: `Regenerating report "${report.title}"...`,
    });
        break;
      case 'edit':
    toast({
          title: "Editing Report",
          description: `Editing report "${report.title}"...`,
    });
        break;
      case 'run-now':
    toast({
          title: "Running Report",
          description: `Running scheduled report "${report.title}"...`,
    });
        break;
      case 'disable':
    toast({
          title: "Disabling Report",
          description: `Disabling scheduled report "${report.title}"...`,
        });
        break;
      default:
        toast({
          title: `Report Action: ${action}`,
          description: `Action '${action}' performed on report ${reportId}`,
    });
    }
  };

  // Filter reports based on selected filters
  const filteredReports = reports.filter(report => {
    const matchesType = reportTypeFilter === 'all' || report.type === reportTypeFilter;
    const matchesDateRange = dateRangeFilter === 'all' || dateRangeFilter === 'monthly';
    const matchesSearch = searchQuery === '' ||
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesDateRange && matchesSearch;
  });

  const getReportTypeBadge = (type: string) => {
    const typeMap: {[key: string]: {label: string, color: string}} = {
      'health': { label: 'Health', color: 'bg-red-100 text-red-800' },
      'conservation': { label: 'Conservation', color: 'bg-green-100 text-green-800' },
      'visitors': { label: 'Visitors', color: 'bg-blue-100 text-blue-800' },
      'wildlife': { label: 'Wildlife', color: 'bg-amber-100 text-amber-800' },
      'security': { label: 'Security', color: 'bg-orange-100 text-orange-800' },
      'finance': { label: 'Finance', color: 'bg-purple-100 text-purple-800' },
      'education': { label: 'Education', color: 'bg-teal-100 text-teal-800' },
      'staff': { label: 'Staff', color: 'bg-lime-100 text-lime-800' },
      'infrastructure': { label: 'Infrastructure', color: 'bg-sky-100 text-sky-800' }
    };

    const typeInfo = typeMap[type] || { label: type, color: 'bg-gray-100 text-gray-800' };

    return (
      <Badge variant="secondary" className={typeInfo.color}>
        {typeInfo.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'archived':
        return <Badge variant="destructive">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const ChartPlaceholder = () => (
    <div className="flex items-center justify-center h-48 rounded-md bg-muted">
      <BarChart2 className="h-10 w-10 text-muted-foreground" />
    </div>
  );

  return (
    <PageTemplate 
      title="Analytics & Reports" 
      description="View and generate reports and analytics"
      icon={<LineChart className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-1 sm:flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search reports..." 
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2">
              <div className="w-full">
                <Select 
                  value={reportTypeFilter} 
                  onValueChange={setReportTypeFilter}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="conservation">Conservation</SelectItem>
                    <SelectItem value="visitors">Visitors</SelectItem>
                    <SelectItem value="wildlife">Wildlife</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full sm:w-auto" onClick={() => {}}>
                <Filter className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full sm:w-40">
              <Select 
                value={dateRangeFilter} 
                onValueChange={setDateRangeFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full sm:w-auto" onClick={handleGenerateReport}>
              <FilePlus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Generate Report</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full overflow-x-auto flex whitespace-nowrap">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Layers className="h-4 w-4" /> Overview
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Reports
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="dashboards" className="flex items-center gap-2">
              <AreaChart className="h-4 w-4" /> Dashboards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Report Summary</CardTitle>
                  <CardDescription>Overview of report generation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Reports Generated</span>
                      <span>{reports.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Views per Report</span>
                      <span>{reports.reduce((acc, report) => acc + report.views, 0) / reports.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Downloads</span>
                      <span>{reports.reduce((acc, report) => acc + report.downloads, 0)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => {}}>
                    View All Reports
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Types</CardTitle>
                  <CardDescription>Distribution of report types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['health', 'conservation', 'visitors', 'security', 'finance'].map((type) => (
                      <div key={type} className="flex justify-between">
                        <span>{type}</span>
                        <span>{reports.filter(report => report.type === type).length}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => {}}>
                    View Category Trends
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest report generation activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {reports.slice(0, 3).map((report) => (
                      <div key={report.id} className="flex justify-between">
                        <span>{report.title}</span>
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => {}}>
                    View All Recent Activity
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Report Views</CardTitle>
                  <CardDescription>Report views over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Downloads</CardTitle>
                  <CardDescription>Report downloads over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Reports Library</CardTitle>
                    <CardDescription>Browse all generated reports</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => {}}>
                      <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <List className="h-4 w-4 mr-2" /> View Options
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {}}>
                          <List className="mr-2 h-4 w-4" /> List View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {}}>
                          <Layers className="mr-2 h-4 w-4" /> Grid View
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {}}>
                          <User className="mr-2 h-4 w-4" /> Group by Author
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {}}>
                          <Calendar className="mr-2 h-4 w-4" /> Group by Date
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">Type</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="hidden lg:table-cell">Author</TableHead>
                        <TableHead className="hidden lg:table-cell">Engagement</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.length > 0 ? (
                        filteredReports.map((report) => (
                          <TableRow key={report.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell>
                              <div className="font-medium">{report.title}</div>
                              <div className="text-xs text-muted-foreground hidden sm:block">{report.description.length > 60 
                                ? `${report.description.substring(0, 60)}...` 
                                : report.description}</div>
                              <div className="text-xs text-muted-foreground sm:hidden">{report.id}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {getReportTypeBadge(report.type)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(report.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {report.author}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1 text-xs">
                                  <FileText className="h-3 w-3 text-muted-foreground" />
                                  <span>{report.views} views</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs">
                                  <Download className="h-3 w-3 text-muted-foreground" />
                                  <span>{report.downloads} downloads</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(report.status)}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleReportAction('view', report.id)}>
                                    <FileText className="mr-2 h-4 w-4" /> View Report
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleReportAction('download', report.id)}>
                                    <Download className="mr-2 h-4 w-4" /> Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleReportAction('print', report.id)}>
                                    <Printer className="mr-2 h-4 w-4" /> Print
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleReportAction('regenerate', report.id)}>
                                    <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            No reports found matching the current filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredReports.length} of {reports.length} reports
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled onClick={() => {}}>Previous</Button>
                  <Button variant="outline" size="sm" disabled onClick={() => {}}>Next</Button>
                </div>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Report Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {reportTemplates.map((template, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 border rounded-md hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="text-sm">{template.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleUseTemplate(template)}>Use</Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-2" onClick={handleCreateTemplate}>
                      <Plus className="mr-2 h-4 w-4" /> Create Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { name: 'Monthly Health Summary', frequency: 'Monthly', nextRun: '2025-05-01' },
                      { name: 'Weekly Security Briefing', frequency: 'Weekly', nextRun: '2025-04-22' },
                      { name: 'Daily Visitor Count', frequency: 'Daily', nextRun: '2025-04-19' }
                    ].map((scheduled, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 border rounded-md">
                        <div>
                          <div className="text-sm font-medium">{scheduled.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {scheduled.frequency} · Next: {new Date(scheduled.nextRun).toLocaleDateString()}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleReportAction('edit', idx.toString())}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReportAction('run-now', idx.toString())}>
                              Run Now
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReportAction('disable', idx.toString())}>
                              Disable
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full mt-2" onClick={() => {}}>
                      View All Scheduled Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Report Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={handleGenerateReport}>
                      <FilePlus className="mr-2 h-4 w-4" /> Generate New Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                      <Layers className="mr-2 h-4 w-4" /> Change View Mode
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                      <FileText className="mr-2 h-4 w-4" /> Browse All Reports
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleCreateTemplate}>
                      <Plus className="mr-2 h-4 w-4" /> Create New Template
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                      <BarChart className="mr-2 h-4 w-4" /> View Category Trends
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Report Views by Type</CardTitle>
                  <CardDescription>Distribution of report views by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Downloads by Type</CardTitle>
                  <CardDescription>Distribution of report downloads by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Status</CardTitle>
                  <CardDescription>Distribution of report status</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Report Views Over Time</CardTitle>
                  <CardDescription>Report views over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Downloads Over Time</CardTitle>
                  <CardDescription>Report downloads over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dashboards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                  <CardDescription>Key metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Performance</CardTitle>
                  <CardDescription>Financial performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Operational Efficiency</CardTitle>
                  <CardDescription>Operational efficiency metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Report Generation Trends</CardTitle>
                  <CardDescription>Report generation trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Usage Trends</CardTitle>
                  <CardDescription>Report usage trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartPlaceholder />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Generate Report Dialog */}
        <Dialog open={showGenerateReportDialog} onOpenChange={setShowGenerateReportDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
              <DialogDescription>
                Create a new report by selecting a template or starting from scratch.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="report-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="report-title"
                  value={newReport.title}
                  onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                  className="col-span-3"
                  placeholder="Report title"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="report-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="report-description"
                  value={newReport.description}
                  onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                  className="col-span-3"
                  placeholder="Report description"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="report-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newReport.type}
                  onValueChange={(value) => setNewReport({...newReport, type: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="conservation">Conservation</SelectItem>
                    <SelectItem value="visitors">Visitors</SelectItem>
                    <SelectItem value="wildlife">Wildlife</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="report-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="report-date"
                  type="date"
                  value={newReport.date}
                  onChange={(e) => setNewReport({...newReport, date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="report-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newReport.status}
                  onValueChange={(value) => setNewReport({...newReport, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Options
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-charts" 
                      checked={newReport.includeCharts}
                      onCheckedChange={(checked) => setNewReport({...newReport, includeCharts: checked as boolean})}
                    />
                    <Label htmlFor="include-charts">Include Charts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="include-metrics" 
                      checked={newReport.includeMetrics}
                      onCheckedChange={(checked) => setNewReport({...newReport, includeMetrics: checked as boolean})}
                    />
                    <Label htmlFor="include-metrics">Include Metrics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="schedule-report" 
                      checked={newReport.scheduleReport}
                      onCheckedChange={(checked) => setNewReport({...newReport, scheduleReport: checked as boolean})}
                    />
                    <Label htmlFor="schedule-report">Schedule Report</Label>
                  </div>
                </div>
              </div>
              {newReport.scheduleReport && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="schedule-frequency" className="text-right">
                      Frequency
                    </Label>
                    <Select
                      value={newReport.scheduleFrequency}
                      onValueChange={(value) => setNewReport({...newReport, scheduleFrequency: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">Once</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="schedule-date" className="text-right">
                      Start Date
                    </Label>
                    <Input
                      id="schedule-date"
                      type="date"
                      value={newReport.scheduleDate}
                      onChange={(e) => setNewReport({...newReport, scheduleDate: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowGenerateReportDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateReport}>Generate Report</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Template Dialog */}
        <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Report from Template</DialogTitle>
              <DialogDescription>
                Create a new report using the {selectedTemplate?.name} template.
              </DialogDescription>
            </DialogHeader>
            {selectedTemplate && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template-title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="template-title"
                    value={newReport.title}
                    onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                    className="col-span-3"
                    placeholder="Report title"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template-description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="template-description"
                    value={newReport.description}
                    onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                    className="col-span-3"
                    placeholder="Report description"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="template-date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="template-date"
                    type="date"
                    value={newReport.date}
                    onChange={(e) => setNewReport({...newReport, date: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Fields
                  </Label>
                  <div className="col-span-3 space-y-2">
                    {selectedTemplate.fields.map((field, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`field-${index}`} defaultChecked />
                        <Label htmlFor={`field-${index}`}>{field}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Options
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="template-include-charts" 
                        checked={newReport.includeCharts}
                        onCheckedChange={(checked) => setNewReport({...newReport, includeCharts: checked as boolean})}
                      />
                      <Label htmlFor="template-include-charts">Include Charts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="template-include-metrics" 
                        checked={newReport.includeMetrics}
                        onCheckedChange={(checked) => setNewReport({...newReport, includeMetrics: checked as boolean})}
                      />
                      <Label htmlFor="template-include-metrics">Include Metrics</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>Cancel</Button>
              <Button onClick={handleCreateReport}>Create Report</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Report Preview Dialog */}
        <Dialog open={showReportPreviewDialog} onOpenChange={setShowReportPreviewDialog}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{selectedReport?.title}</DialogTitle>
              <DialogDescription>
                {selectedReport?.description}
              </DialogDescription>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-4 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getReportTypeBadge(selectedReport.type)}
                    {getStatusBadge(selectedReport.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(selectedReport.date).toLocaleDateString()} · {selectedReport.author}
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Views</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{selectedReport.views}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Downloads</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{selectedReport.downloads}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold capitalize">{selectedReport.status}</div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium mb-2">Report Content</h3>
                    <p className="text-muted-foreground">
                      This is a preview of the report content. In a real application, this would display the actual report content.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium mb-2">Charts & Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ChartPlaceholder />
                      <ChartPlaceholder />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <div className="flex justify-between w-full">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleReportAction('download', selectedReport?.id || '')}>
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleReportAction('print', selectedReport?.id || '')}>
                    <Printer className="h-4 w-4 mr-2" /> Print
                  </Button>
                </div>
                <Button onClick={() => setShowReportPreviewDialog(false)}>Close</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTemplate>
  );
};

export default Reports;
