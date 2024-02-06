import prismadb from "@/lib/prismadb";

export const getSales = async (storeId: string) => {
  const productCount = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });
  return productCount;
};
