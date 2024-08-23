import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns";
import ProductClient from "./components/client";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      sizes: true,
      colors: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  const formattedColumns: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatter.format(item.price),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    category: item.category.name,
    sizes: item.sizes.map(size=>size.value),
    colors: item.colors.map(color=>color.value),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="fle-col">
      <div className="flex-1 space-y-4 p-8 pt-4">
        <ProductClient data={formattedColumns} />
      </div>
    </div>
  );
};

export default ProductsPage;
