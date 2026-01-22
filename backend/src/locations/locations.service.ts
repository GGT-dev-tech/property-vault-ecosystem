import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStateDto, CreateCountyDto, CreateCityDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
    constructor(private prisma: PrismaService) { }

    createState(dto: CreateStateDto) {
        return this.prisma.state.create({ data: dto });
    }

    createCounty(dto: CreateCountyDto) {
        return this.prisma.county.create({ data: dto });
    }

    createCity(dto: CreateCityDto) {
        return this.prisma.city.create({ data: dto });
    }

    getStates() {
        return this.prisma.state.findMany();
    }

    getCounties(stateId: string) {
        return this.prisma.county.findMany({ where: { stateId } });
    }

    getCities(countyId: string) {
        return this.prisma.city.findMany({ where: { countyId } });
    }
}
