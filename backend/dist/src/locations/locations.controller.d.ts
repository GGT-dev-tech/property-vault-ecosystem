import { LocationsService } from './locations.service';
import { CreateStateDto, CreateCountyDto, CreateCityDto } from './dto/create-location.dto';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    createState(dto: CreateStateDto): import(".prisma/client").Prisma.Prisma__StateClient<{
        id: string;
        code: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createCounty(dto: CreateCountyDto): import(".prisma/client").Prisma.Prisma__CountyClient<{
        id: string;
        code: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        stateId: string;
        currentSequence: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createCity(dto: CreateCityDto): import(".prisma/client").Prisma.Prisma__CityClient<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        countyId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getStates(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        code: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getCounties(stateId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        code: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        stateId: string;
        currentSequence: number;
    }[]>;
    getCities(countyId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        countyId: string;
    }[]>;
}
