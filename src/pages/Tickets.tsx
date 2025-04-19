import React, { useState, useMemo } from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { Ticket, Plus, Filter, Download, Calendar, User, QrCode, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreateTicketForm } from '@/components/tickets/CreateTicketForm';
import { ExportTickets } from '@/components/tickets/ExportTickets';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface TicketData {
  id: string;
  type: string;
  visitor: string;
  date: string;
  time: string;
  status: 'active' | 'used' | 'expired' | 'refunded';
  amount: number;
  paymentMethod: string;
}

const Tickets = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const ticketData: TicketData[] = [
    {
      id: 'T-4392',
      type: 'Adult Day Pass',
      visitor: 'John Smith',
      date: '2025-04-15',
      time: '10:00 AM',
      status: 'active',
      amount: 45.00,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'T-4393',
      type: 'Child Day Pass',
      visitor: 'Emma Smith',
      date: '2025-04-15',
      time: '10:00 AM',
      status: 'active',
      amount: 25.00,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'T-4375',
      type: 'Family Package',
      visitor: 'David Johnson',
      date: '2025-04-14',
      time: '09:30 AM',
      status: 'used',
      amount: 120.00,
      paymentMethod: 'Mobile Money'
    },
    {
      id: 'T-4356',
      type: 'Safari Experience',
      visitor: 'Sarah Williams',
      date: '2025-04-12',
      time: '08:00 AM',
      status: 'used',
      amount: 75.00,
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'T-4321',
      type: 'Adult Day Pass',
      visitor: 'Michael Brown',
      date: '2025-04-10',
      time: '11:00 AM',
      status: 'expired',
      amount: 45.00,
      paymentMethod: 'Cash'
    },
    {
      id: 'T-4301',
      type: 'Group Tour',
      visitor: 'Tourist Group A',
      date: '2025-04-05',
      time: '09:00 AM',
      status: 'refunded',
      amount: 350.00,
      paymentMethod: 'Credit Card'
    }
  ];

  const getStatusColor = (status: TicketData['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white hover:bg-green-600';
      case 'used': return 'bg-blue-500 text-white hover:bg-blue-600';
      case 'expired': return 'bg-gray-500 text-white hover:bg-gray-600';
      case 'refunded': return 'bg-red-500 text-white hover:bg-red-600';
      default: return 'bg-gray-500 text-white hover:bg-gray-600';
    }
  };

  // Filter and sort tickets
  const filteredTickets = useMemo(() => {
    // First filter by status tab
    let result = activeTab === 'all' 
      ? [...ticketData] 
      : ticketData.filter(ticket => ticket.status === activeTab);
    
    // Then filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(ticket => 
        ticket.id.toLowerCase().includes(query) ||
        ticket.type.toLowerCase().includes(query) ||
        ticket.visitor.toLowerCase().includes(query) ||
        ticket.date.includes(query) ||
        ticket.time.toLowerCase().includes(query) ||
        ticket.paymentMethod.toLowerCase().includes(query)
      );
    }
    
    // Sort the results
    return result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'price':
          return b.amount - a.amount;
        default:
          return 0;
      }
    });
  }, [ticketData, activeTab, searchQuery, sortBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <PageTemplate 
      title="Ticketing System" 
      description="Manage visitor tickets and park admissions"
      icon={<Ticket className="h-6 w-6" />}
    >
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex gap-1 items-center" onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4" /> Create Ticket
            </Button>
            <Button variant="outline" className="flex gap-1 items-center" onClick={() => setShowExportDialog(true)}>
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search tickets..." 
                className="w-full pl-8" 
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Ticket Management */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Ticket Management</CardTitle>
            <CardDescription>
              View and manage all visitor tickets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="overflow-x-auto">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Tickets</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="used">Used</TabsTrigger>
                  <TabsTrigger value="expired">Expired</TabsTrigger>
                  <TabsTrigger value="refunded">Refunded</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value={activeTab} className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm font-medium">Showing {filteredTickets.length} tickets</h3>
                    {searchQuery && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Filtered by: "{searchQuery}"
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <Select value={sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="price">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-sm font-medium">ID</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Type</th>
                        {!isMobile && <th className="text-left py-3 px-2 text-sm font-medium">Visitor</th>}
                        <th className="text-left py-3 px-2 text-sm font-medium">Date</th>
                        {!isMobile && <th className="text-left py-3 px-2 text-sm font-medium">Amount</th>}
                        <th className="text-left py-3 px-2 text-sm font-medium">Status</th>
                        <th className="text-left py-3 px-2 text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.length > 0 ? (
                        filteredTickets.map((ticket) => (
                          <tr key={ticket.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-2 text-sm">{ticket.id}</td>
                            <td className="py-3 px-2 text-sm">{ticket.type}</td>
                            {!isMobile && <td className="py-3 px-2 text-sm">{ticket.visitor}</td>}
                            <td className="py-3 px-2 text-sm">
                              <div className="flex flex-col">
                                <span>{new Date(ticket.date).toLocaleDateString()}</span>
                                <span className="text-muted-foreground text-xs">{ticket.time}</span>
                              </div>
                            </td>
                            {!isMobile && <td className="py-3 px-2 text-sm">${ticket.amount.toFixed(2)}</td>}
                            <td className="py-3 px-2 text-sm">
                              <Badge 
                                className={getStatusColor(ticket.status)}
                                variant="outline"
                              >
                                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 text-sm">
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <QrCode className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <User className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Calendar className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={isMobile ? 4 : 6} className="py-8 text-center text-muted-foreground">
                            {searchQuery 
                              ? `No tickets found matching "${searchQuery}"` 
                              : "No tickets available"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline">Previous</Button>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">1</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-primary text-primary-foreground">2</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">3</Button>
            </div>
            <Button>Next</Button>
          </CardFooter>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,245.00</div>
              <p className="text-xs text-muted-foreground">+18% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">Currently valid</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">432</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenue This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,890.00</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Ticket Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="max-w-2xl">
          <CreateTicketForm 
            onSuccess={() => setShowCreateForm(false)}
            onCancel={() => setShowCreateForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <ExportTickets 
            tickets={filteredTickets}
            onClose={() => setShowExportDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </PageTemplate>
  );
};

export default Tickets;
