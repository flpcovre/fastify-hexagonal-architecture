import { PrismaClient } from '@prisma/client';
import { flowSeeder } from '@/infra/database/prisma/seeders/flows.seeder';

const prisma = new PrismaClient();

async function seed() {
  await flowSeeder(prisma);
}

seed().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});