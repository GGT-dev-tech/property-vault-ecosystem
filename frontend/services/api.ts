import { Property, PropertyType } from '../types';

const API_URL = 'http://localhost:3000';

export interface CreatePropertyData {
    externalPropertyId: string;
    type: PropertyType;
    stateId: string;
    countyId: string;
    cityId: string;
    address: string;
    latitude?: number;
    longitude?: number;
    landArea?: number;
    builtArea?: number;
    floodRisk?: boolean;
    purchasePrice?: number;
    marketEstimatedValue?: number;
    description?: string;
}

export const api = {
    getProperties: async (): Promise<Property[]> => {
        try {
            const res = await fetch(`${API_URL}/properties`);
            if (!res.ok) throw new Error('Failed to fetch properties');
            const data = await res.json();
            return data.map(adaptBackendToFrontend);
        } catch (e) {
            console.error(e);
            return [];
        }
    },

    createProperty: async (data: CreatePropertyData) => {
        const res = await fetch(`${API_URL}/properties`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create property');
        return res.json();
    },

    getStates: async () => {
        const res = await fetch(`${API_URL}/locations/states`);
        if (!res.ok) throw new Error('Failed to fetch states');
        return res.json();
    },

    getCounties: async (stateId: string) => {
        const res = await fetch(`${API_URL}/locations/states/${stateId}/counties`);
        if (!res.ok) throw new Error('Failed to fetch counties');
        return res.json();
    },

    getCities: async (countyId: string) => {
        const res = await fetch(`${API_URL}/locations/counties/${countyId}/cities`);
        if (!res.ok) throw new Error('Failed to fetch cities');
        return res.json();
    },

    uploadImage: async (propertyId: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch(`${API_URL}/properties/${propertyId}/images`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) throw new Error('Failed to upload image');
        return res.json();
    }
};

function adaptBackendToFrontend(backendProp: any): Property {
    return {
        id: backendProp.id,
        property_tag: backendProp.propertyTag,
        external_property_id: backendProp.externalPropertyId,
        type: backendProp.type as PropertyType,
        address: backendProp.address,
        city: backendProp.city ? backendProp.city.name : 'Unknown', // Frontend expects string
        state_code: backendProp.state ? backendProp.state.code : 'XX',
        zip_code: '00000', // Placeholder
        land_area: backendProp.landArea || 0,
        built_area: backendProp.builtArea,
        price: backendProp.purchasePrice ? Number(backendProp.purchasePrice) : 0,
        estimated_value: backendProp.marketEstimatedValue ? Number(backendProp.marketEstimatedValue) : 0,
        flood_risk: backendProp.floodRisk,
        image_url: backendProp.images && backendProp.images.length > 0 ? backendProp.images[0].imageUrl : '',
        created_at: backendProp.createdAt,
        status: 'Active', // Placeholder
        coordinates: {
            lat: backendProp.latitude ? Number(backendProp.latitude) : 0,
            lng: backendProp.longitude ? Number(backendProp.longitude) : 0
        }
    };
}
