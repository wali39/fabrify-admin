import prismadb from "@/lib/prismadb";
import React from "react";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const store = await prismadb.store.findFirst({
    where: { id: params.storeId },
  });

  return <div>store name: {store?.name}</div>;
};

export default DashboardPage;
