import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Filter } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  supplier: string;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface InventoryManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InventoryManagement({
  isOpen,
  onClose,
}: InventoryManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for inventory items
  const inventoryItems: InventoryItem[] = [
    {
      id: 'MED001',
      name: 'Antibiotics',
      category: 'Medications',
      quantity: 50,
      unit: 'tablets',
      expiryDate: '2024-12-31',
      supplier: 'PharmaCorp',
      location: 'Storage Room A',
      status: 'in-stock',
    },
    {
      id: 'MED002',
      name: 'Painkillers',
      category: 'Medications',
      quantity: 100,
      unit: 'tablets',
      expiryDate: '2024-10-15',
      supplier: 'MediSupply',
      location: 'Storage Room A',
      status: 'in-stock',
    },
    {
      id: 'MED003',
      name: 'Bandages',
      category: 'Supplies',
      quantity: 200,
      unit: 'rolls',
      expiryDate: '2025-06-30',
      supplier: 'FirstAid Inc',
      location: 'Storage Room B',
      status: 'in-stock',
    },
    {
      id: 'MED004',
      name: 'Vaccines',
      category: 'Vaccines',
      quantity: 30,
      unit: 'doses',
      expiryDate: '2024-08-20',
      supplier: 'VaxPharm',
      location: 'Refrigerator 1',
      status: 'low-stock',
    },
    {
      id: 'MED005',
      name: 'Surgical Gloves',
      category: 'Supplies',
      quantity: 500,
      unit: 'pairs',
      expiryDate: '2025-03-15',
      supplier: 'SafetyFirst',
      location: 'Storage Room B',
      status: 'in-stock',
    },
  ];

  // Filter inventory items based on search query and category
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <Badge className="bg-green-500 hover:bg-green-600">In Stock</Badge>;
      case 'low-stock':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Low Stock</Badge>;
      case 'out-of-stock':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Inventory Management</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid grid-cols-1 sm:flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search inventory..." 
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 sm:flex gap-2">
                <Select 
                  value={selectedCategory} 
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="medications">Medications</SelectItem>
                    <SelectItem value="supplies">Supplies</SelectItem>
                    <SelectItem value="vaccines">Vaccines</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add Item</span>
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity} {item.unit}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No inventory items found with the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 