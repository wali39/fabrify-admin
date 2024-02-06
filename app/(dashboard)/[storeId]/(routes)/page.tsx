import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCardIcon, DollarSignIcon, Package } from "lucide-react";
import { formatter } from "@/lib/utils";
import { getRevenue } from "@/actions/get-revenue";
import { getSales } from "@/actions/get-sales";
import { getProductCount } from "@/actions/get-product-count";
import { Overview } from "@/components/overview";
import { getGraphRenenue } from "@/actions/get-grpah-revenue";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const totalRevenue = await getRevenue(params.storeId);
  const sales = await getSales(params.storeId);
  const stocks = await getProductCount(params.storeId);
  const graphData = await getGraphRenenue(params.storeId);

  return (
    <div>
      <div className="px-4 mt-5 space-y-5">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-bold">Total revenue</CardTitle>
              <DollarSignIcon className="text-sm h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-bold">{formatter.format(totalRevenue)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-bold">Sales</CardTitle>
              <CreditCardIcon className="text-sm h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-bold">+{sales}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-bold">
                Product in stock
              </CardTitle>
              <Package className="text-sm h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-bold">{stocks}</p>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
