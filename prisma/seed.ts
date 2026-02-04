import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'owner@adiswigsandbeauty.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { name: 'ADIS Admin', passwordHash },
    create: {
      name: 'ADIS Admin',
      email: adminEmail,
      passwordHash
    }
  });

  await prisma.product.deleteMany();

  const products = await prisma.product.createMany({
    data: [
      {
        title: 'Satin Silk Straight 20"',
        slug: 'satin-silk-straight-20',
        description: 'Glass-smooth straight wig with HD lace and natural density.',
        price: 28500,
        currency: 'GHS',
        wigType: 'Lace Front',
        texture: 'Straight',
        lengthInches: ['20'],
        density: '180%',
        laceType: 'HD Lace',
        capSize: 'Medium',
        color: 'Natural Black',
        sku: 'ADIS-STR-20',
        stockQty: 6,
        isFeatured: true,
        isActive: true
      },
      {
        title: 'Velvet Body Wave 24"',
        slug: 'velvet-body-wave-24',
        description: 'Soft body waves with pre-plucked hairline and airy cap.',
        price: 32000,
        currency: 'GHS',
        wigType: 'Lace Front',
        texture: 'Body Wave',
        lengthInches: ['24'],
        density: '200%',
        laceType: 'Transparent Lace',
        capSize: 'Medium',
        color: 'Espresso',
        sku: 'ADIS-BW-24',
        stockQty: 4,
        isFeatured: true,
        isActive: true
      },
      {
        title: 'Deep Wave HD 18"',
        slug: 'deep-wave-hd-18',
        description: 'Defined curls with HD lace and glueless strap.',
        price: 26000,
        currency: 'GHS',
        wigType: 'Glueless',
        texture: 'Deep Wave',
        lengthInches: ['18'],
        density: '180%',
        laceType: 'HD Lace',
        capSize: 'Small',
        color: 'Jet Black',
        sku: 'ADIS-DW-18',
        stockQty: 5,
        isFeatured: false,
        isActive: true
      },
      {
        title: 'Honey Balayage 22"',
        slug: 'honey-balayage-22',
        description: 'Warm honey balayage with silky straight finish.',
        price: 34500,
        currency: 'GHS',
        wigType: 'Closure',
        texture: 'Straight',
        lengthInches: ['22'],
        density: '200%',
        laceType: 'Swiss Lace',
        capSize: 'Medium',
        color: 'Honey Balayage',
        sku: 'ADIS-HB-22',
        stockQty: 3,
        isFeatured: true,
        isActive: true
      },
      {
        title: 'Glam Loose Curl 26"',
        slug: 'glam-loose-curl-26',
        description: 'Bouncy loose curls with breathable lace front.',
        price: 36000,
        currency: 'GHS',
        wigType: 'Lace Front',
        texture: 'Loose Curl',
        lengthInches: ['26'],
        density: '200%',
        laceType: 'Transparent Lace',
        capSize: 'Large',
        color: 'Natural Black',
        sku: 'ADIS-LC-26',
        stockQty: 2,
        isFeatured: false,
        isActive: true
      },
      {
        title: 'Classic Bob 12"',
        slug: 'classic-bob-12',
        description: 'Chic bob with precision cut and soft lace finish.',
        price: 19500,
        currency: 'GHS',
        wigType: 'Closure',
        texture: 'Straight',
        lengthInches: ['12'],
        density: '150%',
        laceType: 'Swiss Lace',
        capSize: 'Small',
        color: 'Natural Black',
        sku: 'ADIS-BOB-12',
        stockQty: 8,
        isFeatured: true,
        isActive: true
      },
      {
        title: 'Rose Mocha Wave 20"',
        slug: 'rose-mocha-wave-20',
        description: 'Rosy mocha tone with voluminous wave pattern.',
        price: 31000,
        currency: 'GHS',
        wigType: 'Lace Front',
        texture: 'Body Wave',
        lengthInches: ['20'],
        density: '180%',
        laceType: 'HD Lace',
        capSize: 'Medium',
        color: 'Rose Mocha',
        sku: 'ADIS-RM-20',
        stockQty: 5,
        isFeatured: false,
        isActive: true
      },
      {
        title: 'Midnight Curl 30"',
        slug: 'midnight-curl-30',
        description: 'Long dramatic curls with natural luster and baby hairs.',
        price: 42000,
        currency: 'GHS',
        wigType: 'Lace Front',
        texture: 'Loose Curl',
        lengthInches: ['30'],
        density: '250%',
        laceType: 'HD Lace',
        capSize: 'Large',
        color: 'Jet Black',
        sku: 'ADIS-MC-30',
        stockQty: 2,
        isFeatured: true,
        isActive: true
      }
    ]
  });

  const createdProducts = await prisma.product.findMany();

  for (const product of createdProducts) {
    await prisma.productMedia.create({
      data: {
        productId: product.id,
        type: 'IMAGE',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
        alt: product.title,
        sortOrder: 1
      }
    });
  }

  await prisma.reviewMedia.create({
    data: {
      title: 'Amina O. · Lace melt review',
      type: 'IMAGE',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      alt: 'Client review',
      sortOrder: 1
    }
  });

  console.log({ adminEmail, adminPassword, products: products.count });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
