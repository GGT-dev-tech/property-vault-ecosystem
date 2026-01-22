import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateStateDto, CreateCountyDto, CreateCityDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) { }

    @Post('states')
    createState(@Body() dto: CreateStateDto) {
        return this.locationsService.createState(dto);
    }

    @Post('counties')
    createCounty(@Body() dto: CreateCountyDto) {
        return this.locationsService.createCounty(dto);
    }

    @Post('cities')
    createCity(@Body() dto: CreateCityDto) {
        return this.locationsService.createCity(dto);
    }

    @Get('states')
    getStates() {
        return this.locationsService.getStates();
    }

    @Get('states/:stateId/counties')
    getCounties(@Param('stateId') stateId: string) {
        return this.locationsService.getCounties(stateId);
    }

    @Get('counties/:countyId/cities')
    getCities(@Param('countyId') countyId: string) {
        return this.locationsService.getCities(countyId);
    }
}
