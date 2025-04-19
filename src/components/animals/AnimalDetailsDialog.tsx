import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AnimalDetails } from './AnimalDetails';

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

interface AnimalDetailsDialogProps {
  animal: Animal | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export function AnimalDetailsDialog({
  animal,
  isOpen,
  onClose,
  onEdit,
}: AnimalDetailsDialogProps) {
  if (!animal) return null;

  // Transform the animal data to match the AnimalDetails component's expected format
  const transformedAnimal = {
    id: animal.id,
    name: animal.name,
    species: animal.species,
    status: animal.status,
    location: animal.location,
    age: parseInt(animal.age),
    weight: parseFloat(animal.weight),
    healthStatus: animal.status.toLowerCase(),
    notes: animal.notes,
    lastCheckup: animal.lastMedical,
    nextCheckup: animal.nextVaccination,
    diet: animal.diet,
    medications: [], // This would be populated from medical history in a real application
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Animal Details</DialogTitle>
        </DialogHeader>
        <AnimalDetails
          animal={transformedAnimal}
          onClose={onClose}
          onEdit={onEdit}
        />
      </DialogContent>
    </Dialog>
  );
} 