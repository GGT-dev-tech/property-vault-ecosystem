import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // 1. Seed States
    const states = [
        { name: 'Texas', code: 'TX' },
        { name: 'Florida', code: 'FL' },
        { name: 'California', code: 'CA' },
    ];

    for (const s of states) {
        await prisma.state.upsert({
            where: { code: s.code },
            update: {},
            create: s,
        });
    }

    // 2. Seed Subscription Plans
    const plans = [
        { name: 'Free', maxProperties: 5, price: 0, billingCycle: 'MONTHLY' },
        { name: 'Premium', maxProperties: 999999, price: 29.99, billingCycle: 'MONTHLY' },
    ];

    for (const p of plans) {
        // We don't have a unique constraint on name, but let's assume one or check
        const existing = await prisma.subscriptionPlan.findFirst({ where: { name: p.name } });
        if (!existing) {
            await prisma.subscriptionPlan.create({
                data: {
                    name: p.name,
                    maxProperties: p.maxProperties,
                    price: p.price,
                    billingCycle: p.billingCycle as any
                }
            });
            console.log(`Created plan: ${p.name}`);
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
