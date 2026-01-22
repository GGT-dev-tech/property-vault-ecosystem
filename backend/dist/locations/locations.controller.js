"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsController = void 0;
const common_1 = require("@nestjs/common");
const locations_service_1 = require("./locations.service");
const create_location_dto_1 = require("./dto/create-location.dto");
let LocationsController = class LocationsController {
    locationsService;
    constructor(locationsService) {
        this.locationsService = locationsService;
    }
    createState(dto) {
        return this.locationsService.createState(dto);
    }
    createCounty(dto) {
        return this.locationsService.createCounty(dto);
    }
    createCity(dto) {
        return this.locationsService.createCity(dto);
    }
    getStates() {
        return this.locationsService.getStates();
    }
    getCounties(stateId) {
        return this.locationsService.getCounties(stateId);
    }
    getCities(countyId) {
        return this.locationsService.getCities(countyId);
    }
};
exports.LocationsController = LocationsController;
__decorate([
    (0, common_1.Post)('states'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateStateDto]),
    __metadata("design:returntype", void 0)
], LocationsController.prototype, "createState", null);
__decorate([
    (0, common_1.Post)('counties'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateCountyDto]),
    __metadata("design:returntype", void 0)
], LocationsController.prototype, "createCounty", null);
__decorate([
    (0, common_1.Post)('cities'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateCityDto]),
    __metadata("design:returntype", void 0)
], LocationsController.prototype, "createCity", null);
__decorate([
    (0, common_1.Get)('states'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocationsController.prototype, "getStates", null);
__decorate([
    (0, common_1.Get)('states/:stateId/counties'),
    __param(0, (0, common_1.Param)('stateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocationsController.prototype, "getCounties", null);
__decorate([
    (0, common_1.Get)('counties/:countyId/cities'),
    __param(0, (0, common_1.Param)('countyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocationsController.prototype, "getCities", null);
exports.LocationsController = LocationsController = __decorate([
    (0, common_1.Controller)('locations'),
    __metadata("design:paramtypes", [locations_service_1.LocationsService])
], LocationsController);
//# sourceMappingURL=locations.controller.js.map