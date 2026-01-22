"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding data...');
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
    const plans = [
        { name: 'Free', maxProperties: 5, price: 0, billingCycle: 'MONTHLY' },
        { name: 'Premium', maxProperties: 999999, price: 29.99, billingCycle: 'MONTHLY' },
    ];
    for (const p of plans) {
        const existing = await prisma.subscriptionPlan.findFirst({ where: { name: p.name } });
        if (!existing) {
            await prisma.subscriptionPlan.create({
                data: {
                    name: p.name,
                    maxProperties: p.maxProperties,
                    price: p.price,
                    billingCycle: p.billingCycle
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
//# sourceMappingURL=seed.js.map