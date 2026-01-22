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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PropertiesService = class PropertiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId) {
        return this.prisma.$transaction(async (tx) => {
            const userSub = await tx.userSubscription.findUnique({
                where: { userId },
                include: { plan: true },
            });
            const maxProperties = userSub?.plan?.maxProperties ?? 0;
            const currentCount = await tx.property.count({
                where: { userId },
            });
            if (currentCount >= maxProperties) {
                throw new common_1.BadRequestException(`You have reached the limit of ${maxProperties} properties for your current plan. Please upgrade to add more.`);
            }
            const county = await tx.county.findUnique({
                where: { id: dto.countyId },
                include: { state: true },
            });
            if (!county) {
                throw new common_1.BadRequestException('County not found');
            }
            if (county.stateId !== dto.stateId) {
                throw new common_1.BadRequestException('County does not belong to the specified State');
            }
            const updatedCounty = await tx.county.update({
                where: { id: dto.countyId },
                data: { currentSequence: { increment: 1 } },
            });
            const seq = updatedCounty.currentSequence;
            const seqStr = seq.toString().padStart(4, '0');
            const tag = `${county.state.code}-${county.code}-${seqStr}-${dto.externalPropertyId}`;
            return tx.property.create({
                data: {
                    ...dto,
                    propertyTag: tag,
                    userId,
                },
            });
        });
    }
    findAll() {
        return this.prisma.property.findMany({
            include: {
                state: true,
                county: true,
                city: true,
                images: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.property.findUnique({
            where: { id },
            include: {
                state: true,
                county: true,
                city: true,
                images: true,
            }
        });
    }
    async addImage(propertyId, imageUrl, type) {
        return this.prisma.propertyImage.create({
            data: {
                propertyId,
                imageUrl,
                type: type,
            },
        });
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map