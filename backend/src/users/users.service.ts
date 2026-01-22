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
        return this.prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
            },
        });
    }
}
