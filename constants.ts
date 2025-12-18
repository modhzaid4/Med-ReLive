
import { StockStatus, Medicine, MedicalStore } from './types';

export const MOCK_MEDICINES: Medicine[] = [
  { id: '1', name: 'Paracetamol 500mg', category: 'Pain Relief', description: 'Used to treat fever and mild to moderate pain.' },
  { id: '2', name: 'Amoxicillin 250mg', category: 'Antibiotic', description: 'Penicillin-type antibiotic used to treat bacterial infections.' },
  { id: '3', name: 'Metformin 500mg', category: 'Diabetes', description: 'First-line medication for the treatment of type 2 diabetes.' },
  { id: '4', name: 'Amlodipine 5mg', category: 'Blood Pressure', description: 'Used to treat high blood pressure and chest pain.' },
  { id: '5', name: 'Atorvastatin 10mg', category: 'Cholesterol', description: 'Used with diet to lower "bad" cholesterol and fats.' },
  { id: '6', name: 'Cetirizine 10mg', category: 'Allergy', description: 'Antihistamine used to relieve allergy symptoms.' },
];

export const MOCK_STORES: MedicalStore[] = [
  {
    id: 's1',
    name: 'City Central Pharmacy',
    address: '123 Main St, Downtown',
    distance: '0.5 km',
    phone: '+1 (555) 123-4567',
    hours: '24 Hours Open',
    rating: 4.8,
    isVerified: true,
    inventory: [
      { medicineId: '1', status: StockStatus.IN_STOCK, lastUpdated: '2 hours ago' },
      { medicineId: '2', status: StockStatus.LOW_STOCK, lastUpdated: '5 hours ago' },
      { medicineId: '3', status: StockStatus.IN_STOCK, lastUpdated: '1 hour ago' },
    ]
  },
  {
    id: 's2',
    name: 'Wellness Plus Medicos',
    address: '45 Oak Avenue, East Side',
    distance: '1.2 km',
    phone: '+1 (555) 987-6543',
    hours: '8:00 AM - 10:00 PM',
    rating: 4.5,
    isVerified: true,
    inventory: [
      { medicineId: '1', status: StockStatus.OUT_OF_STOCK, lastUpdated: '10 mins ago' },
      { medicineId: '4', status: StockStatus.IN_STOCK, lastUpdated: '3 hours ago' },
      { medicineId: '5', status: StockStatus.IN_STOCK, lastUpdated: '4 hours ago' },
    ]
  },
  {
    id: 's3',
    name: 'Quick Cure Druggists',
    address: '78 Pine Road, North View',
    distance: '2.1 km',
    phone: '+1 (555) 456-7890',
    hours: '9:00 AM - 11:00 PM',
    rating: 4.2,
    isVerified: false,
    inventory: [
      { medicineId: '1', status: StockStatus.IN_STOCK, lastUpdated: '1 hour ago' },
      { medicineId: '2', status: StockStatus.IN_STOCK, lastUpdated: '2 hours ago' },
      { medicineId: '6', status: StockStatus.LOW_STOCK, lastUpdated: '1 day ago' },
    ]
  },
];
