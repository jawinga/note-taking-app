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

  try {
    const note = await prisma.$transaction(async (tx) => {
      console.log("=== TRANSACTION START ===");

      const newNote = await prisma.note.create({
        data: {
          userId,
          title: body.title,
          content: body.content,
          favourite: body.favourite ?? false,
        },
        // include: {
        //   tags: {
        //     include: {
        //       tag: true,
        //     },
        //   },
        // },
      });

      if (body.tags && Array.isArray(body.tags) && body.tags.length > 0) {
        console.log("=== CREATING TAGS ===");

        for (const tagItem of body.tags) {
          const tag = await tx.tag.upsert({
            where: {
              tag_userId: {
                tag: tagItem.tag,
                userId,
              },
            },
            create: {
              tag: tagItem.tag,
              colour: tagItem.colour,
              userId,
            },
            update: {
              colour: tagItem.colour,
            },
          });

          await tx.noteTags.create({
            data: {
              noteId: newNote.id,
              tagId: tag.id,
            },
          });
        }
      } else {
        console.log("=== SKIPPING TAGS ===");
      }

      const completeNote = await tx.note.findUnique({
        where: { id: newNote.id },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
      return completeNote;
    });
    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
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

  try {
    const note = await prisma.$transaction(async (tx) => {
      const updatedNote = await tx.note.update({
        where: { id: body.noteId },
        data: {
          title: body.title,
          content: body.content,
          favourite: body.favourite,
        },
      });

      if (body.tags !== undefined) {
        await tx.noteTags.deleteMany({
          where: { noteId: body.noteId },
        });

        if (Array.isArray(body.tags) && body.tags.length > 0) {
          for (const tagItem of body.tags) {
            const tag = await tx.tag.upsert({
              where: {
                tag_userId: {
                  tag: tagItem.tag,
                  userId,
                },
              },
              create: {
                tag: tagItem.tag,
                colour: tagItem.colour,
                userId,
              },
              update: {
                colour: tagItem.colour,
              },
            });

            await tx.noteTags.create({
              data: {
                noteId: updatedNote.id,
                tagId: tag.id,
              },
            });
          }
        }
      }

      const completeNote = await tx.note.findUnique({
        where: { id: body.noteId },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      return completeNote;
    });

    return NextResponse.json({ note });
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
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
