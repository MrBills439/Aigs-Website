import { PrismaClient } from '@prisma/client';
import { slugify } from '../lib/slugify';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({});
  for (const product of products) {
    if (product.slug && product.slug.length > 0) continue;
    const base = slugify(product.title);
    let slug = base;
    let i = 1;
    // ensure unique
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const exists = await prisma.product.findUnique({ where: { slug } });
      if (!exists || exists.id === product.id) break;
      slug = `${base}-${i++}`;
    }
    await prisma.product.update({ where: { id: product.id }, data: { slug } });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
