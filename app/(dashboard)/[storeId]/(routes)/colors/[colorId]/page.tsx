import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";

const colorPage = async ({ params }: { params: { colorId: string } }) => {
  params.colorId === "new" && (params.colorId = "3db21d5837ec3e1762a86b98");
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div className="flex-col">
      <div className="space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default colorPage;
