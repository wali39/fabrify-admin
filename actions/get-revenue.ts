import prismadb from "@/lib/prismadb";

export const getRevenue = async (storeId: string) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalrevenue = orders.reduce((total, order) => {
    const orderRevenue = order.orderItems.reduce((orderTotal, item) => {
      return orderTotal + item.product.price.toNumber();
    }, 0);
    return total + orderRevenue;
  }, 0);

  return totalrevenue;
};
