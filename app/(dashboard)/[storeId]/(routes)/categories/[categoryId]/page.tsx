import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

const BillboardPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  params.categoryId === "new" &&
    (params.categoryId = "3db21d5837ec3e1762a86b98");
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default BillboardPage;
