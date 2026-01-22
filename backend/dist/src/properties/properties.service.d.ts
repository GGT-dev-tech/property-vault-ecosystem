import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
export declare class PropertiesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePropertyDto, userId: string): Promise<{
        id: string;
        propertyTag: string;
        externalPropertyId: string;
        type: import(".prisma/client").$Enums.PropertyType;
        userId: string;
        stateId: string;
        countyId: string;
        cityId: string;
        address: string;
        latitude: import("@prisma/client/runtime/library").Decimal | null;
        longitude: import("@prisma/client/runtime/library").Decimal | null;
        landArea: number | null;
        builtArea: number | null;
        floodRisk: boolean;
        purchasePrice: import("@prisma/client/runtime/library").Decimal | null;
        marketEstimatedValue: import("@prisma/client/runtime/library").Decimal | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        state: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
        county: {
            name: string;
            id: string;
            stateId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            currentSequence: number;
        };
        city: {
            name: string;
            id: string;
            countyId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            id: string;
            type: import(".prisma/client").$Enums.ImageType;
            createdAt: Date;
            propertyId: string;
            imageUrl: string;
        }[];
    } & {
        id: string;
        propertyTag: string;
        externalPropertyId: string;
        type: import(".prisma/client").$Enums.PropertyType;
        userId: string;
        stateId: string;
        countyId: string;
        cityId: string;
        address: string;
        latitude: import("@prisma/client/runtime/library").Decimal | null;
        longitude: import("@prisma/client/runtime/library").Decimal | null;
        landArea: number | null;
        builtArea: number | null;
        floodRisk: boolean;
        purchasePrice: import("@prisma/client/runtime/library").Decimal | null;
        marketEstimatedValue: import("@prisma/client/runtime/library").Decimal | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PropertyClient<({
        state: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
        };
        county: {
            name: string;
            id: string;
            stateId: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            currentSequence: number;
        };
        city: {
            name: string;
            id: string;
            countyId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            id: string;
            type: import(".prisma/client").$Enums.ImageType;
            createdAt: Date;
            propertyId: string;
            imageUrl: string;
        }[];
    } & {
        id: string;
        propertyTag: string;
        externalPropertyId: string;
        type: import(".prisma/client").$Enums.PropertyType;
        userId: string;
        stateId: string;
        countyId: string;
        cityId: string;
        address: string;
        latitude: import("@prisma/client/runtime/library").Decimal | null;
        longitude: import("@prisma/client/runtime/library").Decimal | null;
        landArea: number | null;
        builtArea: number | null;
        floodRisk: boolean;
        purchasePrice: import("@prisma/client/runtime/library").Decimal | null;
        marketEstimatedValue: import("@prisma/client/runtime/library").Decimal | null;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    addImage(propertyId: string, imageUrl: string, type: string): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.ImageType;
        createdAt: Date;
        propertyId: string;
        imageUrl: string;
    }>;
}
