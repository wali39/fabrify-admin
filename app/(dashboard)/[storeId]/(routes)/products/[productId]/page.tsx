import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import React from "react";

interface ProductPageProps {
  params: { productId: string; storeId: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  params.productId === "new" && (params.productId = "3db21d5837ec3e1762a86b98");
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      sizes:true,
      images: true,
    },
  });
  // console.log("product", product);
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          sizes={sizes}
          colors={colors}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
