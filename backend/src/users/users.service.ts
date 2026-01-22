import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
            include: { subscription: true }
        });
    }

    async create(email: string, password: string, name: string): Promise<User> {
        const passwordHash = await bcrypt.hash(password, 10);

        // Find default Free plan
        const freePlan = await this.prisma.subscriptionPlan.findFirst({
            where: { name: 'Free' }
        });

        // Create user and subscription if plan exists
        return this.prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
                subscription: freePlan ? {
                    create: {
                        planId: freePlan.id,
                        active: true
                    }
                } : undefined
            },
        });
    }
}
