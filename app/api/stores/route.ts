import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 501 });

    if (!name) return new NextResponse("Name required", { status: 400 });

    const store = await prismadb.store.create({
      data: {
        name: name,
        userId: userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[Error_Store", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
