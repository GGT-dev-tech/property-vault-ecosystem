import { IsString, IsEnum, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { PropertyType } from '@prisma/client';

export class CreatePropertyDto {
    @IsString()
    externalPropertyId: string;

    @IsEnum(PropertyType)
    type: PropertyType;

    @IsString()
    stateId: string;

    @IsString()
    countyId: string;

    @IsString()
    cityId: string;

    @IsString()
    address: string;

    @IsNumber()
    @IsOptional()
    latitude?: number;

    @IsNumber()
    @IsOptional()
    longitude?: number;

    @IsNumber()
    @IsOptional()
    landArea?: number;

    @IsNumber()
    @IsOptional()
    builtArea?: number;

    @IsBoolean()
    @IsOptional()
    floodRisk?: boolean;

    @IsNumber()
    @IsOptional()
    purchasePrice?: number;

    @IsNumber()
    @IsOptional()
    marketEstimatedValue?: number;

    @IsString()
    @IsOptional()
    description?: string;
}
