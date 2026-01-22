import { PropertyType } from '@prisma/client';
export declare class CreatePropertyDto {
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
