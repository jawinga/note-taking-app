import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notes = await prisma.note.findMany({
    where: { userId },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

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
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  const note = await prisma.note.create({
    data: {
      userId,
      title: body.title,
      content: body.content,
      favourite: body.favourite ?? false,
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return NextResponse.json({ note }, { status: 201 });
}

export async function PUT(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const existingNote = await prisma.note.findUnique({
    where: { id: body.noteId },
  });

  if (!existingNote) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  if (existingNote.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const note = await prisma.note.update({
    where: { id: body.noteId },
    data: {
      title: body.title,
      content: body.content,
      favourite: body.favourite,
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return NextResponse.json({ note });
}

export async function DELETE(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const existingNote = await prisma.note.findUnique({
    where: { id: body.noteId },
  });

  if (!existingNote) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  if (existingNote.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.note.delete({
    where: { id: body.noteId },
  });

  return NextResponse.json({ message: "Note deleted" });
}
