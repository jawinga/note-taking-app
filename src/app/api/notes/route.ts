import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { title } from "node:process";

// const notes = [
//   { id: 1, title: "Note 1" },
//   { id: 2, title: "Note 2" },
// ];

// export async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     return res.json({ notes });
//   }
// }

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notes = await prisma.note.findMany({ where: { userId } });

  return NextResponse.json({ notes });
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.title || !body.content) {
    return NextResponse.json(
      { error: "No title or content included" },
      { status: 400 }
    );
  }

  const note = await prisma.note.create({
    data: {
      userId,
      title: body.title,
      content: body.content,
      favourite: (body.favourite = false),
      tags: body.tags || [],
    },
  });

  return NextResponse.json({ note });
}
