import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tags = await prisma.tag.findMany({
    where: { userId },
    orderBy: { tag: "asc" },
  });

  return NextResponse.json({ tags });
}
