import { IsString } from 'class-validator';

export class CreateStateDto {
    @IsString()
    name: string;

    @IsString()
    code: string;
}

export class CreateCountyDto {
    @IsString()
    name: string;

    @IsString()
    code: string;

    @IsString()
    stateId: string;
}

export class CreateCityDto {
    @IsString()
    name: string;

    @IsString()
    countyId: string;
}
