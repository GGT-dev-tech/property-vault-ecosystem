export enum PropertyType {
  HOUSE = 'HOUSE',
  LOT = 'LOT',
  APARTMENT = 'APARTMENT',
  COMMERCIAL = 'COMMERCIAL'
}

export enum SubscriptionCycle {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export interface Property {
  id: string;
  property_tag: string; // [STATE]-[COUNTY]-[SEQ]-[EXT]
  external_property_id: string;
  type: PropertyType;
  address: string;
  city: string;
  state_code: string;
  zip_code: string;
  land_area: number; // in acres
  built_area?: number; // in sqft
  price: number;
  estimated_value: number;
  flood_risk: boolean;
  image_url: string;
  created_at: string;
  status: 'Active' | 'Sold' | 'In Review';
  bedrooms?: number;
  bathrooms?: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: string;
  colorClass: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  plan: 'Basic' | 'Professional' | 'Enterprise';
}

export const MOCK_USER: User = {
  id: 'u-123',
  name: 'Alex Morgan',
  email: 'alex@propertyvault.com',
  avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChfvHSZhxXSEVrK7fRnXp5ejdmZG5P6WsdoflGW8ysnJZRj4AAuYhQFPZRHbfSz7HfQeuLImPfeEylibUOAt5hZ1SDkRun6wlqFEKZzf_fU9ZqoUwG0fcKrquXUWUClPnoNA-qGLBlqeXRkuyfpOSffQWujcssdlZNoHR92KlNeuedD5-trrzIBG-kjpWrhRj_CjvSxfexN8O3Kn47xAT_ejgTzWXOJQhwGhnWiwWqC3WOoSVoM4Np26hYoVIBmh-uWvevlyjvzETo',
  plan: 'Professional'
};
