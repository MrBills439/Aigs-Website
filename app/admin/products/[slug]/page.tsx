import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  // Next 16 passes dynamic params asynchronously.
  const { slug } = await params;

  if (!slug) {
    return <p className="text-sm text-red-600">Invalid product slug.</p>;
  }

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { media: { orderBy: { sortOrder: "asc" } } },
  });

  if (!product) return <p className="text-sm">Product not found.</p>;

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl">Edit product</h1>
      <ProductForm
        productId={product.id}
        defaultValues={{
          ...product,
          priceDisplay: (product.price / 100).toString(),
        }}
        initialMedia={product.media}
      />
    </div>
  );
}
