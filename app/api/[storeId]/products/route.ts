import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const {
      name,
      price,
      images,
      categoryId,
      sizeIds,
      colorId,
      isFeatured,
      isArchived,
    } = body;

    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 501 });

    if (!name) return new NextResponse("Nme required", { status: 400 });

    if (!price) return new NextResponse("Price required", { status: 400 });

    if (!images || !images.length)
      return new NextResponse("Images required", { status: 400 });

    if (!categoryId)
      return new NextResponse("CatgoryId required", { status: 400 });

    if (!sizeIds || !sizeIds.length)
      return new NextResponse("SizeIds required", { status: 400 });

    if (!colorId) return new NextResponse("colorId required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        sizeIds,
        colorId,
        storeId: params.storeId,
        isArchived,
        isFeatured,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PROUCT_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(_req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || null;
    const colorId = searchParams.get("colorId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId)
      return new NextResponse("Store Id is required", { status: 400 });
    const products = await prismadb.product.findMany({
      where: {
        ...(sizeId!==null ? { sizeIds: { hasSome: [sizeId] } } : {}),
        storeId: params.storeId,
        categoryId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        category: true,
        sizes: true,
        color: true,
        images: true,
      },
    });
    // let products;
    // sizeId !== null
    //   ? (products = await prismadb.product.findMany({
    //       where: {
    //         storeId: params.storeId,
    //         categoryId,
    //         sizeIds: { hasSome: [sizeId!] },
    //         colorId,
    //         isFeatured: isFeatured ? true : undefined,
    //         isArchived: false,
    //       },
    //       include: {
    //         category: true,
    //         sizes: true,
    //         color: true,
    //         images: true,
    //       },
    //     }))
    //   : (products = await prismadb.product.findMany({
    //       where: {
    //         storeId: params.storeId,
    //         categoryId,
    //         colorId,
    //         isFeatured: isFeatured ? true : undefined,
    //         isArchived: false,
    //       },
    //       include: {
    //         category: true,
    //         sizes: true,
    //         color: true,
    //         images: true,
    //       },
    //     }));

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
