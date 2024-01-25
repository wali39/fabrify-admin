import prismadb from "@/lib/prismadb";
import CategoryClient from "./components/client";
import { useParams } from "next/navigation";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: { billboard: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColumns: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billbaordLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="fle-col">
      <div className="flex-1 space-y-4 p-8 pt-4">
        <CategoryClient data={formattedColumns} />
      </div>
    </div>
  );
};

export default CategoriesPage;
