import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { useParams } from "next/navigation";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColumns: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="fle-col">
      <div className="flex-1 space-y-4 p-8 pt-4">
        <BillboardClient data={formattedColumns} />
      </div>
    </div>
  );
};

export default BillboardsPage;
