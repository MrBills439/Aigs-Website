import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl">New product</h1>
      <ProductForm />
    </div>
  );
}
