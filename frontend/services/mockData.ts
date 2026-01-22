import { Property, PropertyType } from '../types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    property_tag: 'TX-AU-0042',
    external_property_id: 'APN-998-12',
    type: PropertyType.HOUSE,
    address: '1248 Oakwood Avenue',
    city: 'Austin',
    state_code: 'TX',
    zip_code: '78701',
    land_area: 0.50,
    built_area: 2800,
    price: 120500,
    estimated_value: 185000,
    flood_risk: true,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAJ4yYxtvzs9XuRTAMgoHbp8Mh0T71JD8xDFqJkeCMJVtY2kuB1n748G9Efbyl8sHeD3T7MYK7keAIuiQ4d0EOWkUubz9_wGWFQcwgsuIJQf9csUycUqg3HAKDAjmKTd_9e4tfz1w6CwXXEal-5RAv3ur4vRfqByhsZHtW5YBPTxfbAEloiPHUcjbxGUWidToBg-gDbKC3n_dzFKI1G2Rez5Mjsb9BLWTNcFLquF8z0kp0A8HTs0GkM_D5XX7dLTSTdUHQZUhGUYPa',
    created_at: '2023-11-15T09:00:00Z',
    status: 'Active',
    bedrooms: 3,
    coordinates: { lat: 30.2672, lng: -97.7431 }
  },
  {
    id: '2',
    property_tag: 'FL-OR-9912',
    external_property_id: 'APN-771-00',
    type: PropertyType.LOT,
    address: 'Lot 22, Blue Ridge Dr',
    city: 'Orlando',
    state_code: 'FL',
    zip_code: '32801',
    land_area: 4.25,
    price: 45000,
    estimated_value: 78200,
    flood_risk: false,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4vb61X-8GntTqd6jGrDFi_JHZlidocBB8WCC0eajlYfK2sZhnEYler_uAZvRZDfD4YOBhzHnPZ2xyhc6oq1Enj8LIOTrrmNn_OhAJNtowfKvfMn7E-1oaf6Ck94jzlbno9Z8hCjrwac4hNFaTgqsMkD2tmCfvTY32kfIDhwYDfHcJHx1pk_Ka2wzevz14Pb7bdWkNJfj1zuyEyKYhERoRswM0kxLstp1AbXnCXYUQhPCZDEYWX6wgKyhtU4l_XpVdEqyeI-qfnb_h',
    created_at: '2023-12-01T14:30:00Z',
    status: 'Active',
    coordinates: { lat: 28.5383, lng: -81.3792 }
  },
  {
    id: '3',
    property_tag: 'AZ-PX-0881',
    external_property_id: 'APN-332-11',
    type: PropertyType.HOUSE,
    address: '881 Palm Vista Dr',
    city: 'Phoenix',
    state_code: 'AZ',
    zip_code: '85001',
    land_area: 0.25,
    built_area: 3200,
    price: 315000,
    estimated_value: 340000,
    flood_risk: false,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChqEvmEP8_eqasJ5vvXzllyRIONqvgrWmjZix8feijH02M5BOScCSax24KQ-dyZa7j8NMRJf1__E97kU7pmmcCGwXgwxKXcXiVqnLiOuCQZTCQk58iuMMs3Pz1GTBu6WInIAIsGnS3esHvD-TuFDn1-VVNTgfQRDM4iXONfy4G3wktwF2lE_ksuj5PbELpwWXZiwctqpwxwJ4fj5wZe61HEtCt7ooioLGDReD7xPRM0-T2W18GE50daF7fum6hfMYkELL4qCqLGMDe',
    created_at: '2024-01-05T10:15:00Z',
    status: 'In Review',
    bedrooms: 4,
    coordinates: { lat: 33.4484, lng: -112.0740 }
  },
  {
    id: '4',
    property_tag: 'CA-LA-0003',
    external_property_id: 'APN-112-34',
    type: PropertyType.HOUSE,
    address: '1248 Oakwood Avenue',
    city: 'Silicon Valley',
    state_code: 'CA',
    zip_code: '94025',
    land_area: 2.45,
    built_area: 5280,
    price: 4850000,
    estimated_value: 6200000,
    flood_risk: false,
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbuUfxij8B1iTymLXHhlHvHHAA-D-lhzz52BpVPVd5TMsLm-SJxgpI75xPs9Srz1r-lfD99ZM5J22y4m3iRM35A6j2eB_o1fzZ_h-MeUcd8wQLhoZiEcY--3-A17CT7ztQbLYLlZo7giYhViCpTAYpoatFvS2ZbC9rkd0U9GdX0V5ZP79XYc1Q1n8k2W_gOIYZDXBeWBHTBwp6oLH6ZyePN5xpsIb_HQTciC9_ttqr8J7eKFBu2J_4Rb8NPJFTn1rAUMbP1R956WcD',
    created_at: '2024-02-10T11:45:00Z',
    status: 'Active',
    bedrooms: 5,
    coordinates: { lat: 37.4419, lng: -122.1430 }
  }
];

export const generateTag = (state: string, county: string, seq: number, ext: string): string => {
  return `${state.toUpperCase()}-${county.substring(0,2).toUpperCase()}-${seq.toString().padStart(4, '0')}-${ext}`;
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};