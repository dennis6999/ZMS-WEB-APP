import React, { useState, useMemo } from 'react' ;
import { PageTemplate } from '@/components/layout/PageTemplate';
import { PawPrint, Search, Filter, Plus, FileText, Download, MoreHorizontal, ArrowUpDown, CalendarRange, Weight, Activity, Heart, MapPin, Tag, Info, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AnimalDetailsDialog } from '@/components/animals/AnimalDetailsDialog';
import { AddAnimalForm } from '@/components/animals/AddAnimalForm';

interface Animal {
  id: string;
  name: string;
  species: string;
  age: string;
  gender: string;
  location: string;
  status: string;
  joinDate: string;
  chipId: string;
  endangered: boolean;
  weight: string;
  diet: string;
  lastMedical: string;
  nextVaccination: string;
  territory: string;
  subspecies: string;
  conservationStatus: string;
  family: string;
  behavior: string;
  medicalHistory: string;
  notes: string;
}

interface AnimalFormData {
  name: string;
  species: string;
  age: string;
  gender: string;
  location: string;
  status: string;
  weight: string;
  diet: string;
  notes?: string;
}

const Animals = () => {
  const [view, setView] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('all-species');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddAnimalOpen, setIsAddAnimalOpen] = useState(false);
  const itemsPerPage = 5;
  
  const animals = [
    {
      id: 'A1001',
      name: 'Simba',
      species: 'Lion',
      age: '5 years',
      gender: 'Male',
      location: 'Eastern Savanna',
      status: 'Healthy',
      joinDate: '12/06/2018',
      chipId: 'KWS-CH-5643',
      endangered: false,
      weight: '190 kg',
      diet: 'Carnivore',
      lastMedical: '03/15/2024',
      nextVaccination: '05/20/2024',
      territory: '25 sq km',
      subspecies: 'East African Lion',
      conservationStatus: 'Vulnerable',
      family: 'Pride of 12',
      behavior: 'Dominant male, territorial',
      medicalHistory: 'Regular checkups, vaccinated against common feline diseases',
      notes: 'Excellent physical condition, showing strong leadership traits in pride',
    },
    {
      id: 'A1002',
      name: 'Tembo',
      species: 'Elephant',
      age: '12 years',
      gender: 'Female',
      location: 'Northern Plains',
      status: 'Healthy',
      joinDate: '03/15/2011',
      chipId: 'KWS-CH-1287',
      endangered: false,
      weight: '2,800 kg',
      diet: 'Herbivore',
      lastMedical: '02/28/2024',
      nextVaccination: '08/15/2024',
      territory: '100 sq km',
      subspecies: 'African Bush Elephant',
      conservationStatus: 'Vulnerable',
      family: 'Herd of 15',
      behavior: 'Matriarch, protective of calves',
      medicalHistory: 'Regular foot care, dental checkups',
      notes: 'Recently gave birth to healthy calf, shows excellent maternal behavior',
    },
    {
      id: 'A1003',
      name: 'Kifaru',
      species: 'Rhino',
      age: '8 years',
      gender: 'Male',
      location: 'Protected Reserve',
      status: 'Under Treatment',
      joinDate: '06/23/2015',
      chipId: 'KWS-CH-9823',
      endangered: true,
      weight: '1,500 kg',
      diet: 'Herbivore',
      lastMedical: '04/10/2024',
      nextVaccination: '06/15/2024',
      territory: '10 sq km',
      subspecies: 'Black Rhino',
      conservationStatus: 'Endangered',
      family: 'Group of 5',
      behavior: 'Aggressive, territorial',
      medicalHistory: 'Regular anti-poaching patrols, vaccinated against common rhino diseases',
      notes: 'Recent injury, showing signs of recovery',
    },
    {
      id: 'A1004',
      name: 'Twiga',
      species: 'Giraffe',
      age: '7 years',
      gender: 'Female',
      location: 'Acacia Grove',
      status: 'Healthy',
      joinDate: '09/10/2016',
      chipId: 'KWS-CH-4561',
      endangered: false,
      weight: '1,200 kg',
      diet: 'Herbivore',
      lastMedical: '01/15/2024',
      nextVaccination: '03/15/2024',
      territory: '50 sq km',
      subspecies: 'Giraffe',
      conservationStatus: 'Least Concern',
      family: 'Family of 3',
      behavior: 'Social, playful',
      medicalHistory: 'Regular foot care, dental checkups',
      notes: 'Excellent physical condition, showing good social skills',
    },
    {
      id: 'A1005',
      name: 'Chui',
      species: 'Leopard',
      age: '4 years',
      gender: 'Female',
      location: 'Southern Ridge',
      status: 'Monitoring',
      joinDate: '02/14/2019',
      chipId: 'KWS-CH-7890',
      endangered: false,
      weight: '60 kg',
      diet: 'Carnivore',
      lastMedical: '05/01/2024',
      nextVaccination: '07/15/2024',
      territory: '10 sq km',
      subspecies: 'Leopard',
      conservationStatus: 'Least Concern',
      family: 'Pride of 2',
      behavior: 'Territorial, solitary',
      medicalHistory: 'Regular checkups, vaccinated against common feline diseases',
      notes: 'Excellent physical condition, showing good hunting skills',
    },
    {
      id: 'A1006',
      name: 'Kiboko',
      species: 'Hippo',
      age: '10 years',
      gender: 'Male',
      location: 'Central Lake',
      status: 'Healthy',
      joinDate: '07/22/2013',
      chipId: 'KWS-CH-2345',
      endangered: false,
      weight: '1,800 kg',
      diet: 'Herbivore',
      lastMedical: '03/15/2024',
      nextVaccination: '05/15/2024',
      territory: '20 sq km',
      subspecies: 'Hippo',
      conservationStatus: 'Least Concern',
      family: 'Group of 10',
      behavior: 'Social, protective',
      medicalHistory: 'Regular foot care, dental checkups',
      notes: 'Excellent physical condition, showing good leadership skills',
    },
    {
      id: 'A1007',
      name: 'Duma',
      species: 'Cheetah',
      age: '3 years',
      gender: 'Male',
      location: 'Grassland Plains',
      status: 'Monitoring',
      joinDate: '11/05/2020',
      chipId: 'KWS-CH-6759',
      endangered: true,
      weight: '50 kg',
      diet: 'Carnivore',
      lastMedical: '06/10/2024',
      nextVaccination: '08/15/2024',
      territory: '5 sq km',
      subspecies: 'Cheetah',
      conservationStatus: 'Endangered',
      family: 'Pride of 3',
      behavior: 'Territorial, solitary',
      medicalHistory: 'Regular checkups, vaccinated against common feline diseases',
      notes: 'Excellent physical condition, showing good hunting skills',
    },
  ];

  const filteredAnimals = useMemo(() => {
    let filtered = animals;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(animal => 
        animal.name.toLowerCase().includes(query) ||
        animal.id.toLowerCase().includes(query) ||
        animal.species.toLowerCase().includes(query) ||
        animal.location.toLowerCase().includes(query)
      );
    }
    
    // Apply species filter
    if (selectedSpecies !== 'all-species') {
      filtered = filtered.filter(animal => 
        animal.species.toLowerCase() === selectedSpecies.toLowerCase()
      );
    }
    
    // Apply status filter
    if (view !== 'all') {
      filtered = filtered.filter(animal => 
        view === 'endangered' ? animal.endangered : 
        animal.status.toLowerCase() === view.toLowerCase()
      );
    }
    
    return filtered;
  }, [animals, searchQuery, selectedSpecies, view]);

  // Pagination
  const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);
  const paginatedAnimals = filteredAnimals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy':
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>;
      case 'monitoring':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">{status}</Badge>;
      case 'under treatment':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSpeciesBadge = (species: string, endangered: boolean) => {
    if (endangered) {
      return <Badge variant="outline" className="border-red-500 text-red-500">{species} (Endangered)</Badge>;
    }
    return <span>{species}</span>;
  };

  const handleViewDetails = (animal: Animal) => {
    setSelectedAnimal(animal);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedAnimal(null);
  };

  const handleEditAnimal = () => {
    // TODO: Implement edit functionality
    console.log('Edit animal:', selectedAnimal);
  };

  const handleAddAnimal = (data: AnimalFormData) => {
    // Generate a new ID for the animal
    const newId = `A${String(animals.length + 1001).padStart(4, '0')}`;
    
    // Create a new animal object with the form data
    const newAnimal: Animal = {
      id: newId,
      name: data.name,
      species: data.species,
      age: data.age,
      gender: data.gender,
      location: data.location,
      status: data.status,
      joinDate: new Date().toLocaleDateString(),
      chipId: `KWS-CH-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      endangered: false, // Default value
      weight: data.weight,
      diet: data.diet,
      lastMedical: new Date().toLocaleDateString(),
      nextVaccination: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      territory: 'Not specified',
      subspecies: data.species,
      conservationStatus: 'Not specified',
      family: 'Not specified',
      behavior: 'Not specified',
      medicalHistory: 'Initial checkup completed',
      notes: data.notes || '',
    };

    // Add the new animal to the list
    animals.push(newAnimal);
    
    // Close the form
    setIsAddAnimalOpen(false);
  };

  const handleExportReport = () => {
    // Create a CSV string with headers
    const headers = [
      'ID',
      'Name',
      'Species',
      'Age',
      'Gender',
      'Location',
      'Status',
      'Join Date',
      'Chip ID',
      'Endangered',
      'Weight',
      'Diet',
      'Last Medical',
      'Next Vaccination',
      'Territory',
      'Subspecies',
      'Conservation Status',
      'Family',
      'Behavior',
      'Medical History',
      'Notes'
    ].join(',');

    // Create rows for each animal
    const rows = animals.map(animal => [
      animal.id,
      animal.name,
      animal.species,
      animal.age,
      animal.gender,
      animal.location,
      animal.status,
      animal.joinDate,
      animal.chipId,
      animal.endangered ? 'Yes' : 'No',
      animal.weight,
      animal.diet,
      animal.lastMedical,
      animal.nextVaccination,
      animal.territory,
      animal.subspecies,
      animal.conservationStatus,
      animal.family,
      animal.behavior,
      animal.medicalHistory,
      animal.notes
    ].join(','));

    // Combine headers and rows
    const csvContent = [headers, ...rows].join('\n');

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Set the download attributes
    link.setAttribute('href', url);
    link.setAttribute('download', `animal_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    // Add to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadData = () => {
    // Create a JSON string with all animal data
    const jsonContent = JSON.stringify(animals, null, 2);
    
    // Create a Blob with the JSON content
    const blob = new Blob([jsonContent], { type: 'application/json' });
    
    // Create a download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Set the download attributes
    link.setAttribute('href', url);
    link.setAttribute('download', `animal_data_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    
    // Add to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <PageTemplate 
      title="Animals Management" 
      description="Manage and track all animals in the wildlife service"
      icon={<PawPrint className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-1 sm:flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search animals..." 
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-6 w-6 p-0"
                  onClick={handleClearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2">
              <Select 
                value={selectedSpecies} 
                onValueChange={setSelectedSpecies}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-species">All Species</SelectItem>
                  <SelectItem value="lion">Lions</SelectItem>
                  <SelectItem value="elephant">Elephants</SelectItem>
                  <SelectItem value="rhino">Rhinos</SelectItem>
                  <SelectItem value="giraffe">Giraffes</SelectItem>
                  <SelectItem value="leopard">Leopards</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="w-full sm:w-auto" onClick={() => setIsAddAnimalOpen(true)}>
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Add Animal</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportReport}>
                  <FileText className="mr-2 h-4 w-4" /> Export Report
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadData}>
                  <Download className="mr-2 h-4 w-4" /> Download Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Tabs defaultValue="all" onValueChange={setView} className="w-full">
            <TabsList className="mb-4 w-full sm:w-auto">
              <TabsTrigger value="all">All Animals</TabsTrigger>
              <TabsTrigger value="endangered">Endangered</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="healthy">Healthy</TabsTrigger>
              <TabsTrigger value="under treatment">Treatment</TabsTrigger>
            </TabsList>

            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  <PawPrint className="h-4 w-4" />
                  <span>Animal Registry</span>
                </CardTitle>
                <CardDescription>
                  Total: {filteredAnimals.length} animals
                  {view !== 'all' && ` with status: ${view}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Species</TableHead>
                          <TableHead className="hidden md:table-cell">Age</TableHead>
                          <TableHead className="hidden md:table-cell">Gender</TableHead>
                          <TableHead className="hidden lg:table-cell">Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedAnimals.length > 0 ? (
                          paginatedAnimals.map((animal) => (
                            <TableRow key={animal.id} className="cursor-pointer hover:bg-muted/50">
                              <TableCell className="font-medium">{animal.id}</TableCell>
                              <TableCell>{animal.name}</TableCell>
                              <TableCell>{getSpeciesBadge(animal.species, animal.endangered)}</TableCell>
                              <TableCell className="hidden md:table-cell">{animal.age}</TableCell>
                              <TableCell className="hidden md:table-cell">{animal.gender}</TableCell>
                              <TableCell className="hidden lg:table-cell">{animal.location}</TableCell>
                              <TableCell>{getStatusBadge(animal.status)}</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleViewDetails(animal)}
                                >
                                  <Info className="h-4 w-4" />
                                    </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                              No animals found with the selected filters.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {paginatedAnimals.length} of {filteredAnimals.length} animals
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Tabs>
        </div>
      </div>

      <AnimalDetailsDialog
        animal={selectedAnimal}
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
        onEdit={handleEditAnimal}
      />

      <AddAnimalForm
        isOpen={isAddAnimalOpen}
        onClose={() => setIsAddAnimalOpen(false)}
        onSubmit={handleAddAnimal}
      />
    </PageTemplate>
  );
};

export default Animals;
