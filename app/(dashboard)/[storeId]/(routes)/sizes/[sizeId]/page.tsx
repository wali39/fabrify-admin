import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

const sizePage = async ({ params }: { params: { sizeId: string } }) => {
  params.sizeId === "new" && (params.sizeId = "3db21d5837ec3e1762a86b98");
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default sizePage;
