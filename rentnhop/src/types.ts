export interface BikeInstance {
  $id: string;
  area_slug: string;
  bike_slug: string;
  status: string;
  pricePerDay: number;
  tags?: string;
}

export interface BikeArea {
  area: string;
  slug: string;
}

export interface BikeAreaSummary {
  lowestInstance: BikeInstance;
  highestInstance: BikeInstance;
  vehicleCount: number;
}

export interface Bike {
  $id: string;
  brand: string;
  model: string;
  image: string;
  slug: string;
  specs: string[];
  rent: number;
  deposit: number;
  cc: number;
  weight: number;
  mileage: number;
  areas: string[];
  maker?: string;
  category?: string;
  instances?: { [key: string]: BikeAreaSummary };
  selectedArea?: string;
}

export interface BikesResponse {
  total: number;
  documents: Bike[];
}

export interface Vehicle {
  areaSlug: string;
  bikeSlug: string;
  deposit: number;
  duration: { day: number; hours: number };
  pickupDate: string[];
  pricePerDay: number;
  quantity: number;
  returnDate: string[];
  total: number;
  vehicles: string[];
  tripLimit?: number;
  price?: number; 
}

export interface User {
  username: string;
  userEmail: string;
  $id: string;
}

export interface CartState {
  cartCount: number;
  setCartCount: (count: number) => void;
}

export interface UserInfoState {
  user: User | null;
  setUser: (name: string, email: string, id: string) => void;
  removeUser: () => void;
}

export interface DateState {
  pickupDate: string | null;
  returnDate: string | null;
  setPickupDate: (date: string) => void;
  setReturnDate: (date: string) => void;
}

export interface SelectedLocationState {
  selectedLocation: string;
  updateLocation: (location: string) => void;
}

export interface SelectedVehicleState {
  selectedVehicle: Bike | null;
  setVehicle: (vehicle: Bike | null) => void;
  removeVehicle: () => void;
}

export interface DayDifferenceState {
  difference: { day: number; hours: number };
  updateDiffrence: (difference: { day: number; hours: number }) => void;
}

export interface SelectedSortingValueState {
  selectedSort: string;
  setSelectedSort: (value: string) => void;
}

export interface AppState extends 
  CartState, 
  UserInfoState, 
  DateState, 
  SelectedLocationState, 
  SelectedVehicleState, 
  DayDifferenceState, 
  SelectedSortingValueState {}
