export declare class CreateStateDto {
    name: string;
    code: string;
}
export declare class CreateCountyDto {
    name: string;
    code: string;
    stateId: string;
}
export declare class CreateCityDto {
    name: string;
    countyId: string;
}
