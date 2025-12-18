
export enum StockStatus {
  IN_STOCK = 'In Stock',
  LOW_STOCK = 'Low Stock',
  OUT_OF_STOCK = 'Out of Stock'
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface StoreInventoryItem {
  medicineId: string;
  status: StockStatus;
  lastUpdated: string;
}

export interface MedicalStore {
  id: string;
  name: string;
  address: string;
  distance: string; // e.g. "0.8 km"
  phone: string;
  hours: string;
  rating: number;
  isVerified: boolean;
  inventory: StoreInventoryItem[];
}

export interface UserLocation {
  lat: number;
  lng: number;
  address?: string;
}
