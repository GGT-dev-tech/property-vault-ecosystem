import { LocationsService } from './locations.service';
import { CreateStateDto, CreateCountyDto, CreateCityDto } from './dto/create-location.dto';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    createState(dto: CreateStateDto): import(".prisma/client").Prisma.Prisma__StateClient<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createCounty(dto: CreateCountyDto): import(".prisma/client").Prisma.Prisma__CountyClient<{
        stateId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        currentSequence: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createCity(dto: CreateCityDto): import(".prisma/client").Prisma.Prisma__CityClient<{
        countyId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getStates(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
    }[]>;
    getCounties(stateId: string): import(".prisma/client").Prisma.PrismaPromise<{
        stateId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        currentSequence: number;
    }[]>;
    getCities(countyId: string): import(".prisma/client").Prisma.PrismaPromise<{
        countyId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
