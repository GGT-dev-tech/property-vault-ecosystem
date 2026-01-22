import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertiesService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreatePropertyDto) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Validate County belongs to State
            const county = await tx.county.findUnique({
                where: { id: dto.countyId },
                include: { state: true },
            });

            if (!county) {
                throw new BadRequestException('County not found');
            }

            if (county.stateId !== dto.stateId) {
                throw new BadRequestException('County does not belong to the specified State');
            }

            // 2. Increment sequence
            const updatedCounty = await tx.county.update({
                where: { id: dto.countyId },
                data: { currentSequence: { increment: 1 } },
            });

            const seq = updatedCounty.currentSequence;
            const seqStr = seq.toString().padStart(4, '0');

            // 3. Generate Tag
            // Format: [STATE_CODE]-[COUNTY_CODE]-[SEQUENTIAL_NUMBER]-[PROPERTY_EXTERNAL_ID]
            const tag = `${county.state.code}-${county.code}-${seqStr}-${dto.externalPropertyId}`;

            // 4. Create Property
            return tx.property.create({
                data: {
                    ...dto,
                    propertyTag: tag,
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

    findOne(id: string) {
        return this.prisma.property.findUnique({
            where: { id },
            include: {
                state: true,
                county: true,
                city: true,
                images: true,
            }
        })
    }
}
